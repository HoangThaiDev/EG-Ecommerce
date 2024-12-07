// Import Modules
import React from "react";
import { useSelector } from "react-redux";
import convertDate from "../../helper/products/convertDate";
// Import File CSS
import classes from "./css/order.module.css";

// Import Components
import { Row, Col } from "antd";

// Import Icons
import { TfiEye } from "react-icons/tfi";

function Order() {
  // Create + use States
  const orders = useSelector((state) => state.order);
  console.log(orders);

  return (
    <div className={classes["order"]}>
      <div className={classes["order-container"]}>
        <Row className={classes["order-row"]}>
          <Col className={classes["order-col-header"]}>
            <p className={classes["header-order-id"]}>Order ID</p>
            <p className={classes["header-order-date"]}>Order Date</p>
            <p className={classes["header-order-status"]}>Status</p>
            <p className={classes["header-order-total"]}>Total</p>
            <p className={classes["header-order-active"]}>Active</p>
          </Col>
          {orders.items.length > 0 &&
            orders.items.map((item) => (
              <Col className={classes["order-col-content"]} key={item._id}>
                <div className={classes["order-item"]}>
                  <p className={classes["order-item-id"]}>
                    #{item._id.slice(0, 4)}
                  </p>
                  <p className={classes["order-item-date"]}>
                    {convertDate(item.createdAt)}
                  </p>
                  <p className={classes["order-item-status"]}>{item.status}</p>
                  <p className={classes["order-item-total"]}>
                    $ {item.checkoutId.cart.totalPriceCart} for{" "}
                    {item.checkoutId.cart.items.length} items
                  </p>
                  <p className={classes["order-item-active"]}>
                    <TfiEye className={classes["icon-eye"]} />
                  </p>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Order;
