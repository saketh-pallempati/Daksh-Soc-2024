import React, { useEffect } from "react";
import * as THREE from "three";
import headerImg from "../assets/img/banner-bg.png";
import { Header } from "./Header";
import { HintPanel } from "./HintPanel";
import { XssPanel } from "./XssPanel";
import { SatellitePanel } from "./SatellitePanel";
import { MouseWheelPanel } from "./MouseWheelPanel";
import { Footer } from "./Footer";

const Dashboard1 = () => {
  useEffect(() => {
    const EARTH_RADIUS_KM = 6371; // km
    const SAT_SIZE = 75; // km
    const world = Globe()(document.getElementById("chart"))
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .objectLat("lat")
      .objectLng("lng")
      .atmosphereColor("#f4ff91")
      .atmosphereAltitude(0.25)
      .objectAltitude("alt")
      .objectLabel("name");

    // custom globe material
    const globeMaterial = world.globeMaterial();
    globeMaterial.bumpScale = 25;
    new THREE.TextureLoader().load(
      "https://i.imgur.com/45MlwNF.png",
      (texture) => {
        globeMaterial.specularMap = texture;
        globeMaterial.specular = new THREE.Color("grey");
        globeMaterial.shininess = 15;
        globeMaterial.opacity = 0.8;
      }
    );
    // Add clouds sphere
    const CLOUDS_IMG_URL = "https://assets.codepen.io/6611087/clouds.png"; // from https://github.com/turban/webgl-earth
    const CLOUDS_ALT = 0.005;
    const CLOUDS_ROTATION_SPEED = 0.05; // deg/frame

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereBufferGeometry(
          world.getGlobeRadius() * (1 + CLOUDS_ALT),
          75,
          75
        ),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      world.scene().add(clouds);

      (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
    setTimeout(() => {
      const directionalLight = world
        .scene()
        .children.find((obj3d) => obj3d.type === "DirectionalLight");
      directionalLight && directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect
    });

    setTimeout(() =>
      world.pointOfView({
        altitude: 2.5,
      })
    );

    const satGeometry = new THREE.OctahedronGeometry(
      (SAT_SIZE * world.getGlobeRadius()) / EARTH_RADIUS_KM / 2,
      0
    );

    const satMaterial = new THREE.MeshLambertMaterial({
      color: "white",
      transparent: true,
      opacity: 0.5,
    });

    world.objectThreeObject(() => new THREE.Mesh(satGeometry, satMaterial));
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = -0.25;
    world.controls().enablePan = true;
    world.controls().panSpeed = 1.0;
    world.controls().screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up

    world.controls().keyPanSpeed = 7.0; // pixels moved per arrow key push
  }, []);

  return (
    <div>
      <Header />
      <HintPanel />
      <XssPanel />
      <SatellitePanel />
      <MouseWheelPanel />
      <div id="model-viewer"></div>
      <div id="chart"></div>
      <div
        style={{
          position: "absolute",
          right: "10px",
          bottom: "10px",
          zIndex: "999",
        }}
      >
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
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard1;
