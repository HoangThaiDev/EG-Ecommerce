// Import Modules
import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import APIServer from "../../API/customAPI";
import Swal from "sweetalert2";
import { useToast } from "../../UI/ToastCustom";

// Import File CSS
import classes from "./css/form.module.css";

// Import Components
import { Link } from "react-router-dom";
import Input from "./Input";

// Import Icons
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

function Form() {
  // Create + use Schema Validate Yup
  const FormLoginSchema = Yup.object().shape({
    firstName: Yup.string().required("FirstName is required!"),
    lastName: Yup.string().required("LastName is required!"),
    email: Yup.string()
      .required("Email is required!")
      .matches(/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email!"),
    password: Yup.string()
      .min(4, "Password must be 4 characters or more ")
      .required("Password is required!"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required!")
      .oneOf([Yup.ref("password")], "Passwords must match!"),
  });

  // Create + use Hooks
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: FormLoginSchema,
    onSubmit: async (values) => {
      // Check client accept terms & policy of website
      if (!isTermsAccepted) {
        alert('You need accept "Terms & Policy"');
        return false;
      }

      const result = await fetchRegister(values);

      if (result) {
        Swal.fire({
          customClass: {
            container: "popup-message-contact",
          },
          title: "Register Success!",
          html: `
          <p class='title'>Welcome to EG SHOP, have a nice day!</p>       
          `,
          icon: "success",
          confirmButtonText: "Close",
        })
          .then(() => {
            navigate("../login", { replace: true });
          })
          .catch((err) => console.log(err));
      }
    },
  });

  const toast = useToast();
  const navigate = useNavigate();

  // Create + use States
  const [isTermsAccepted, setIsTermAccepted] = useState(false);

  // Create + use event handles
  const checkTermsAcceptedHandle = (e) => {
    setIsTermAccepted(e.target.checked);
  };

  const fetchRegister = async (values) => {
    try {
      const res = await APIServer.user.register(values);

      if (res.status === 201) return true;
    } catch (error) {
      const { data, status } = error.response;
      if (status !== 201) {
        toast.error(data.message, "message-register-error");
      }
      return false;
    }
  };

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

        <form
          className={classes["main-register-form"]}
          onSubmit={formik.handleSubmit}
        >
          <h2>Register Your Account</h2>
          <Input.FirstName
            formik={formik}
            valueFormik="firstName"
            label="First Name"
            id="firstName"
            className="input-firstName"
            classNameError="input-firstName-error"
            placeholder="Your First Name"
            type="text"
          />
          <Input.LastName
            formik={formik}
            valueFormik="lastName"
            label="Last Name"
            id="lastName"
            className="input-lastName"
            classNameError="input-lastName-error"
            placeholder="Your Last Name"
            type="text"
          />
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
            placeholder="abcdef*******"
            type="password"
          />
          <Input.ConfirmPassword
            formik={formik}
            valueFormik="confirmPassword"
            label="Confirm Password"
            id="confirmPassword"
            className="input-confirmPpassword"
            classNameError="input-confirmPassword-error"
            placeholder="abcdef*******"
            type="password"
          />

          <div className={classes["form-input-footer"]}>
            <div className={classes["form-input-check-remember"]}>
              <input
                className={classes["form-input-checkbox"]}
                type="checkbox"
                id="remember"
                onChange={checkTermsAcceptedHandle}
              />
              <label htmlFor="remember">
                I agree to the <span>Terms & Policy</span>
              </label>
            </div>

            <button className={classes["form-btn-create"]} type="submit">
              CREATE AN ACCOUNT
            </button>
          </div>
          <div className={classes["form-register-social"]}>
            <p>OR SIGN IN WITH</p>
            <div className={classes["form-register-btn"]}>
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
