import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";

const DragAndDropInput = ({ type, label, file, onFileUpload }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const logoSizeLimit = 3.5 * 1024 * 1024; // 3.5 MB
  const bannerSizeLimit = 4.3 * 1024 * 1024; // 4.3 MB

  const onDrop = useCallback(
    (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      const fileSizeLimit = type === "logo" ? logoSizeLimit : bannerSizeLimit;

      if (uploadedFile.size > fileSizeLimit) {
        setErrorMessage(`File size exceeds the limit. Maximum allowed size is ${type === "logo" ? "3.5 MB" : "4.3 MB"}.`);
        onFileUpload(null);
        setPreview(null);
      } else {
        onFileUpload(uploadedFile);
        setErrorMessage("");
        setPreview(URL.createObjectURL(uploadedFile));
      }
    },
    [type, onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
    noClick: false, // Allow clicking on the drop area to open the file dialog
  });

  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [file, preview]);

  const handleReplaceClick = () => {
    setPreview(null); // Clear the preview
    onFileUpload(null); // Clear the uploaded file in the parent state
    fileInputRef.current.click(); // Open file input dialog
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-bold">{label}</label>
      <div
        {...getRootProps()}
        className={`p-6 rounded-md cursor-pointer transition ${isDragActive ? "bg-blue-100 border-blue-400" : "bg-gray-200"}`}

        style={{ minHeight: "150px" }}
        onClick={() => fileInputRef.current.click()} // Ensure the file input opens on click
      >
        <input {...getInputProps()} ref={fileInputRef} style={{ display: "none" }} />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-auto mt-2" style={{ maxHeight: "150px", objectFit: "cover" }} />
        ) : (
          <p className="text-gray-500">Drag and drop an image here, or click to select one</p>
        )}
      </div>
      {file && (
        <button type="button" onClick={handleReplaceClick} className="text-blue-500 mt-2">
          Replace
        </button>
      )}
    </div>
  );
};

export default DragAndDropInput;
