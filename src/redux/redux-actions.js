// Import Slices
import {
  sideMenuSlide,
  menuDropdownSlide,
  sideCartSlide,
  userSlide,
  orderSlide,
} from "./redux-slices";

// Create + use actions
const reduxActions = {
  sideMenu: sideMenuSlide.actions,
  menuDropdown: menuDropdownSlide.actions,
  sideCart: sideCartSlide.actions,
  user: userSlide.actions,
  order: orderSlide.actions,
};

export default reduxActions;
