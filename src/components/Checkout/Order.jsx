// Import Modules
import React, { useEffect, useRef, useState } from "react";
import calculatePrice from "../../helper/products/calculator";

// Import Components
import { Row, Col } from "antd";

// Import File CSS
import classes from "./css/order.module.css";

// Import Icons
import { IoIosArrowForward } from "react-icons/io";

export default function Order({ cartDetail }) {
  // Create + use Hooks
  const orderListRef = useRef();

  // Create + use States
  const [isShowOrderDropdown, setIsShowOrderDropdown] = useState(false);

  // Create + use Logics
  const updateCartItems = cartDetail.items.map((item) => {
    if (item.itemId.percent_discount > 0) {
      item.itemId.price_discount = (
        item.itemId.price -
        (item.itemId.price * item.itemId.percent_discount) / 100
      ).toFixed(2);
    }
    return item;
  });

  // Create + use side Effects
  // ------------- Side Effect: DOM CSS event scroll down
  useEffect(() => {
    const resizeHandle = () => {
      if (window.screen.width >= 1024) {
        if (orderListRef.current.offsetHeight > 500) {
          orderListRef.current.classList.add(classes["scroll"]);
        } else {
          orderListRef.current.classList.remove(classes["scroll"]);
        }
      }
    };

    window.addEventListener("resize", resizeHandle);

    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, [cartDetail]);

  // Create + use event handles
  const showOrderDropdownHandle = () => {
    setIsShowOrderDropdown(!isShowOrderDropdown);
  };

  return (
    <div className={classes["order"]}>
      <div className={classes["order-container"]}>
        <h3>Your Order</h3>

        <div className={classes["order-header-menu"]}>
          <div
            className={classes["order-content"]}
            onClick={showOrderDropdownHandle}
          >
            <p>Cart ({cartDetail.items.length} Item)</p>
            <IoIosArrowForward
              className={
                isShowOrderDropdown
                  ? `${classes["icon-order"]} ${classes["icon-order-show"]}`
                  : classes["icon-order"]
              }
            />
          </div>
          <p className={classes["order-total-price"]}>$200.00</p>
        </div>

        <Row
          className={
            isShowOrderDropdown
              ? `${classes["order-row"]} ${classes["active"]}`
              : classes["order-row"]
          }
        >
          <Col className={classes["order-col-header"]}>
            <p>PRODUCT</p>
            <p>SUBTOTAL</p>
          </Col>
          <Col className={classes["order-col-content"]}>
            <div className={classes["order-list"]} ref={orderListRef}>
              {updateCartItems.map((item) => (
                <div className={classes["order-item"]} key={item.itemId._id}>
                  <div className={classes["order-item-detail"]}>
                    <div className={classes["item-image"]}>
                      <img
                        src={item.itemId.image_detail.banner}
                        alt={item.itemId.image_detail.banner}
                      />
                      <span className={classes["quantity"]}>
                        {item.quantity_item}
                      </span>
                    </div>
                    <div className={classes["item-info"]}>
                      <p className={classes["item-info-name"]}>
                        {item.itemId.name}
                      </p>
                      <p className={classes["item-info-unit"]}>
                        $
                        {item.itemId.percent_discount > 0
                          ? item.itemId.price_discount
                          : item.itemId.price}{" "}
                        - {item.itemId.unit}
                      </p>
                    </div>
                  </div>
                  <div className={classes["order-item-price"]}>
                    <p>${item.totalPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col className={classes["order-col-footer"]}>
            <p>SUBTOTAL</p>
            <p>${cartDetail.totalPriceCart}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}
