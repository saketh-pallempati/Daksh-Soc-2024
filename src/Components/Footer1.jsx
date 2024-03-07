import "./styles/Footer.css";
import { useState } from "react";
import { Counter } from "./Counter";
export const Footer = ({ onTimeSet }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);
  };

  const handleClick = () => {
    onTimeSet(minutes, seconds);
    console.log("Mins: ", minutes, "Secs: ", seconds);
  };
  return (
    <div className="tabFooter">
      <button className="terminal-btn">
        <img
          width="10px"
          height="10px"
          src="src\assets\img\alarm.png"
          alt="clock"
          onClick={handleClick}
        />
      </button>

      <button className="terminal-btn">
        <img
          width="10px"
          height="10px"
          src="src\assets\img\terminal.png"
          alt="Terminal"
        />
      </button>

      <input
        className="time"
        id="hrs"
        type="number"
        min="0"
        max="12"
        inputMode="numeric"
        pattern="[0-9]*"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        onChange={handleMinutesChange}
      />
      <input
        className="time"
        id="mins"
        type="number"
        min="0"
        max="59"
        inputMode="numeric"
        pattern="[0-9]*"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        onChange={handleSecondsChange}
      />
    </div>
  );
};
