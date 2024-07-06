// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/section.module.css";

// Import Components
import { Link } from "react-router-dom";

// Import Icons
import { IoArrowUndoSharp } from "react-icons/io5";

// Import Banner
const bannerImg =
  "https://res.cloudinary.com/dqrughrs2/image/upload/v1720270882/error-404-concept-illustration_114360-1811_ocodhi.jpg";

function Section() {
  return (
    <div className={classes.section}>
      <div className={classes["section__container"]}>
        <img src={bannerImg} alt={bannerImg} loading="lazy" />
        <div className={classes["section__detail"]}>
          <h2>There's Nothing Here</h2>
          <p>
            The page you are looking for may have been renamed or does not exist
            in this server you will be redirected to <span>HOME PAGE</span>{" "}
            shorty
          </p>
          <Link to="/" className={classes["detail-link"]}>
            <IoArrowUndoSharp className={classes["icon-back"]} />
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Section;
