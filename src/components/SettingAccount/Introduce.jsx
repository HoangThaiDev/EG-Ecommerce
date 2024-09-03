// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/introduce.module.css";

// Import Components
import { Row, Col } from "antd";

function Introduce() {
  return (
    <div className={classes["introduce"]}>
      <div className={classes["introduce-container"]}>
        <h4>Hi KumaNguyen</h4>
        <Row className={classes["introduce-row"]}>
          <Col className={classes["introduce-col"]}>
            <div className={classes["item-status"]}>
              <h2>00</h2>
              <p>Pending</p>
            </div>
          </Col>
          <Col className={classes["introduce-col"]}>
            <div className={classes["item-status"]}>
              <h2>00</h2>
              <p>Processign</p>
            </div>
          </Col>
          <Col className={classes["introduce-col"]}>
            <div className={classes["item-status"]}>
              <h2>00</h2>
              <p>Picked</p>
            </div>
          </Col>
          <Col className={classes["introduce-col"]}>
            <div className={classes["item-status"]}>
              <h2>00</h2>
              <p>Complete</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Introduce;
