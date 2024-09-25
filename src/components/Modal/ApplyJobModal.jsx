import Swal from "sweetalert2";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

const ApplyJobModal = ({ isOpen, onClose, job }) => {
  const {
    company_id,
    title,
    jobType,
    deadline,
    jobDescription,
    responsibilities,
  } = job;

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
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">
              Apply Job : {title}{" "}
            </DialogTitle>
            <Description>Choose Resume</Description>

            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.{" "}
            </p>
            <Description>Cover Letter</Description>
            <div className="flex gap-4">
              {/* Cancel Button */}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              {/* Apply Button */}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ApplyJobModal;
