// Import Modules
import { configureStore } from "@reduxjs/toolkit";

// Import Slice
import {
  sideMenuSlide,
  sideUserMenuSlide,
  modalCartSlide,
} from "./redux-slices";

// Create store
const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlide.reducer,
    sideUserMenu: sideUserMenuSlide.reducer,
    modalCart: modalCartSlide.reducer,
  },
});

export default store;
