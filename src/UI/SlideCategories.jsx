// Import Modules
import React, { useState } from "react";

// Import File CSS
import "./css/slideCategories.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Components
import Slider from "react-slick";

const DUMMY_CATEGORIES = [
  {
    id: 1,
    title: "Fresh Fruits",
    image: {
      outline: require("../assets/images-categories/Outline/strawberriesOutline.png"),
      active: require("../assets/images-categories/Hover/strawberriesHover.png"),
    },
  },
  {
    id: 2,
    title: "Vegetables",
    image: {
      outline: require("../assets/images-categories/Outline/vegetableOutline.png"),
      active: require("../assets/images-categories/Hover/vegetableHover.png"),
    },
  },
  {
    id: 3,
    title: "Nuts and Seeds",
    image: {
      outline: require("../assets/images-categories/Outline/cashewOutline.png"),
      active: require("../assets/images-categories/Hover/cashewHover.png"),
    },
  },
  {
    id: 4,
    title: "Drink",
    image: {
      outline: require("../assets/images-categories/Outline/cheersOutline.png"),
      active: require("../assets/images-categories/Hover/cheersHover.png"),
    },
  },
  {
    id: 5,
    title: "Bakery",
    image: {
      outline: require("../assets/images-categories/Outline/cupcakeOutline.png"),
      active: require("../assets/images-categories/Hover/cupcakeHover.png"),
    },
  },
  {
    id: 6,
    title: "Fresh Oil",
    image: {
      outline: require("../assets/images-categories/Outline/tankOutline.png"),
      active: require("../assets/images-categories/Hover/tankHover.png"),
    },
  },
];

// Custom Slide
function CustomSlide(props) {
  // Create + use props
  const { index, title, path, activePath, isActive, ...otherProps } = props;

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
      <div className="test"></div>
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

  // Create + use setting of slider
  const settings = {
    className: "center",
    centerMode: true,
    swipe: false,
    speed: 700,
    slidesToShow: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current) => setCenterIndex(current),
  };

  return (
    <Slider {...settings} className="slider-categories">
      {DUMMY_CATEGORIES.map((category, index) => (
        <CustomSlide
          index={1}
          path={category.image.outline}
          activePath={category.image.active}
          title={category.title}
          key={category.id}
          isActive={index === centerIndex}
        />
      ))}
    </Slider>
  );
}
