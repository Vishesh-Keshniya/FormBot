import React, { useState } from "react";
import Response from "./Response"; // Import the Response component
import "./Workspacenavbar.css"; // Updated CSS file name

const Workspacenavbar = () => {
  const [isResponseVisible, setIsResponseVisible] = useState(false); // State to track Response visibility
  const [isLightTheme, setIsLightTheme] = useState(false); // State for theme toggle

  const toggleTheme = () => {
    setIsLightTheme((prevState) => !prevState);
  };

  const showResponseComponent = () => {
    setIsResponseVisible(true); // Set state to true to show the Response component
  };

  if (isResponseVisible) {
    return <Response />; // Render Response component when state is true
  }

  return (
    <nav className="workspace-navwork">
      {/* Form Name Input */}
      <div className="renamework">
        <input
          type="text"
          className="rename-inputwork"
          placeholder="Enter Form Name"
        />
      </div>

      {/* Mid Section Buttons */}
      <div className="mid-buttonwork">
        <button className="flow-buttonwork active">Flow</button>
        <button className="response-buttonwork" onClick={showResponseComponent}>
          Response
        </button>
      </div>

      {/* Right Side Buttons */}
      <div className="rest-buttonswork">
        <div className="theme-togglework">
          <span>Light</span>
          <label className="switchwork">
            <input
              type="checkbox"
              checked={isLightTheme}
              onChange={toggleTheme}
            />
            <span className="sliderwork"></span>
          </label>
          <span>Dark</span>
        </div>
        <button className="share-from-buttonwork">Share</button>
        <button className="save-buttonwork">Save</button>
        <button className="close-buttonwork">
          <img src="close.png" alt="Close" />
        </button>
      </div>
    </nav>
  );
};

export default Workspacenavbar;
