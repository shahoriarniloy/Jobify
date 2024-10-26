import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next"; // Import useTranslation

const DragAndDropInput = ({ type, label, file, onFileUpload }) => {
  const { t } = useTranslation(); // Destructure useTranslation
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const logoSizeLimit = 3.5 * 1024 * 1024; // Limit for logo files (3.5 MB)
  const bannerSizeLimit = 4.3 * 1024 * 1024; // Limit for banner files (4.3 MB)

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles || acceptedFiles.length === 0) {
        setErrorMessage(t("no_file_selected"));
        onFileUpload(null);
        return;
      }

      const uploadedFile = acceptedFiles[0];
      const fileSizeLimit = type === "logo" ? logoSizeLimit : bannerSizeLimit;

      if (uploadedFile.size > fileSizeLimit) {
        setErrorMessage(
          t("file_size_exceeds", {
            maxSize: type === "logo" ? "3.5 MB" : "4.3 MB",
          })
        );
        onFileUpload(null);
        setPreview(null);
      } else {
        onFileUpload(uploadedFile);
        setErrorMessage("");
        setPreview(URL.createObjectURL(uploadedFile));
      }
    },
    [type, onFileUpload, t] // Added t to dependencies
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
    noClick: true,
  });

  // Set preview when file is updated
  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview); // Revoke URL to avoid memory leaks
      }
    };
  }, [file]);

  // Handle replace file button click
  const handleReplaceClick = () => {
    setPreview(null);
    onFileUpload(null);
    fileInputRef.current.click();
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-bold">{t(label)}</label>
      <div
        {...getRootProps()}
        className={`p-6 rounded-md cursor-pointer transition ${isDragActive ? "bg-black border-blue-400" : "bg-gray-200"
          }`}
        style={{ minHeight: "150px" }}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          {...getInputProps()}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto mt-2"
            style={{ maxHeight: "150px", objectFit: "cover" }}
          />
        ) : (
          <p className="text-gray-500">{t("drag_and_drop_message")}</p>
        )}
      </div>
      {file && (
        <button
          type="button"
          onClick={handleReplaceClick}
          className="text-blue-500 mt-2"
        >
          {t("replace")}
        </button>
      )}
    </div>
  );
};

export default DragAndDropInput;
