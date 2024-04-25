import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase/config";
import { DeleteProps } from "../types/interfaces";

export const useDelete = () => {
    const deleteFilesByDownloadURLs = async (props: DeleteProps) => {
        try {
          console.log(`kp/${props.kpType}/${props.kpName}`)
          console.log(`cover/${props.kpType}/${props.coverName}`)
          
          const kpRef = ref(storage, `kp/${props.kpType}/${props.kpName}`);
          const coverRef = ref(storage, `cover/${props.kpType}/${props.coverName}`);

          await deleteObject(kpRef)
          await deleteObject(coverRef)
          } catch (error) {
          console.error("Error deleting files:", error);
        }
      };
  
  
    return {
        deleteFilesByDownloadURLs
    }
}