import React, { useState } from "react";
import Modal from "react-modal";

const PopUpModel = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => setIsOpen(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        className="fixed z-10 inset-0 overflow-y-auto"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
        resetModel={isOpen}
      >
        <div className="relative bg-white rounded-lg w-96 mx-auto p-6">
          <h1 className="text-xl font-bold mb-4">Modal Title</h1>
          <p className="text-gray-600">
            This is the content of the modal. You can customize it as per your
            requirements.
          </p>
          <button
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PopUpModel;
