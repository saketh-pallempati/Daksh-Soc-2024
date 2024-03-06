import React, { useState } from "react";

export const XssPanel = () => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitMethod();
    }
  };

  const submitMethod = () => {
    console.log("Submit method called with value:", inputValue);
    setInputValue("");
    // Implement your submit logic here
  };

  return (
    <div className="attackMap-widget xss">
      <div className="widget-top">
        <div className="widget-top-text">Xss Panel</div>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="xss-text"
        placeholder="Type Somthing here"
      />
      <button className="dos">Dont</button>
      <button className="send">Send</button>
    </div>
  );
};
