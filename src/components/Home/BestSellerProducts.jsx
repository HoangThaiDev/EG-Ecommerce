// Import Modules
import React, { useMemo } from "react";

// Import File CSS
import classes from "./css/bestSellerProducts.module.css";
import "./css/ant-design/rate.css";

// Import components
import { Link } from "react-router-dom";
import SlideProducts from "../../UI/SlideProducts";

export default function BestSellerProducts({ products }) {
  // Create + use Hooks
  const filteredBestSellerProducts = useMemo(() => {
    return products.filter((product) => {
      if (product.best_seller) {
        product.price_discount = (
          product.price -
          (product.price * product.percent_discount) / 100
        ).toFixed(2);
        return product;
      }
    });
  }, []);

  // Create + use event handlers
  const viewBestSellerProducts = () => {}; // Chua co y tuong

  return (
    <div className={classes["products-best-seller"]}>
      <div className={classes["products__container"]}>
        <div className={classes["products__header"]}>
          <h2>Best Seller Product!</h2>
          <p>Best-selling products, consumed and favored by many customers</p>
        </div>

        <div className={classes["products__section"]}>
          <div className={classes["section__header"]}>
            <Link to="/products" className={classes["section__link"]}>
              View All
            </Link>
          </div>

          <div className={classes["section__row"]}>
            {filteredBestSellerProducts.length > 0 && (
              <SlideProducts products={filteredBestSellerProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
