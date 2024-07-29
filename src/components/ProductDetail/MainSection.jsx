// Import Modules
import React, { useState } from "react";

// Import File CSS
import classes from "./css/mainSection.module.css";

// Import Components
import { Row, Col } from "antd";
import ItemDetail from "./ItemDetail";
import DescDetail from "./DescDetail";
import ReviewDetail from "./ReviewDetail";

export default function MainSection({ productDetail }) {
  // Create + use Hooks
  const [optionActive, setOptionActive] = useState({
    desc: true,
    review: false,
    evalute: false,
  });

  //   Create + use event Handlers
  const chooseOptionHandler = (value) => {
    switch (value) {
      case "desc":
        setOptionActive({ desc: true, review: false, evalute: false });
        break;
      case "review":
        setOptionActive({ desc: false, review: true, evalute: false });
        break;
      case "evalute":
        setOptionActive({ desc: false, review: false, evalute: true });
        break;
      default:
        setOptionActive({ desc: true, review: false, evalute: false });
        break;
    }
  };

  return (
    <div className={classes["main-section-product"]}>
      <ItemDetail productDetail={productDetail} />
      <div className={classes["section-product-detail"]}>
        <h3>Product Details</h3>
        <Row className={classes["section-product-row"]}>
          <Col className={classes["section-product-options"]}>
            <button
              type="button"
              className={
                optionActive.desc
                  ? `${classes["section-product-option-desc"]} ${classes["section-product-option-desc-active"]}`
                  : classes["section-product-option-desc"]
              }
              onClick={() => chooseOptionHandler("desc")}
            >
              Descriptions
            </button>
            <button
              type="button"
              className={
                optionActive.review
                  ? `${classes["section-product-option-reviews"]} ${classes["section-product-option-reviews-active"]}`
                  : classes["section-product-option-reviews"]
              }
              onClick={() => chooseOptionHandler("review")}
            >
              Our Review (0)
            </button>
            <button
              type="button"
              className={
                optionActive.evalute
                  ? `${classes["section-product-option-evalute"]} ${classes["section-product-option-evalute-active"]}`
                  : classes["section-product-option-evalute"]
              }
              onClick={() => chooseOptionHandler("evalute")}
            >
              Evalute Product
            </button>
          </Col>
          <Col className={classes["section-product-options-content"]}>
            {optionActive.desc && <DescDetail listDesc={productDetail.desc} />}
            {optionActive.review && <ReviewDetail />}
          </Col>
        </Row>
      </div>
    </div>
  );
}
