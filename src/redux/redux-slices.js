// Import Modules
import { createSlice } from "@reduxjs/toolkit";

// Create initialStates
const initialSideMenu = { isShow: false };
const initialSideUserMenu = { isShow: false };

// Create Slide
const sideMenuSlide = createSlice({
  name: "sideMenu",
  initialState: initialSideMenu,
  reducers: {
    showSideMenu(state) {
      return { ...state, isShow: true };
    },
    hideSideMenu(state) {
      return { ...state, isShow: false };
    },
  },
});

const sideUserMenuSlide = createSlice({
  name: "sideMenu",
  initialState: initialSideUserMenu,
  reducers: {
    showSideUserMenu(state) {
      return { ...state, isShow: true };
    },
    hideSideUserMenu(state) {
      return { ...state, isShow: false };
    },
  },
});

export { sideMenuSlide, sideUserMenuSlide };
