import { KPTableProps } from "../../types/interfaces";

const KPTable: React.FC<KPTableProps> = ({ info }) => {
  return (
    <>
      <h2 className="mb-6 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
        Knowledge Products
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900">
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
              placeholder="Search for items"
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
                Action 1
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action 2
              </th>
            </tr>
          </thead>
          <tbody>
            {info.map((item, index) => (
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
                  Fix the Date
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {item.author}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-center"
                  >
                    Edit
                  </a>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-center"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default KPTable;
