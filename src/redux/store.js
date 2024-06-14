// Import Modules
import { configureStore } from "@reduxjs/toolkit";

// Import Slice
import { sideMenuSlide } from "./redux-slices";

// Create store
const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlide.reducer,
  },
});

export default store;
