import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for styling
import "../../Styles/TextEditorTools/CustomReactQuill.css";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { useTranslation } from "react-i18next";

const ApplyJobModal = ({ isOpen, onClose, job, user, onApplicationSuccess }) => {
  const { t } = useTranslation(); // Initialize the translation hook
  const { title } = job;
  const jobID = job?._id;
  const [coverLetter, setCoverLetter] = useState(""); // Keep rich text
  
  // Convert to plain text
  const plainText = () => {
    const doc = new DOMParser().parseFromString(coverLetter, "text/html");
    const plainTextCoverLetter = doc.body.innerText || ""; // Extract plain text

    const application = {
      coverLetter: plainTextCoverLetter, // Use plain text here
      job_id: jobID,
      company_id: job?.company_id,
      user_email: user?.email,
    };

    return application;
  };

  const handleApply = async () => {
    const applicationData = plainText();

    // Send application data to the backend
    const { data } = await axiosSecure.post("/apply_job", applicationData);

    if (data?.insertedId !== null) {
      Swal.fire({
        icon: "success",
        title: t("Application Submitted!"), // Translated title
        text: t("Your application has been successfully submitted."), // Translated text
        confirmButtonText: t("OK"), // Translated button text
      }).then(() => {
        onClose(); // Close the modal after successful submission
      });
    } else {
      Swal.fire({
        icon: "error",
        title: t("Submission Failed"), // Translated title
        text: t("There was an error submitting your application."), // Translated text
        confirmButtonText: t("OK"), // Translated button text
      });
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 md:w-1/2 border rounded-xl bg-white p-8">
            <DialogTitle className="font-bold text-lg">
              {t("Apply Job")}: {title} {/* Translated title */}
            </DialogTitle>

            <Description className="font-semibold">{t("Cover Letter")}</Description> {/* Translated text */}
            <div className="quill-wrapper relative border rounded-lg">
              <ReactQuill
                value={coverLetter} // Keep rich text
                onChange={e => setCoverLetter(e)} // Update with rich text
                placeholder={t("Write your cover letter here...")} // Translated placeholder
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                  ],
                }}
                className="custom-quill-editor"
              />
            </div>

            <div className="flex justify-between">
              <button
                className="bg-blue-100 text-blue-500 font-bold px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                {t("Cancel")} {/* Translated button text */}
              </button>

              <button
                className="flex items-center gap-3 px-6 py-3 rounded-md bg-blue-700 text-white"
                onClick={handleApply}
              >
                {t("Apply now")} <FaArrowRight /> {/* Translated button text */}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ApplyJobModal;
