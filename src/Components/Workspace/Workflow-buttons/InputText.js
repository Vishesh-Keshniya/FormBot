import React, { useState } from "react";
import "./InputComp.css";

const InputText = ({ onDelete }) => { // Destructure onDelete from props
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="container-btn">
      <button className="delete-btn" onClick={onDelete}>
        <img src="del.png" alt="Delete" />
      </button>
      <label htmlFor="input-box" className="label">
        Input Text
      </label>
      <span className="msg">Hint: User will input a text on his form</span>
    </div>
  );
};


export default InputText;
