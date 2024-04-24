import { useEffect, useState } from "react";
import UserTable from "../components/users/UserTable";
import { UserInfo } from "../types/interfaces";
import { useFetchUserInfo } from "../hooks/useFetchInfo";

function Users() {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchUserData = async () => {
      try {
        unsubscribe = useFetchUserInfo(setUserInfo);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchUserData();

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
          <UserTable info={userInfo} />
        </div>
      </div>
    </>
  );
}

export default Users;
