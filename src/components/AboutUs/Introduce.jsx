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
              src="https://res.cloudinary.com/eg-shop/image/upload/v1733621785/hombre-mujer-mascaras-medicas-comprando-comestibles-carrito-compras_23-2149483201_ailjer_fx082p.jpg"
              alt="https://res.cloudinary.com/eg-shop/image/upload/v1733621785/hombre-mujer-mascaras-medicas-comprando-comestibles-carrito-compras_23-2149483201_ailjer_fx082p.jpg"
              loading="lazy"
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
