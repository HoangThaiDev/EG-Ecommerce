// Import Modules
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import calculatePrice from "../../helper/products/calculator";
import APIServer from "../../API/customAPI";
import reduxActions from "../../redux/redux-actions";

// Import File CSS
import classes from "./css/itemProduct.module.css";

// Import Components
import { Rate } from "antd";

// Import Icons
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";

export default function ItemProduct({ product }) {
  // Create + use Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use States
  const { isLoggedIn } = useSelector((state) => state.user);

  // Create + use Logics
  const modifiedProduct = useMemo(() => {
    product.price_discount = (
      product.price -
      (product.price * product.percent_discount) / 100
    ).toFixed(2);
    return product;
  }, []);

  // Create + use event handles
  const viewProductDetailHandle = (product_name, product_id) => {
    const modifiedProductName = product_name.split(" ").join("-");
    navigate(`../product/${modifiedProductName}`, {
      state: { productId: product_id },
    });
  };

  const addToCartHandle = async (product) => {
    // Check client loggedIn to use
    if (!isLoggedIn) {
      return alert("You need to login to use 'Add to cart'");
    }

    // Calculate price of product
    const updatePrice = calculatePrice(
      product.price,
      product.percent_discount,
      1
    );

    const valueProduct = {
      _id: product._id,
      quantity: 1,
      totalPrice: updatePrice,
    };

    try {
      const res = await APIServer.cart.addToCart(valueProduct);

      if (res.status === 200) {
        const { cart } = res.data;
        alert("Add to cart success!");
        dispatch(reduxActions.user.updateCart(cart));
      }
    } catch (error) {
      const { data, status } = error.response;
      if (status !== 200) {
        alert(data.message);
      }
    }
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
          viewProductDetailHandle(modifiedProduct.name, modifiedProduct._id)
        }
      />
      <img
        src={modifiedProduct.image_detail.banner}
        alt={modifiedProduct.image_detail.banner}
        onClick={() =>
          viewProductDetailHandle(modifiedProduct.name, modifiedProduct._id)
        }
      />
      <div className={classes["card-detail"]}>
        <h3
          className={classes["card-detail-name"]}
          onClick={() =>
            viewProductDetailHandle(modifiedProduct.name, modifiedProduct._id)
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
          onClick={() => addToCartHandle(modifiedProduct)}
        >
          Add To Cart
          <HiOutlinePlusSm className={classes["card-detail-icon-btn"]} />
        </button>
      </div>
    </div>
  );
}
