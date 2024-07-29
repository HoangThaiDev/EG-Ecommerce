// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/descDetail.module.css";

// Import Components
import { Row, Col } from "antd";

export default function DescDetail({ listDesc }) {
  return (
    <div className={classes["main-desc"]}>
      <Row className={classes["main-desc-list"]}>
        {listDesc.long.map((item, index) => (
          <Col key={index} className={classes["main-desc-item"]}>
            <div className={classes["main-desc-item-card"]}>
              <p className={classes["card-title"]}>{item.title}:</p>
              <p className={classes["card-content"]}>- {item.content}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
