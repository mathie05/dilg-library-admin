// interface DropzoneProps {
//   onFileSelect: (file: File) => void;
// }

// function Dropzone({ onFileSelect }: DropzoneProps) {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       onFileSelect(file);
//     }
//   };

//   return (
//     <>
//       <h2 className="mb-6 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
//         Upload Knowledge Product
//       </h2>

//       <input
//         className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//         aria-describedby="file_input_help"
//         id="file_input"
//         type="file"
//         onChange={handleFileChange}
//       />
//       <p
//         className="mt-1 text-sm text-gray-500 dark:text-gray-300"
//         id="file_input_help"
//       >
//         SVG, PNG, JPG or GIF (MAX. 800x400px).
//       </p>
//     </>
//   );
// }

// export default Dropzone;
