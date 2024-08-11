// Import Modules
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Import File CSS
import classes from "./css/form.module.css";

// Import Components
import { Link } from "react-router-dom";

// Import Icons
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

function Form() {
  // Create Schema Validate Yup
  const FormLoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .matches(/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email!"),
    password: Yup.string().required("Password is required"),
  });

  // Create + use Hooks
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: FormLoginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              className={
                formik.touched.email && formik.errors.email
                  ? `${classes["input-email"]} ${classes["input-email-error"]}`
                  : classes["input-email"]
              }
              type="email"
              id="email"
              placeholder="Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && (
              <p className={classes["message-error"]}>{formik.errors.email}</p>
            )}
          </div>
          <div className={classes["form-input"]}>
            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <input
              className={
                formik.touched.password && formik.errors.password
                  ? `${classes["input-password"]} ${classes["input-password-error"]}`
                  : classes["input-password"]
              }
              type="password"
              id="password"
              placeholder="abcdef*******"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && (
              <p className={classes["message-error"]}>
                {formik.errors.password}
              </p>
            )}
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
