import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Clock from "./Clock";
import "./styles/AnimatedButton.css";
import Knob from "./Knob";
import "./styles/Knob.css";
const Dashboard = () => {
  const [knobValue, setKnobValue] = useState(0);
  const handleKnobChange = (newValue) => {
    setKnobValue(newValue);
  };
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

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const fetchGameQuery = async () => {
      let myParams = searchParams.get("id");
      if (!myParams) {
        setSearchParams("id", "sus");
      } else {
        try {
          const res = await axios.get(
            `http://localhost:3000/game/query?id=${myParams}`,
            {
              withCredentials: true,
            }
          );
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchGameQuery();
  }, [searchParams, setSearchParams]);

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
          console.log("10 clicks in 3 seconds");
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
