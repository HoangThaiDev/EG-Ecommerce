// Import Modules
import React, { useContext, useState } from "react";
import axiosInstance from "../axios/customAxios";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../storeContext/APIContext";

// Import File CSS
import "./css/slideCategories.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Components
import Slider from "react-slick";

// Custom Slide
function CustomSlide(props) {
  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use props
  const { title, categoryId, path, activePath, isActive, ...otherProps } =
    props;

  // Create + use event handles
  const getTitleCategory = () => {
    fetchProductByCategory();
  };

  const fetchProductByCategory = async () => {
    try {
      const response = await axiosInstance(
        `/products/search?category=${categoryId}`
      );

      navigate(`/products?category=${title}`, {
        state: { searchedProducts: response.data },
      });
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
    }
  };

  return (
    <div {...otherProps} className="slide-item" onClick={getTitleCategory}>
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
  const { categories } = useContext(APIContext);

  // Create + use States
  const [centerIndex, setCenterIndex] = useState(0);

  // Create + use setting of slider
  const settings = {
    centerMode: true,
    swipe: false,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 1500,
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
        },
      },
      {
        breakpoint: 991,
        settings: {
          swipe: true,
          slidesToShow: 3,
          speed: 1000,
        },
      },
      {
        breakpoint: 770,
        settings: {
          swipe: true,
          slidesToShow: 2,
          speed: 1000,
        },
      },
      {
        breakpoint: 500,
        settings: {
          swipe: true,
          slidesToShow: 1,
          speed: 2000,
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
            categoryId={category._id}
            isActive={index === centerIndex}
          />
        </div>
      ))}
    </Slider>
  );
}
