// Import Modules
import React from "react";
import { useNavigate } from "react-router-dom";

// Import File CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/slideProducts.css";
import "../components/Home/css/ant-design/rate.css";

// Import Components
import Slider from "react-slick";
import { Rate } from "antd";

// Import Icons
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";

// Custom Slide
function CustomSlide(props) {
  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use props
  const { product, ...otherProps } = props;

  // Add + calculate Price Discount (percent-discount > 0)
  product.price_discount =
    product.price - (product.price * product.percent_discount) / 100;

  // Create + use event handlers
  const viewProductDetailHandler = (product_name, product_id) => {
    const modifiedProductName = product_name.split(" ").join("-");
    navigate(`./product/${modifiedProductName}`, {
      state: { productId: product_id },
    });
  };

  const addToCartHandler = (productId) => {
    console.log("add to cart:", productId);
  };

  return (
    <div {...otherProps} className="slide-item">
      <div className="card">
        {product.percent_discount > 0 && (
          <span className="card__percent-discount">
            -{product.percent_discount}% Off
          </span>
        )}
        <IoSearchSharp
          className="card-icon-search"
          onClick={() => viewProductDetailHandler(product.name, product._id)}
        />
        <img
          src={product.image_detail.banner}
          alt={product.image_detail.banner}
          onClick={() => viewProductDetailHandler(product.name, product._id)}
        />
        <div className="card-detail">
          <h3
            className="card-detail-name"
            onClick={() => viewProductDetailHandler(product.name, product._id)}
          >
            {product.name}
          </h3>
          <div className="card-detail-price">
            {product.percent_discount > 0 && (
              <>
                <p className="card-detail-price-origin-old">
                  ${product.price}/ {product.unit}
                </p>

                <p className="card-detail-price-discount">
                  ${product.price_discount}/ {product.unit}
                </p>
              </>
            )}

            {product.percent_discount === 0 && (
              <p className="card-detail-price-origin">
                ${product.price}/ {product.unit}
              </p>
            )}
          </div>
          <div className="card-detail-rating">
            <Rate
              className="card__rates"
              allowHalf
              disabled
              defaultValue={product.rating}
            />
          </div>
          <button
            className="card-detail-btn-add"
            type="button"
            onClick={() => addToCartHandler(product._id)}
          >
            Add To Cart
            <HiOutlinePlusSm className="card-detail-icon-btn" />
          </button>
        </div>
      </div>
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

export default function SlideProducts({ products }) {
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
  return (
    <Slider {...settings} className="slider-products">
      {products.map((product) => (
        <div key={product._id}>
          <CustomSlide product={product} key={products.id} />
        </div>
      ))}
    </Slider>
  );
}
