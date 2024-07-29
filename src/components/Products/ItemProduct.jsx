// Import Modules
import React, { useMemo } from "react";
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
  const modifiedProduct = useMemo(() => {
    product.price_discount = (
      product.price -
      (product.price * product.percent_discount) / 100
    ).toFixed(2);
    return product;
  }, []);

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
      {modifiedProduct.percent_discount > 0 && (
        <span className={classes["section__card__percent-discount"]}>
          -{modifiedProduct.percent_discount}% Off
        </span>
      )}
      <IoSearchSharp
        className={classes["card-icon-search"]}
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
      <div className={classes["card-detail"]}>
        <h3
          className={classes["card-detail-name"]}
          onClick={() =>
            viewProductDetailHandler(modifiedProduct.name, modifiedProduct._id)
          }
        >
          {modifiedProduct.name}
        </h3>
        <div className={classes["card-detail-price"]}>
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
        <div className={classes["card-detail-rating"]}>
          <Rate
            className="card__rates"
            allowHalf
            disabled
            defaultValue={modifiedProduct.rating}
          />
        </div>
        <button
          className={classes["card-detail-btn-add"]}
          type="button"
          onClick={() => addToCartHandler(modifiedProduct._id)}
        >
          Add To Cart
          <HiOutlinePlusSm className={classes["card-detail-icon-btn"]} />
        </button>
      </div>
    </div>
  );
}
