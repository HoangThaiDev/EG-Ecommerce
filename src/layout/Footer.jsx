// Import Components
import { Row, Col } from "antd";

// Import File CSS
import classes from "./css/footer.module.css";

// Import Icons
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";
import { useRef } from "react";

export default function Footer() {
  // Create + use Hooks
  const emailInput = useRef();

  // Create + use event handlers
  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log(emailInput.current.value);
  };
  return (
    <div className={classes.footer}>
      <div className={classes["footer__container"]}>
        <Row className={classes["footer__row"]}>
          {/* -------------------------JSX: About------------------------------- */}
          <Col
            className={`${classes["footer__col"]} ${classes["footer__col__about"]}`}
            xl={5}
          >
            <div className={classes["about__section"]}>
              <h3 className={classes["section__title"]}>About EG Shop</h3>
              <p className={classes["section__content"]}>
                EG STORE - worldwide Grocery store since 2024. We sell over
                2000+ Category products on our web-site.
              </p>
              <div className={classes["section__contact"]}>
                <div className={classes["contact__phone"]}>
                  <FiPhoneCall
                    className={`${classes.icon} ${classes["icon-phone"]}`}
                  />
                  <p>+ (84) 707 222 333</p>
                  <p>+ (84) 918 111 234</p>
                </div>
                <div className={classes["contact__email"]}>
                  <MdOutlineEmail
                    className={`${classes.icon} ${classes["icon-email"]}`}
                  />
                  <p>abc@gmail.com</p>
                  <p>nguyenvana@gmail.com</p>
                </div>
                <div className={classes["contact__location"]}>
                  <IoLocationOutline
                    className={`${classes.icon} ${classes["icon-location"]}`}
                  />
                  <p>P11, Q11, TP.HCM</p>
                  <p>P11, Q11, TP.HCM</p>
                </div>
              </div>
            </div>
          </Col>

          {/* -------------------------JSX: MailList------------------------------- */}
          <Col
            className={`${classes["footer__col"]} ${classes["footer__col__mailList"]}`}
            xl={9}
          >
            <div className={classes["mailList__section"]}>
              <h2 className={classes["section__title"]}>EG SHOP</h2>
              <span className={classes["section__title-small"]}>GROCERY</span>
              <p className={classes["section__content"]}>
                Register Now To Get Update On Promotion And Coupons. Don't
                Worry! It's Not Spam
              </p>
              <form
                className={classes["section__form"]}
                onSubmit={submitFormHandler}
              >
                <input
                  type="text"
                  placeholder="Your Email"
                  className={classes["form__input-email"]}
                  ref={emailInput}
                />
                <button type="submit" className={classes["form__btn"]}>
                  Send
                </button>
              </form>
              <div className={classes["section__socials-network"]}>
                <FaFacebookF
                  className={`${classes.icon} ${classes["icon-fb"]}`}
                />
                <FaTwitter
                  className={`${classes.icon} ${classes["icon-twitter"]}`}
                />
                <FaInstagram
                  className={`${classes.icon} ${classes["icon-ins"]}`}
                />
                <BiLogoGmail
                  className={`${classes.icon} ${classes["icon-email"]}`}
                />
                <FaGoogle className={`${classes.icon} ${classes["icon-gg"]}`} />
              </div>
            </div>
          </Col>

          {/* -------------------------JSX: Companies------------------------------- */}
          <Col
            className={`${classes["footer__col"]} ${classes["footer__col__companies"]}`}
            xl={4}
          >
            <div className={classes["companies__section"]}>
              <h3 className={classes["section__title"]}>Company</h3>
              <ul className={classes["section__list-info"]}>
                <li className={classes["section__item-info"]}>Pivacy Policy</li>
                <li className={classes["section__item-info"]}>Returns</li>
                <li className={classes["section__item-info"]}>
                  Terms & Conditions
                </li>
                <li className={classes["section__item-info"]}>Our Support</li>
                <li className={classes["section__item-info"]}>
                  Terms & Service
                </li>
                <li className={classes["section__item-info"]}>Checkout</li>
                <li className={classes["section__item-info"]}>Other Issues</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
