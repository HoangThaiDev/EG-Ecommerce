// Import Modules
import React, { useState, useCallback, useEffect, useRef } from "react";

// Import File CSS
import classes from "./css/detailCart.module.css";

// Import Components
import { Row, Col } from "antd";
import HeaderDetailCart from "./HeaderDetailCart";
import SectionDetailCart from "./SectionDetailCart";

// Import Icons
import { RiCoupon3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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

export default function DetailCart() {
  // Create + use Hooks
  const payMentSumaryRef = useRef();
  const navigate = useNavigate();

  // Create + use States
  const [cart, setCart] = useState(DUMMY_CART);
  const [itemsSelect, setItemsSelect] = useState([]);
  const [isSelectedItems, setIsSelectedItems] = useState(false);
  const [isShowActions, setIsShowActions] = useState(false);

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

    window.addEventListener("scroll", showPaymentSummary);

    // Clean up event
    return () => {
      window.removeEventListener("scroll", showPaymentSummary);
    };
  }, []);

  // Create + use event handles
  const checkoutHandle = () => {
    if (itemsSelect.length === 0) {
      alert("No product selected!");
      return false;
    }

    navigate("/checkout", { replace: true });
  };

  const findItemIndex = (itemId) => {
    const cloneCart = [...cart];
    const itemIndex = cloneCart.findIndex((item) => item.id === itemId);
    const product = cloneCart[itemIndex];
    return { cloneCart, itemIndex, product };
  };

  const selectAllItemsHandle = useCallback((e) => {
    const cloneCart = [...cart];
    const isSelectAllItem = e.target.checked;
    let modifiedCloneCart = [];

    if (isSelectAllItem) {
      modifiedCloneCart = cloneCart.map((item) => {
        if (!item.checked) {
          item.checked = true;
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

    // Update state Cart + Items Select
    const filterItemsSelect = modifiedCloneCart.filter((item) => item.checked);

    setItemsSelect(filterItemsSelect);
    setCart(modifiedCloneCart);
  }, []);

  const selectItemHandle = useCallback((e, itemId) => {
    const isChecked = e.target.checked;
    const { cloneCart, itemIndex, product } = findItemIndex(itemId);
    product.checked = isChecked;
    cloneCart[itemIndex] = product;

    const isCheckItemsSelected = cloneCart.filter((item) => item.checked);
    // If items selected => option checkbox items true
    if (isCheckItemsSelected.length === cloneCart.length) {
      setIsSelectedItems(true);
      setIsShowActions(true);
    } else {
      setIsShowActions(false);
    }

    if (isCheckItemsSelected.length > 1) {
      setIsShowActions(true);
    }

    // If 1 or more than 1 not check => option checkbox items false
    if (!isChecked) {
      setIsSelectedItems(false);
    }

    // Update State Cart + Items Select
    const filterItemsSelect = cloneCart.filter((item) => item.checked);

    setItemsSelect(filterItemsSelect);
    setCart(cloneCart);
  }, []);

  const updateQuantityItemHandle = useCallback((itemId, action) => {
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

  const changeQuantityHandle = useCallback(
    (e, itemId) => {
      const inputQuantity = e.target.value;
      const { cloneCart, itemIndex, product } = findItemIndex(itemId);

      if (inputQuantity.length == 0) {
        product.quantity = 1;
      } else {
        product.quantity = inputQuantity;
      }
      // Update Quantity Product
      cloneCart[itemIndex] = product;
      setCart(cloneCart);
    },
    [cart]
  );

  return (
    <div className={classes["detail-cart"]}>
      <div className={classes["detail-cart-container"]}>
        <Row className={classes["row-cart-list"]}>
          <Col
            className={
              isShowActions
                ? `${classes["col-title"]} ${classes["active"]}`
                : classes["col-title"]
            }
          >
            <HeaderDetailCart
              onSaveSelectAllItems={selectAllItemsHandle}
              isSelectedItems={isSelectedItems}
            />
          </Col>

          {cart.map((item) => (
            <Col className={classes["col-item-content"]} key={item.id}>
              <SectionDetailCart
                item={item}
                onUpdateQuantityItem={updateQuantityItemHandle}
                onChangeQuantity={changeQuantityHandle}
                onSelectItem={selectItemHandle}
              />
            </Col>
          ))}
        </Row>

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
                  onChange={selectAllItemsHandle}
                  checked={isSelectedItems ? true : false}
                />
                <button className={classes["btn-select-items"]}>
                  Select All <span>({itemsSelect.length})</span>
                </button>
                <button className={classes["btn-delete-cart"]} type="button">
                  Delete
                </button>
              </div>
              <div className={classes["cart-payment-section-info"]}>
                <div className={classes["total-price"]}>
                  <p className={classes["total-price-title"]}>
                    Total Price <span>({itemsSelect.length} Item):</span>
                  </p>
                  <p className={classes["total-price-content"]}>$120.29</p>
                </div>
                <button
                  className={classes["btn-checkout"]}
                  type="button"
                  onClick={checkoutHandle}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
