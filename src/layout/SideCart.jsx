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

  // Create + use Event handlers
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
  const DUMMY_CART = [
    {
      id: "1",
      name: "Duck breast",
      price: "6.00",
      unit: "Kg",
      percent_discount: 20,
      quantity: 1,
      total_price: "6.00",
      image:
        "https://res.cloudinary.com/dqrughrs2/image/upload/v1718901079/duck-breast-raw-meat-poultry-barbecue-grill-portion_88242-8715_b50omz.avif",
    },
    {
      id: "2",
      name: "Yogi Tea Stress Relief",
      price: "2.00",
      unit: "Bag",
      percent_discount: 0,
      quantity: 2,
      total_price: "4.00",
      image:
        "https://res.cloudinary.com/dqrughrs2/image/upload/v1719159149/716wiPOTyJL._SL1500__i3at6z.jpg",
    },
    {
      id: "3",
      name: "Cottagse Cheese",
      price: "10.66",
      unit: "Can 500g",
      percent_discount: 0,
      quantity: 1,
      total_price: "10.66",
      image:
        "https://res.cloudinary.com/dqrughrs2/image/upload/v1718892380/63336882-794f-4c90-9592-7c621c0511cb.de6e73546c563606b4376bbe22888c6f_anvlnt.webp",
    },
  ];

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

  // Side Effect
  useEffect(() => {
    if (locationPath.pathname !== "") {
      dispatch(reduxActions.sideCart.hide());
    }
  }, [locationPath]);

  // Create + use Event handlers
  const goToPageCartHandler = () => {
    navigate("cart", { replace: true });
  };

  const goToPageCheckoutHandler = () => {
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

        <div className={classes["sidebar-section"]}>
          {/* JSX: Item Cart */}
          <div className={classes["sidebar-cart"]}>
            {DUMMY_CART.map((item) => (
              <div className={classes["cart-item"]} key={item.id}>
                <img src={item.image} alt={item.image} />
                <div className={classes["item-info"]}>
                  <p className={classes["item-info-name"]}>{item.name}</p>
                  <p className={classes["item-info-unit"]}>{item.unit}</p>
                  <p className={classes["item-info-price"]}>${item.price}</p>
                  <div className={classes["item-info-quantity"]}>
                    <FaMinus
                      className={`${classes["icon-quantity"]} ${classes["icon-decrease-quantity"]}`}
                    />
                    <input
                      type="number"
                      className={classes["input-quantity"]}
                      value={1}
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
            <p className={classes["section-price"]}>$200.55</p>
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
              onClick={goToPageCartHandler}
            >
              VIEW CART
            </button>
            <button
              type="button"
              className={classes["btn-check-out"]}
              onClick={goToPageCheckoutHandler}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SideCart() {
  // Create + use Hooks
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
