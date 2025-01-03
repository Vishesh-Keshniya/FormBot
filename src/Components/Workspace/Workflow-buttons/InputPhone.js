import React, { useState } from "react";
import "./InputComp.css";

const InputPhone = ({ onDelete }) =>  {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="container-btn">
      <button className="delete-btn" onClick={onDelete}>
        <img src="del.png" alt="Delete" />
      </button>
      <label htmlFor="input-box" className="label">
        Input Phone
      </label>
     <span className="msg">Hint : User will input a phone on his form</span>
    </div>
  );
};

export default InputPhone;
