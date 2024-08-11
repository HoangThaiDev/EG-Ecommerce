// Import Modules
import React, { memo } from "react";

// Import File CSS
import classes from "./css/headerDetailCart.module.css";

function HeaderDetailCart({ onSaveSelectAllItems, isSelectedItems }) {
  return (
    <>
      <div className={`${classes["bg-title"]} ${classes["selected"]}`}>
        <input
          type="checkbox"
          className={classes["input-select-items"]}
          checked={isSelectedItems}
          onChange={onSaveSelectAllItems}
        />
      </div>
      <div className={`${classes["bg-title"]} ${classes["image"]}`}>
        <h4 className={classes["title-image"]}>Image</h4>
      </div>
      <div className={`${classes["bg-title"]} ${classes["name"]}`}>
        <h4 className={classes["title-product"]}>Product Name</h4>
      </div>
      <div className={`${classes["bg-title"]} ${classes["unite-price"]}`}>
        <h4 className={classes["title-unite-price"]}>Unite Price</h4>
      </div>
      <div className={`${classes["bg-title"]} ${classes["discount-price"]}`}>
        <h4 className={classes["title-discount-price"]}>Discount Price</h4>
      </div>
      <div className={`${classes["bg-title"]} ${classes["quantity"]}`}>
        <h4 className={classes["title-quantity"]}>Quantity</h4>
      </div>
      <div className={`${classes["bg-title"]} ${classes["subtotal"]}`}>
        <h4 className={classes["title-total-price"]}>Subtotal</h4>
      </div>
      <div className={`${classes["bg-title"]} ${classes["action"]}`}>
        <h4 className={classes["title-action"]}>Action</h4>
      </div>
    </>
  );
}

export default memo(HeaderDetailCart);
