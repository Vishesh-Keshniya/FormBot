import React, { useState } from "react";
import "./InputComp.css";

const InputButton= ({ onDelete }) =>  {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="container-btn">
      <button className="delete-btn" >
        <img src="del.png" alt="Delete" onClick={onDelete} />
      </button>
      <label htmlFor="input-box" className="label">
        Input Button
      </label>
      <div
        className={`input-wrapper ${!inputValue && !isFocused ? "error" : ""}`}
      >
       
        <input
          id="input-box"
          type="text"
          className="input"
          
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      
    </div>
  );
};

export default InputButton;
