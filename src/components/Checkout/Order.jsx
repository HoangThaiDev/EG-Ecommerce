// Import Modules
import React, { useEffect, useRef, useState } from "react";

// Import Components
import { Row, Col } from "antd";

// Import File CSS
import classes from "./css/order.module.css";

// Import Icons
import { IoIosArrowForward } from "react-icons/io";

export default function Order() {
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

  // Create + use Hooks
  const orderListRef = useRef();

  // Create + use States
  const [isShowOrderDropdown, setIsShowOrderDropdown] = useState(false);

  // Create + use side Effects
  // ------------- Side Effect: DOM CSS event scroll down
  useEffect(() => {
    if (orderListRef.current.offsetHeight > 500) {
      orderListRef.current.classList.add(classes["scroll"]);
    } else {
      orderListRef.current.classList.remove(classes["scroll"]);
    }
  }, [DUMMY_CART]);

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
            <p>Cart (3 Item)</p>
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
              {DUMMY_CART.map((item) => (
                <div className={classes["order-item"]} key={item.id}>
                  <div className={classes["order-item-detail"]}>
                    <div className={classes["item-image"]}>
                      <img src={item.image} alt={item.image} />
                      <span className={classes["quantity"]}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className={classes["item-info"]}>
                      <p className={classes["item-info-name"]}>{item.name}</p>
                      <p className={classes["item-info-unit"]}>
                        ${item.price} - {item.unit}
                      </p>
                    </div>
                  </div>
                  <div className={classes["order-item-price"]}>
                    <p>${item.total_price}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col className={classes["order-col-footer"]}>
            <p>SUBTOTAL</p>
            <p>$20.66</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}
