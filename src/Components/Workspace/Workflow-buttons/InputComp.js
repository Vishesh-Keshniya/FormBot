import React, { useState } from "react";
import "./InputComp.css";

const InputComp = ({ onDelete }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="container-btn">
      <button className="delete-btn">
        <img src="del.png" alt="Delete" onClick={onDelete}/>
      </button>
      <label htmlFor="input-box" className="label">
        Text
      </label>
      <div
        className={`input-wrapper ${!inputValue && !isFocused ? "error" : ""}`}
      >
        <div className="icon">
          <img src="text.png" alt="Icon" />
        </div>
        <input
          id="input-box"
          type="text"
          className="input"
          placeholder="Click here to edit"
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

export default InputComp;
