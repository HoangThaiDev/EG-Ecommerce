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
  const { product, isPageProductDetail, ...otherProps } = props;

  // Create + use event handlers
  const viewProductDetailHandler = (product_name, product_id) => {
    // Check page current is a page product detail
    const modifiedProductName = product_name.split(" ").join("-");
    if (isPageProductDetail) {
      navigate(`../product/${modifiedProductName}`, {
        state: { productId: product_id },
      });
    } else {
      navigate(`./product/${modifiedProductName}`, {
        state: { productId: product_id },
      });
    }
  };

  const addToCartHandler = (productId) => {
    let isLogin = false;
    if (!isLogin) {
      navigate("../login", { replace: true });
    }
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
            {product.price_discount ? (
              <>
                <p className="card-detail-price-origin-old">${product.price}</p>

                <p className="card-detail-price-discount">
                  ${product.price_discount}/ {product.unit}
                </p>
              </>
            ) : (
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

export default function SlideProducts({
  className,
  products,
  settings,
  pageProductDetail,
}) {
  return (
    <Slider {...settings} className={className}>
      {products.map((product) => (
        <div key={product._id} className="slider-product-container">
          <CustomSlide
            product={product}
            key={products.id}
            isPageProductDetail={pageProductDetail}
          />
        </div>
      ))}
    </Slider>
  );
}
