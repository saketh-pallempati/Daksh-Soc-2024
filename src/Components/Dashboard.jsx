import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Clock from "./Clock";
import "./styles/AnimatedButton.css";
import Knob from "./Knob";
import "./styles/Knob.css";
import Countdown from "react-countdown";

const Dashboard = () => {
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

  const [knobValue, setKnobValue] = useState(69);
  const handleKnobChange = (newValue) => {
    setKnobValue(newValue);
  };
  useEffect(() => {
    if (knobValue === 0) {
      alert("Here is your hint!");
    }
  }, [knobValue]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/logout");
      if (res.data.status) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/verify");
        if (res.data.status) {
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

  return (
    <div>
      <h1>Satellite control panel</h1>
      <div id="time-log">
        Set countdown &nbsp
        <Countdown date={Date.now() + 10000} />
        &nbsp GMT +05:30 
      </div>

      <Clock />
      <div className="knob_wrap">
        <div className="knob_div">
          <label htmlFor="knobInput">Set Position:</label>
          <Knob value={knobValue} onChange={handleKnobChange} />
          <input id="knobInput" type="text" value={knobValue} readOnly />
        </div>
      </div>
      <br />
      <img
        src={`http://localhost:3000/game/images`}
        alt="image"
        style={{ width: 400, height: 400 }}
      />
      <button className="AnimatedButton" onClick={handleClick}>
        Don't
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
