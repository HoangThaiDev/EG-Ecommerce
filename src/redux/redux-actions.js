// Import Slice
import {
  sideMenuSlide,
  menuDropdownSlide,
  modalCartSlide,
} from "./redux-slices";

const reduxActions = {
  sideMenu: sideMenuSlide.actions,
  menuDropdown: menuDropdownSlide.actions,
  modalCart: modalCartSlide.actions,
};

export default reduxActions;
