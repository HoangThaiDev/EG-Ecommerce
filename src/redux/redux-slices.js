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
    toggleSideMenu(state) {
      return { ...state, isShow: !state.isShow };
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
    toggleSideUserMenu(state) {
      return { ...state, isShow: !state.isShow };
    },
    hideSideUserMenu(state) {
      return { ...state, isShow: false };
    },
  },
});

export { sideMenuSlide, sideUserMenuSlide };
