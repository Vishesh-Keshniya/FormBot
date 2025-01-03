import React, { useState } from "react";
import "./ShareModal.css";

const ShareModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownText, setDropdownText] = useState("Edit"); // Track dropdown state (Edit or View)

  const handleEmailChange = (e) => setEmail(e.target.value);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSendInvite = () => {
    if (email) {
      alert(`Invite sent to ${email}`);
    } else {
      alert("Please enter a valid email.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://example.com/invite");
    alert("Link copied to clipboard!");
  };

  const handleDropdownItemClick = (mode) => {
    setDropdownText(mode); // Change dropdown text to "Edit" or "View"
    setDropdownOpen(false); // Close the dropdown after selection
  };

  if (!isOpen) return null;

  return (
    <div className="share-modal-overlay">
      <div className="share-modal">
        <div className="share-modal-header">
          <button className="close-button" onClick={onClose}>
            <img src="close.png" alt="Close" />
          </button>
        </div>
        <h3 className="share-modal-title">Invite by Email</h3>
        <div className="email-input-container">
          <div className="dropdown" onClick={toggleDropdown}>
            {dropdownText} ▼ {/* Show current dropdown text */}
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu-share">
              <div
                className="dropdown-item-share-edit"
                onClick={() => handleDropdownItemClick("Edit")} // Set dropdown to "Edit"
              >
                Edit
              </div>
              <div
                className="dropdown-item-share-view"
                onClick={() => handleDropdownItemClick("View")} // Set dropdown to "View"
              >
                View
              </div>
            </div>
          )}
        </div>

        {/* Always show the email input field */}
        <input
          type="email"
          placeholder="Enter email id"
          value={email}
          onChange={handleEmailChange}
          className="email-input"
        />

        <button className="send-invite-button" onClick={handleSendInvite}>
          Send Invite
        </button>

        <h3 className="share-modal-title">Invite by link</h3>
        <button className="copy-link-button" onClick={handleCopyLink}>
          Copy link
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
