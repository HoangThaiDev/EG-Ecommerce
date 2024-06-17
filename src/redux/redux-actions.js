// Import Slice
import { sideMenuSlide, sideUserMenuSlide } from "./redux-slices";

const reduxActions = {
  sideMenu: sideMenuSlide.actions,
  sideUserMenu: sideUserMenuSlide.actions,
};

export default reduxActions;
