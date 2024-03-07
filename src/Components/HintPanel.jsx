import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export const HintPanel = () => {
  return (
    <div class="attackMap-widget" id="attackMap-news">
      <div class="widget-top">
        <div class="widget-top-text">Hints</div>
      </div>
      <Carousel className="carousel" showThumbs={false} showStatus={false}>
        {[1, 2, 3, 4, 5].map((pageNumber) => (
          <div key={pageNumber} className="carousel-page">
            <p>Hint {pageNumber}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
