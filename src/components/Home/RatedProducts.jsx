// Import Modules
import React, { useMemo } from "react";

// Import File CSS
import classes from "./css/ratedProducts.module.css";

// Import components
import { Link } from "react-router-dom";
import SlideProducts from "../../UI/SlideProducts";

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

export default function RatedProducts({ products }) {
  // Create + use setting of slider
  const settings = {
    swipe: false,
    speed: 1500,
    slidesToShow: 4,
    rows: 2,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          swipe: true,
          slidesToShow: 4,
          rows: 2,
          slidesToScroll: 4,
          speed: 700,
        },
      },
      {
        breakpoint: 991,
        settings: {
          swipe: true,
          slidesToShow: 3,
          rows: 2,
          slidesToScroll: 3,
          speed: 700,
        },
      },
      {
        breakpoint: 767,
        settings: {
          swipe: true,
          slidesToShow: 2,
          rows: 2,
          slidesToScroll: 2,
          speed: 1000,
          autoplay: false,
          autoplaySpeed: 8000,
        },
      },
      {
        breakpoint: 575,
        settings: {
          swipe: true,
          slidesToShow: 2,
          rows: 2,
          slidesToScroll: 2,
          speed: 1000,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
    ],
  };

  // Create + use Hooks
  const filteredTopRateProducts = useMemo(() => {
    return products.filter((product) => product.rating === 5);
  }, [products]);

  return (
    <div className={`${classes["products-rated"]}`}>
      <div className={classes["products__container"]}>
        <div className={classes["products__header"]}>
          <h2>Top Rated Product!</h2>
          <p>
            These products have been rated appreciated and loved by loyal
            customers
          </p>
        </div>

        <div className={classes["products__section"]}>
          <div className={classes["section__header"]}>
            <Link to="/products" className={classes["section__link"]}>
              View All
            </Link>
          </div>

          <div className={classes["section__row"]}>
            {filteredTopRateProducts.length > 0 && (
              <SlideProducts
                className="slider-products slider-rated-products"
                products={filteredTopRateProducts}
                settings={settings}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
