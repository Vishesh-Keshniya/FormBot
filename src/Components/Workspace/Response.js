import React, { useState } from 'react';

import ResponseNavbar from "./ResponseNavbar"; // Assuming ResponseNavbar exists
import "./Response.css";
import "./ResponseNavbar.css"; // Updated CSS file name


function Response() {
     const [isLightTheme, setIsLightTheme] = useState(false);
  
  const toggleTheme = () => {
    setIsLightTheme((prevState) => !prevState);
 };
  return (
    <div>
      <ResponseNavbar />
      <div className= {`response-container ${isLightTheme ? "light" : "dark"}`}>
        <span className="response-text">No Response yet collected</span>
      </div>
    </div>
  );
}

export default Response;
