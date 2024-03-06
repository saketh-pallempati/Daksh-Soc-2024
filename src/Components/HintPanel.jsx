import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export const HintPanel = () => {
  const [maskStatus, setMaskStatus] = useState([true, true, true, true, true]);

  const handleMaskClick = (index) => {
    const confirmReveal = window.confirm("Do you want to reveal the hint?");
    if (confirmReveal) {
      const newMaskStatus = [...maskStatus];
      newMaskStatus[index] = false;
      setMaskStatus(newMaskStatus);
    }
  };
  return (
    <div class="attackMap-widget" id="attackMap-news">
      <div class="widget-top">
        <div class="widget-top-text">Hints</div>
      </div>
      <Carousel className="carousel" showThumbs={false} showStatus={false}>
        {[1, 2, 3, 4, 5].map((pageNumber) => (
          <div key={pageNumber} className="carousel-page">
            {maskStatus[pageNumber] && (
              <div
                className="mask"
                onClick={() => handleMaskClick([pageNumber])}
              ></div>
            )}
            <p>Hint {pageNumber}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
