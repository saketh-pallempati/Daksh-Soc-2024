import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import "./styles/XssPanel.css";
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

  const [clicks, setClicks] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const handleClick = () => {
    setClicks((prevClicks) => prevClicks + 1);
    if (clicks === 0) {
      setStartTime(Date.now());
    }
  };

  useEffect(() => {
    const fetchGameHit = async () => {
      if (clicks === 10) {
        if (Date.now() - startTime <= 3000) {
          try {
            const res = await axios.get("http://localhost:3000/game/hit");
            alert(res.data.message);
          } catch (err) {
            console.log(err);
          }
        }
        setClicks(0);
        setStartTime(null);
      }
    };
    fetchGameHit();
  }, [clicks, startTime]);

  return (
    <div className="attackMap-widget xss">
      <div className="widget-top">
        <div className="widget-top-text">Send commands</div>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="xss-text"
        placeholder="Type Somthing here"
      />
      <div className="buttons--container">
        <button className="AnimatedButton" onClick={handleClick}>
          Don't
        </button>
        <button className="AnimatedButton">Send</button>
      </div>
    </div>
  );
};
