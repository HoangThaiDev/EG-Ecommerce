// Import Modules
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import APIServer from "../../API/customAPI";
import reduxActions from "../../redux/redux-actions";

// Import File CSS
import classes from "./css/form.module.css";

// Import Components
import { Link } from "react-router-dom";
import Input from "./Input";

// Import Icons
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

function Form() {
  // Create + use Schema Validate Yup
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
    onSubmit: async (values) => {
      const result = await fetchLogin(values);

      if (result) {
        navigate("../");
        setMessageError({
          isShow: false,
          content: "",
        });
      }
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use States
  const [messageError, setMessageError] = useState({
    isShow: false,
    content: "",
  });

  // Create + use event handles
  const fetchLogin = async (values) => {
    try {
      const res = await APIServer.user.login(values);

      if (res.status === 200) {
        dispatch(reduxActions.user.save({ ...res.data }));
        return true;
      }
    } catch (error) {
      const { data, status } = error.response;
      if (status !== 200) {
        setMessageError({
          isShow: true,
          content: data.message,
        });
      }
    }
  };

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
          {messageError.isShow && (
            <div className={classes["box-message"]}>
              <IoCloseCircleOutline className={classes["icon-error"]} />
              <p className={classes["message-error"]}>{messageError.content}</p>
            </div>
          )}

          <Input.Email
            formik={formik}
            valueFormik="email"
            label="Email"
            id="email"
            className="input-email"
            classNameError="input-email-error"
            placeholder="Your Email"
            type="email"
          />
          <Input.Password
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
              <span>
                <FaGoogle
                  className={`${classes["icon"]} ${classes["icon-google"]}`}
                />
                SIGNIN WITH GOOGLE
              </span>
              <span>
                <FaFacebookF
                  className={`${classes["icon"]} ${classes["icon-facebook"]}`}
                />
                SIGNIN WITH FACEBOOK
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
