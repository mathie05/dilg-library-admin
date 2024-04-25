import { useState } from "react";
import { RKPInfo, UploadData } from "../types/interfaces";
import { db, storage } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, getMetadata } from "firebase/storage"
import { format } from "date-fns";

export const useUploadInfo = () => {
  const [kpProgress, setKPProgress] = useState<number>(0);
  const [kpError, setKPError] = useState<Error | null>(null);
  const [coverProgress, setCoverProgress] = useState<number>(0);
  const [coverError, setCoverError] = useState<Error | null>(null);

  const startUpload = async({ kp, cover }: UploadData, kpInfo: RKPInfo) => {
    if (!kp || !cover || !kpInfo) {
      return;
    }

    const currentTime: Date = new Date();
    const formattedTime: string = format(currentTime, "MM-dd-yy");

    const kpName = kp.name;
    const coverName = cover.name;

    const kpStorageRef = ref(storage, `kp/${kpInfo.kpType}/${kpName}`);
    const coverStorageRef = ref(storage, `cover/${kpInfo.kpType}/${coverName}`);

    const kpUploadTask = uploadBytesResumable(kpStorageRef, kp);
    const coverUploadTask = uploadBytesResumable(coverStorageRef, cover);
    
    const kpMetadata = await getMetadata(kpStorageRef);

    kpUploadTask.on('state_changed', (snapshot) => {
      const progressKP = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setKPProgress(progressKP);
    }, (error) => {
      console.log("Failed to upload KP")
      setKPError(error);
    });

    coverUploadTask.on('state_changed', (snapshot) => {
      const progressCover = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setCoverProgress(progressCover);
    }, (error) => {
      console.log("Failed to upload Cover")
      setCoverError(error);
    });

    await Promise.all([kpUploadTask, coverUploadTask]);

    const kpDownloadURL = await getDownloadURL(kpUploadTask.snapshot.ref);
    const coverDownloadURL = await getDownloadURL(coverUploadTask.snapshot.ref);

    await addDoc(collection(db, kpInfo.kpType), {
      author: kpInfo.author,
      datePublished: kpInfo.datePublished,
      kpType: kpInfo.kpType,
      title: kpInfo.title,
      description: kpInfo.description,
      kpURL: kpDownloadURL,
      kpName: kpName,
      coverURL: coverDownloadURL,
      coverName: coverName,
      fileType: kpMetadata.contentType,
      timeUploaded: formattedTime
  });
};

  return {
    startUpload, kpProgress, coverProgress, kpError, coverError
  };
};