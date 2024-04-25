import { useState } from "react";
import { RKPInfo, UploadData } from "../types/interfaces";
import { db, storage } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, getMetadata } from "firebase/storage"

export const useUploadInfo = () => {
    const [kpError, setKPError] = useState<Error | null>(null);
    const [kpProgress, setKPProgress] = useState<number>(0);
    // const [coverError, setCoverError] = useState<Error | null>(null);
    // const [coverProgress, setCoverProgress] = useState<number>(0);

    // May cover sa UploadData
    const startUpload = async ({ kp, type }: UploadData, kpInfo: RKPInfo) => {
        if (!kp) {
            return;
        }

        const kpTitle = kp.name;
        // const coverTitle = cover.name;
        const kpStorageRef = ref(storage, kpTitle);
        // const coverStorageRef = ref(storage, coverTitle);

        const kpMetadata = await getMetadata(kpStorageRef);
        const uploadKP = uploadBytesResumable(kpStorageRef, kp);
        // const uploadCover = uploadBytesResumable(coverStorageRef, cover);

        // uploadKP.on('state_changed', (snapshot) => {
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     setKPProgress(progress);
        // }, (error) => {
        //     console.log("hara")
        //     setKPError(error);
        // });

        // uploadCover.on('state_changed', (snapshot) => {
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     setCoverProgress(progress);
        // }, (error) => {
        //     setCoverError(error);
        // });

        // await Promise.all([uploadKP, uploadCover]);

        const kpDownloadURL = await getDownloadURL(uploadKP.snapshot.ref);
        // const coverDownloadURL = await getDownloadURL(uploadCover.snapshot.ref);

        await addDoc(collection(db, type), {
            author: kpInfo.author,
            datePublished: kpInfo.datePublished,
            kpType: type,
            title: kpInfo.title,
            description: kpInfo.description,
            kpURL: kpDownloadURL,
            // coverURL: coverDownloadURL,
            fileType: kpMetadata.contentType
        });
    };

    return {
        startUpload,
        kpProgress,
        // coverProgress,
        kpError,
        // coverError
    };
};