import "./Dashboard.css";
import axios from "axios";
import CreateFolderModal from "./CreateFolderModal";
import CreateFormModal from "./CreateFormModal";
import DeleteFolder from "./DeleteFolder";
import DeleteForm from "./DeleteForm";
import Settings from "./Settings";
import ShareModal from "./ShareModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard =  ( { onFormListClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [username, setUsername] = useState("");
  const [activeFolderIndex, setActiveFolderIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteFormModalOpen, setIsDeleteFormModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();


  
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const response = await axios.get("https://server-txml.onrender.com/username", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsername(response.data?.username || "");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get("https://server-txml.onrender.com/api/folders");
        setFolders(response.data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };
    fetchFolders();
  }, []);

  useEffect(() => {
    const fetchForms = async () => {
      if (activeFolderIndex !== null) {
        const folderId = folders[activeFolderIndex]._id;
        try {
          const response = await axios.get(`https://server-txml.onrender.com/api/forms/${folderId}`);
          setForms(response.data);
        } catch (error) {
          console.error("Error fetching forms:", error);
        }
      }
    };
    fetchForms();
  }, [activeFolderIndex, folders]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleCreateFolder = async (folderName) => {
    if (folderName.trim()) {
      try {
        const response = await axios.post("https://server-txml.onrender.com/api/folders", { name: folderName.trim() });
        setFolders((prevFolders) => [...prevFolders, response.data]);
      } catch (error) {
        if (error.response?.status === 409) {
          alert("Folder name must be unique.");
        } else {
          console.error("Error creating folder:", error);
          alert("Failed to create folder. Please try again.");
        }
      }
    }
    closeModal();
  };

  const handleCreateForm = async (formName) => {
    if (formName.trim()) {
      try {
        let response;
        if (activeFolderIndex !== null) {
          const folderId = folders[activeFolderIndex]._id;
          response = await axios.post("https://server-txml.onrender.com/api/forms", {
            name: formName.trim(),
            folderId,
          });
  
          setFolders((prevFolders) => {
            const updatedFolders = [...prevFolders];
            updatedFolders[activeFolderIndex].forms.push(response.data);
            return updatedFolders;
          });
        } else {
          // Create the form globally if no folder is selected
          response = await axios.post("https://server-txml.onrender.com/api/forms", {
            name: formName.trim(),
          });
  
          // Add it to global form list
          setForms((prevForms) => [...prevForms, response.data]);
        }
      } catch (error) {
        console.error("Error creating form:", error);
        alert("Failed to create form. Please try again.");
      }
    }
    closeModal();
  };
  

  const toggleTheme = () => setIsLightTheme((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const openDeleteFolderModal = (index) => {
    setActiveFolderIndex(index); // Store the folder index to delete
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const openDeleteFormModal = (index) => {
    setActiveFolderIndex(index); // Store the form index to delete
    setIsDeleteFormModalOpen(true); // Open the delete confirmation modal
  };

  const closeDeleteFolderModal = () => setIsDeleteModalOpen(false);
  const closeDeleteFormModal = () => setIsDeleteFormModalOpen(false);

  const confirmDeleteFolder = async () => {
    if (activeFolderIndex !== null) {
      try {
        await axios.delete(`https://server-txml.onrender.com/api/folders/${folders[activeFolderIndex]._id}`); // Make API call to delete the folder
        setFolders((prevFolders) => prevFolders.filter((_, i) => i !== activeFolderIndex)); // Update the front-end state
      } catch (error) {
        console.error("Error deleting folder:", error);
      }
    }
    closeDeleteFolderModal(); // Close the modal after deletion
  };

  const confirmDeleteForm = async () => {
    if (activeFolderIndex !== null) {
      try {
        const formId = folders[activeFolderIndex]?.forms[activeFolderIndex]?._id; // Get the form ID
        await axios.delete(`https://server-txml.onrender.com/api/forms/${formId}`); // Make API call to delete the form
        setFolders((prevFolders) => {
          const updatedFolders = [...prevFolders];
          updatedFolders[activeFolderIndex].forms = updatedFolders[activeFolderIndex].forms.filter(
            (form) => form._id !== formId
          ); // Remove the form from the front-end state
          return updatedFolders;
        });
      } catch (error) {
        console.error("Error deleting form:", error);
      }
    }
    closeDeleteFormModal(); // Close the modal after deletion
  };

  const toggleFolderVisibility = async (index) => {
    setActiveFolderIndex(activeFolderIndex === index ? null : index);
    if (activeFolderIndex !== index) {
      try {
        const folderId = folders[index]._id;
        const response = await axios.get(`https://server-txml.onrender.com/api/forms/${folderId}`);
        setFolders((prevFolders) => {
          const updatedFolders = [...prevFolders];
          updatedFolders[index].forms = response.data;
          return updatedFolders;
        });
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    }
  };

  return (
    <div className={`dashboard-container ${isLightTheme ? "light" : "dark"}`}>
      {isSettingsOpen ? (
        <Settings closeSettings={() => setIsSettingsOpen(false)} />
      ) : (
        <>
          <nav className="navbar">
            <div className="logo"></div>
            <div className="workspace-container">
              <button className="workspace-button" onClick={toggleDropdown}>
                <span>{username ? `${username}'s workspace` : "Loading..."}</span>
                <img className="dropdown-icon" src="drop.png" alt="Dropdown Icon" />
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => navigate("/settings")}>
                    Settings
                  </button>
                  <button className="dropdown-item logout" onClick={() => navigate("/")}>Log Out</button>
                </div>
              )}
            </div>
            <div className="theme-toggle">
              <span>Light</span>
              <label className="switch">
                <input type="checkbox" checked={!isLightTheme} onChange={toggleTheme} />
                <span className="slider"></span>
              </label>
              <span>Dark</span>
            </div>
            <button className="share-button" onClick={() => setIsShareModalOpen(true)}>
  Share
</button>

{isShareModalOpen && <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />}
          </nav>

          <div className="Dashboard-content">
            <ul className="Create-folder-list">
              <li>
                <button
                  className={`create-folder ${activeFolderIndex !== null ? "hidden" : ""}`}
                  onClick={() => openModal("folder")}
                >
                  <img src="folder.png" className="folder" alt="Folder" />
                  Create a folder
                </button>
              </li>
              <li>
                <button
                  className={`create-typebot ${activeFolderIndex !== null ? "" : "hidden"}`}
                  onClick={() => openModal("form")}
                >
                  <p>
                    <span className="plus">+</span> <br />
                    Create a typebot
                  </p>
                </button>
              </li>
            </ul>

            <ul className="Create-form-list">
              <li className="folder-list-li">
                <div className="folder-list">
                  {folders.map((folder, index) => (
                    <div
                      key={folder._id}
                      className={`folder-item ${activeFolderIndex === index ? "active-folder" : ""}`}
                    >
                      <span onClick={() => toggleFolderVisibility(index)}>{folder.name}</span>
                      <button
                        className="delete-button"
                        onClick={() => openDeleteFolderModal(index)}
                      >
                        <img src="del.png" alt="Delete" />
                      </button>
                    </div>
                  ))}
                </div>
                {/* {activeFolderIndex !== null && (
                  <ul className="form-list">
                    {folders[activeFolderIndex]?.forms.map((form, idx) => (
                      <div key={form._id} className="form-item">
                        <span>{form.name}</span>
                        <button
                          className="delete-button-form"
                          onClick={() => openDeleteFormModal(idx)}
                        >
                          <img src="del.png" className="del-form" alt="Delete" />
                        </button>
                      </div>
                    ))}
                  </ul>
                  
                )} */}
              </li>
              {activeFolderIndex === null ? (
  <li className="form-li">
    <div className="form-list">
      {forms.length === 0 ? (
        <span></span>
      ) : (
        forms.map((form, index) => (
          <button key={index} className="form-item" onClick={() => navigate("/workspace")}>
            <span>{form.name}</span>
            <button
              className="delete-button-form"
              onClick={() => openDeleteFormModal(index)}
            >
              <img src="del.png" className="del-form" alt="Delete" />
            </button>
          </button>
        ))
      )}
    </div>
  </li>
) : (
  <li className="folder-forms-li">
    <div className="folder-forms-list">
      {folders[activeFolderIndex]?.forms.map((form, index) => (
        <button key={index} className="form-item" onClick={() => navigate("/workspace")}>
          <span>{form.name}</span>
          <button
            className="delete-button-form"
            onClick={() => openDeleteFormModal(index)}
          >
            <img src="del.png" className="del-form" alt="Delete" />
          </button>
        </button>
      ))}
    </div>
  </li>
)}

            </ul>
          </div>

          {isModalOpen && modalType === "folder" && (
            <CreateFolderModal closeModal={closeModal} onCreateFolder={handleCreateFolder} />
          )}
          {isModalOpen && modalType === "form" && (
            <CreateFormModal closeModal={closeModal} onCreateForm={handleCreateForm} />
          )}

          {isDeleteModalOpen && (
            <DeleteFolder closeModal={closeDeleteFolderModal} confirmDeleteFolder={confirmDeleteFolder} />
          )}

          {isDeleteFormModalOpen && (
            <DeleteForm closeModal={closeDeleteFormModal} confirmDeleteForm={confirmDeleteForm} />
          )}

          {isShareModalOpen && <ShareModal closeShareModal={() => setIsShareModalOpen(false)} />}
        </>
      )}
    </div>
  );
};

export default Dashboard;
