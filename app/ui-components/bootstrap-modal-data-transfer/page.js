"use client"; 
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function MyModal({ initialData, onClose, onSave }) {
  // The modal has its own local state to manage the data being edited
  const [tempData, setTempData] = useState(initialData);

  const handleSave = () => {
    // Call the parent’s onSave callback with updated data
    onSave(tempData);
  };

  return (
    // We manually toggle this "show" class and inline style 
    // to display the modal; if you prefer, you can use the actual 
    // Bootstrap JS or react-bootstrap for better handling of show/hide states
    <div
      className="modal show"
      style={{ display: "block" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">

          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">Edit Data</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              value={tempData}
              onChange={(e) => setTempData(e.target.value)}
            />
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [data, setData] = useState("Initial Data");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveData = (updatedData) => {
    // This function receives data from the Modal
    setData(updatedData);
    setShowModal(false);
  };

  return (
    <main className="container py-4">
      <h1>Next.js + React + Bootstrap 5.3.3</h1>

      {/* Display the data that we will pass to the modal */}
      <p>Current data: <strong>{data}</strong></p>

      {/* Button to open the modal */}
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Edit Data in Modal
      </button>

      {/* Conditionally render the Modal */}
      {showModal && (
        <MyModal
          initialData={data}
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
    </main>
  );
}
