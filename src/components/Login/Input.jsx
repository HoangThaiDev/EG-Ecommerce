// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/input.module.css";

export default function Input({
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
        type={type}
        id={id}
        placeholder={placeholder}
        value={formik.values[valueFormik]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched[valueFormik] && (
        <p className={classes["message-error"]}>{formik.errors.email}</p>
      )}
    </div>
  );
}
