import React from "react";
import Knob from "./Knob";

export const MouseWheelPanel = () => {
  return (
    <div className="attackMap-widget mwp">
      <div className="widget-top">
        <div className="widget-top-text">Mouse Wheel Panel</div>
      </div>
      <Knob />
    </div>
  );
};
