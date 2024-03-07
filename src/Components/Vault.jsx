import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Vault.css";
axios.defaults.withCredentials = true;
const Vault = ({ id, username }) => {
  const [curretNum, setCurrentNum] = useState("");
  const [rotate, setRotate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (rotate) {
      const timeoutId = setTimeout(() => {
        setRotate(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [rotate]);
  const handleNumberClick = async (number) => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 500);
    const newNumber = curretNum + number.toString();
    setCurrentNum(newNumber);
    console.log("PIN: ", newNumber);
    if (newNumber.length === 6) {
      const res = await axios.post("http://localhost:3000/game/checkVault", {
        passwordEntered: newNumber,
        userId: id,
      });
      if (res.data.flag === true) {
        window.alert("Pin is correct");
        setCurrentNum("");
        navigate("/slideshow", { state: { pic: res.data.pic, userId: id } });
      } else {
        window.alert("Pin incorrect try again");
        setCurrentNum("");
      }
    }
  };

  return (
    <>
      <div className="vault-container">
        <img
          src="https://assets-global.website-files.com/57e2d77a746c2acf32ec4380/57e42aba355f8c733090c4ff_safe%20no%20handle.svg"
          alt=""
        />

        <div className="numbers">
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <button
              className="vault-btn"
              key={number}
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </button>
          ))}
          <img
            id="vault-wheel"
            className={rotate ? "rotate" : ""}
            src="https://assets-global.website-files.com/65e752ee0e953e84ab88b904/65e752ee0e953e84ab88b94b_safe%20handle.png"
            alt=""
          />
        </div>
        <h3 id="something">{username}</h3>
      </div>
    </>
  );
};
export default Vault;
