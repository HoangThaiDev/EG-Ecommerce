// Import Modules
import React, { useState, useCallback } from "react";

// Import File CSS
import classes from "./css/detailCart.module.css";

// Import Components
import { Row, Col } from "antd";
import HeaderDetailCart from "./HeaderDetailCart";
import SectionDetailCart from "./SectionDetailCart";

// Import Icons
import { BsInfoLg } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";

const DUMMY_CART = [
  {
    id: "1",
    name: "Duck breast",
    price: 6,
    discount_price: 4,
    percent_discount: 20,
    quantity: 1,
    total_price: 6,
    image:
      "https://res.cloudinary.com/dqrughrs2/image/upload/v1718901079/duck-breast-raw-meat-poultry-barbecue-grill-portion_88242-8715_b50omz.avif",
  },
  {
    id: "2",
    name: "Yogi Tea Stress Relief",
    price: 2,
    discount_price: 0,
    percent_discount: 0,
    quantity: 2,
    total_price: 4,
    image:
      "https://res.cloudinary.com/dqrughrs2/image/upload/v1719159149/716wiPOTyJL._SL1500__i3at6z.jpg",
  },
  {
    id: "3",
    name: "Cottagse Cheese",
    price: 10.66,
    discount_price: 0,
    percent_discount: 0,
    quantity: 1,
    total_price: 10.66,
    image:
      "https://res.cloudinary.com/dqrughrs2/image/upload/v1718892380/63336882-794f-4c90-9592-7c621c0511cb.de6e73546c563606b4376bbe22888c6f_anvlnt.webp",
  },
];

export default function DetailCart() {
  // Create + use Hooks
  const [cart, setCart] = useState(DUMMY_CART);
  const [isSelectedItems, setIsSelectedItems] = useState(false);
  const [isShowActions, setIsShowActions] = useState(false);
  // Create + use event handlers
  const findItemIndex = (itemId) => {
    const cloneCart = [...cart];
    const itemIndex = cloneCart.findIndex((item) => item.id === itemId);
    const product = cloneCart[itemIndex];
    return { cloneCart, itemIndex, product };
  };

  const selectAllItemsHandler = useCallback((e) => {
    const cloneCart = [...cart];
    const isSelectAllItem = e.target.checked;
    let modifiedCloneCart = [];
    if (isSelectAllItem) {
      modifiedCloneCart = cloneCart.map((item) => {
        if (!item.checked) {
          item.checked = true;
          return item;
        }
        return item;
      });
      setIsSelectedItems(true);
      setIsShowActions(true);
    } else {
      modifiedCloneCart = cloneCart.map((item) => {
        item.checked = false;
        return item;
      });
      setIsSelectedItems(false);
      setIsShowActions(false);
    }

    setCart(modifiedCloneCart);
  }, []);

  const selectItemHandler = useCallback((e, itemId) => {
    const isChecked = e.target.checked;
    const { cloneCart, itemIndex, product } = findItemIndex(itemId);
    product.checked = isChecked;
    cloneCart[itemIndex] = product;

    const isCheckItemsSelected = cloneCart.filter((item) => item.checked);
    // If items selected => option checkbox items true
    if (isCheckItemsSelected.length === cloneCart.length) {
      setIsSelectedItems(true);
      setIsShowActions(true);
    } else if (isCheckItemsSelected.length > 1) {
      setIsShowActions(true);
    } else {
      setIsShowActions(false);
    }

    // If 1 or more than 1 not check => option checkbox items false
    if (!isChecked) {
      setIsSelectedItems(false);
    }

    // Update Quantity Product
    setCart(cloneCart);
  }, []);

  const updateQuantityItemHandler = useCallback((itemId, action) => {
    const { cloneCart, itemIndex, product } = findItemIndex(itemId);

    switch (action) {
      case "increase":
        product.quantity = Number(product.quantity) + 1;
        break;
      case "decrease":
        if (product.quantity == 1) {
          alert("Ban muon xoa ha");
          return false;
        }
        product.quantity = Number(product.quantity) - 1;
        break;

      default:
        return product;
    }

    cloneCart[itemIndex] = product;
    setCart(cloneCart);
  }, []);

  const changeQuantityHandler = useCallback(
    (e, itemId) => {
      const inputQuantity = e.target.value;
      const { cloneCart, itemIndex, product } = findItemIndex(itemId);

      // Update Quantity Product
      product.quantity = inputQuantity;
      cloneCart[itemIndex] = product;
      setCart(cloneCart);
    },
    [cart]
  );

  const viewCartDetailHandler = () => {
    const filteredCart = cart.filter((item) => item.checked);
    console.log(filteredCart);
  };

  return (
    <div className={classes["detail-cart"]}>
      <div className={classes["detail-cart-container"]}>
        <Row className={classes["row-cart-list"]}>
          <Col className={classes["col-title"]}>
            <HeaderDetailCart
              onSaveSelectAllItems={selectAllItemsHandler}
              isSelectedItems={isSelectedItems}
            />
            <RiDeleteBin5Line
              className={
                isShowActions
                  ? `${classes["icon-action-delete"]} ${classes["active"]} `
                  : `${classes["icon-action-delete"]} `
              }
            />
            <BsInfoLg
              className={
                isShowActions
                  ? `${classes["icon-action-view"]} ${classes["active"]} `
                  : `${classes["icon-action-view"]} `
              }
              onClick={viewCartDetailHandler}
            />
          </Col>

          {cart.map((item) => (
            <Col className={classes["col-item-content"]} key={item.id}>
              <SectionDetailCart
                item={item}
                onSaveUpdateQuantityItem={updateQuantityItemHandler}
                onSaveChangeQuantity={changeQuantityHandler}
                onSaveSelectItem={selectItemHandler}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
