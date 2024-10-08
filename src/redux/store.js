// Import Modules
import { configureStore } from "@reduxjs/toolkit";

// Import Slice
import {
  sideMenuSlide,
  menuDropdownSlide,
  sideCartSlide,
  userSlide,
} from "./redux-slices";

// Create store
const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlide.reducer,
    menuDropdown: menuDropdownSlide.reducer,
    sideCart: sideCartSlide.reducer,
    user: userSlide.reducer,
  },
});

export default store;
