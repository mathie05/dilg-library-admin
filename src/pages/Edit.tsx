import EditForm from "../components/edit/EditForm";

function Edit() {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <EditForm />
        </div>
      </div>
    </>
  );
}

export default Edit;
