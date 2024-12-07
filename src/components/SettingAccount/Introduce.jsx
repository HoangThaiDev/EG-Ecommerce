// Import Modules
import React from "react";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/introduce.module.css";

// Import Components
import { Row, Col } from "antd";

function Introduce() {
  // Create + use States
  const orders = useSelector((state) => state.order);

  // Create + use Logics
  const stateOrdersOfUser = {};

  for (let order of orders.items) {
    stateOrdersOfUser[order.status] =
      (stateOrdersOfUser[order.status] || 0) + 1;
    if (stateOrdersOfUser[order.status] < 10) {
      stateOrdersOfUser[order.status] = "0" + stateOrdersOfUser[order.status];
    }
  }

  return (
    <div className={classes["introduce"]}>
      <div className={classes["introduce-container"]}>
        <h4>Hi KumaNguyen</h4>
        <Row className={classes["introduce-row"]}>
          <Col className={classes["introduce-col"]}>
            <div className={classes["item-status"]}>
              <h2>{stateOrdersOfUser["Pending"] || "00"}</h2>
              <p>Pending</p>
            </div>
          </Col>
          <Col className={classes["introduce-col"]}>
            <div className={classes["item-status"]}>
              <h2>{stateOrdersOfUser["Processign"] || "00"}</h2>
              <p>Processign</p>
            </div>
          </Col>
          <Col className={classes["introduce-col"]}>
            <div className={classes["item-status"]}>
              <h2>{stateOrdersOfUser["Picked"] || "00"}</h2>
              <p>Picked</p>
            </div>
          </Col>
          <Col className={classes["introduce-col"]}>
            <div className={classes["item-status"]}>
              <h2>{stateOrdersOfUser["Complete"] || "00"}</h2>
              <p>Complete</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Introduce;
