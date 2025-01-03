import React from "react";

const Typebot = ({ workflow }) => {
  return (
    <div>
      <h2>Workflow Data</h2>
      <ul>
        {workflow.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Typebot;
