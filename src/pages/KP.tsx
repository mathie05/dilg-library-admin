import { useEffect, useState } from "react";
import KPTable from "../components/kp/KPTable";
import { KPInfo } from "../types/interfaces";
import { useFetchKPInfo } from "../hooks/useFetchInfo";
import EditForm from "../components/kp/EditForm";

function KP() {
  const [KPInfo, setKPInfo] = useState<KPInfo[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchKPData = async () => {
      try {
        unsubscribe = useFetchKPInfo(setKPInfo);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchKPData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <KPTable info={KPInfo} />
          <EditForm />
        </div>
      </div>
    </>
  );
}

export default KP;
