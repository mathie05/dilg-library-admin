import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEosTgKtnHzbhdjo5NYSkd_OMITOm69U4",
  authDomain: "fir-storage-630b5.firebaseapp.com",
  projectId: "fir-storage-630b5",
  storageBucket: "fir-storage-630b5.appspot.com",
  messagingSenderId: "477538173797",
  appId: "1:477538173797:web:bb517246c21d80c137578c",
  measurementId: "G-6G8N192CXV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }