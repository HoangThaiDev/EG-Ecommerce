//  Import Modules
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

// Import File CSS
import classes from "./css/formContact.module.css";
import "../../UI/css/popup-message.css";

function FormContact() {
  // Create + use Schema Validate Yup
  const FormMessageSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string()
      .required("Email is required!")
      .matches(/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email!"),
    desc: Yup.string().required("Content is required!"),
  });

  // Create + use Hooks
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      desc: "",
    },
    validationSchema: FormMessageSchema,
    onSubmit: (values) => {
      Swal.fire({
        customClass: {
          container: "popup-message-contact",
        },
        title: "Thank you!",
        html: `
        <p>We will response your message earliest.</p>
        <p>We happy when serviced to you!</p>
        `,
        icon: "success",
        confirmButtonText: "Close",
      });
    },
  });

  return (
    <div className={classes["form-contact"]}>
      <div className={classes["form-contact-container"]}>
        <div className={classes["form-contact-header"]}>
          <h2>NICE PROJECT? GET IN TOUCH WILL CONTACT YOU SOON</h2>
        </div>
        <div className={classes["form-contact-section"]}>
          <h3>Get In Touch</h3>
          <p>
            Your email address will not be published. Required fields are marked
            *
          </p>
          <form
            className={classes["form-contact-detail"]}
            onSubmit={formik.handleSubmit}
          >
            <div
              className={`${classes["form-input"]} ${classes["form-input-name"]}`}
            >
              <label htmlFor="client-name">
                Your Name <span>*</span>
              </label>
              <input
                className={
                  formik.touched.name && formik.errors.name
                    ? `${classes["input-name"]} ${classes["input-name-error"]}`
                    : classes["input-name"]
                }
                type="text"
                id="client-name"
                placeholder="Your name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && (
                <p className={classes["message-error"]}>{formik.errors.name}</p>
              )}
            </div>

            <div
              className={`${classes["form-input"]} ${classes["form-input-email"]}`}
            >
              <label htmlFor="client-email">
                Your Email <span>*</span>
              </label>
              <input
                className={
                  formik.touched.email && formik.errors.email
                    ? `${classes["input-email"]} ${classes["input-email-error"]}`
                    : classes["input-email"]
                }
                type="text"
                id="client-email"
                placeholder="Your email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && (
                <p className={classes["message-error"]}>
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div
              className={`${classes["form-input"]} ${classes["form-input-message"]}`}
            >
              <textarea
                className={
                  formik.touched.desc && formik.errors.desc
                    ? `${classes["input-desc"]} ${classes["input-desc-error"]}`
                    : classes["input-desc"]
                }
                placeholder="Your message"
                name="desc"
                value={formik.values.desc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.desc && (
                <p className={classes["message-error"]}>{formik.errors.desc}</p>
              )}
            </div>
            <button type="submit" className={classes["form-btn-submit"]}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormContact;
