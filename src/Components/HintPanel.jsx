import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export const HintPanel = () => {
  const hints = [
    "Move around and check all the buttons",
    "What is the day in the date?",
    "Terminal is the way to go",
    "Images can have interesting info🔍",
    "Stored XSS vulnerability 🍪",
    "SQL Injecton (admin'or'1'='1)",
    "id=sus & sus=id => id=?",
    "steghide google bruh"
  ];
  return (
    <div class="attackMap-widget" id="attackMap-news">
      <div class="widget-top">
        <div class="widget-top-text">Hints</div>
      </div>
      <Carousel className="carousel" showThumbs={false} showStatus={false}>
        {hints.map((hint) => (
          <div key={hint} className="carousel-page">
            {hint}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
