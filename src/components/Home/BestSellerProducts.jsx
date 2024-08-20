// Import Modules
import React, { useMemo } from "react";

// Import File CSS
import classes from "./css/bestSellerProducts.module.css";
import "./css/ant-design/rate.css";

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

export default function BestSellerProducts({ products }) {
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
  const filteredBestSellerProducts = useMemo(() => {
    return products.filter((product) => product.best_seller);
  }, []);

  // Create + use event handlers
  const viewBestSellerProducts = () => {}; // Chua co y tuong

  return (
    <div className={classes["products-best-seller"]}>
      <div className={classes["products__container"]}>
        <div className={classes["products__header"]}>
          <h2>Best Seller Product!</h2>
          <p>Best-selling products, consumed and favored by many customers</p>
        </div>

        <div className={classes["products__section"]}>
          <div className={classes["section__header"]}>
            <Link to="/products" className={classes["section__link"]}>
              View All
            </Link>
          </div>

          <div className={classes["section__row"]}>
            {filteredBestSellerProducts.length > 0 && (
              <SlideProducts
                className="slider-products slider-best-seller-products"
                products={filteredBestSellerProducts}
                settings={settings}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
