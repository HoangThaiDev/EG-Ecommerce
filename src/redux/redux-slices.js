// Import Modules
import { createSlice } from "@reduxjs/toolkit";

// Create initialStates
const initialSideMenu = { isShow: false };
const initialMenuDropdown = { isShow: false };
const initialModalCart = { isShow: false };

// Create Slide
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

const modalCartSlide = createSlice({
  initialState: initialModalCart,
  name: "modal-cart",
  reducers: {
    hide(state) {
      return { ...state, isShow: false };
    },
    show(state, action) {
      const product = action.payload.item;
      return { ...state, isShow: true };
    },
  },
});

export { sideMenuSlide, menuDropdownSlide, modalCartSlide };
