import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const useFetchKP = () => {
    const fetchKP = async (id: string) => {
        const kpRefs = ["eBooks", "journals", "reports"];

        if (!id) {
            throw new Error("Invalid id provided");
        }

        try {
            for (const kpRef of kpRefs) {
                const docRef = doc(db, kpRef, id);
                const kp = await getDoc(docRef);

                if (kp.exists()) {
                    return kp.data();
                }
            }
            
            return null;
        } catch (e) {
            console.log("Error getting cached document:", e);
            return null;
        }
    }

    return { fetchKP };
}

export default useFetchKP;
