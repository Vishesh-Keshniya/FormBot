import React from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";


const Main = ({ onNavigateToLogin }) => {
  const navigate = useNavigate();  
  return (
    
    <div className="content">
      {/* Header */}
      <header className="header">
        <div className="main-content">
          <div className="images-container">
            <img src="try.png" alt="Logo" className="try" />
          </div>
          <div className="text-content">
            <h1>Build advanced chatbots <br /> visually</h1>
            <p>
              Typebot gives you powerful blocks to create unique chat experiences.
              Embed them <br /> anywhere on your web/mobile apps and start collecting
              results like magic.
            </p>
            <button className="create-btn" onClick={() => navigate("/login")}>Create a FormBot for free</button>
          </div>
          <div className="images-container">
            <img src="semi.png" alt="Logo" className="semi" />
          </div>
        </div>
      </header>

      {/* 3 images section */}
      <div className="image-section">
        <div className="left-image-container">
          <img src="orange.png" alt="Left" className="left-image" />
        </div>
        <div className="right-image-container">
          <img src="blue.png" alt="Right" className="right-image" />
        </div>
        <div className="center-image-container">
          <img src="sample.png" alt="Sample" className="image-overlay" /> {/* Image overlay */}
        </div>
      </div>
    </div>
  );
};

export default Main;
