// Import Modules
import React, { useEffect, useState } from "react";

// Import File CSS
import classes from "./css/itemDetail.module.css";
import "./css/ant-design/rateReviewItem.css";

// Import Components
import { Row, Col, Rate } from "antd";
import SlideImages from "../../UI/SlideImages";

// Import Icons
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";

function ItemDetail({ productDetail }) {
  // Settings Slider Images
  const settings = {
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
  };

  // Create + use Hooks
  const [imageActive, setImageActive] = useState(
    productDetail.image_detail.banner
  );
  const [imagesProduct, setImagesProduct] = useState(
    productDetail.image_detail.images
  );

  const [countQuantity, setCountQuantity] = useState(1);

  // Side Effect
  useEffect(() => {
    // Update Image when client choose another product
    setImageActive(productDetail.image_detail.banner);
    setImagesProduct(productDetail.image_detail.images);
  }, [productDetail]);

  // Create + use event Handlers
  const changeImageActivelHandler = (value, index) => {
    const cloneImagesProduct = [...imagesProduct];
    cloneImagesProduct[index] = imageActive;

    // Update Image Active + Images Product
    setImageActive(value);
    setImagesProduct(cloneImagesProduct);
  };

  const changeCountQuantityHandler = (option) => {
    if (option === "i") {
      setCountQuantity((prevState) => prevState + 1);
      return false;
    }

    if (option === "d" && countQuantity > 1) {
      setCountQuantity((prevState) => prevState - 1);
      return false;
    }
  };

  return (
    <div className={classes["item-detail"]}>
      <div className={classes["item-detail-container"]}>
        <Row className={classes["item-detail-row"]}>
          <Col className={classes["item-detail-col"]}>
            <div className={classes["item-detail-image"]}>
              <img
                className={classes["image-item-active"]}
                src={imageActive}
                alt={imageActive}
              />
              <div className={classes["image-list"]}>
                {imagesProduct.map((value, index) => (
                  <img
                    className={classes["image-item"]}
                    key={index}
                    src={value}
                    loading="lazy"
                    alt={value}
                    onClick={() => changeImageActivelHandler(value, index)}
                  />
                ))}
              </div>
              <SlideImages
                settings={settings}
                images={imagesProduct}
                className="slider-images-product"
              />
            </div>
          </Col>
          <Col className={classes["item-detail-col"]}>
            <div className={classes["item-detail-info"]}>
              <div className={classes["info-header"]}>
                <Rate
                  className="info-header-rating-product"
                  disabled
                  defaultValue={productDetail.rating}
                />
                <span className={classes["info-header-reviews"]}>
                  (0 Review)
                </span>
                <div className={classes["info-header-tags"]}>
                  {productDetail.percent_discount > 0 && (
                    <p className={classes["info-header-tag-discount"]}>
                      SALE {productDetail.percent_discount} % OFF
                    </p>
                  )}
                  {productDetail.best_seller && (
                    <p className={classes["info-header-tag-best-seller"]}>
                      BEST SELLER
                    </p>
                  )}
                </div>
              </div>

              <div className={classes["info-section"]}>
                <h2 className={classes["info-section-title"]}>
                  {productDetail.name}
                </h2>
                <div className={classes["info-section-price"]}>
                  <p className={classes["price-current"]}>
                    Price: $
                    {productDetail.percent_discount !== 0
                      ? productDetail.price -
                        (productDetail.price * productDetail.percent_discount) /
                          100
                      : productDetail.price}
                    <span>({productDetail.unit})</span>
                  </p>
                </div>
              </div>

              <div className={classes["info-desc"]}>
                <p>{productDetail.desc.short}</p>
              </div>

              <div className={classes["info-quantity"]}>
                <div className={classes["info-flex-quantity"]}>
                  <p>QUANTITY</p>
                  <div className={classes["flex-number"]}>
                    <IoMdArrowDropleft
                      className={classes["btn-decrease-quantity"]}
                      onClick={() => changeCountQuantityHandler("d")}
                    />
                    <span>{countQuantity}</span>
                    <IoMdArrowDropright
                      className={classes["btn-increase-quantity"]}
                      onClick={() => changeCountQuantityHandler("i")}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className={classes["info-quantity-btn-buy"]}
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  className={classes["info-quantity-btn-add"]}
                >
                  Add To Cart
                </button>
              </div>

              <div className={classes["info-specs"]}>
                {/* MFG,Category,Expiry Date,product-specs */}
                <p
                  className={`${classes["info-specs-item"]} ${classes["info-specs-category"]}`}
                >
                  Category:<span>{productDetail.categoryId.title}</span>
                </p>
                <p
                  className={`${classes["info-specs-item"]} ${classes["info-specs-mfg"]}`}
                >
                  MFG:<span>{productDetail.manufacacturing_date}</span>
                </p>
                <p
                  className={`${classes["info-specs-item"]} ${classes["info-specs-mfg"]}`}
                >
                  Expiry_date:
                  <span>{productDetail.expiry_date.fozen} (fozen)</span>
                  <span>|</span>
                  <span>{productDetail.expiry_date.outside} (outside)</span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ItemDetail;
