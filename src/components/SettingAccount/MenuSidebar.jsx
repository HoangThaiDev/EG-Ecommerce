// Import Modules
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import APIServer from "../../API/customAPI";
import reduxActions from "../../redux/redux-actions";

// Import Components
import { Row, Col } from "antd";

// Import File CSS
import classes from "./css/menuSidebar.module.css";

// Import Icons
import { TbLayoutDashboard } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";

function Menu() {
  // Create + use DUMMY_DATA_CONSTANTS
  const DUMMY_MENU_ACTIONS = [
    {
      id: "1",
      title: "Dashboard",
      value: "dashboard",
      icon: (
        <TbLayoutDashboard
          className={`${classes["icon"]} ${classes["icon-dashboard"]}`}
        />
      ),
    },
    {
      id: "2",
      title: "My Profile",
      value: "profile",
      icon: (
        <AiOutlineUser
          className={`${classes["icon"]} ${classes["icon-user"]}`}
        />
      ),
    },
    {
      id: "3",
      title: "My Order",
      value: "order",
      icon: (
        <IoBagCheckOutline
          className={`${classes["icon"]} ${classes["icon-order"]}`}
        />
      ),
    },
    {
      id: "4",
      title: "Logout",
      value: "logout",
      icon: (
        <AiOutlineLogout
          className={`${classes["icon"]} ${classes["icon-logout"]}`}
        />
      ),
    },
  ];

  // Create + use Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use States
  const [isActiveMenuAction, setIsActiveMenuAction] = useState({
    dashboard: true,
    profile: false,
    order: false,
    setting: false,
  });

  // Create + use side Effect
  // --------------- Side Effect: Check client choose Item of Menu
  useEffect(() => {
    switch (location.pathname) {
      case "/setting-account/profile":
        setIsActiveMenuAction({
          dashboard: false,
          profile: true,
          order: false,
          setting: false,
        });
        break;
      case "/setting-account/order":
        setIsActiveMenuAction({
          dashboard: false,
          profile: false,
          order: true,
          setting: false,
        });
        break;
      case "/setting-account/setting":
        setIsActiveMenuAction({
          dashboard: false,
          profile: false,
          order: false,
          setting: true,
        });
        break;
      default:
        setIsActiveMenuAction({
          dashboard: true,
          profile: false,
          order: false,
          setting: false,
        });
        break;
    }
  }, [location]);

  // Create + use Logics
  const fetchLogout = async () => {
    try {
      const res = await APIServer.user.logout();

      if (res.status === 200) {
        dispatch(reduxActions.user.logout());
        navigate("../");
      }
    } catch (error) {
      const { data } = error.response;
      console.log(data);
    }
  };

  // Create + use event handles
  const changeActionMenuHandle = async (item) => {
    if (item.value !== "logout" && item.value !== "dashboard") {
      return navigate(item.value);
    }

    if (item.value === "dashboard") {
      return navigate("./");
    }

    if (item.value === "logout") {
      return await fetchLogout();
    }
  };

  return (
    <div className={classes["menu-sidebar"]}>
      <div className={classes["menu-sidebar-container"]}>
        <Row className={classes["menu-sidebar-row"]}>
          {DUMMY_MENU_ACTIONS.map((item) => (
            <Col className={classes["menu-sidebar-col"]} key={item.id}>
              <div
                className={
                  isActiveMenuAction[item.value]
                    ? `${classes["item-action"]} ${classes["active"]}`
                    : classes["item-action"]
                }
                onClick={() => changeActionMenuHandle(item)}
              >
                {item.icon}
                <p className={classes["item-action-title"]}>{item.title}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Menu;
