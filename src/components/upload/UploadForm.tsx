import { useEffect, useState } from "react";
import { useUploadInfo } from "../../hooks/useUploadInfo";

function UploadForm() {
  const { startUpload, kpProgress, coverProgress } = useUploadInfo();
  const [kpFile, setKPFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [kpData, setKPData] = useState({
    title: "",
    author: "",
    datePublished: "",
    kpType: "",
    description: "",
  });

  const handleKPFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setKPFile(file || null);
    // console.log("KP status: ", kpFile);
  };

  const handleCoverFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setCoverFile(file || null);
    // console.log("Cover status: ", coverFile);
  };

  useEffect(() => {
    console.log("KP status: ", kpFile);
  }, [kpFile]);

  useEffect(() => {
    console.log("Cover status: ", coverFile);
  }, [coverFile]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setKPData({ ...kpData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (kpFile && coverFile && kpData) {
      // startUpload(kpFile, coverFile);
      // console.log("Files uploaded:", kpFile, coverFile);
      startUpload(
        { kp: kpFile, cover: coverFile },
        {
          title: kpData.title,
          author: kpData.author,
          datePublished: kpData.datePublished,
          description: kpData.description,
          kpType: kpData.kpType,
        }
      );
      console.log(`KP upload progress: ${kpProgress}`);
      console.log(`Cover upload progress: ${coverProgress}`);
    } else {
      console.log("Please select both files and fill out the needed details.");
    }
    setKPFile(null);
    setCoverFile(null);
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
        Upload Knowledge Product
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          onChange={handleKPFile}
          accept=".pdf, .doc, .docx"
          required
        />
        <p
          className="mt-1 mb-20 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          PDF, DOC, or DOCX (Max. 100mb).
        </p>

        <section className="p-6 mx-auto bg-whiite rounded-md shadow-md dark:bg-gray-800 mt-10">
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-black dark:text-gray-200">KP Title</label>
              <input
                type="text"
                name="title"
                value={kpData.title}
                onChange={handleInputChange}
                required
                autoComplete="off"
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
                required
                autoComplete="off"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-black dark:text-gray-200">
                Publication Date
              </label>
              <input
                type="text"
                name="datePublished"
                value={kpData.datePublished}
                onChange={handleInputChange}
                required
                autoComplete="off"
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
                required
                autoComplete="off"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
              <label className="text-black dark:text-gray-200">
                KP Description
              </label>
              <textarea
                id="description"
                name="description"
                value={kpData.description}
                onChange={handleInputChange}
                required
                autoComplete="off"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                KP Cover Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-black"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-blue-600 rounded-md font-medium text-white hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="">Upload an image</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleCoverFile}
                        accept="image/*"
                        autoComplete="off"
                      />
                    </label>
                    <p className="pl-1 text-black">or Drag and Drop</p>
                  </div>
                  <p className="text-xs text-black">
                    PNG, JPG, or JPEG (Max. 10mb)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Upload
            </button>
          </div>
        </section>
      </form>

      {/* <section className="p-6 mx-auto bg-whiite rounded-md shadow-md dark:bg-gray-800 mt-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-black dark:text-gray-200">KP Title</label>
              <input
                type="text"
                name="title"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-black dark:text-gray-200">KP Author</label>
              <input
                type="text"
                name="author"
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-black dark:text-gray-200">
                Select KP Type
              </label>
              <select
                name="kpType"
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
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
      </section> */}
    </>
  );
}

export default UploadForm;
