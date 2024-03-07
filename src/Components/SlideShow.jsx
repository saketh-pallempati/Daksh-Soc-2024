import React, { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const SlideShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state) return <div>Invalid Access</div>;
  const pics = location.state.pic;
  const userId = location.state.userId;
  if (pics.length === 0)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: "3rem", color: "#333" }}>(⊙﹏⊙)</h1>
        <p style={{ fontSize: "2rem", color: "#666" }}>Empty Vault</p>
        <p>No images are present in this vault</p>
      </div>
    );
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === "Delete") {
        axios
          .delete("http://localhost:3000/game/deleteVault", {
            data: { userId: userId },
          })
          .then((res) => {
            console.log(res);
            alert("Deleted successfully");
            navigate("/dashboard");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userId, navigate]); // add navigate to the dependency array
  const images = pics.map((pic) => ({
    original: `http://localhost:3000/vaultImg/?id=${pic}`,
    thumbnail: `http://localhost:3000/vaultImg/?id=${pic}`,
  }));
  const handleClick = () => {
    axios
      .post("http://localhost:3000/game/addVault", { userId: userId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="slideshow--container">
      <div>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button className="slideshow--button" onClick={handleClick}>
          Add to your Vault!
        </button>
      </div>
    </div>
  );
};

export default SlideShow;
