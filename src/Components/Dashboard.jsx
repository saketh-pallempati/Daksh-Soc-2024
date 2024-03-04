import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleClick = () => {
    setClicks((prevClicks) => prevClicks + 1);
    if (clicks === 0) {
      setStartTime(Date.now());
    }
  };

  useEffect(() => {
    if (clicks === 10) {
      if (Date.now() - startTime <= 3000) {
        console.log("10 clicks in 3 seconds");
        axios
          .get("http://localhost:3000/game/hit")
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setClicks(0);
      setStartTime(null);
    }
  }, [clicks, startTime]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3000/verify").then((res) => {
      if (res.data.status) {
        setImageUrl(`http://localhost:3000/game/images/${res.data.user.src}`);
      } else {
        navigate("/");
      }
      console.log(res);
    });
  }, []);

  return (
    <div>
      {clicks}
      <br />
      <img src={imageUrl} alt="image" />
      <button onClick={handleClick}>Hit</button>
      <div>Dashboard</div>
    </div>
  );
};

export default Dashboard;
