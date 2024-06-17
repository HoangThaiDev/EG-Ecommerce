// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/specialProduct.module.css";

// Import components
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

export default function SpecialProduct() {
  return (
    <div className={classes.products}>
      <div className={classes["products__container"]}>
        <div className={classes["products__header"]}>
          <h2>What do you looking for ?</h2>
          <p>
            Start your day great with organic products. We have a lot of
            category organic
          </p>
        </div>

        <div className={classes["products__section"]}>
          <div className={classes["section__header"]}>
            <Link to="/products" className={classes["section__link"]}>
              View All
            </Link>
          </div>

          <Row className={classes["section__row"]}>
            <Col className={classes["section__col"]}></Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
