// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/form.module.css";

// Import Components
import { Link } from "react-router-dom";

// Import Icons
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

function Form() {
  return (
    <div className={classes["main-register"]}>
      <div className={classes["main-register-container"]}>
        <div className={classes["main-register-header"]}>
          <Link
            className={`${classes["main-register-header-link"]} ${classes["main-register-header-link-register"]}`}
          >
            Register
          </Link>
          <Link
            className={`${classes["main-register-header-link"]} ${classes["main-register-header-link-login"]}`}
            to="/login"
          >
            Login
          </Link>
        </div>

        <form className={classes["main-register-form"]}>
          <h2>Register Your Account</h2>
          <div className={classes["form-input"]}>
            <label htmlFor="firstname">First Name*</label>
            <input
              className={classes["form-input-firstname"]}
              type="text"
              id="firstname"
              placeholder="Your First Name"
            />
          </div>
          <div className={classes["form-input"]}>
            <label htmlFor="lastname">Last Name*</label>
            <input
              className={classes["form-input-lastname"]}
              type="text"
              id="lastname"
              placeholder="Your Last Name"
            />
          </div>
          <div className={classes["form-input"]}>
            <label htmlFor="email">Email*</label>
            <input
              className={classes["form-input-email"]}
              type="email"
              id="email"
              placeholder="Your Email"
            />
          </div>
          <div className={classes["form-input"]}>
            <label htmlFor="password">Password*</label>
            <input
              className={classes["form-input-password"]}
              type="password"
              id="current-password"
              placeholder="abcdef*******"
            />
          </div>
          <div className={classes["form-input"]}>
            <label htmlFor="confirm-password">Confirm Password*</label>
            <input
              className={classes["form-input-confirm-password"]}
              type="password"
              id="confirm-password"
              placeholder="abcdef*******"
            />
          </div>
          <div className={classes["form-input-footer"]}>
            <div className={classes["form-input-check-remember"]}>
              <input
                className={classes["form-input-checkbox"]}
                type="checkbox"
                id="remember"
              />
              <label htmlFor="remember">
                I agree to the <span>Terms & Policy</span>
              </label>
            </div>

            <button className={classes["form-btn-create"]} type="submit">
              CREATE AN ACCOUNT
            </button>
          </div>
          <div className={classes["form-signin-social"]}>
            <p>OR SIGN IN WITH</p>
            <div className={classes["form-signin-btn"]}>
              <Link>
                <FaGoogle
                  className={`${classes["icon"]} ${classes["icon-google"]}`}
                />
                SIGNIN WITH GOOGLE
              </Link>
              <Link>
                <FaFacebookF
                  className={`${classes["icon"]} ${classes["icon-facebook"]}`}
                />
                SIGNIN WITH FACEBOOK
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
