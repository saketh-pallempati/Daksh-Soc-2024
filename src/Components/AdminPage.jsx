import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Adminpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    axios
      .post("http://localhost:3000/game/sqlInjection", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.flag) {
          navigate("/vaults");
        }
        console.log(response);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form style={{ width: 300 }}>
        <h1>Login Page</h1>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Adminpage;
