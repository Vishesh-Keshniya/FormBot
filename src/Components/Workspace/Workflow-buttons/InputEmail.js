import React, { useState } from "react";
import "./InputComp.css";

const InputEmail= ({ onDelete }) =>  {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="container-btn">
      <button className="delete-btn"onClick={onDelete}>
        <img src="del.png" alt="Delete" />
      </button>
      <label htmlFor="input-box" className="label">
        Input Email
      </label>
     <span className="msg">Hint : User will input a email on his form</span>
    </div>
  );
};

export default InputEmail;
