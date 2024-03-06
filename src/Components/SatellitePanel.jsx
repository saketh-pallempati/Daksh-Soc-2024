import React from "react";

export const SatellitePanel = () => {
  return (
    <div class="attackMap-widget satellite">
      <div class="widget-top">
        <div class="widget-top-text">Satellite Panel</div>
      </div>
      <model-viewer
        src="https://assets.codepen.io/6611087/testSatModel.glb"
        ios-src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.usdz?v=1569545377878"
        poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
        alt="A 3D model of an astronaut!"
        shadow-intensity="1"
        camera-controls="true"
        auto-rotate="true"
        ar="true"
      ></model-viewer>
      <p class="text">
        <i class="fas fa-hand-point-right"></i>
      </p>
    </div>
  );
};
