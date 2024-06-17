// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/header.module.css";

// Import Components
import bannerHome from "../../assets/images-banner/banner-home.avif";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={classes.header}>
      <div className={classes["header__container"]}>
        <img src={bannerHome} alt={bannerHome} />
        <div className={classes["header__card"]}>
          <span>Up to 50% OFF</span>
          <h1>Enjoy Organic Grocery With The Best Quality</h1>
          <p>
            Discover a world of high-quality organic groceries, enjoy daily
            doorstep delivery, and get discounts of up to 50%.
          </p>

          <Link to="/products" className={classes["header__link"]}>
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
