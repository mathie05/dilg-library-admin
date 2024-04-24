import { db } from "../firebase/config";
import { KPInfo, UserInfo } from "../types/interfaces";
import { collection, onSnapshot, query, Unsubscribe } from "firebase/firestore";

export const useFetchKPInfo = (setKPInfo: (info: KPInfo[]) => void): Unsubscribe => {
  try {
    const kpRefs = ["eBooks", "journals", "reports"];
    const unsubscribes: Unsubscribe[] = [];

    const combinedFetchedInfo: KPInfo[] = [];

    kpRefs.forEach((kpRef) => {
      const collectionKPRef = collection(db, kpRef);
      const unsubscribe = onSnapshot(query(collectionKPRef), (snapshot) => {
        const fetchedKPInfo = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as KPInfo[];
        
        combinedFetchedInfo.push(...fetchedKPInfo);
      
        setKPInfo(combinedFetchedInfo);
      });
      unsubscribes.push(unsubscribe);
    });

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  } catch (error) {
    console.log("useFetchKPInfo Error: ", error)
    return () => {};
  }
};

export const useFetchUserInfo = (setUserInfo: (info: UserInfo[]) => void): Unsubscribe => {
  try {
    const collectionUserRef = collection(db, "userDownloads");
    const unsubscribe = onSnapshot(query(collectionUserRef), (snapshot) => {
      const fetchedUserInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserInfo[];
      
      setUserInfo(fetchedUserInfo);
    });

    return () => unsubscribe(); // Return the unsubscribe function
  } catch (error) {
    console.log("useFetchUserInfo Error: ", error);
    throw error; // Throw the error to be caught by the caller
  }
};
