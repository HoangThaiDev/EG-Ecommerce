// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/itemCategories.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Components
import SlideCategories from "../../UI/SlideCategories";

export default function ItemCategories() {
  return (
    <div className={classes.category}>
      <div className={classes["category__container"]}>
        <div className={classes["category__header"]}>
          <h2>What do you looking for ?</h2>
          <p>
            Start your day great with organic products. We have a lot of
            category organic
          </p>
        </div>
        <SlideCategories />
      </div>
    </div>
  );
}
