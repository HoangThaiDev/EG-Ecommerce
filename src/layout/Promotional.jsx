// Import Components
import { Row, Col } from "antd";

// Import File CSS
import classes from "./css/promotional.module.css";

// Import Icons
import { FaShippingFast } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

export default function Promotional() {
  return (
    <div className={classes.promotional}>
      <div className={classes["promotional__container"]}>
        <Row className={classes["promotional__row"]}>
          {/* -------------------------JSX: Promotional-Shipping------------------------------- */}
          <Col className={classes["promotional__col"]}>
            <div className={classes["card"]}>
              <FaShippingFast
                className={`${classes.icon} ${classes["icon-shipping"]}`}
              />
              <h3>Fast Free Shipping</h3>
              <span>Around the world</span>
            </div>
          </Col>

          {/* -------------------------JSX: Promotional-Contact------------------------------- */}
          <Col className={classes["promotional__col"]}>
            <div className={classes["card"]}>
              <TfiHeadphoneAlt
                className={`${classes.icon} ${classes["icon-headPhone"]}`}
              />
              <h3>24/7 Supports</h3>
              <span>Contact us 24 hours</span>
            </div>
          </Col>

          {/* -------------------------JSX: Promotional-Secure Money------------------------------- */}
          <Col className={classes["promotional__col"]}>
            <div className={classes["card"]}>
              <GiReceiveMoney
                className={`${classes.icon} ${classes["icon-money"]}`}
              />
              <h3>100% Money Back</h3>
              <span>Guarantee of money return</span>
            </div>
          </Col>

          {/* -------------------------JSX: Promotional-Secure Payment------------------------------- */}
          <Col className={classes["promotional__col"]}>
            <div className={classes["card"]}>
              <RiSecurePaymentLine
                className={`${classes.icon} ${classes["icon-payment"]}`}
              />
              <h3>100% Secure Payment</h3>
              <span>Your payment are safe with us</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
