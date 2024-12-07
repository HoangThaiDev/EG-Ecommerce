// Import Modules
import React, { memo, useContext } from "react";
import APIServer from "../../API/customAPI";
import reduxActions from "../../redux/redux-actions";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../../storeContext/APIContext";
import { useDispatch } from "react-redux";
import { useToast } from "../../UI/ToastCustom";

// Import File CSS
import classes from "./css/sectionDetailCart.module.css";

// Import Icons
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { GrSearchAdvanced } from "react-icons/gr";

function SectionDetailCart({ item, onUpdateQuantityItem, onSelectItem }) {
  // Create + use Hooks
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useContext(APIContext);

  // Create + use event handles
  const deleteItemHandle = async (product) => {
    const productId = product.itemId._id;

    try {
      const res = await APIServer.cart.deleteProduct(productId);
      if (res.status === 200) {
        const { cart } = res.data;
        toast.success(
          "Delete product success!",
          "message-cart-delete-product-success"
        );
        dispatch(reduxActions.user.updateCart(cart));
      }
    } catch (error) {
      const { data, status } = error.response;
      if (status !== 200) {
        toast.success(data.message, "message-cart-delete-product-error");
      }
    }
  };

  const searchItemsSameTypeHandle = (item) => {
    const getTitleCategory = categories.find(
      (category) => category._id === item.itemId.categoryId
    );

    navigate(`/products?category=${getTitleCategory.title}`);
  };

  const viewDetailProductHandle = (product_id, product_name) => {
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
          onChange={(e) => onSelectItem(e, item.itemId._id)}
        />
      </div>

      <div className={`${classes["bg-content"]} ${classes["product"]}`}>
        <img
          src={item.itemId.image_detail.banner}
          alt={item.itemId.image_detail.banner}
          loading="lazy"
          onClick={() =>
            viewDetailProductHandle(item.itemId._id, item.itemId.name)
          }
        />
        <div className={classes["product-detail"]}>
          <p className={classes["product-detail-name"]}>{item.itemId.name}</p>
          <p className={classes["product-detail-unit"]}>
            Unit: <span>{item.itemId.unit}</span>
          </p>
          <div className={classes["product-detail-price"]}>
            {item.itemId.price_discount ? (
              <>
                <p className={classes["product-detail-price-origin-old"]}>
                  ${item.itemId.price}
                </p>

                <p className={classes["product-detail-price-discount"]}>
                  ${item.itemId.price_discount}
                </p>
              </>
            ) : (
              <p className={classes["product-detail-price-origin"]}>
                ${item.itemId.price}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={`${classes["bg-content"]} ${classes["quantity"]}`}>
        <div className={classes["flex-bg-quantity"]}>
          <div className={classes["buttons-update-quantity"]}>
            <FaMinus
              className={`${classes["icon"]} ${classes["icon-decrease"]}`}
              onClick={(e) =>
                onUpdateQuantityItem(item.itemId._id, "decrease", e)
              }
            />
            <input
              className={classes["input-quantity"]}
              type="number"
              value={item.quantity_item}
              onChange={(e) =>
                onUpdateQuantityItem(item.itemId._id, "input", e)
              }
            />
            <FaPlus
              className={`${classes["icon"]} ${classes["icon-increase"]}`}
              onClick={(e) =>
                onUpdateQuantityItem(item.itemId._id, "increase", e)
              }
            />
          </div>
        </div>
      </div>

      <div className={`${classes["bg-content"]} ${classes["subtotal"]}`}>
        <p className={classes["total-price"]}>${item.totalPrice}</p>
      </div>

      <div className={`${classes["bg-content"]} ${classes["action"]}`}>
        <IoCloseSharp
          className={`${classes["icon"]} ${classes["icon-action-delete"]}`}
          onClick={() => deleteItemHandle(item)}
        />
        <GrSearchAdvanced
          className={`${classes["icon"]} ${classes["icon-action-find"]}`}
          onClick={() => searchItemsSameTypeHandle(item)}
        />
      </div>
    </div>
  );
}

export default memo(SectionDetailCart);
