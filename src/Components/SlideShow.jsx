import React, { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
axios.defaults.withCredentials = true;

const SlideShow = () => {
  const location = useLocation();
  if (!location.state) return <div>Invalid Access</div>;
  const pics = location.state.pic;
  const userId = location.state.userId;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === "d") {
        axios
          .delete("http://localhost:3000/game/deleteVault", { userId: userId })
          .then((res) => {
            console.log(res);
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
  }, [userId]);
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
