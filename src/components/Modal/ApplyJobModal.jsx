import Swal from "sweetalert2";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const ApplyJobModal = ({ isOpen, onClose, job }) => {
  const { title } = job;
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.value);
  };

  const handleApply = () => {
    // Simulating successful application
    Swal.fire({
      icon: "success",
      title: "Application Submitted!",
      text: "Your application has been successfully submitted.",
      confirmButtonText: "OK",
    }).then(() => {
      // Close the modal after the alert
      onClose();
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          aria-hidden="true"
        />

        {/* Modal Panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 md:w-1/2 border rounded-xl bg-white p-8">
            <DialogTitle className="font-bold text-lg">
              Apply Job : {title}{" "}
            </DialogTitle>

            {/* Resume Upload Section */}
            <Description className="font-semibold">Choose Resume</Description>
            <input
              type="file"
              name=""
              id=""
              accept=".pdf,.doc,.docx" // Accepts only PDF and DOC files
              onChange={handleResumeChange}
              className="w-full border rounded p-2"
            />

            {/* Cover Letter Section */}
            <Description className="font-semibold">Cover Letter</Description>
            <textarea
              name=""
              id=""
              rows="5"
              placeholder="Write down your biography here. Let the employers know who you are..."
              value={coverLetter}
              onChange={handleCoverLetterChange}
              className="w-full border rounded p-2"
            />

            {/* Action Buttons */}
            <div className="flex justify-between">
              {/* Cancel Button */}
              <button
                className="bg-blue-100 text-blue-500 font-bold px-4 py-2 rounded mr-2 "
                onClick={onClose}
              >
                Cancel
              </button>
              {/* Apply Button */}

              <button
                className={`flex items-center gap-3 px-6 py-3 rounded-md ${"bg-blue-700"} text-white`}
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
