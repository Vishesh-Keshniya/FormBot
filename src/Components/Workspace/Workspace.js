import React, { useState } from "react";
import "./Workspace.css";
import InputComp from "./Workflow-buttons/InputComp";
import ImageComp from "./Workflow-buttons/ImageComp";
import InputText from "./Workflow-buttons/InputText";
import InputNumber from "./Workflow-buttons/InputNumber";
import InputEmail from "./Workflow-buttons/InputEmail";
import InputDate from "./Workflow-buttons/InputDate";
import InputPhone from "./Workflow-buttons/InputPhone";
import InputButton from "./Workflow-buttons/InputButton";
import Response from "./Response";
import { useNavigate } from "react-router-dom";
import "./Workspacenavbar.css"; // Import Response CSS

const Workspace = () => {
  const [workflowItems, setWorkflowItems] = useState([]);
  const [isResponseVisible, setIsResponseVisible] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false); // State to handle Share visibility
  const navigate = useNavigate();

  const handleAddToWorkflow = (component) => {
    setWorkflowItems((prevItems) => [...prevItems, component]);
  };

  const handleDeleteItem = (index) => {
    setWorkflowItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const toggleTheme = () => {
    setIsLightTheme((prevState) => !prevState);
  };

  const showResponseComponent = () => {
    setIsResponseVisible(true);
  };

  const handleShareClick = () => {
    setIsShareVisible(true); // Set to true to show the shared component
  };

  if (isResponseVisible) {
    return <Response />;
  }

  return (
    <div className={`workspace-container-work ${isLightTheme ? "dark" : "light"}`}>
      <nav className="workspace-navwork">
        <div className="renamework">
          <input type="text" className="rename-inputwork" placeholder="Enter Form Name" />
        </div>

        <div className="mid-buttonwork">
          <button className="flow-buttonwork active">Flow</button>
          <button className="response-buttonwork" onClick={() => navigate("/response")}>
            Response
          </button>
        </div>

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
          <button className="share-from-buttonwork" onClick={handleShareClick}>Share</button>
          <button className="save-buttonwork">Save</button>
          <button className="close-buttonwork" onClick={() => navigate("/dashboard")}>
            <img src="close.png" alt="Close" />
          </button>
        </div>
      </nav>

      <div className="workspace-work">
        <div className="sidebar-work">
          <div className="section-work">
            <h3 className="section-title-work">Bubbles</h3>
            <div className="button-grid-work">
              <button
                className="tool-button-work"
                onClick={() => handleAddToWorkflow(<InputComp />)}
              >
                <img src="text.png" alt="Text" className="icon-work" /> Text
              </button>
              <button
                className="tool-button-work"
                onClick={() => handleAddToWorkflow(<ImageComp />)}
              >
                <img src="img.png" alt="Image" className="icon-work" /> Image
              </button>
              <button className="tool-button-work">
                <img src="video.png" alt="Video" className="icon-work" /> Video
              </button>
              <button className="tool-button-work">
                <img src="gif.png" alt="GIF" className="icon-work" /> GIF
              </button>
            </div>
          </div>
          <div className="section-work">
            <h3 className="section-title-work">Inputs</h3>
            <div className="button-grid-work">
              <button
                className="tool-button-work"
                onClick={() => handleAddToWorkflow(<InputText />)}
              >
                <img src="t.png" alt="Text" className="icon-work" /> Text
              </button>
              <button
                className="tool-button-work"
                onClick={() => handleAddToWorkflow(<InputNumber />)}
              >
                <img src="no.png" alt="Number" className="icon-work" /> Number
              </button>
              <button
                className="tool-button-work"
                onClick={() => handleAddToWorkflow(<InputEmail />)}
              >
                <img src="mail.png" alt="Email" className="icon-work" /> Email
              </button>
              <button
                className="tool-button-work"
                onClick={() => handleAddToWorkflow(<InputPhone />)}
              >
                <img src="ph.png" alt="Phone" className="icon-work" /> Phone
              </button>
              <button
                className="tool-button-work"
                onClick={() => handleAddToWorkflow(<InputDate />)}
              >
                <img src="date.png" alt="Date" className="icon-work" /> Date
              </button>
              <button
                className="tool-button-work"
                onClick={() => handleAddToWorkflow(<InputButton />)}
              >
                <img src="button.png" alt="Buttons" className="icon-work" /> Buttons
              </button>
            </div>
          </div>
        </div>

        <div className="main-panel-work">
          <ul className="workflow-list-work">
            <div className="start-button-work">
              <img src={isLightTheme ? "flag.png" : "flagb.png"} alt="Start" className="icon-work" /> Start
            </div>
            {workflowItems.map((item, index) => (
              <li key={index}>
                <div className="workflow-item">
                  
                  
                  {React.cloneElement(item, { onDelete: () => handleDeleteItem(index) })}

                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
