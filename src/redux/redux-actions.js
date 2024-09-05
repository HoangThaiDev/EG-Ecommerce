// Import Slice
import {
  sideMenuSlide,
  menuDropdownSlide,
  sideCartSlide,
  userSlide,
} from "./redux-slices";

const reduxActions = {
  sideMenu: sideMenuSlide.actions,
  menuDropdown: menuDropdownSlide.actions,
  sideCart: sideCartSlide.actions,
  user: userSlide.actions,
};

export default reduxActions;
