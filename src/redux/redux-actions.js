// Import Slice
import {
  sideMenuSlide,
  sideUserMenuSlide,
  modalCartSlide,
} from "./redux-slices";

const reduxActions = {
  sideMenu: sideMenuSlide.actions,
  sideUserMenu: sideUserMenuSlide.actions,
  modalCart: modalCartSlide.actions,
};

export default reduxActions;
