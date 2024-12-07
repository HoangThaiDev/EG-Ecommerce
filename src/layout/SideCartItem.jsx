// Import Modules
import React, { useEffect, useState } from "react";
import APIServer from "../API/customAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import reduxActions from "../redux/redux-actions";

// Import File CSS
import classes from "./css/sideCartItem.module.css";

// Import Icons
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { BsTrash } from "react-icons/bs";
import { FiInfo } from "react-icons/fi";
import { useToast } from "../UI/ToastCustom";

export default function SideCartItem({ item }) {
  // Create + use Hooks
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create + use States
  const [quantityProduct, setQuantityProduct] = useState(item.quantity_item);

  // Create + use side Effects
  // -------------- Side Effect: update quantity product when change
  useEffect(() => {
    setQuantityProduct(item.quantity_item);
  }, [item]);

  // Create + use event handles
  const showProductDetailHandle = (product) => {
    const modifiedProductName = product.itemId.name.split(" ").join("-");
    navigate(`../product/${modifiedProductName}`, {
      state: { productId: product.itemId._id },
    });
  };

  const deleteProductHandle = async (product) => {
    const productId = product.itemId._id;

    try {
      const res = await APIServer.cart.deleteProduct(productId);
      if (res.status === 200) {
        const { cart } = res.data;
        toast.success(
          "Delete product success!",
          "message-side-cart-delete-product-success"
        );
        dispatch(reduxActions.user.updateCart(cart));
      }
    } catch (error) {
      const { data, status } = error.response;
      if (status !== 200) {
        toast.error(data.message, "message-side-cart-delete-product-error");
      }
    }
  };

  const checkValidateQuantity = (action, valueQuantity) => {
    if (action === "increase" && valueQuantity > 20) {
      toast.warning(
        "Each product only has a maximum quantities of 20!",
        "message-side-cart-warning"
      );
      return false;
    }

    return valueQuantity;
  };

  const changeQuantityProductHandle = (e, action, product) => {
    let newQuantity = Number(quantityProduct);

    if (action === "input") {
      const valueQuantity = e.target.value;
      newQuantity = +valueQuantity;
      setQuantityProduct(valueQuantity);
    }

    if (action === "increase") {
      if (newQuantity > 19) {
        return toast.warning(
          "Each product only has a maximum quantities of 20!",
          "message-side-cart-warning"
        );
      }

      newQuantity++;
      setQuantityProduct((prevState) => prevState + 1);
    }

    if (action === "decrease") {
      newQuantity--;
      if (newQuantity <= 0) {
        return toast.warning(
          "You can't set quantity to 0, it must at least quantity to 1!",
          "message-side-cart-warning"
        );
      }
      setQuantityProduct((prevState) => prevState - 1);
    }

    const quantityValid = checkValidateQuantity(action, newQuantity);

    if (quantityValid) {
      dispatch(
        reduxActions.user.changeQuantityProduct({
          action,
          quantityValid,
          productId: product.itemId._id,
        })
      );
    }
  };

  return (
    <>
      <div className={classes["cart-item"]}>
        <img
          src={item.itemId.image_detail.banner}
          alt={item.itemId.image_detail.banner}
        />
        <div className={classes["item-info"]}>
          <p className={classes["item-info-name"]}>{item.itemId.name}</p>
          <p className={classes["item-info-unit"]}>{item.itemId.unit}</p>

          <div className={classes["item-detail-price"]}>
            {item.itemId.price_discount ? (
              <>
                <p className={classes["item-detail-price-origin-old"]}>
                  ${item.itemId.price}
                </p>

                <p className={classes["item-detail-price-discount"]}>
                  ${item.itemId.price_discount}
                </p>
              </>
            ) : (
              <p className={classes["item-detail-price-origin"]}>
                ${item.itemId.price}
              </p>
            )}
          </div>
          <div className={classes["item-info-quantity"]}>
            <FaMinus
              className={`${classes["icon-quantity"]} ${classes["icon-decrease-quantity"]}`}
              onClick={(e) => changeQuantityProductHandle(e, "decrease", item)}
            />
            <input
              type="number"
              className={classes["input-quantity"]}
              value={quantityProduct}
              onChange={(e) => changeQuantityProductHandle(e, "input", item)}
            />
            <FaPlus
              className={`${classes["icon-quantity"]} ${classes["icon-increase-quantity"]}`}
              onClick={(e) => changeQuantityProductHandle(e, "increase", item)}
            />
          </div>
          <div className={classes["item-info-actions"]}>
            <FiInfo
              className={`${classes["icon-action"]} ${classes["icon-action-detail"]}`}
              onClick={() => showProductDetailHandle(item)}
            />
            <BsTrash
              className={`${classes["icon-action"]} ${classes["icon-action-delete"]}`}
              onClick={() => deleteProductHandle(item)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
