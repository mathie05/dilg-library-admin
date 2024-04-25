import { useState } from "react";
import { useUploadInfo } from "../../hooks/useUploadInfo";
import Dropzone from "./Dropzone";

function UploadForm() {
  const { startUpload } = useUploadInfo();
  const [dropFile, setDropFile] = useState<File | null>(null);
  const [kpData, setKPData] = useState({
    title: "",
    author: "",
    publicationDate: "", // Change type to string
    kpType: "eBook",
    description: "",
  });

  const handleFileSelect = (file: File) => {
    setDropFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      dropFile,
      kpData.kpType,
      kpData.author,
      kpData.title,
      new Date(kpData.publicationDate)
    );
    if (dropFile) {
      await startUpload(
        {
          kp: dropFile,
          // cover: dropFile,
          type: kpData.kpType,
        },
        {
          title: kpData.title,
          author: kpData.author,
          datePublished: new Date(kpData.publicationDate),
          description: kpData.description,
          kpType: kpData.kpType,
        }
      );
      setDropFile(null);
    } else {
      console.log("Erorr");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setKPData({ ...kpData, [name]: value });
  };

  return (
    <>
      <Dropzone onFileSelect={handleFileSelect} />
      <section className="p-6 mx-auto bg-whiite rounded-md shadow-md dark:bg-gray-800 mt-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-black dark:text-gray-200">KP Title</label>
              <input
                type="text"
                name="title"
                value={kpData.title}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-black dark:text-gray-200">KP Author</label>
              <input
                type="text"
                name="author"
                value={kpData.author}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-black dark:text-gray-200">
                Publication Date
              </label>
              <input
                type="date"
                name="publicationDate"
                value={kpData.publicationDate}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-black dark:text-gray-200">
                Select KP Type
              </label>
              <select
                name="kpType"
                value={kpData.kpType}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="eBook">eBook</option>
                <option value="Journal">Journal</option>
                <option value="Report">Report</option>
              </select>
            </div>
            <div>
              <label className="text-black dark:text-gray-200">
                KP Description
              </label>
              <textarea
                id="description"
                name="description"
                value={kpData.description}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
            {/* Add cover image input */}
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Upload
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UploadForm;
