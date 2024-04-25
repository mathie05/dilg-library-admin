import { useState } from "react";
import { KPInfo, KPTableProps } from "../../types/interfaces";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { format } from "date-fns";

const KPTable: React.FC<KPTableProps> = ({ info }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [documentIdToDelete, setDocumentIdToDelete] = useState<string>("");
  const [documentRefToDelete, setdocumentRefToDelete] = useState<string>("");

  const currentTime: Date = new Date();
  const formattedTime: string = format(currentTime, "MM-dd-yy");

  console.log(typeof formattedTime);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredInfo = info.filter((item: KPInfo) => {
    const searchText = searchQuery.toLowerCase();

    return Object.values(item).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(searchText)
    );
  });

  const deleteDocument = async () => {
    try {
      if (documentIdToDelete) {
        await deleteDoc(doc(db, documentRefToDelete, documentIdToDelete));
        window.location.reload();
        console.log("Document successfully deleted!");
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
    setModalVisible(false);
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
        Knowledge Products
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="ml-2 pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for Knowledge Products..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="h-24 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-12 py-3 text-center">
                KP ID
              </th>
              <th scope="col" className="px-12 py-3 text-center">
                KP Title
              </th>
              <th scope="col" className="px-2 py-3 text-center">
                KP Type
              </th>
              <th scope="col" className="px-36 py-3 text-center">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Publication Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Author
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Time Uploaded
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInfo.map((item: KPInfo, index: number) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  key={index}
                  scope="row"
                  className="px-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap text-center"
                >
                  {item.id}
                </th>
                <th
                  scope="row"
                  className="px-12 py-12 font-medium text-gray-900 dark:text-white whitespace-nowrap text-center"
                >
                  {item.title}
                </th>
                <td className="px-6 py-4 text-center">{item.kpType}</td>
                <td className="px-6 py-4 line-clamp-5 overflow-y-auto text-justify">
                  {item.description}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {item.datePublished}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {item.author}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {item.timeUploaded}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-center"
                    onClick={(event) => {
                      event.preventDefault();
                      setDocumentIdToDelete(item.id);
                      setdocumentRefToDelete(item.kpType);
                      setModalVisible(true);
                    }}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        id="popup-modal"
        tabIndex={-1}
        className={`${
          modalVisible ? "flex" : "hidden"
        } fixed inset-0 overflow-y-auto justify-center items-center bg-gray-800 bg-opacity-50 z-50`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this KP?
              </h3>
              <button
                onClick={deleteDocument}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setModalVisible(false)}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KPTable;
