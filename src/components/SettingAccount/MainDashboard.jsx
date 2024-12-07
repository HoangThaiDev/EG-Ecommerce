// Import Modules
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import APIServer from "../../API/customAPI";
import { useToast } from "../../UI/ToastCustom";
import reduxActions from "../../redux/redux-actions";

// Import File CSS
import classes from "./css/mainDashboard.module.css";

// Import Components
import { Row, Col } from "antd";
import MenuSidebar from "./MenuSidebar";
import { Outlet } from "react-router-dom";

function MainDashboard() {
  // Create + use Hooks
  const toast = useToast();
  const dispatch = useDispatch();

  // Create + use States
  const { isLoggedIn } = useSelector((state) => state.user);

  // Create + use side Effects
  // --------------- Side Effect: Fetch API get checkout
  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const res = await APIServer.order.getOrder();
        if (res.status === 200) {
          const orders = res.data;
          dispatch(reduxActions.order.save(orders));
        }
      } catch (error) {
        const { data, status } = error.response;
        if (status !== 200) {
          toast.error(data.message, "message-order-error");
        }
      }
    };

    if (isLoggedIn) {
      fetchCheckout();
    }
  }, [isLoggedIn]);

  return (
    <div className={classes["main-dashboard"]}>
      <div className={classes["main-dashboard-container"]}>
        <Row className={classes["main-dashboard-row"]}>
          <Col className={classes["main-dashboard-menu"]}>
            <MenuSidebar />
          </Col>
          <Col className={classes["main-dashboard-section"]}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MainDashboard;
