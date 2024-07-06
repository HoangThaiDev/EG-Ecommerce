// Import Modules
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import reduxActions from "../redux/redux-actions";

// Import Files CSS
import classes from "./css/sideMenu.module.css";

// Import Components
import { Row, Col } from "antd";
import { NavLink } from "react-router-dom";

// Import Icons
import { IoMdClose } from "react-icons/io";
import { BiHome } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineGroups } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

function Overlay({ isShowSideMenu, isShowSideUserMenu }) {
  // Create + use Hooks
  const dispatch = useDispatch();

  // Create + use Event handlers
  const hideSideMenu = (event) => {
    if (event.target.classList.value) {
      dispatch(reduxActions.sideMenu.hideSideMenu());
      dispatch(reduxActions.sideUserMenu.hideSideUserMenu());
    }
  };

  return (
    <div
      className={`${classes["overlay"]} ${
        isShowSideMenu || isShowSideUserMenu
          ? `${classes["show"]}`
          : `${classes["hide"]}`
      }`}
      onClick={hideSideMenu}
    ></div>
  );
}

function SideBar({ isShowSideMenu }) {
  // Create + use Hooks
  const dispatch = useDispatch();

  // Create + use Event handlers
  const hideSideMenu = () => {
    dispatch(reduxActions.sideMenu.toggleSideMenu());
  };

  const showSideMenuUser = () => {
    dispatch(reduxActions.sideUserMenu.toggleSideUserMenu());
  };

  return (
    <div
      className={`${classes["sideBar"]} ${
        isShowSideMenu ? `${classes["show"]}` : `${classes["hide"]}`
      }`}
    >
      <div className={classes["sideBar__container"]}>
        <div className={classes["sideBar__header"]}>
          <h2>EG SHOP</h2>
          <IoMdClose className={classes["icon-close"]} onClick={hideSideMenu} />
        </div>

        {/* -------------------------------JSX: ROW--------------------------------------------- */}
        <Row
          className={`${classes["sideBar__row"]} ${classes["sideBar__menu-list"]}`}
        >
          <Col className={classes["sideBar__col"]}>
            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sideBar__menu-item"]}>
              <BiHome className={`${classes.icon} ${classes["icon-home"]}`} />
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.active}`
                    : `${classes.link}`
                }
              >
                Home
              </NavLink>
            </div>

            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sideBar__menu-item"]}>
              <AiOutlineShoppingCart
                className={`${classes.icon} ${classes["icon-products"]}`}
              />
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.active}`
                    : `${classes.link}`
                }
              >
                Products
              </NavLink>
            </div>

            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sideBar__menu-item"]}>
              <IoNewspaperOutline
                className={`${classes.icon} ${classes["icon-blogs"]}`}
              />
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.active}`
                    : `${classes.link}`
                }
              >
                Blogs
              </NavLink>
            </div>
          </Col>
        </Row>

        {/* -------------------------------JSX: ROW--------------------------------------------- */}
        <Row
          className={`${classes["sideBar__row"]} ${classes["sideBar__menu-list"]}`}
        >
          <Col className={classes["sideBar__col"]}>
            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sideBar__menu-item"]}>
              <MdOutlineGroups
                className={`${classes.icon} ${classes["icon-about"]}`}
              />
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.active}`
                    : `${classes.link}`
                }
              >
                About Us
              </NavLink>
            </div>

            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sideBar__menu-item"]}>
              <FiPhoneCall
                className={`${classes.icon} ${classes["icon-contact"]}`}
              />
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.active}`
                    : `${classes.link}`
                }
              >
                Contact Us
              </NavLink>
            </div>

            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sideBar__menu-item"]}>
              <IoMdHelpCircleOutline
                className={`${classes.icon} ${classes["icon-faq"]}`}
              />
              <NavLink
                to="/faqs"
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.active}`
                    : `${classes.link}`
                }
              >
                FAQs
              </NavLink>
            </div>
          </Col>
        </Row>

        {/* -------------------------------JSX: ROW--------------------------------------------- */}
        <Row
          className={`${classes["sideBar__row"]} ${classes["sideBar__menu-list"]}`}
        >
          <Col className={classes["sideBar__col"]}>
            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sideBar__menu-item"]}>
              <AiOutlineUser
                className={`${classes.icon} ${classes["icon-user"]}`}
              />
              <p className={classes.link} onClick={() => showSideMenuUser()}>
                User
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default function SideMenu() {
  const { isShow: isShowSideMenu } = useSelector((state) => state.sideMenu);
  const { isShow: isShowSideUserMenu } = useSelector(
    (state) => state.sideUserMenu
  );

  return (
    <>
      {createPortal(
        <Overlay
          isShowSideMenu={isShowSideMenu}
          isShowSideUserMenu={isShowSideUserMenu}
        />,
        document.getElementById("overlay-sideMenu")
      )}
      <SideBar isShowSideMenu={isShowSideMenu} />
    </>
  );
}

export { Overlay };
