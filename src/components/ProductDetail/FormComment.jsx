// Import Modules
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Import File CSS
import classes from "./css/formComment.module.css";
import "./css/ant-design/rateReviewItem.css";

// Import Components
import { Rate } from "antd";

export default function FormComment() {
  // Create + use Schema validate Yup
  const formCommentSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string()
      .required("Email is required!")
      .matches(/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email!"),
    quality: Yup.string().required("Quality Product is required!"),
    trueToDesc: Yup.string().required("True to desc is required!"),
  });

  // Create + use Hooks
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      quality: "",
      trueToDesc: "",
    },

    validationSchema: formCommentSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // Create + use event handles
  const chooseRateProductHandle = (e) => {
    console.log(e);
  };
  return (
    <div className={classes["main-container"]}>
      <h2 className={classes["main-title"]}>Leave A Comment</h2>
      <p className={classes["main-content"]}>
        Your email address will not be published. Required fields are marked *
      </p>
      <form className={classes["main-form"]} onSubmit={formik.handleSubmit}>
        <div className={classes["form-input"]}>
          <label htmlFor="name">
            Your Name <span>*</span>
          </label>
          <input
            className={
              formik.touched.name && formik.errors.name
                ? `${classes["input-name"]} ${classes["input-name-error"]}`
                : classes["input-name"]
            }
            type="text"
            id="name"
            placeholder="Your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && (
            <p className={classes["message-error"]}>{formik.errors.name}</p>
          )}
        </div>
        <div className={classes["form-input"]}>
          <label htmlFor="email">
            Your Email <span>*</span>
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
          <label htmlFor="quality">
            Quality Product <span>*</span>
          </label>
          <input
            className={
              formik.touched.quality && formik.errors.quality
                ? `${classes["input-quality"]} ${classes["input-quality-error"]}`
                : classes["input-quality"]
            }
            type="text"
            id="quality"
            placeholder="Quality Product"
            value={formik.values.quality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.quality && (
            <p className={classes["message-error"]}>{formik.errors.quality}</p>
          )}
        </div>
        <div className={classes["form-input"]}>
          <label htmlFor="trueToDesc">
            True to description <span>*</span>
          </label>
          <input
            className={
              formik.touched.trueToDesc && formik.errors.trueToDesc
                ? `${classes["input-true-desc"]} ${classes["input-true-desc-error"]}`
                : classes["input-true-desc"]
            }
            type="text"
            id="trueToDesc"
            placeholder="True to description"
            value={formik.values.trueToDesc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.trueToDesc && (
            <p className={classes["message-error"]}>
              {formik.errors.trueToDesc}
            </p>
          )}
        </div>
        <div className={classes["form-input"]}>
          <textarea
            className={classes["input-message"]}
            type="text"
            id="message"
            placeholder="Your message"
            value={formik.values.message}
            onChange={formik.handleChange}
          ></textarea>
        </div>
        <div className={classes["form-input"]}>
          <label htmlFor="rating">Your Rating</label>
          <Rate
            onChange={chooseRateProductHandle}
            className="rate-product"
            value={5}
          />
          <button type="submit" className={classes["btn-post"]}>
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
