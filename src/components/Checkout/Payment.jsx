// Import Modules
import React, { useState } from "react";

// Import File CSS
import classes from "./css/payment.module.css";

// Import Icons
import { IoIosArrowBack } from "react-icons/io";

export default function Payment() {
  // Create + use DUMMY_DATA_CONSTANTS
  const DUMMY_PAYMENT_OPTIONS = [
    {
      id: "1",
      title: "Direct bank transfer",
      desc: "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
      value: "direct_bank_transfer",
    },
    {
      id: "2",
      title: "Check payments",
      desc: "Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.",
      value: "check_payments",
    },
    {
      id: "3",
      title: "Cash on delivery",
      desc: "Pay with cash upon delivery.",
      value: "cash_on_delivery",
    },
  ];

  // Create + use States
  const [isShowDescOption, setIsShowDescOption] = useState({
    direct_bank_transfer: true,
    check_payments: false,
    cash_on_delivery: false,
  });

  // Create + use event handles
  const selectOptionHandle = (e, itemTitle) => {
    switch (itemTitle) {
      case "Direct bank transfer":
        setIsShowDescOption((prevState) => ({
          ...prevState,
          direct_bank_transfer: true,
          check_payments: false,
          cash_on_delivery: false,
        }));
        break;
      case "Check payments":
        setIsShowDescOption((prevState) => ({
          ...prevState,
          check_payments: true,
          direct_bank_transfer: false,
          cash_on_delivery: false,
        }));
        break;
      case "Cash on delivery":
        setIsShowDescOption((prevState) => ({
          ...prevState,
          cash_on_delivery: true,
          direct_bank_transfer: false,
          check_payments: false,
        }));
        break;
      default:
        setIsShowDescOption({
          direct_bank_transfer: false,
          check_payments: false,
          cash_on_delivery: false,
        });
        break;
    }
  };

  return (
    <div className={classes["payment"]}>
      <div className={classes["payment-container"]}>
        <h3>Payment</h3>

        <div className={classes["payment-list"]}>
          {DUMMY_PAYMENT_OPTIONS.map((item) => (
            <div className={classes["payment-item"]} key={item.id}>
              <input
                type="radio"
                name="option"
                value={item.title}
                checked={isShowDescOption[item.value]}
                onChange={(e) => selectOptionHandle(e, item.title)}
              />
              <div className={classes["item-info"]}>
                <p className={classes["item-info-title"]}>{item.title}</p>

                <div
                  className={
                    isShowDescOption[item.value]
                      ? `${classes["item-payment-box"]} ${classes["active"]}`
                      : classes["item-payment-box"]
                  }
                >
                  <p className={classes["item-info-desc"]}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
          <div className={classes["payment-actions"]}>
            <button type="button" className={classes["btn-back"]}>
              <IoIosArrowBack className={classes["icon-arrow-back"]} /> BACK TO
              CART
            </button>
            <button type="submit" className={classes["btn-order"]}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
