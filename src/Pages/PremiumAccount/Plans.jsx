import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'; 
import Payment from './Payment'; 

Modal.setAppElement('#root');

const Plans = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="">
      <h3 className="text-center text-2xl font-semibold text-gray-600 mb-4 mt-16">
        Choose Your Career Path with Our Premium Plan
      </h3>
      
      <div className="relative bg-white border border-blue-200 rounded-lg shadow-md p-4 overflow-hidden max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold text-blue-600">Premium Plan</h2>
        <p className="text-gray-600 mt-1">NEW features to get hired and get ahead</p>
        <hr className="my-4" />
        <ul className="space-y-2 text-gray-800">
          <li>• Career Roadmap Generator</li>
          <p className="text-gray-500 text-sm pl-4">
            A personalized path to your dream career. Get insights on skills, courses, and steps to reach your goals.
          </p>
        </ul>
        
        <div className="mt-4">
          <p className="text-xl font-bold text-blue-600">$49.99 <span className="text-gray-400 text-sm font-light">per month</span></p>
        </div>

        <button onClick={openModal} className="relative mt-6 py-2 px-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition duration-200 overflow-hidden">
          Purchase Now
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            style={{
              animation: "shine 2s infinite",
              transform: "translateX(-100%)",
            }}
          ></div>
        </button>

        <style>
          {`
            @keyframes shine {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}
        </style>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Payment Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
          <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
            <AiOutlineClose size={24} /> 
          </button>

          <h2 className="text-xl font-semibold text-gray-800">Payment</h2>
          <Payment />
        </div>
      </Modal>
    </div>
  );
};

export default Plans;
