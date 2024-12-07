// Import Modules
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import reduxActions from "../redux/redux-actions";
import checkCart from "../helper/cart/checkCart";
import APIServer from "../API/customAPI";

// Import File CSS
import classes from "./css/sideCart.module.css";

// Import Components
import SideCartItem from "./SideCartItem";

// Import Icons
import { IoClose } from "react-icons/io5";
import { LiaClipboard } from "react-icons/lia";
import { AiOutlineGift } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LiaTagSolid } from "react-icons/lia";

// Create + use  Main Components
function Overlay({ isShowSideCart }) {
  // Create + use Hooks
  const dispatch = useDispatch();

  // Create + use Event handles
  const hideSideCart = (event) => {
    if (event.target.classList.value) {
      dispatch(reduxActions.sideCart.hide());
    }
  };

  return (
    <div
      className={`${classes["overlay"]} ${
        isShowSideCart ? `${classes["show"]}` : `${classes["hide"]}`
      }`}
      onClick={hideSideCart}
    ></div>
  );
}

function SideBar({ isShowSideCart }) {
  // Create + use DUMMY_DATA_CONSTANTS
  const DUMMY_ITEM_OPTION = [
    {
      id: "1",
      icon: (
        <LiaClipboard
          className={`${classes["icon-option"]} ${classes["icon-option-note"]}`}
        />
      ),
      label: "Add Order Note",
    },
    {
      id: "2",
      icon: (
        <AiOutlineGift
          className={`${classes["icon-option"]} ${classes["icon-option-gift"]}`}
        />
      ),
      label: "Add A Gift Wrap",
    },
    {
      id: "3",
      icon: (
        <LiaShippingFastSolid
          className={`${classes["icon-option"]} ${classes["icon-option-shipping"]}`}
        />
      ),
      label: "Estimate",
    },
    {
      id: "4",
      icon: (
        <LiaTagSolid
          className={`${classes["icon-option"]} ${classes["icon-option-coupon"]}`}
        />
      ),
      label: "Add A Coupon",
    },
  ];

  // Create + use Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationPath = useLocation();

  // Create + use States
  const { isLoggedIn, cart } = useSelector((state) => state.user);

  // Create + use side Effects
  useEffect(() => {
    if (locationPath.pathname !== "") {
      dispatch(reduxActions.sideCart.hide());
    }
  }, [locationPath]);

  // Create + use Event handles
  const loginHandle = () => {
    navigate("login", { replace: true });
  };

  const goToCartHandle = () => {
    navigate("cart", { replace: true });
  };

  const goToCheckoutHandle = async () => {
    const cartAfterChecked = checkCart(cart.items);

    if (cartAfterChecked) {
      try {
        const res = await APIServer.checkout.create(cartAfterChecked);
        if (res.status === 200) {
          const cart = res.data;
          dispatch(reduxActions.user.updateCart(cart));
          navigate("/checkout", { replace: true });
        }
      } catch (error) {
        const { data, status } = error.response;

        if (status !== 200) {
          alert(data.message);
        }
      }
    }
  };

  const hideSideCart = () => {
    dispatch(reduxActions.sideCart.hide());
  };

  return (
    <div
      className={`${classes["sidebar"]} ${
        isShowSideCart ? `${classes["show"]}` : `${classes["hide"]}`
      }`}
    >
      <div className={classes["sidebar-container"]}>
        <div className={classes["sidebar-header"]}>
          <h4>SHOPPING CART</h4>
          <IoClose className={classes["icon-close"]} onClick={hideSideCart} />
        </div>

        {!isLoggedIn && (
          <div className={classes["box-message"]}>
            <p className={classes["message-guest"]}>
              You need to Login Account use <span>ADD TO CART</span>
            </p>

            <button
              type="button"
              className={classes["btn-login"]}
              onClick={loginHandle}
            >
              Login
            </button>
          </div>
        )}

        {isLoggedIn && (
          <>
            <div className={classes["sidebar-section"]}>
              {/* JSX: Item Cart */}
              <div className={classes["sidebar-cart"]}>
                {cart.items.length > 0 &&
                  cart.items.map((item) => (
                    <SideCartItem item={item} key={item._id} />
                  ))}
              </div>

              {/* JSX: Item Options */}
              <div className={classes["sidebar-options"]}>
                {DUMMY_ITEM_OPTION.map((item) => (
                  <div className={classes["item-option"]} key={item.id}>
                    {item.icon}
                  </div>
                ))}
              </div>
              {/* JSX: Cart Actions */}
            </div>

            <div className={classes["sidebar-footer"]}>
              <div className={classes["sidebar-footer-section"]}>
                <p className={classes["section-title"]}>Subtotal:</p>
                <p className={classes["section-price"]}>
                  ${cart.totalPriceCart}
                </p>
              </div>
              <div className={classes["sidebar-footer-rules"]}>
                <p>Taxes and shipping calculated at checkout</p>
                <div className={classes["rules-form"]}>
                  <input
                    className={classes["form-input-checkbox"]}
                    type="checkbox"
                    id="check"
                  />
                  <label htmlFor="check">
                    I agree with the terms and conditions.
                  </label>
                </div>
              </div>
              <div className={classes["sidebar-footer-actions"]}>
                <button
                  type="button"
                  className={classes["btn-view-cart"]}
                  onClick={goToCartHandle}
                >
                  VIEW CART
                </button>
                <button
                  type="button"
                  className={classes["btn-check-out"]}
                  onClick={goToCheckoutHandle}
                >
                  CHECK OUT
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SideCart() {
  // Create + use States
  const { isShow: isShowSideCart } = useSelector((state) => state.sideCart);

  return (
    <>
      {createPortal(
        <Overlay isShowSideCart={isShowSideCart} />,
        document.getElementById("overlay")
      )}
      <SideBar isShowSideCart={isShowSideCart} />
    </>
  );
}
