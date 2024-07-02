// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/Introduce.module.css";

// Import Components
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

export default function Introduce() {
  return (
    <div className={classes.introduce}>
      <div className={classes["introduce__container"]}>
        <Row className={classes["introduce__row"]}>
          <Col className={classes["introduce__col"]}>
            <img
              src="https://img.freepik.com/free-photo/man-woman-with-medical-masks-out-grocery-shopping-with-shopping-cart_23-2149483201.jpg?t=st=1719818808~exp=1719822408~hmac=b12980bab981b308d59f0c0daf82f5b5f998e2c486625c666fcd372549a908dd&w=996"
              alt=""
            />
          </Col>
          <Col className={classes["introduce__col"]}>
            <div className={classes["introduce__card"]}>
              <span>Welcome to EG</span>
              <h2 className={classes["card__title"]}>
                What can a great About Us page do for your business?
              </h2>
              <p
                className={`${classes["card__desc"]} ${classes["card__desc1"]}`}
              >
                An About Us page helps your company make a good first
                impression, and is critical for building customer trust and
                loyalty. An About Us page should make sure to cover basic
                information about the store and its founders, explain the
                company's purpose and how it differs from the competition, and
                encourage discussion and interaction.
              </p>
              <p
                className={`${classes["card__desc"]} ${classes["card__desc2"]}`}
              >
                In addition, we also introduce products that have been and are
                being sold on the EG store. As a business, we put the interests
                and health of our customers first!
              </p>
              <div className={classes["card__certifications"]}></div>
              <Link className={classes["card__btn-link"]}>READ MORE</Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
