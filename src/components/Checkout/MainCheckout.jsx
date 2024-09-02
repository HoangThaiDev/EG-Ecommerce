// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/mainCheckout.module.css";

// Import Components
import { Row, Col } from "antd";
import Form from "./Form";
import Order from "./Order";
import Payment from "./Payment";

export default function MainCheckout() {
  return (
    <div className={classes["main-checkout"]}>
      <div className={classes["main-checkout-container"]}>
        <Row className={classes["main-checkout-row"]}>
          <Col className={classes["main-checkout-col-form"]}>
            <Form />
            <Payment />
          </Col>
          <Col className={classes["main-checkout-col-order"]}>
            <Order />
          </Col>
        </Row>
      </div>
    </div>
  );
}
