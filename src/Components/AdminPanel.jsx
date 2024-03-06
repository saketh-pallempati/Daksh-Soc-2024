import { useEffect, useState } from "react";
import Vault from "./Vault";
import axios from "axios";
axios.defaults.withCredentials = true;
const AdminPanel = () => {
  const [vaults, setVaults] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/game/allVaults")
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setVaults(res.data);
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
    <div className="panel">
      <h2>Welcome Admin !!!</h2>
      <div className="vaults">
        {vaults.map((vault) => (
          <Vault key={vault._id} id={vault._id} username={vault.username} />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
