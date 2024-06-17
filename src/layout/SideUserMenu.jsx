// Import Modules
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import reduxActions from "../redux/redux-actions";

// Import Files CSS
import classes from "./css/sideUserMenu.module.css";

// Import Components
import { Row, Col, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { Overlay } from "./SideMenu";

// Import Icons
import { IoMdClose } from "react-icons/io";
import { UserOutlined } from "@ant-design/icons";
import { CiEdit } from "react-icons/ci";

function SideBar() {
  // Create + use Hooks
  const dispatch = useDispatch();
  const { isShow: isShowSideUserMenu } = useSelector(
    (state) => state.sideUserMenu
  );

  // Create + use Event handlers
  const hideSideUserMenu = (event) => {
    dispatch(reduxActions.sideUserMenu.hideSideUserMenu());
  };

  return (
    <div
      className={`${classes["sideBar"]} ${
        isShowSideUserMenu ? `${classes["show"]}` : `${classes["hide"]}`
      }`}
    >
      <div className={classes["sideBar__container"]}>
        {/* -------------------------------JSX: HEADER--------------------------------------------- */}
        <div className={classes["sideBar__header"]}>
          <IoMdClose
            className={classes["icon-close"]}
            onClick={hideSideUserMenu}
          />
        </div>

        {/* -------------------------------JSX: USER--------------------------------------------- */}
        <div className={classes["sideBar__user"]}>
          <Avatar
            size={74}
            icon={<UserOutlined />}
            className={classes.avatar}
          />
          <p className={classes["user__name"]}>
            HoangThai <CiEdit className={classes["icon-edit"]} />
          </p>
        </div>

        {/* -------------------------------JSX: ROW--------------------------------------------- */}
        <Row
          className={`${classes["sideBar__row"]} ${classes["sideBar__menu-list"]}`}
        >
          <Col className={classes["sideBar__col"]}>
            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sideBar__menu-item"]}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.active}`
                    : `${classes.link}`
                }
              >
                Login
              </NavLink>
            </div>

            {/* -------------------------------JSX: COL ITEM--------------------------------------------- */}
            <div className={classes["sideBar__menu-item"]}>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.active}`
                    : `${classes.link}`
                }
              >
                Register
              </NavLink>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default function SideUserMenu() {
  return (
    <>
      <Overlay />
      <SideBar />
    </>
  );
}
