import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Matrix.css";

const Adminpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const colsRef = useRef(null);
  const yposRef = useRef(null);

  const handleLogin = () => {
    axios
      .post(
        "http://localhost:3000/game/sqlInjection",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.flag) {
          navigate("/adminPanel", { state: { flag: 1 } });
        }
        console.log(response);
      });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const cols = Math.floor(w / 20) + 1;
    colsRef.current = cols;
    yposRef.current = Array(cols).fill(0);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    const interval = setInterval(() => {
      ctx.fillStyle = "#0001";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#0f0";
      ctx.font = "15pt monospace";

      yposRef.current.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) yposRef.current[ind] = 0;
        else yposRef.current[ind] = y + 20;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <canvas id="canv" ref={canvasRef} />
      <form
        id="login-form"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
        }}
      >
        <h1>Login Page</h1>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="💉"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="💉"
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
