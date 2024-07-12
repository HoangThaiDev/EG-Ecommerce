// Import Modules
import React, { useMemo } from "react";

// Import File CSS
import classes from "./css/ratedProducts.module.css";

// Import components
import { Link } from "react-router-dom";
import SlideProducts from "../../UI/SlideProducts";

export default function RatedProducts({ products }) {
  // Create + use Hooks
  const filteredTopRateProducts = useMemo(() => {
    return products.filter((product) => product.rating === 5);
  }, [products]);

  return (
    <div className={`${classes["products-rated"]}`}>
      <div className={classes["products__container"]}>
        <div className={classes["products__header"]}>
          <h2>Top Rated Product!</h2>
          <p>
            These products have been rated appreciated and loved by loyal
            customers
          </p>
        </div>

        <div className={classes["products__section"]}>
          <div className={classes["section__header"]}>
            <Link to="/products" className={classes["section__link"]}>
              View All
            </Link>
          </div>

          <div className={classes["section__row"]}>
            {filteredTopRateProducts.length > 0 && (
              <SlideProducts products={filteredTopRateProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
