import React, { useState } from "react";
import "./styles/Knob.css";

const Knob = ({ value, onChange }) => {
  const [angle, setAngle] = useState(value);

  const handleKnobChange = (event) => {
    const newValue = parseInt(event.target.value, 10);

    // Ensure the value is a positive integer within the range [0, 360]
    if (
      !isNaN(newValue) &&
      newValue >= 0 &&
      Number.isInteger(newValue) &&
      newValue <= 360
    ) {
      onChange(newValue);
      setAngle(newValue);
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY;
    const sensitivity = 1; // Adjust this value based on how fast you want the knob to rotate on wheel scroll

    const newAngle = (angle - delta * sensitivity + 360) % 360;
    setAngle(newAngle);

    // Update the input field value based on the calculated angle
    const newValue = Math.round(newAngle);
    onChange(newValue);
  };

  return (
    <div className="knob-container" onWheel={handleWheel}>
      <input
        type="number"
        min="0"
        max="360"
        value={angle}
        onChange={handleKnobChange}
        className="range-input"
      />
      <div className="knob" style={{ transform: `rotate(${angle}deg)` }}></div>
    </div>
  );
};

export default Knob;
