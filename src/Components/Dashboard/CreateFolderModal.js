import React, { useState } from "react";
import "./CreateFolderModal.css";

const CreateFolderModal = ({ closeModal, isLightTheme, onCreateFolder }) => {
  const [folderName, setFolderName] = useState("");

  const handleCreate = () => {
    onCreateFolder(folderName);
  };

  return (
    <div className={`modal-overlay ${isLightTheme ? "light" : "dark"}`}>
      <div className={`modal-container ${isLightTheme ? "light" : "dark"}`}>
        <h3 className="modal-title">Create New Folder</h3>
        <input
          type="text"
          placeholder="Enter folder name"
          className="modal-input"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="modal-button done" onClick={handleCreate}>
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

export default CreateFolderModal;
