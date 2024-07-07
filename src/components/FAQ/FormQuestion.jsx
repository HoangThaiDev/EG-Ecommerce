// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/formQuestion.module.css";

// Import Component
import { Row, Col } from "antd";

function FormQuestion() {
  return (
    <div className={classes["introduce"]}>
      <Row className={classes["introduce__row"]}>
        <Col className={`${classes["introduce__col"]}`}>
          <div className={classes["introduce__header"]}>
            <h3>CUSTOMER SERVICE</h3>
            <p>
              "We are committed to bringing you the best online shopping
              experience with our staff always ready to support and answer all
              your questions.
            </p>
          </div>
        </Col>
        <Col className={`${classes["introduce__col"]}`}>
          <div className={classes["introduce__address"]}>
            <h3>Contact us, with any help?</h3>
            <p>(+84) 707-222-333</p>
            <p>thaindev@gmail.com</p>
          </div>
        </Col>
        <Col className={`${classes["introduce__col"]}`}>
          <form className={classes["introduce__form"]}>
            <h3>Ask any Question?</h3>
            <p>Your email address will not be published.</p>
            <p>Required fields are marked *</p>

            <div className={classes["form-input"]}>
              <label htmlFor="name">Your Name *</label>
              <input
                className={classes["form-input-name"]}
                type="text"
                id="name"
                placeholder="Your Name"
              />
              <textarea
                className={classes["form-input-text"]}
                placeholder="Type your question"
              ></textarea>
              <button className={classes["form-btn-send"]} type="submit">
                Send Now
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default FormQuestion;
