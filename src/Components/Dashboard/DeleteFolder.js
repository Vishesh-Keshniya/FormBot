import React from "react";


const DeleteFolder = ({ closeModal, isLightTheme, onConfirm }) => {
  return (
    <div className={`modal-overlay ${isLightTheme ? "light" : "dark"}`}>
      <div className={`modal-container ${isLightTheme ? "light" : "dark"}`}>
        <h3 className="modal-title">
          Are you sure you want to <br />
          delete this folder?
        </h3>

        <div className="modal-buttons">
          <button className="modal-button done" onClick={onConfirm}>
            Confirm
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

export default DeleteFolder;
