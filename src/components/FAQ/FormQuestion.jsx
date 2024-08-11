// Import Modules
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

// Import File CSS
import classes from "./css/formQuestion.module.css";
import "../../UI/css/popup-message.css";

// Import Component
import { Row, Col } from "antd";

function FormQuestion() {
  // Create validateSchema Yup
  const FormQuestionSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    content: Yup.string()
      .min(5, "Must be 5 characters or more")
      .required("Content is required!"),
  });

  // Create + use Hooks
  const formik = useFormik({
    initialValues: {
      name: "",
      content: "",
    },
    validationSchema: FormQuestionSchema,
    onSubmit: (values) => {
      console.log(values);
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
    <div className={classes["introduce"]}>
      <Row className={classes["introduce__row"]}>
        <Col className={`${classes["introduce__col"]}`}>
          <div className={classes["introduce__header"]}>
            <h3>CUSTOMER SERVICE</h3>
            <p>
              "We are committed to bringing you the best online shopping
              experience with our staff always ready to support and answer all
              your questions.
            </p>
          </div>
        </Col>
        <Col className={`${classes["introduce__col"]}`}>
          <div className={classes["introduce__address"]}>
            <h3>Contact us, with any help?</h3>
            <p>(+84) 707-222-333</p>
            <p>thaindev@gmail.com</p>
          </div>
        </Col>
        <Col className={classes["introduce__col"]}>
          <div className={classes["introduce-card"]}>
            <h3>Ask any Question?</h3>
            <p>Your email address will not be published.</p>
            <p>Required fields are marked *</p>
          </div>

          <form
            className={classes["introduce__form"]}
            onSubmit={formik.handleSubmit}
          >
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
                name="name"
                placeholder="Your Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <p className={classes["error-message-input"]}>
                  Error: {formik.errors.name}
                </p>
              )}
            </div>
            <div className={classes["form-input"]}>
              <textarea
                className={
                  formik.touched.content && formik.errors.content
                    ? `${classes["input-desc"]} ${classes["input-desc-error"]}`
                    : classes["input-desc"]
                }
                placeholder="Type your question"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.errors.content && formik.touched.content && (
                <p className={classes["error-message-input"]}>
                  Error: {formik.errors.content}
                </p>
              )}
            </div>
            <button className={classes["form-btn-send"]} type="submit">
              Send Now
            </button>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default FormQuestion;
