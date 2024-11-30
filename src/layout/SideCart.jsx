// Import Modules
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import reduxActions from "../redux/redux-actions";

// Import File CSS
import classes from "./css/sideCart.module.css";

// Import Icons
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { BsTrash } from "react-icons/bs";
import { FiInfo } from "react-icons/fi";
import { LiaClipboard } from "react-icons/lia";
import { AiOutlineGift } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LiaTagSolid } from "react-icons/lia";

// Import Components
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
  console.log(cart);

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

  const goToCheckoutHandle = () => {
    navigate("checkout", { replace: true });
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
                    <div className={classes["cart-item"]} key={item._id}>
                      <img
                        src={item.itemId.image_detail.banner}
                        alt={item.itemId.image_detail.banner}
                      />
                      <div className={classes["item-info"]}>
                        <p className={classes["item-info-name"]}>
                          {item.itemId.name}
                        </p>
                        <p className={classes["item-info-unit"]}>
                          {item.itemId.unit}
                        </p>
                        <p className={classes["item-info-price"]}>
                          ${item.itemId.price}
                        </p>
                        <div className={classes["item-info-quantity"]}>
                          <FaMinus
                            className={`${classes["icon-quantity"]} ${classes["icon-decrease-quantity"]}`}
                          />
                          <input
                            type="number"
                            className={classes["input-quantity"]}
                            placeholder={item.quantity_item}
                          />
                          <FaPlus
                            className={`${classes["icon-quantity"]} ${classes["icon-increase-quantity"]}`}
                          />
                        </div>
                        <div className={classes["item-info-actions"]}>
                          <FiInfo
                            className={`${classes["icon-action"]} ${classes["icon-action-detail"]}`}
                          />
                          <BsTrash
                            className={`${classes["icon-action"]} ${classes["icon-action-delete"]}`}
                          />
                        </div>
                      </div>
                    </div>
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
