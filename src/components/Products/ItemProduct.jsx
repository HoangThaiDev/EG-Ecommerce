// Import Modules
import React from "react";
import { useNavigate } from "react-router-dom";

// Import File CSS
import classes from "./css/itemProduct.module.css";

// Import Components
import { Rate } from "antd";

// Import Icons
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";

export default function ItemProduct({ product }) {
  // Add + calculate Price Discount (percent-discount > 0)
  product.price_discount =
    product.price - (product.price * product.percent_discount) / 100;

  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use event handlers
  const viewProductDetailHandler = (product_name, product_id) => {
    const modifiedProductName = product_name.split(" ").join("-");
    navigate(`../product/${modifiedProductName}`, {
      state: { productId: product_id },
    });
  };

  const addToCartHandler = (productId) => {
    console.log("add to cart:", productId);
  };
  return (
    <div className={classes["section__card"]}>
      {product.percent_discount > 0 && (
        <span className={classes["section__card__percent-discount"]}>
          -{product.percent_discount}% Off
        </span>
      )}
      <IoSearchSharp
        className={classes["card-icon-search"]}
        onClick={() => viewProductDetailHandler(product.name, product._id)}
      />
      <img
        src={product.image_detail.banner}
        alt={product.image_detail.banner}
        onClick={() => viewProductDetailHandler(product.name, product._id)}
      />
      <div className={classes["card-detail"]}>
        <h3
          className={classes["card-detail-name"]}
          onClick={() => viewProductDetailHandler(product.name, product._id)}
        >
          {product.name}
        </h3>
        <div className={classes["card-detail-price"]}>
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
        <div className={classes["card-detail-rating"]}>
          <Rate
            className="card__rates"
            allowHalf
            disabled
            defaultValue={product.rating}
          />
        </div>
        <button
          className={classes["card-detail-btn-add"]}
          type="button"
          onClick={() => addToCartHandler(product._id)}
        >
          Add To Cart
          <HiOutlinePlusSm className={classes["card-detail-icon-btn"]} />
        </button>
      </div>
    </div>
  );
}
