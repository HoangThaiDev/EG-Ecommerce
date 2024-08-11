// Import Modules
import React, { memo } from "react";
import reduxActions from "../../redux/redux-actions";
import { useDispatch } from "react-redux";

// Import File CSS
import classes from "./css/sectionDetailCart.module.css";

// Import Icons
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { BsInfoLg } from "react-icons/bs";
import { GrSearchAdvanced } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function SectionDetailCart({
  item,
  onSaveUpdateQuantityItem,
  onSaveChangeQuantity,
  onSaveSelectItem,
}) {
  // Create + use Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create + use event handlers
  const viewDetailItemHandler = (item) => {
    dispatch(reduxActions.modalCart.show({ item }));
  };

  const deleteItemHandler = (item) => {
    console.log(item);
  };

  const searchItemsSameTypeHandler = (item) => {
    console.log(item);
  };

  const viewDetailProductHandler = (product_id, product_name) => {
    // const modifiedProductName = product_name.split(" ").join("-");
    // navigate(`../product/${modifiedProductName}`, {
    //   state: { productId: product_id },
    //   replace: true,
    // });
  };

  return (
    <div className={classes["list-content-container"]}>
      <div className={`${classes["bg-content"]} ${classes["selected"]}`}>
        <input
          type="checkbox"
          className={classes["input-select-items"]}
          checked={item.checked || false}
          onChange={(e) => onSaveSelectItem(e, item.id)}
        />
      </div>
      <div className={`${classes["bg-content"]} ${classes["image"]}`}>
        <img
          src={item.image}
          alt={item.image}
          loading="lazy"
          onClick={() => viewDetailProductHandler(item.id, item.name)}
        />
      </div>
      <div className={`${classes["bg-content"]} ${classes["name"]}`}>
        <p
          className={classes["product"]}
          onClick={() => viewDetailProductHandler(item.id, item.name)}
        >
          {item.name}
        </p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["unite-price"]}`}>
        <p className={classes["unite-price"]}>${item.price}.00</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["discount-price"]}`}>
        {item.percent_discount > 0 && (
          <p className={classes["discount-price"]}>${item.discount_price}.00</p>
        )}
      </div>
      <div className={`${classes["bg-content"]} ${classes["quantity"]}`}>
        <div className={classes["flex-bg-quantity"]}>
          <div className={classes["buttons-update-quantity"]}>
            <FaMinus
              className={`${classes["icon"]} ${classes["icon-increase"]}`}
              onClick={() => onSaveUpdateQuantityItem(item.id, "decrease")}
            />
            <input
              className={classes["input-quantity"]}
              type="number"
              value={item.quantity}
              onChange={(e) => onSaveChangeQuantity(e, item.id)}
            />
            <FaPlus
              className={`${classes["icon"]} ${classes["icon-decrease"]}`}
              onClick={() => onSaveUpdateQuantityItem(item.id, "increase")}
            />
          </div>
        </div>
      </div>
      <div className={`${classes["bg-content"]} ${classes["subtotal"]}`}>
        <p className={classes["total-price"]}>${item.total_price}</p>
      </div>
      <div className={`${classes["bg-content"]} ${classes["action"]}`}>
        <IoCloseSharp
          className={`${classes["icon"]} ${classes["icon-action-delete"]}`}
          onClick={() => deleteItemHandler(item)}
        />
      </div>
      <div
        className={
          item.checked
            ? `${classes["list-actions"]} ${classes["active"]}`
            : classes["list-actions"]
        }
      >
        <div className={classes["item-action"]}>
          <BsInfoLg
            className={`${classes["icon"]} ${classes["icon-action-view"]}`}
            onClick={() => viewDetailItemHandler(item)}
          />
        </div>
        <div className={classes["item-action"]}>
          <GrSearchAdvanced
            className={`${classes["icon"]} ${classes["icon-action-search-category"]}`}
            onClick={() => searchItemsSameTypeHandler(item)}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(SectionDetailCart);
