import * as THREE from "three";
import { Header } from "./Header";
import { HintPanel } from "./HintPanel";
import { XssPanel } from "./XssPanel";
import { SatellitePanel } from "./SatellitePanel";
import { Footer } from "./Footer";
import Clock from "./Clock";
import Knob from "./Knob";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./styles/AnimatedButton.css";
axios.defaults.withCredentials = true;

const Dashboard = () => {
  const navigate = useNavigate();
  const [pswd, setPswd] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id === "id") {
      alert("Some hint");
      setSearchParams({});
    } else {
      setSearchParams({ id: "sus" });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/verify");
        console.log(res);
        if (res.data.status) {
          setPswd(res.data.user.vaultPassword);
          console.log("User is verified");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, []);

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

  const [knobValue, setKnobValue] = useState(30); // initial value is 30

  const handleKnobChange = (newValue) => {
    setKnobValue(newValue);
  };
  useEffect(() => {
    if (knobValue === 8) {
      const timeoutId = setTimeout(() => {
        alert("Knob value matched with today's date!");
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [knobValue]);

  return (
    <div>
      <Knob
        size={100}
        numTicks={25}
        degrees={260}
        min={1}
        max={100}
        value={30}
        color={true}
        onChange={handleKnobChange}
      />
      <input type="text" value={knobValue} id="knob--input" /> <Header />
      <HintPanel />
      <XssPanel />
      <SatellitePanel />
      <div id="chart"></div>
      <img
        src={`http://localhost:3000/game/images`}
        alt="image"
        id="hidden--img"
      />
      <Clock />
      <Footer pswd={pswd} />
    </div>
  );
};

export default Dashboard;
