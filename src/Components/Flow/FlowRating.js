import React, { useState } from "react";
import "./FlowRating.css";

const FlowRating = () => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
  };

  return (
    <div className="flow-rating">
      {[1, 2, 3, 4, 5].map((item, index) => (
        <div
          key={index}
          className={`circle ${selected === index ? "selected" : ""}`}
          onClick={() => handleSelect(index)}
        >
          {item}
        </div> 
      ))} <button className="FlowRating"><img src="send.png"></img></button>
    </div>
  );
};

export default FlowRating;
