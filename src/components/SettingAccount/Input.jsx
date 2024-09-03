// Import Modules
import React, { useState } from "react";

// Import Icons
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

function FirstName({ classes, formik }) {
  return (
    <div
      className={`${classes["form-input"]} ${classes["form-input-firstName"]}`}
    >
      <label htmlFor="firstName">
        First name <span>*</span>
      </label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="Your first name"
        className={
          formik.touched.firstName && formik.errors.firstName
            ? classes["input-error"]
            : classes["input-valid"]
        }
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.firstName && (
        <p className={classes["message-error"]}>{formik.errors.firstName}</p>
      )}
    </div>
  );
}

function LastName({ classes, formik }) {
  return (
    <div
      className={`${classes["form-input"]} ${classes["form-input-lastName"]}`}
    >
      <label htmlFor="lastName">
        Last name <span>*</span>
      </label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Your last name"
        className={
          formik.touched.lastName && formik.errors.lastName
            ? classes["input-error"]
            : classes["input-valid"]
        }
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.lastName && (
        <p className={classes["message-error"]}>{formik.errors.lastName}</p>
      )}
    </div>
  );
}

function Email({ classes, formik }) {
  return (
    <div className={`${classes["form-input"]} ${classes["form-input-email"]}`}>
      <label htmlFor="phone">
        Email <span>*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Your Email"
        className={
          formik.touched.email && formik.errors.email
            ? classes["input-error"]
            : classes["input-valid"]
        }
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && (
        <p className={classes["message-error"]}>{formik.errors.email}</p>
      )}
    </div>
  );
}

function Phone({ classes, formik }) {
  return (
    <div className={`${classes["form-input"]} ${classes["form-input-phone"]}`}>
      <label htmlFor="phone">
        Phone <span>*</span>
      </label>
      <input
        type="text"
        id="phone"
        name="phone"
        placeholder="Your Phone"
        className={
          formik.touched.phone && formik.errors.phone
            ? classes["input-error"]
            : classes["input-valid"]
        }
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.phone && (
        <p className={classes["message-error"]}>{formik.errors.phone}</p>
      )}
    </div>
  );
}

function Address({ classes, formik }) {
  return (
    <div
      className={`${classes["form-input"]} ${classes["form-input-address"]}`}
    >
      <label htmlFor="address">
        Street address <span>*</span>
      </label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Address"
        className={
          formik.touched.address && formik.errors.address
            ? classes["input-error"]
            : classes["input-valid"]
        }
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.address && (
        <p className={classes["message-error"]}>{formik.errors.address}</p>
      )}
    </div>
  );
}

function Password({ classes, formik }) {
  // Create + use Hooks
  const [isShowPassword, setIsShowPassword] = useState(false);

  // Create + use event handlers
  const showPasswordHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  const ElementIconHidePassword =
    formik.values.confirmPassword.length > 0 ? (
      <FaRegEyeSlash
        className={classes["icon-hide-password"]}
        onClick={showPasswordHandler}
      />
    ) : (
      ""
    );

  const ElementIconShowPassword =
    formik.values.confirmPassword.length > 0 ? (
      <FaRegEye
        className={classes["icon-show-password"]}
        onClick={showPasswordHandler}
      />
    ) : (
      ""
    );

  return (
    <div
      className={`${classes["form-input"]} ${classes["form-input-password"]}`}
    >
      <label htmlFor="password">
        Password <span>*</span>
      </label>
      <input
        type={isShowPassword ? "text" : "password"}
        name="password"
        id="password"
        placeholder="Password"
        className={
          formik.touched.password && formik.errors.password
            ? classes["input-error"]
            : classes["input-valid"]
        }
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {isShowPassword ? ElementIconShowPassword : ElementIconHidePassword}
      {formik.touched.password && (
        <p className={classes["message-error"]}>{formik.errors.password}</p>
      )}
    </div>
  );
}

function ConfirmPassword({ classes, formik }) {
  // Create + use Hooks
  const [isShowPassword, setIsShowPassword] = useState(false);

  // Create + use event handlers
  const showPasswordHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  const ElementIconHidePassword =
    formik.values.confirmPassword.length > 0 ? (
      <FaRegEyeSlash
        className={classes["icon-hide-password"]}
        onClick={showPasswordHandler}
      />
    ) : (
      ""
    );

  const ElementIconShowPassword =
    formik.values.confirmPassword.length > 0 ? (
      <FaRegEye
        className={classes["icon-show-password"]}
        onClick={showPasswordHandler}
      />
    ) : (
      ""
    );

  return (
    <div
      className={`${classes["form-input"]} ${classes["form-input-confirm-password"]}`}
    >
      <label htmlFor="confirmPassword">
        Confirm Password <span>*</span>
      </label>
      <input
        type={isShowPassword ? "text" : "password"}
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm password"
        className={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? classes["input-error"]
            : classes["input-valid"]
        }
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {isShowPassword ? ElementIconShowPassword : ElementIconHidePassword}
      {formik.touched.confirmPassword && (
        <p className={classes["message-error"]}>
          {formik.errors.confirmPassword}
        </p>
      )}
    </div>
  );
}

const Input = {
  FirstName,
  LastName,
  Phone,
  Address,
  Email,
  Password,
  ConfirmPassword,
};

export default Input;
