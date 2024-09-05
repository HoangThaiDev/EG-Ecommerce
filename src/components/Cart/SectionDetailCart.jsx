// Import Modules
import React, { memo, useMemo } from "react";

// Import File CSS
import classes from "./css/sectionDetailCart.module.css";

// Import Icons
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { GrSearchAdvanced } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function SectionDetailCart({
  item,
  onUpdateQuantityItem,
  onChangeQuantity,
  onSelectItem,
}) {
  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use event handlers
  const deleteItemHandler = (item) => {
    console.log(item);
  };

  const searchItemsSameTypeHandler = (item) => {
    console.log(item);
  };

  const viewDetailProductHandler = (product_id, product_name) => {
    const modifiedProductName = product_name.split(" ").join("-");
    navigate(`../product/${modifiedProductName}`, {
      state: { productId: product_id },
      replace: true,
    });
  };

  return (
    <div className={classes["list-content-container"]}>
      <div className={`${classes["bg-content"]} ${classes["selected"]}`}>
        <input
          type="checkbox"
          className={classes["input-select-items"]}
          checked={item.checked || false}
          onChange={(e) => onSelectItem(e, item.id)}
        />
      </div>
      <div className={`${classes["bg-content"]} ${classes["product"]}`}>
        <img
          src={item.image}
          alt={item.image}
          loading="lazy"
          onClick={() => viewDetailProductHandler(item.id, item.name)}
        />
        <div className={classes["product-detail"]}>
          <p className={classes["product-detail-name"]}>{item.name}</p>
          <p className={classes["product-detail-unit"]}>
            Unit: <span>{item.unit}</span>
          </p>
          <p className={classes["product-detail-price"]}>
            <span className={classes["price-current"]}>${item.price}</span>
            <span className={classes["price-old"]}>${item.price}</span>
          </p>
        </div>
      </div>
      <div className={`${classes["bg-content"]} ${classes["quantity"]}`}>
        <div className={classes["flex-bg-quantity"]}>
          <div className={classes["buttons-update-quantity"]}>
            <FaMinus
              className={`${classes["icon"]} ${classes["icon-decrease"]}`}
              onClick={() => onUpdateQuantityItem(item.id, "decrease")}
            />
            <input
              className={classes["input-quantity"]}
              type="number"
              value={item.quantity}
              onChange={(e) => onChangeQuantity(e, item.id)}
            />
            <FaPlus
              className={`${classes["icon"]} ${classes["icon-increase"]}`}
              onClick={() => onUpdateQuantityItem(item.id, "increase")}
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
        <GrSearchAdvanced
          className={`${classes["icon"]} ${classes["icon-action-find"]}`}
          onClick={() => searchItemsSameTypeHandler(item)}
        />
      </div>
    </div>
  );
}

export default memo(SectionDetailCart);
