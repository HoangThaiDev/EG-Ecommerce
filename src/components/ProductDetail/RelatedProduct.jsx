// Import Modules
import React, { useContext } from "react";
import { APIContext } from "../../storeContext/APIContext";

// Import File CSS
import classes from "./css/relatedProduct.module.css";
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

export default function RelatedProduct({ category, productId }) {
  //   Custom setting Slider
  const settings = {
    swipe: false,
    speed: 2000,
    slidesToShow: 4,
    rows: 1,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          swipe: true,
          slidesToShow: 4,
          rows: 1,
          slidesToScroll: 4,
          speed: 700,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
      {
        breakpoint: 991,
        settings: {
          swipe: true,
          slidesToShow: 3,
          rows: 1,
          slidesToScroll: 3,
          speed: 700,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
      {
        breakpoint: 767,
        settings: {
          swipe: true,
          slidesToShow: 2,
          rows: 1,
          slidesToScroll: 2,
          speed: 1000,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
      {
        breakpoint: 575,
        settings: {
          swipe: true,
          slidesToShow: 1,
          rows: 1,
          slidesToScroll: 1,
          speed: 1000,
          autoplay: true,
          autoplaySpeed: 8000,
        },
      },
    ],
  };

  // Create + use Hooks
  const { products } = useContext(APIContext);

  const productsByCategory = products.filter(
    (product) =>
      product.categoryId.title === category && product._id !== productId
  );

  return (
    <div className={classes["related-product"]}>
      <div className={classes["related-product-container"]}>
        <div className={classes["section-related-product"]}>
          <h3>Related Product</h3>

          <SlideProducts
            className="slider-products slider-related-products"
            products={productsByCategory}
            settings={settings}
            pageProductDetail={true}
          />
        </div>
      </div>
    </div>
  );
}
