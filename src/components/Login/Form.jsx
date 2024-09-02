// Import Modules
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Import File CSS
import classes from "./css/form.module.css";

// Import Components
import { Link } from "react-router-dom";
import Input from "./Input";

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

        <form
          className={classes["main-login-form"]}
          onSubmit={formik.handleSubmit}
        >
          <h2>Login Your Account</h2>
          <Input.InputEmail
            formik={formik}
            valueFormik="email"
            label="Email"
            id="email"
            className="input-email"
            classNameError="input-email-error"
            placeholder="Your Email"
            type="email"
          />
          <Input.InputPassword
            formik={formik}
            valueFormik="password"
            label="Password"
            id="password"
            className="input-password"
            classNameError="input-password-error"
            placeholder="Your Password"
            type="password"
          />

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
