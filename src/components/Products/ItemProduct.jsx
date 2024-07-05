// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/itemProduct.module.css";

// Import Components
import { Rate } from "antd";

// Import Icons
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";

export default function ItemProduct({ product }) {
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
      />
      <div className={classes["card-detail"]}>
        <h3 className={classes["card-detail-name"]}>{product.name}</h3>
        <div className={classes["card-detail-price"]}>
          {product.percent_discount > 0 && (
            <p className={classes["card-detail-price-origin"]}>
              ${product.price}/ {product.unit}
            </p>
          )}

          <p className={classes["card-detail-price-discount"]}>
            ${product.price_discount}/ {product.unit}
          </p>
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
