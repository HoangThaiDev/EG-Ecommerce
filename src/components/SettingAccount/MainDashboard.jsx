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
      <Row>
        <Col>
          <MenuSidebar />
        </Col>
        <Col>{/* <Outlet /> */}</Col>
      </Row>
    </div>
  );
}

export default MainDashboard;
