import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./ResponseNavbar.css";

function ResponseNavbar() {
   const [isLightTheme, setIsLightTheme] = useState(false);
   const navigate = useNavigate();

   const toggleTheme = () => {
      setIsLightTheme((prevState) => !prevState);
   };

   return (
      <div className={`workspace-container-res ${isLightTheme ? "dark" : "light"}`}>
         <div className={`workspace-container-work-res ${isLightTheme ? "dark" : "light"}`}>
            <nav className="workspace-navwork-res">
               
               <div className="mid-buttonwork-res">
                  <button className="flow-buttonwork-res "  onClick={() => navigate("/workspace")}>Flow</button>
                  <button className="response-buttonwork-res active">Response</button>
               </div>
               <div className="rest-buttonswork-res">
                  <div className="theme-togglework-res">
                     <span>Light</span>
                     <label className="switchwork-res">
                        <input
                           type="checkbox"
                           checked={isLightTheme}
                           onChange={toggleTheme}
                        />
                        <span className="sliderwork-res"></span>
                     </label>
                     <span>Dark</span>
                  </div>
                  <button className="share-from-buttonwork-res">Share</button>
                  <button className="save-buttonwork-res">Save</button>
                  <button className="close-buttonwork-res" onClick={() => navigate("/dashboard")}>
                     <img src="close.png" alt="Close" />
                  </button>
               </div>
            </nav>
         </div>
      </div>
   );
}

export default ResponseNavbar;
