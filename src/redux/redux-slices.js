// Import Modules
import { createSlice } from "@reduxjs/toolkit";

// Create initialStates
const initialSideMenu = { isShow: false };

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

export { sideMenuSlide };
