import React, { useState } from "react";
import "./Dashboard.css";
import CreateFolderModal from "./CreateFolderModal";
import CreateFormModal from "./CreateFormModal";
import DeleteFolder from "./DeleteFolder";
import DeleteForm from "./DeleteForm";
import Settings from "./Settings";
import ShareModal from "./ShareModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]); // Global forms
  const [deleteFolderIndex, setDeleteFolderIndex] = useState(null);
  const [deleteFormIndex, setDeleteFormIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteFormModalOpen, setIsDeleteFormModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeFolderIndex, setActiveFolderIndex] = useState(null); // State for active folder

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleCreateFolder = (folderName) => {
    if (folderName.trim()) {
      const isDuplicate = folders.some(folder => folder.name === folderName.trim());
      if (isDuplicate) {
        alert("Folder name must be unique.");
        return;
      }
      setFolders([...folders, { name: folderName.trim(), forms: [] }]);
    }
    closeModal();
  };

  const handleCreateForm = (formName, folderIndex = null) => {
    if (formName.trim()) {
      if (folderIndex !== null) {
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].forms.push(formName.trim());
        setFolders(updatedFolders);
      } else {
        setForms([...forms, formName.trim()]);
      }
    }
    closeModal();
  };

  const toggleTheme = () => {
    setIsLightTheme((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleDeleteFolder = (index) => {
    const updatedFolders = folders.filter((_, i) => i !== index);
    setFolders(updatedFolders);
  };

  const handleDeleteForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
  };

  const openDeleteFolderModal = (index) => {
    setDeleteFolderIndex(index);
    setIsDeleteModalOpen(true);
  };

  const openDeleteFormModal = (index) => {
    setDeleteFormIndex(index);
    setIsDeleteFormModalOpen(true);
  };

  const closeDeleteFolderModal = () => {
    setDeleteFolderIndex(null);
    setIsDeleteModalOpen(false);
  };

  const closeDeleteFormModal = () => {
    setDeleteFormIndex(null);
    setIsDeleteFormModalOpen(false);
  };

  const confirmDeleteFolder = () => {
    if (deleteFolderIndex !== null) {
      handleDeleteFolder(deleteFolderIndex);
    }
    closeDeleteFolderModal();
  };

  const confirmDeleteForm = () => {
    if (deleteFormIndex !== null) {
      handleDeleteForm(deleteFormIndex);
    }
    closeDeleteFormModal();
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  // Toggle the active folder index
  const toggleFolderVisibility = (index) => {
    setActiveFolderIndex(activeFolderIndex === index ? null : index);
  };

  return (
    <div className={`dashboard-container ${isLightTheme ? "light" : "dark"}`}>
      {isSettingsOpen ? (
        <Settings closeSettings={closeSettings} />
      ) : (
        <>
          <nav className="navbar">
            <div className="logo"></div>
            <div className="workspace-container">
              <button className="workspace-button" onClick={toggleDropdown}>
                <span>Dewank Rastogi's workspace</span>
                <img className="dropdown-icon" src="drop.png" alt="Dropdown Icon" />
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={openSettings}>Settings</button>
                  <button className="dropdown-item logout">Log Out</button>
                </div>
              )}
            </div>

            <div className="theme-toggle">
              <span>Light</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!isLightTheme}
                  onChange={toggleTheme}
                />
                <span className="slider"></span>
              </label>
              <span>Dark</span>
            </div>
            <button className="share-button" onClick={openShareModal}>
              Share
            </button>
          </nav>

          <div className="Dashboard-content">
            {/* Create Folder Section */}
            <ul className="Create-folder-list">
              <li>
                <button className="create-folder" onClick={() => openModal("folder")}>
                  <img src="folder.png" className="folder" alt="Folder" />
                  Create a folder
                </button>
              </li>
              <li>
                <div className="folder-list">
                  {folders.map((folder, index) => (
                    <div key={index} className="folder-item">
                      <span onClick={() => toggleFolderVisibility(index)}>{folder.name}</span>
                      <button
                        className="delete-button"
                        onClick={() => openDeleteFolderModal(index)}
                      >
                        <img src="del.png" alt="Delete" />
                      </button>
                      {/* Show form list only for the active folder */}
                      {activeFolderIndex === index && (
                        <ul className="form-list">
                          {folder.forms.map((form, idx) => (
                            <div key={idx} className="form-item">
                              <span>{form}</span>
                              <button
                                className="delete-button-form"
                                onClick={() => openDeleteFormModal(idx)}
                              >
                                <img src="del.png" className="del-form" alt="Delete" />
                              </button>
                            </div>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </li>
            </ul>

            {/* Create Typebot Section */}
            <ul className="Create-form-list">
              <li>
                <button className="create-typebot" onClick={() => openModal("form")}>
                  <p>
                    <span className="plus">+</span> <br />
                    Create a typebot
                  </p>
                </button>
              </li>
              <li className="form-li">
                <div className="form-list">
                  {forms.map((form, index) => (
                    <div key={index} className="form-item">
                      <span>{form}</span>
                      <button
                        className="delete-button-form"
                        onClick={() => openDeleteFormModal(index)}
                      >
                        <img src="del.png" className="del-form" alt="Delete" />
                      </button>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {isModalOpen && modalType === "folder" && (
            <CreateFolderModal
              closeModal={closeModal}
              isLightTheme={isLightTheme}
              onCreateFolder={handleCreateFolder}
            />
          )}
          {isModalOpen && modalType === "form" && (
            <CreateFormModal
              closeModal={closeModal}
              isLightTheme={isLightTheme}
              onCreateForm={handleCreateForm}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteFolder
              closeModal={closeDeleteFolderModal}
              isLightTheme={isLightTheme}
              onConfirm={confirmDeleteFolder}
            />
          )}
          {isDeleteFormModalOpen && (
            <DeleteForm
              closeModal={closeDeleteFormModal}
              isLightTheme={isLightTheme}
              onConfirm={confirmDeleteForm}
            />
          )}
          {isShareModalOpen && (
            <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
