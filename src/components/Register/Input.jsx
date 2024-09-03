// Import Modules
import React, { useState } from "react";

// Import File CSS
import classes from "./css/input.module.css";

// Import Icons
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

function FirstName({
  formik,
  label,
  valueFormik,
  id,
  className,
  classNameError,
  placeholder,
  type,
}) {
  return (
    <div className={classes["form-input"]}>
      <label htmlFor={id}>
        {label} <span>*</span>
      </label>
      <input
        className={
          formik.touched[valueFormik] && formik.errors[valueFormik]
            ? `${classes[className]} ${classes[classNameError]}`
            : classes[className]
        }
        name={id}
        type={type}
        id={id}
        placeholder={placeholder}
        value={formik.values[valueFormik]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched[valueFormik] && (
        <p className={classes["message-error"]}>{formik.errors[valueFormik]}</p>
      )}
    </div>
  );
}

function LastName({
  formik,
  label,
  valueFormik,
  id,
  className,
  classNameError,
  placeholder,
  type,
}) {
  return (
    <div className={classes["form-input"]}>
      <label htmlFor={id}>
        {label} <span>*</span>
      </label>
      <input
        className={
          formik.touched[valueFormik] && formik.errors[valueFormik]
            ? `${classes[className]} ${classes[classNameError]}`
            : classes[className]
        }
        name={id}
        type={type}
        id={id}
        placeholder={placeholder}
        value={formik.values[valueFormik]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched[valueFormik] && (
        <p className={classes["message-error"]}>{formik.errors[valueFormik]}</p>
      )}
    </div>
  );
}

function Email({
  formik,
  label,
  valueFormik,
  id,
  className,
  classNameError,
  placeholder,
  type,
}) {
  return (
    <div className={classes["form-input"]}>
      <label htmlFor={id}>
        {label} <span>*</span>
      </label>
      <input
        className={
          formik.touched[valueFormik] && formik.errors[valueFormik]
            ? `${classes[className]} ${classes[classNameError]}`
            : classes[className]
        }
        name={id}
        type={type}
        id={id}
        placeholder={placeholder}
        value={formik.values[valueFormik]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched[valueFormik] && (
        <p className={classes["message-error"]}>{formik.errors[valueFormik]}</p>
      )}
    </div>
  );
}

function Password({
  formik,
  label,
  valueFormik,
  id,
  className,
  classNameError,
  placeholder,
  type,
}) {
  // Create + use Hooks
  const [isShowPassword, setIsShowPassword] = useState(false);

  // Create + use event handlers
  const showPasswordHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  const ElementIconHidePassword =
    formik.values[valueFormik].length > 0 ? (
      <FaRegEyeSlash
        className={classes["icon-hide-password"]}
        onClick={showPasswordHandler}
      />
    ) : (
      ""
    );

  const ElementIconShowPassword =
    formik.values[valueFormik].length > 0 ? (
      <FaRegEye
        className={classes["icon-show-password"]}
        onClick={showPasswordHandler}
      />
    ) : (
      ""
    );
  return (
    <div className={classes["form-input"]}>
      <label htmlFor={id}>
        {label} <span>*</span>
      </label>
      <input
        className={
          formik.touched[valueFormik] && formik.errors[valueFormik]
            ? `${classes[className]} ${classes[classNameError]}`
            : classes[className]
        }
        name={id}
        type={isShowPassword ? "text" : type}
        id={id}
        placeholder={placeholder}
        value={formik.values[valueFormik]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {isShowPassword ? ElementIconShowPassword : ElementIconHidePassword}
      {formik.touched[valueFormik] && (
        <p className={classes["message-error"]}>{formik.errors[valueFormik]}</p>
      )}
    </div>
  );
}

function ConfirmPassword({
  formik,
  label,
  valueFormik,
  id,
  className,
  classNameError,
  placeholder,
  type,
}) {
  // Create + use Hooks
  const [isShowPassword, setIsShowPassword] = useState(false);

  // Create + use event handlers
  const showPasswordHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  const ElementIconHidePassword =
    formik.values[valueFormik].length > 0 ? (
      <FaRegEyeSlash
        className={classes["icon-hide-password"]}
        onClick={showPasswordHandler}
      />
    ) : (
      ""
    );

  const ElementIconShowPassword =
    formik.values[valueFormik].length > 0 ? (
      <FaRegEye
        className={classes["icon-show-password"]}
        onClick={showPasswordHandler}
      />
    ) : (
      ""
    );
  return (
    <div className={classes["form-input"]}>
      <label htmlFor={id}>
        {label} <span>*</span>
      </label>
      <input
        className={
          formik.touched[valueFormik] && formik.errors[valueFormik]
            ? `${classes[className]} ${classes[classNameError]}`
            : classes[className]
        }
        name={id}
        type={isShowPassword ? "text" : type}
        id={id}
        placeholder={placeholder}
        value={formik.values[valueFormik]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {isShowPassword ? ElementIconShowPassword : ElementIconHidePassword}
      {formik.touched[valueFormik] && (
        <p className={classes["message-error"]}>{formik.errors[valueFormik]}</p>
      )}
    </div>
  );
}

const Input = {
  FirstName,
  LastName,
  Email,
  Password,
  ConfirmPassword,
};

export default Input;
