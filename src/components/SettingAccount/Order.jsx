// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/order.module.css";

// Import Components
import { Row, Col } from "antd";

// Import Icons
import { TfiEye } from "react-icons/tfi";

function Order() {
  return (
    <div className={classes["order"]}>
      <div className={classes["order-container"]}>
        <Row className={classes["order-row"]}>
          <Col className={classes["order-col-header"]}>
            <p className={classes["header-order-id"]}>Order ID</p>
            <p className={classes["header-order-date"]}>Order Date</p>
            <p className={classes["header-order-status"]}>Status</p>
            <p className={classes["header-order-total"]}>Total</p>
            <p className={classes["header-order-active"]}>Active</p>
          </Col>
          <Col className={classes["order-col-content"]}>
            <div className={classes["order-item"]}>
              <p className={classes["order-item-id"]}>#12345</p>
              <p className={classes["order-item-date"]}>21 August 2021</p>
              <p className={classes["order-item-status"]}>Pending</p>
              <p className={classes["order-item-total"]}>
                $ 200.59 for 10 items
              </p>
              <p className={classes["order-item-active"]}>
                <TfiEye className={classes["icon-eye"]} />
              </p>
            </div>
            <div className={classes["order-item"]}>
              <p className={classes["order-item-id"]}>#12345</p>
              <p className={classes["order-item-date"]}>21 August 2021</p>
              <p className={classes["order-item-status"]}>Pending</p>
              <p className={classes["order-item-total"]}>
                $ 200.59 for 10 items
              </p>
              <p className={classes["order-item-active"]}>
                <TfiEye className={classes["icon-eye"]} />
              </p>
            </div>
            <div className={classes["order-item"]}>
              <p className={classes["order-item-id"]}>#12345</p>
              <p className={classes["order-item-date"]}>21 August 2021</p>
              <p className={classes["order-item-status"]}>Pending</p>
              <p className={classes["order-item-total"]}>
                $ 200.59 for 10 items
              </p>
              <p className={classes["order-item-active"]}>
                <TfiEye className={classes["icon-eye"]} />
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Order;
