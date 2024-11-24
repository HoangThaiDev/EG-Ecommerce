// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/promotionalBanner.module.css";

// Import Components
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

export default function PromotionalBanners() {
  return (
    <div className={classes["promotional"]}>
      <div className={classes["promotional__container"]}>
        <Row className={classes["promotional__row"]}>
          <Col className={classes["promotional__col"]}>
            <div className={classes["promotional__card"]}>
              <div className={classes["card__content"]}>
                <p>40% Off</p>
                <h2>DAIRY AND EGGS</h2>
                <p>A different kind of EG Store</p>
                <Link to="/" className={classes["card__link"]}>
                  Shop Now
                </Link>
              </div>
            </div>
          </Col>
          <Col className={classes["promotional__col"]}>
            <div className={classes["promotional__card"]}>
              <div className={classes["card__content"]}>
                <p>Fresh</p>
                <h2>VEGETABLE BASKET</h2>
                <p>A beautiful basket with a lot of fresh vegetables</p>
                <Link to="/" className={classes["card__link"]}>
                  Shop Now
                </Link>
              </div>
            </div>
          </Col>
          <Col className={classes["promotional__col"]}>
            <div className={classes["promotional__card"]}>
              <div className={classes["card__content"]}>
                <p>Fresh</p>
                <h2>VEGETABLE</h2>
                <p>EG Store have fresh vegetables</p>
                <Link to="/" className={classes["card__link"]}>
                  Shop Now
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
