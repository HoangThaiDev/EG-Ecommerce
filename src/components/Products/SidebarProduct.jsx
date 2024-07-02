// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/sidebarProduct.module.css";

// Import Components
import { Row, Col, Select } from "antd";

export default function SidebarProduct() {
  // Create + use arrays
  const optionsFilter = [
    {
      value: "name:asc",
      label: `A → Z`,
    },
    {
      value: "name:desc",
      label: "Z → A",
    },
    {
      value: "price:asc",
      label: "Price (Low - High)",
    },
    {
      value: "price:desc",
      label: "Price (High - Low)",
    },
    {
      value: "sale:true",
      label: "Sale Off",
    },
    {
      value: "bestSeller:true",
      label: "Best Seller",
    },
  ];

  const optionsRating = [
    {
      value: "star:5",
      label: `5 Star`,
    },
    {
      value: "star:4",
      label: `4 Star`,
    },
    {
      value: "star:3",
      label: `3 Star`,
    },
    {
      value: "star:2",
      label: `2 Star`,
    },
    {
      value: "star:1",
      label: `1 Star`,
    },
  ];
  // Create + use Hooks

  return (
    <div className={classes.sidebarProduct}>
      <div className={classes["products__container"]}>
        <Row
          className={`${classes["products__row"]} ${classes["products__row__header"]}`}
        >
          <Col
            className={`${classes["products__col"]} ${classes["products__col__header"]}`}
          >
            <p>Showing 1 - 12 items &rarr;</p>
          </Col>
          <Col
            className={`${classes["products__col"]} ${classes["products__col__header"]}`}
          >
            <div className={classes["header__form"]}>
              <Select
                className="form__filter-options"
                popupClassName="form__popup__filter-options"
                defaultValue="Filter"
                options={optionsFilter}
                placeholder="Filter"
              />
              <Select
                className="form__filter-rating"
                popupClassName="form__popup_    _filter-rating"
                defaultValue="Popularity"
                options={optionsRating}
                placeholder="Popularity"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
