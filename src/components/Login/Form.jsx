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
    <div className={classes["main-login"]}>
      <div className={classes["main-login-container"]}>
        <div className={classes["main-login-header"]}>
          <Link
            className={`${classes["main-login-header-link"]} ${classes["main-login-header-link-register"]}`}
            to="/register"
          >
            Register
          </Link>
          <Link
            className={`${classes["main-login-header-link"]} ${classes["main-login-header-link-login"]}`}
          >
            Login
          </Link>
        </div>

        <form className={classes["main-login-form"]}>
          <h2>Login Your Account</h2>
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
          <div className={classes["form-input-footer"]}>
            <div className={classes["form-input-check-remember"]}>
              <input
                className={classes["form-input-checkbox"]}
                type="checkbox"
                id="remember"
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link
              className={classes["form-input-footer-forgot-password"]}
              to="/forget-password"
            >
              Forgotten password?
            </Link>
            <button className={classes["form-btn-create"]} type="submit">
              LOGIN AN ACCOUNT
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
