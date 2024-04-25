import { FormEvent, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { format } from "date-fns";

function EditForm() {
  const [kpId, setKpId] = useState("");
  const [kpTitle, setKpTitle] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [kpAuthor, setKpAuthor] = useState("");
  const [kpType, setKpType] = useState("");
  const [kpDescription, setKpDescription] = useState("");

  console.log(kpType, kpId, kpTitle);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTime: Date = new Date();
    const formattedTime: string = format(currentTime, "MM-dd-yy");

    try {
      await updateDoc(doc(db, kpType, kpId), {
        title: kpTitle,
        datePublished: publicationDate,
        author: kpAuthor,
        kpType: kpType,
        description: kpDescription,
        timeUploaded: formattedTime,
      });

      console.log("Document successfully updated!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <h2 className="mb-6 mt-20 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
        Edit Knowledge Products
      </h2>
      <section className="p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="kpId" className="text-black dark:text-gray-200">
                KP ID
              </label>
              <input
                id="kpId"
                type="text"
                autoComplete="off"
                value={kpId}
                onChange={(e) => setKpId(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label
                htmlFor="kpTitle"
                className="text-black dark:text-gray-200"
              >
                Current/New KP Title
              </label>
              <input
                id="kpTitle"
                type="text"
                autoComplete="off"
                value={kpTitle}
                onChange={(e) => setKpTitle(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label
                htmlFor="publicationDate"
                className="text-black dark:text-gray-200"
              >
                Current/New Publication Date
              </label>
              <input
                id="publicationDate"
                type="text"
                autoComplete="off"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label
                htmlFor="kpAuthor"
                className="text-black dark:text-gray-200"
              >
                Current/New KP Author
              </label>
              <input
                id="kpAuthor"
                type="text"
                autoComplete="off"
                value={kpAuthor}
                onChange={(e) => setKpAuthor(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label htmlFor="kpType" className="text-black dark:text-gray-200">
                Select Current/New KP Type
              </label>
              <select
                id="kpType"
                value={kpType}
                autoComplete="off"
                onChange={(e) => setKpType(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              >
                <option value="" disabled>
                  Select KP Type
                </option>
                <option value="eBooks">eBook</option>
                <option value="journals">Journal</option>
                <option value="reports">Reports</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="kpDescription"
                className="text-black dark:text-gray-200"
              >
                Current/New KP Description
              </label>
              <textarea
                id="kpDescription"
                autoComplete="off"
                value={kpDescription}
                onChange={(e) => setKpDescription(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Edit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditForm;
