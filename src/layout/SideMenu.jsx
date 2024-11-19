// Import Modules
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import reduxActions from "../redux/redux-actions";

// Import Files CSS
import classes from "./css/sideMenu.module.css";

// Import Components
import { Row, Col } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// Import Icons
import { IoMdClose } from "react-icons/io";
import { BiHome } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineGroups } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

function Overlay({ isShowSideMenu }) {
  // Create + use Hooks
  const dispatch = useDispatch();

  // Create + use Event handles
  const hideSideMenu = (event) => {
    if (event.target.classList.value) {
      dispatch(reduxActions.sideMenu.hide());
    }
  };

  return (
    <div
      className={`${classes["overlay"]} ${
        isShowSideMenu ? `${classes["show"]}` : `${classes["hide"]}`
      }`}
      onClick={hideSideMenu}
    ></div>
  );
}

function SideBar({ isShowSideMenu }) {
  // Create + use Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationPath = useLocation();

  // Create + use States
  const stateUser = useSelector((state) => state.user);

  // Create + use side Effects
  // ------------- Side Effect: SidteMenu will hide when change page -------------
  useEffect(() => {
    if (locationPath.pathname !== "") {
      dispatch(reduxActions.sideMenu.hide());
    }
  }, [locationPath]);

  // Create + use Event handles
  const hideSideMenu = () => {
    dispatch(reduxActions.sideMenu.toggle());
  };

  const logoutAccount = () => {
    localStorage.removeItem("user");
    dispatch(reduxActions.user.restart());
    navigate("../");
  };

  return (
    <div
      className={`${classes["sidebar"]} ${
        isShowSideMenu ? `${classes["show"]}` : `${classes["hide"]}`
      }`}
    >
      <div className={classes["sidebar__container"]}>
        <div className={classes["sidebar__header"]}>
          <h2>EG SHOP</h2>
          <IoMdClose className={classes["icon-close"]} onClick={hideSideMenu} />
        </div>

        {/* -------------------------------JSX: ROW--------------------------------------------- */}
        <Row
          className={`${classes["sidebar__row"]} ${classes["sidebar__menu-list"]}`}
        >
          <Col className={classes["sidebar__col"]}>
            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sidebar__menu-item"]}>
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
            <div className={classes["sidebar__menu-item"]}>
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
          </Col>
        </Row>

        {/* -------------------------------JSX: ROW--------------------------------------------- */}
        <Row
          className={`${classes["sidebar__row"]} ${classes["sidebar__menu-list"]}`}
        >
          <Col className={classes["sidebar__col"]}>
            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sidebar__menu-item"]}>
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
            <div className={classes["sidebar__menu-item"]}>
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
            <div className={classes["sidebar__menu-item"]}>
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

            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sidebar__menu-item"]}>
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
          className={`${classes["sidebar__row"]} ${classes["sidebar__menu-list"]}`}
        >
          <Col className={classes["sidebar__col"]}>
            <div className={classes["sidebar__menu-item"]}>
              <AiOutlineUser
                className={`${classes.icon} ${classes["icon-user"]}`}
              />
              {stateUser.isLogin ? (
                <a className={classes.link} onClick={logoutAccount}>
                  Logout
                </a>
              ) : (
                <NavLink to="/login" className={classes.link}>
                  Login / Register
                </NavLink>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default function SideMenu() {
  // Create + use States
  const { isShow: isShowSideMenu } = useSelector((state) => state.sideMenu);

  return (
    <>
      {createPortal(
        <Overlay isShowSideMenu={isShowSideMenu} />,
        document.getElementById("overlay")
      )}
      <SideBar isShowSideMenu={isShowSideMenu} />
    </>
  );
}
