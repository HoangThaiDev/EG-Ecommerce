// Import Modules
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/mainCheckout.module.css";

// Import Components
import { Row, Col } from "antd";
import Form from "./Form";
import Order from "./Order";
import { useNavigate } from "react-router-dom";

export default function MainCheckout() {
  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use States
  const [cartDetail, setCartDetail] = useState({
    items: [],
    totalPriceCart: "0",
  });
  const [isLoading, setIsLoading] = useState(true);

  const { isLoggedIn } = useSelector((state) => state.user);

  // Create + use side Effects
  // ------------------ Side effect: Fetch API get cart of client was selected
  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const res = await APIServer.checkout.getCheckout();
        if (res.status === 200) {
          const { cart } = res.data;
          setCartDetail((prev) => ({
            ...prev,
            items: cart.items,
            totalPriceCart: cart.totalPriceCart,
          }));
          setIsLoading(false);
        }
      } catch (error) {
        const { data, status } = error.response;
        if (status !== 200) {
          setIsLoading(true);
          navigate("../");
        }
      }
    };

    if (isLoggedIn) {
      fetchCheckout();
    }
  }, [isLoggedIn]);

  return (
    <div className={classes["main-checkout"]}>
      <div className={classes["main-checkout-container"]}>
        <Row className={classes["main-checkout-row"]}>
          <Col className={classes["main-checkout-col-form"]}>
            <Form />
          </Col>
          <Col className={classes["main-checkout-col-order"]}>
            {!isLoading && <Order cartDetail={cartDetail} />}
          </Col>
        </Row>
      </div>
    </div>
  );
}
