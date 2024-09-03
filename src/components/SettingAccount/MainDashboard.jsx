// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/mainDashboard.module.css";

// Import Components
import { Row, Col } from "antd";
import MenuSidebar from "./MenuSidebar";
import { Outlet } from "react-router-dom";

function MainDashboard() {
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
