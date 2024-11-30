// Import Modules
import { createSlice } from "@reduxjs/toolkit";

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
