import { useEffect, useState } from "react";
import Vault from "./Vault";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AdminPanel = () => {
  axios.defaults.withCredentials = true;
  const location = useLocation();
  if (!location.state) return <div>Invalid Access</div>;
  const [vaults, setVaults] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/game/allVaults")
      .then((res) => {
        if (res.data) {
          setVaults(res.data.sort(() => Math.random() - 0.5));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (vaults.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="admin-container">
      <div className="panel">
        <h2>Welcome Admin !!!</h2>
      </div>
      <div className="vaults">
        {vaults.map((vault) => (
          <Vault key={vault._id} id={vault._id} username={vault.username} />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
