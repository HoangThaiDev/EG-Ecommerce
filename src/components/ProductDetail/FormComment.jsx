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
  // Create + use validate Schema (Yup)
  const formCommentSchema = Yup.object().shape({
    name: Yup.string().required("Field Name is required!"),
    email: Yup.string().required(),
    qualityProduct: Yup.string().required(),
    trueToDesc: Yup.string().required(),
    message: Yup.string().required(),
  });

  // Create + use Hooks
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      qualityProduct: "",
      trueToDesc: "",
      message: "",
    },

    validationSchema: formCommentSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // Create + use event handlers
  const chooseRateProductHandler = (e) => {
    console.log(e);
  };
  return (
    <div className={classes["main-container"]}>
      <h2 className={classes["main-title"]}>Leave A Comment</h2>
      <p className={classes["main-content"]}>
        Your email address will not be published. Required fields are marked *
      </p>
      <form className={classes["main-form"]}>
        <div className={classes["form-input"]}>
          <label htmlFor="name">Your Name *</label>
          <input type="text" id="name" placeholder="Your Name" />
        </div>
        <div className={classes["form-input"]}>
          <label htmlFor="email">Your Email *</label>
          <input type="email" id="email" placeholder="Your Email" />
        </div>
        <div className={classes["form-input"]}>
          <label htmlFor="quality">Quality Product *</label>
          <input type="text" id="quality" placeholder="Quality Product" />
        </div>
        <div className={classes["form-input"]}>
          <label htmlFor="email">True to description *</label>
          <input type="email" id="email" placeholder="True to description" />
        </div>
        <div className={classes["form-input"]}>
          <textarea
            type="email"
            id="email"
            placeholder="Your message"
          ></textarea>
        </div>
        <div className={classes["form-input"]}>
          <label htmlFor="email">Your Rating</label>
          <Rate onChange={chooseRateProductHandler} className="rate-product" />
          <button type="button" className={classes["btn-post"]}>
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
