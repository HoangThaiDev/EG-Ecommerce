// Import Modules
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import APIServer from "../../API/customAPI";
import reduxActions from "../../redux/redux-actions";
import checkCart from "../../helper/cart/checkCart";
import { useToast } from "../../UI/ToastCustom";

// Import File CSS
import classes from "./css/detailCart.module.css";

// Import Components
import { Row, Col } from "antd";
import HeaderDetailCart from "./HeaderDetailCart";
import SectionDetailCart from "./SectionDetailCart";
import Payment from "./Payment";

export default function DetailCart() {
  // Create + use Hooks
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use States
  const { cart } = useSelector((state) => state.user);

  const [cartAfterSelected, setCartAfterSelected] = useState({
    items: [],
    totalPriceCart: "0",
  });
  const [selectItems, setSelectItems] = useState([]);
  const [isSelectedItems, setIsSelectedItems] = useState(false);
  const [isShowActions, setIsShowActions] = useState(false);

  // ----------------- Side Effect: Update State Cart
  useEffect(() => {
    setCartAfterSelected((prevState) => ({
      ...prevState,
      items: cart.items,
    }));
  }, [cart]);

  // Create + use event handles
  const deleteSelectItemsHandle = async () => {
    if (cartAfterSelected.items.length === 0) return false;

    const selectedItemIds = selectItems.map((item) => {
      return { itemId: item.itemId._id };
    });

    try {
      const res = await APIServer.cart.deleteProducts(selectedItemIds);
      if (res.status === 200) {
        const { cart } = res.data;
        toast.success(
          "Delete product success!",
          "message-cart-delete-product-success"
        );

        // Update States component
        setCartAfterSelected({
          items: [],
          totalPriceCart: "0",
        });
        setSelectItems([]);
        dispatch(reduxActions.user.updateCart(cart));
      }
    } catch (error) {
      const { data, status } = error.response;
      if (status !== 200) {
        toast.success(data.message, ".message-cart-delete-product-error");
      }
    }
  };

  const checkoutHandle = async () => {
    if (selectItems.length === 0) {
      return toast.warning(
        "No product selected!",
        "message-create-checkout-warning"
      );
    }
    const cartAfterChecked = checkCart(selectItems);

    if (!cartAfterChecked) {
      toast.error(
        "Each product has a minimum quantity of 1, a maximum quantity of 20!",
        "message-create-checkout-error"
      );
    }

    if (cartAfterChecked) {
      try {
        const res = await APIServer.checkout.create(cartAfterChecked);
        if (res.status === 200) {
          const cart = res.data;

          dispatch(reduxActions.user.updateCart(cart));
          navigate("/checkout", { replace: true });
        }
      } catch (error) {
        const { data, status } = error.response;

        if (status !== 200) {
          toast.error(data.message, "message-create-checkout-error");
        }
      }
    }
  };

  const selectAllItemsHandle = useCallback(
    (e) => {
      const cloneCart = { ...cartAfterSelected };
      const isSelectAllItem = e.target.checked;

      cloneCart.items = cloneCart.items.map((item) => {
        const cloneItem = { ...item };

        if (isSelectAllItem) {
          if (!cloneItem.checked) {
            cloneItem.checked = true;
          }
          setIsSelectedItems(true);
          setIsShowActions(true);
          return cloneItem;
        }

        setIsSelectedItems(false);
        setIsShowActions(false);
        cloneItem.checked = false;
        return cloneItem;
      });

      // // // Update state Cart after selected
      const filterselectItems = cloneCart.items.filter((item) => item.checked);

      const sumTotalPriceCart = filterselectItems
        .reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.totalPrice), 0)
        .toFixed(2);

      setSelectItems(filterselectItems);
      setCartAfterSelected((prevState) => ({
        ...prevState,
        items: cloneCart.items,
        totalPriceCart: sumTotalPriceCart,
      }));
    },
    [cartAfterSelected]
  );

  const findItemIndex = useCallback(
    (itemId) => {
      const cloneCart = { ...cartAfterSelected };
      const cloneCartItems = [...cloneCart.items];

      // Find index product in cart has products selected
      const itemIndex = cloneCartItems.findIndex(
        (item) => item.itemId._id === itemId
      );

      const product = { ...cloneCartItems[itemIndex] };

      return { cloneCartItems, itemIndex, product };
    },
    [cartAfterSelected]
  );

  const selectItemHandle = useCallback(
    (e, itemId) => {
      const isChecked = e.target.checked;

      const { cloneCartItems, itemIndex, product } = findItemIndex(itemId);

      product.checked = isChecked;
      cloneCartItems[itemIndex] = product;

      const isCheckselectItemsed = cloneCartItems.filter(
        (item) => item.checked
      );

      // If all items selected => option checkbox items true
      if (isCheckselectItemsed.length === cloneCartItems.length) {
        setIsSelectedItems(true);
        setIsShowActions(true);
      } else {
        setIsShowActions(false);
      }

      if (isCheckselectItemsed.length > 1) {
        setIsShowActions(true);
      }

      // // If 1 or more than 1 not check => option checkbox items false
      if (!isChecked) {
        setIsSelectedItems(false);
      }

      // Update State Cart + Items Select
      const filterselectItems = cloneCartItems.filter((item) => item.checked);

      const sumTotalPriceCart = filterselectItems
        .reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.totalPrice), 0)
        .toFixed(2);

      setSelectItems(filterselectItems);
      setCartAfterSelected((prevState) => ({
        ...prevState,
        items: cloneCartItems,
        totalPriceCart: sumTotalPriceCart,
      }));
    },
    [cartAfterSelected]
  );

  const updateQuantityItemHandle = useCallback(
    (itemId, action, e) => {
      const { cloneCartItems, itemIndex, product } = findItemIndex(itemId);

      switch (action) {
        case "increase":
          product.quantity_item++;
          product.totalPrice =
            product.itemId.percent_discount > 0
              ? (
                  parseFloat(product.itemId.price_discount) *
                  product.quantity_item
                ).toFixed(2)
              : (
                  parseFloat(product.itemId.price) * product.quantity_item
                ).toFixed(2);

          break;
        case "decrease":
          if (product.quantity_item === 1) return false;

          product.quantity_item--;
          product.totalPrice =
            product.itemId.percent_discount > 0
              ? (
                  parseFloat(product.itemId.price_discount) *
                  product.quantity_item
                ).toFixed(2)
              : (
                  parseFloat(product.itemId.price) * product.quantity_item
                ).toFixed(2);
          break;
        case "input":
          const valueQuantity = e.target.value;
          product.quantity_item = +valueQuantity;
          product.totalPrice =
            product.itemId.percent_discount > 0
              ? (
                  parseFloat(product.itemId.price_discount) *
                  product.quantity_item
                ).toFixed(2)
              : (
                  parseFloat(product.itemId.price) * product.quantity_item
                ).toFixed(2);
          break;
        default:
          return product;
      }

      cloneCartItems[itemIndex] = product;

      // Update State Cart + Items Select
      const filterselectItems = cloneCartItems.filter((item) => item.checked);

      const sumTotalPriceCart = filterselectItems
        .reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.totalPrice), 0)
        .toFixed(2);

      setSelectItems(filterselectItems);
      setCartAfterSelected((prevState) => ({
        ...prevState,
        items: cloneCartItems,
        totalPriceCart: sumTotalPriceCart,
      }));
    },
    [cartAfterSelected]
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

          {cartAfterSelected.items.length === 0 && (
            <div className={classes["empty-cart"]}>
              <p>
                Your cart is empty. Start shopping now to fill it with your
                favorite items!
              </p>
              <div className={classes["btn-actions"]}>
                <button
                  onClick={() => navigate("/")}
                  className={classes["btn-go-home"]}
                >
                  Back Home
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className={classes["btn-go-shop"]}
                >
                  Shop Now
                </button>
              </div>
            </div>
          )}

          {cartAfterSelected.items.length > 0 &&
            cartAfterSelected.items.map((item) => (
              <Col className={classes["col-item-content"]} key={item._id}>
                <SectionDetailCart
                  item={item}
                  onUpdateQuantityItem={updateQuantityItemHandle}
                  onSelectItem={selectItemHandle}
                />
              </Col>
            ))}
        </Row>

        <Payment
          onSelectAllItems={selectAllItemsHandle}
          onDeleteSelectItems={deleteSelectItemsHandle}
          onCheckout={checkoutHandle}
          isSelectedItems={isSelectedItems}
          selectItems={selectItems}
          cartAfterSelected={cartAfterSelected}
          cart={cart}
        />
      </div>
    </div>
  );
}
