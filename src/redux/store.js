// Import Modules
import { configureStore } from "@reduxjs/toolkit";

// Import Slice
import { sideMenuSlide, sideUserMenuSlide } from "./redux-slices";

// Create store
const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlide.reducer,
    sideUserMenu: sideUserMenuSlide.reducer,
  },
});

export default store;
