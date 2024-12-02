// Import Modules
import React, { useRef, useEffect } from "react";

// Import File CSS
import classes from "./css/payment.module.css";

// Import Icons
import { RiCoupon3Line } from "react-icons/ri";

export default function Payment({
  onSelectAllItems,
  onDeleteSelectItems,
  onCheckout,
  isSelectedItems,
  selectItems,
  cartAfterSelected,
  cart,
}) {
  // Create + use Hooks
  const payMentSumaryRef = useRef();

  // Create + use side Effects
  // ----------------- Side Effect: DOM CSS when scroll down of CartPayment
  useEffect(() => {
    const showPaymentSummary = () => {
      if (window.scrollY >= 800) {
        payMentSumaryRef.current.classList.add(classes.sticky);
      } else {
        payMentSumaryRef.current.classList.remove(classes.sticky);
      }
    };

    if (payMentSumaryRef.current) {
      window.addEventListener("scroll", showPaymentSummary);
    }

    // Clean up event
    return () => {
      window.removeEventListener("scroll", showPaymentSummary);
    };
  }, [cart]);

  return (
    <div className={classes["cart-payment"]} ref={payMentSumaryRef}>
      <div className={classes["cart-payment-container"]}>
        <div className={classes["coupon-code-main"]}>
          <RiCoupon3Line className={classes["icon-coupon"]} />
          <p>Coupon Code</p>
          <form className={classes["form-coupon"]}>
            <input
              className={classes["input-coupon"]}
              type="text"
              placeholder="Coupon Code"
            />
            <button className={classes["btn-add-coupon"]} type="submit">
              Apply Code
            </button>
          </form>
        </div>

        <div className={classes["cart-payment-section"]}>
          <div className={classes["cart-payment-section-action"]}>
            <input
              type="checkbox"
              className={classes["input-selects"]}
              onChange={onSelectAllItems}
              checked={isSelectedItems ? true : false}
            />
            <button className={classes["btn-select-items"]}>
              Select All <span>({selectItems.length})</span>
            </button>
            <button
              className={classes["btn-delete-cart"]}
              type="button"
              onClick={onDeleteSelectItems}
            >
              Delete
            </button>
          </div>

          <div className={classes["cart-payment-section-info"]}>
            <div className={classes["total-price"]}>
              <p className={classes["total-price-title"]}>
                Total Price <span>({selectItems.length} Item):</span>
              </p>
              <p className={classes["total-price-content"]}>
                $ {cartAfterSelected.totalPriceCart}
              </p>
            </div>
            <button
              className={classes["btn-checkout"]}
              type="button"
              onClick={onDeleteSelectItems}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
