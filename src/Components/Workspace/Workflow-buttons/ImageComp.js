import React, { useState } from "react";
import "./ImageComp.css";

const ImageComp = ({ onDelete }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="container-btn">
      <button className="delete-btn" >
        <img src="del.png" alt="Delete"  onClick={onDelete}/>
      </button>
      <label htmlFor="input-box" className="label">
        Image
      </label>
      <div
        className={`input-wrapper ${!inputValue && !isFocused ? "error" : ""}`}
      >
        
        <input
          id="input-box"
          type="text"
          className="input"
          placeholder="Click to add link"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {!inputValue && !isFocused && (
        <span className="error-message">Required Field</span>
      )}
    </div>
  );
};

export default ImageComp;
