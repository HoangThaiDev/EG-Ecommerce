//  Import Modules
import React from "react";

// Import File CSS
import classes from "./css/formContact.module.css";

function FormContact() {
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
          <form className={classes["form-contact-detail"]}>
            <div
              className={`${classes["form-input"]} ${classes["form-input-name"]}`}
            >
              <label htmlFor="client-name">Your Name *</label>
              <input type="text" id="client-name" placeholder="Your name" />
            </div>

            <div
              className={`${classes["form-input"]} ${classes["form-input-email"]}`}
            >
              <label htmlFor="client-email">Your Email *</label>
              <input type="text" id="client-email" placeholder="Your email" />
            </div>

            <div
              className={`${classes["form-input"]} ${classes["form-input-message"]}`}
            >
              <textarea placeholder="Your message" defaultValue=""></textarea>
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
