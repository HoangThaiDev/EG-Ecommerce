// Import Modules
import { configureStore } from "@reduxjs/toolkit";

// Import Slices
import {
  sideMenuSlide,
  menuDropdownSlide,
  sideCartSlide,
  userSlide,
  orderSlide,
} from "./redux-slices";

// Create + use store
const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlide.reducer,
    menuDropdown: menuDropdownSlide.reducer,
    sideCart: sideCartSlide.reducer,
    user: userSlide.reducer,
    order: orderSlide.reducer,
  },
});

export default store;
