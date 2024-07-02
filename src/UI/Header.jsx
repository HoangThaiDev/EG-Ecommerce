// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/header.module.css";

// Import Components
import { Link } from "react-router-dom";

export default function Header({ title, linkBack, linkCurrent }) {
  return (
    <div className={classes.header}>
      <div className={classes["header__container"]}>
        <div className={classes["header__card"]}>
          <h1>{title}</h1>
          <div className={classes["breadcrumb"]}>
            <Link to="/" className={classes["breadcrumb__link-back"]}>
              {linkBack}
            </Link>
            <span className={classes["breadcrumb__symbol"]}>&#8250;</span>
            <p className={classes["breadcrumb__link-active"]}>{linkCurrent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
