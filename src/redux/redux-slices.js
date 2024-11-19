// Import Modules
import { createSlice } from "@reduxjs/toolkit";

// Create initialStates
const initialSideMenu = { isShow: false };
const initialSideCart = { isShow: false };
const initialMenuDropdown = { isShow: false };
const initialUser = {
  isLogin: false,
  cart: [],
};

// Create + use Slide
const userSlide = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    save(state, data) {
      const { isLogin } = data.payload;
      return { ...state, isLogin: isLogin };
    },
    restart(state) {
      return { ...state, isLogin: false, cart: [] };
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
