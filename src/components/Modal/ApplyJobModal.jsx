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

const ApplyJobModal = ({
  isOpen,
  onClose,
  job,
  user,
  onApplicationSuccess,
}) => {
  const { title } = job;
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(""); // Keep rich text

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleCoverLetterChange = (value) => {
    setCoverLetter(value); // Store rich text
  };

  const handleApply = async () => {
    // Convert rich text to plain text before submitting
    const doc = new DOMParser().parseFromString(coverLetter, "text/html");
    const plainTextCoverLetter = doc.body.innerText || ""; // Extract plain text

    const application = {
      coverLetter: plainTextCoverLetter, // Use plain text here
      job_id: job?._id,
      company_id: job?.company_id,
      user_email: user?.email,
    };

    try {
      // Send application data to the backend
      const response = await axiosSecure.post("/apply_job", application);
      console.log(response.data.data.acknowledged);

      if (response.data.data.acknowledged) {
        // Call the onApplicationSuccess callback to update the application status
        onApplicationSuccess();

        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application has been successfully submitted.",
          confirmButtonText: "OK",
        }).then(() => {
          onClose(); // Close the modal after successful submission
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "There was an error submitting your application.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your application.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 md:w-1/2 border rounded-xl bg-white p-8">
            <DialogTitle className="font-bold text-lg">
              Apply Job : {title}{" "}
            </DialogTitle>

            {/* Resume upload can be uncommented if needed */}
            {/* <Description className="font-semibold">Choose Resume</Description>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="w-full border rounded p-2"
            /> */}

            <Description className="font-semibold">Cover Letter</Description>
            <div className="quill-wrapper relative border rounded-lg">
              <ReactQuill
                value={coverLetter} // Keep rich text
                onChange={handleCoverLetterChange} // Update with rich text
                placeholder="Write your cover letter here..."
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
                Cancel
              </button>

              <button
                className={`flex items-center gap-3 px-6 py-3 rounded-md bg-blue-700 text-white`}
                onClick={handleApply}
              >
                Apply now <FaArrowRight />
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ApplyJobModal;
