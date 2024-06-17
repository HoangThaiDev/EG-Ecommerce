// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/header.module.css";

// Import Components
import bannerHome from "../../assets/images-banner/banner-home.jpg";

export default function Header() {
  return (
    <div className={classes.header}>
      <div className={classes["header__container"]}>
        <img src={bannerHome} alt={bannerHome} />
        <div className={classes["header__card"]}>
          <h1>Enjoy Organic Grocery With The Best Quality</h1>
          <p>Get your products delivered at your doorsteps all day everyday</p>
          <form className={classes["card__form"]}>
            <input
              type="text"
              placeholder="Search Your Products..."
              className={classes["form__input"]}
            />
            <button type="submit" className={classes["form__btn"]}>
              SEARCH
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
