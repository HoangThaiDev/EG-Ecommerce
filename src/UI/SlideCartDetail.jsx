// Import File CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/slideCartDetail.css";

// Import Components
import Slider from "react-slick";

export default function SlideCartDetail({ settings, className }) {
  return (
    <Slider {...settings} className={className}>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </Slider>
  );
}
