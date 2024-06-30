// Import Modules
import React, { useContext, useState } from "react";

// Import File CSS
import "./css/slideCategories.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Components
import Slider from "react-slick";
import { APIContext } from "../storeContext/APIContext";

// Custom Slide
function CustomSlide(props) {
  // Create + use props
  const { title, path, activePath, isActive, ...otherProps } = props;

  // Create + use event handlers
  const getTitleCategory = (title) => {
    console.log("title", title);
  };

  return (
    <div
      {...otherProps}
      className="slide-item"
      onClick={() => getTitleCategory(title)}
    >
      <img src={isActive ? activePath : path} alt={title} loading="lazy" />
      <p>{title}</p>
    </div>
  );
}

// Custom Arrow Slider
function SampleNextArrow(props) {
  // Create + use props
  const { className, style, onClick } = props;

  return <div className={className} onClick={onClick} style={style} />;
}

function SamplePrevArrow(props) {
  // Create + use props
  const { className, style, onClick } = props;

  return <div className={className} onClick={onClick} style={style} />;
}

export default function SlideCategories() {
  // Create + use Hooks
  const [centerIndex, setCenterIndex] = useState(0);
  const { categories } = useContext(APIContext);

  // Create + use setting of slider
  const settings = {
    centerMode: true,
    swipe: false,
    speed: 700,
    slidesToShow: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current) => setCenterIndex(current),
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          swipe: true,
          slidesToShow: 3,
          speed: 1000,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 991,
        settings: {
          swipe: true,
          slidesToShow: 3,
          speed: 1000,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 770,
        settings: {
          swipe: true,
          slidesToShow: 2,
          speed: 1000,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 500,
        settings: {
          swipe: true,
          slidesToShow: 1,
          speed: 2000,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="slider-categories">
      {categories.map((category, index) => (
        <div key={category._id}>
          <CustomSlide
            path={category.logo.outline}
            activePath={category.logo.active}
            title={category.title}
            key={category._id}
            isActive={index === centerIndex}
          />
        </div>
      ))}
    </Slider>
  );
}
