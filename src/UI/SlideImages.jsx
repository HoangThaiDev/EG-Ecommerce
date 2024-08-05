// Import File CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/slideImages.css";

// Import Components
import Slider from "react-slick";

function CustomSlide(props) {
  const { image, totalImage, index, ...otherProps } = props;
  return (
    <div {...otherProps} className="slide-image-item">
      <img src={image} alt={image} loading="lazy" />

      <span className="number-image">
        0{index + 1}/0{totalImage}
      </span>
    </div>
  );
}

export default function SlideImages({ settings, images, className }) {
  return (
    <Slider {...settings} className={className}>
      {images.map((img, index) => (
        <div key={index} className="slider-image-bg">
          <CustomSlide
            image={img}
            key={index}
            totalImage={images.length}
            index={index}
          />
        </div>
      ))}
    </Slider>
  );
}
