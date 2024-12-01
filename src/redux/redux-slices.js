// Import Modules
import { createSlice, current } from "@reduxjs/toolkit";

// Import Func Helpers
import calculatePrice from "../helper/products/calculator";

// Create initialStates
const initialSideMenu = { isShow: false };
const initialSideCart = { isShow: false };
const initialMenuDropdown = { isShow: false };
const initialUser = {
  info_detail: null,
  isLoggedIn: false,
  accessToken: "",
  cart: {
    items: [],
    totalPriceCart: "0",
  },
};

// Create + use Slide
const userSlide = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    save(state, data) {
      const { accessToken, cart, info_detail, isLoggedIn } = data.payload;

      return {
        ...state,
        accessToken: accessToken,
        info_detail: info_detail,
        isLoggedIn: isLoggedIn,
        cart: {
          items: cart.items,
          totalPriceCart: cart.totalPriceCart,
        },
      };
    },

    logout(state) {
      return {
        ...state,
        info_detail: null,
        isLoggedIn: false,
        accessToken: "",
        cart: { items: [], totalPriceCart: "0" },
      };
    },

    updateAccesstoken(state, data) {
      const accessToken = data.payload;

      return { ...state, accessToken: accessToken };
    },

    updateCart(state, data) {
      const { items, totalPriceCart } = data.payload;
      return {
        ...state,
        cart: { items: items, totalPriceCart: totalPriceCart },
      };
    },

    changeQuantityProduct(state, data) {
      const { action, quantityValid, productId } = data.payload;
      const { items } = current(state.cart); // user method current to get value of state
      const cloneItems = [...items];

      // Find index item in cart by id
      const findIndexItem = cloneItems.findIndex(
        (item) => item.itemId._id === productId
      );

      const cloneItem = { ...cloneItems[findIndexItem] };

      // Update value of product
      cloneItem.quantity_item = quantityValid;
      cloneItem.totalPrice = calculatePrice(
        cloneItem.itemId.price,
        cloneItem.itemId.percent_discount,
        cloneItem.quantity_item
      );

      cloneItems[findIndexItem] = cloneItem;
      const newTotalPriceCart = cloneItems.reduce(
        (acc, cur) => parseFloat(acc) + parseFloat(cur.totalPrice),
        0
      );

      return {
        ...state,
        cart: {
          items: cloneItems,
          totalPriceCart: newTotalPriceCart.toFixed(2),
        },
      };
    },
  },
});

const sideCartSlide = createSlice({
  name: "sideCart",
  initialState: initialSideCart,
  reducers: {
    toggle(state) {
      return { ...state, isShow: !state.isShow };
    },

    hide(state) {
      return { ...state, isShow: false };
    },
  },
});

const sideMenuSlide = createSlice({
  name: "sideMenu",
  initialState: initialSideMenu,
  reducers: {
    toggle(state) {
      return { ...state, isShow: !state.isShow };
    },

    hide(state) {
      return { ...state, isShow: false };
    },
  },
});

const menuDropdownSlide = createSlice({
  name: "menu-dropdown",
  initialState: initialMenuDropdown,
  reducers: {
    show(state) {
      return { ...state, isShow: true };
    },

    hide(state) {
      return { ...state, isShow: false };
    },
  },
});

export { sideMenuSlide, menuDropdownSlide, sideCartSlide, userSlide };
