// Import Modules
import React from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import reduxAction from "../../redux/redux-actions";

// Import File CSS
import classes from "./css/modalCart.module.css";

// Import Components
import SlideCartDetail from "../../UI/SlideCartDetail";

function DetailModalCart() {
  // Create + use setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={classes["modal-cart"]}>
      <div className={classes["modal-cart-container"]}>
        <SlideCartDetail settings={settings} className="slider-modal-cart" />
      </div>
    </div>
  );
}

function Overlay({ isShowModalCart }) {
  // Create + use Hooks
  const dispatch = useDispatch();

  // Create + use Event handlers
  const hideModalCart = (event) => {
    if (event.target.classList.value) {
      dispatch(reduxAction.modalCart.hide());
    }
  };

  return (
    <div
      className={`${classes["overlay"]} ${
        isShowModalCart ? `${classes["show"]}` : `${classes["hide"]}`
      }`}
      onClick={hideModalCart}
    ></div>
  );
}

export default function ModalCart() {
  // Create + use Hooks
  const { isShow: isShowModalCart } = useSelector((state) => state.modalCart);

  return (
    <>
      {createPortal(
        <Overlay isShowModalCart={isShowModalCart} />,
        document.getElementById("overlay")
      )}
      {createPortal(<DetailModalCart />, document.getElementById("modal-cart"))}
    </>
  );
}
