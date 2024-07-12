// Import Modules
import React, { useState } from "react";

// Import File CSS
import classes from "./css/itemDetail.module.css";

// Import Components
import { Row, Col, Rate } from "antd";

function ItemDetail({ productDetail }) {
  // Create + use Hooks
  const [imageDetail, setImageDetail] = useState(
    productDetail.image_detail.images[0]
  );

  // Create + use event Handlers
  const viewImageDetailHandler = (index) => {
    setImageDetail(index);
  };
  return (
    <div className={classes["item-detail"]}>
      <div className={classes["item-detail-container"]}>
        <Row className={classes["item-detail-row"]}>
          <Col className={classes["item-detail-col"]}>
            <div className={classes["item-detail-image"]}>
              <div className={classes["image-list"]}>
                {productDetail.image_detail.images.map((value, index) => (
                  <img
                    className={classes["image-item"]}
                    key={index}
                    src={value}
                    loading="lazy"
                    alt={value}
                    onMouseMove={() => viewImageDetailHandler(value)}
                    onClick={() => viewImageDetailHandler(value)}
                  />
                ))}
              </div>
              <img
                className={classes["image-item-active"]}
                src={imageDetail}
                alt={imageDetail}
              />
            </div>
          </Col>
          <Col className={classes["item-detail-col"]}>
            <div className={classes["item-detail-info"]}>
              <div className={classes["info-header"]}>
                <Rate disabled defaultValue={2} />
                <span>(0 Review)</span>
              </div>

              <div className={classes["info-section"]}>
                <h2 className={classes["info-section-title"]}>
                  {productDetail.name}
                </h2>
                <p className={classes["info-section-price-discount"]}>
                  $
                  {productDetail.percent_discount !== 0
                    ? productDetail.price -
                      (productDetail.price * productDetail.percent_discount) /
                        100
                    : productDetail.price}
                  <span className={classes["info-section-price-original"]}>
                    {productDetail.percent_discount !== 0
                      ? `$${productDetail.price}`
                      : ""}
                  </span>
                </p>
              </div>

              <div className={classes["info-desc"]}>
                <p>{productDetail.desc.short}</p>
              </div>

              <div className={classes["info-quantity"]}></div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ItemDetail;
