import React, { useState } from "react";
import "./CreateFormModal.css";

const CreateFormModal = ({ closeModal, isLightTheme, onCreateForm }) => {
  const [formName, setFormName] = useState("");

  const handleDone = () => {
    onCreateForm(formName);
    setFormName(""); // Clear the input field
  };

  return (
    <div className={`modal-overlay ${isLightTheme ? "light" : "dark"}`}>
      <div className={`modal-container ${isLightTheme ? "light" : "dark"}`}>
        <h3 className="modal-title">Create New Form</h3>
        <input
          type="text"
          placeholder="Enter form name"
          className="modal-input"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="modal-button done" onClick={handleDone}>
            Done
          </button>
          <h3 className="bar">|</h3>
          <button className="modal-button cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFormModal;
