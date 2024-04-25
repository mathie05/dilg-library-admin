import { useState } from "react";
import { RKPInfo, UploadData } from "../types/interfaces";
import { db, storage } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, getMetadata } from "firebase/storage"

export const useUploadInfo = () => {
  const [kpProgress, setKPProgress] = useState<number>(0);
  const [kpError, setKPError] = useState<Error | null>(null);
  const [coverProgress, setCoverProgress] = useState<number>(0);
  const [coverError, setCoverError] = useState<Error | null>(null);

  const startUpload = async({ kp, cover }: UploadData, kpInfo: RKPInfo) => {
    if (!kp || !cover || !kpInfo) {
      return;
    }

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
      coverURL: coverDownloadURL,
      fileType: kpMetadata.contentType
  });

    // kpUploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     setProgress(progress);
    //   },
    //   (error) => {
    //     setError(error);
    //   },
    //   async () => {
    //     try {
    //       const downloadURL = await getDownloadURL(kpUploadTask.snapshot.ref);
    //       console.log("Download URL:", downloadURL);
    //       setProgress(100);
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // );

    // coverUploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const cprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     setCProgress(cprogress);
    //   },
    //   (error) => {
    //     setError(error);
    //   },
    //   async () => {
    //     try {
    //       const cdownloadURL = await getDownloadURL(coverUploadTask.snapshot.ref);
    //       console.log("Download URL:", cdownloadURL);
    //       setProgress(100);
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // );

  };

  return {
    startUpload, kpProgress, coverProgress, kpError, coverError
  };
};