import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import "./styles/XssPanel.css";
axios.defaults.withCredentials = true;
export const XssPanel = ({ inputValue, setInputValue, submitMethod }) => {
  const submitClick = async () => {
    try {
      const response = await axios.post("https://daksh-soc-backend.vercel.app/game/check", {
        comment: inputValue,
      });
      console.log(response.data);
      alert("Check cookies");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitMethod();
    }
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
            const res = await axios.get("https://daksh-soc-backend.vercel.app/game/hit");
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
        <button className="AnimatedButton" onClick={submitClick}>
          Send
        </button>
      </div>
    </div>
  );
};
