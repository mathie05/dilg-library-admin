import UploadForm from "../components/upload/UploadForm";

function Upload() {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <UploadForm />
        </div>
      </div>
    </>
  );
}

export default Upload;
