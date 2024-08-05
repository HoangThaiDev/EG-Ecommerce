// Import Modules
import React, { useMemo } from "react";
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

  // Add + calculate Price Discount (percent-discount > 0)
  const modifiedProduct = useMemo(() => {
    product.price_discount = (
      product.price -
      (product.price * product.percent_discount) / 100
    ).toFixed(2);
    return product;
  }, [product]);

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
    console.log("add to cart:", productId);
  };

  return (
    <div {...otherProps} className="slide-item">
      <div className="card">
        {modifiedProduct.percent_discount > 0 && (
          <span className="card__percent-discount">
            -{modifiedProduct.percent_discount}% Off
          </span>
        )}
        <IoSearchSharp
          className="card-icon-search"
          onClick={() =>
            viewProductDetailHandler(modifiedProduct.name, modifiedProduct._id)
          }
        />
        <img
          src={modifiedProduct.image_detail.banner}
          alt={modifiedProduct.image_detail.banner}
          onClick={() =>
            viewProductDetailHandler(modifiedProduct.name, modifiedProduct._id)
          }
        />
        <div className="card-detail">
          <h3
            className="card-detail-name"
            onClick={() =>
              viewProductDetailHandler(
                modifiedProduct.name,
                modifiedProduct._id
              )
            }
          >
            {modifiedProduct.name}
          </h3>
          <div className="card-detail-price">
            {modifiedProduct.percent_discount > 0 && (
              <>
                <p className="card-detail-price-origin-old">
                  ${modifiedProduct.price}/ {modifiedProduct.unit}
                </p>

                <p className="card-detail-price-discount">
                  ${modifiedProduct.price_discount}/ {modifiedProduct.unit}
                </p>
              </>
            )}

            {modifiedProduct.percent_discount === 0 && (
              <p className="card-detail-price-origin">
                ${modifiedProduct.price}/ {modifiedProduct.unit}
              </p>
            )}
          </div>
          <div className="card-detail-rating">
            <Rate
              className="card__rates"
              allowHalf
              disabled
              defaultValue={modifiedProduct.rating}
            />
          </div>
          <button
            className="card-detail-btn-add"
            type="button"
            onClick={() => addToCartHandler(modifiedProduct._id)}
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
