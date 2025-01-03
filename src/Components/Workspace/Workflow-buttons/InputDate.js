import React, { useState } from "react";
import "./InputComp.css";

const InputDate = ({ onDelete }) =>  {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="container-btn">
      <button className="delete-btn" onClick={onDelete}>
        <img src="del.png" alt="Delete" />
      </button>
      <label htmlFor="input-box" className="label">
        Input Date
      </label>
     <span className="msg">Hint : User will select a date</span>
    </div>
  );
};

export default InputDate;
