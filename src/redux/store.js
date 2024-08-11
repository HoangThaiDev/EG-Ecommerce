// Import Modules
import { configureStore } from "@reduxjs/toolkit";

// Import Slice
import {
  sideMenuSlide,
  menuDropdownSlide,
  modalCartSlide,
} from "./redux-slices";

// Create store
const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlide.reducer,
    menuDropdown: menuDropdownSlide.reducer,
    modalCart: modalCartSlide.reducer,
  },
});

export default store;
