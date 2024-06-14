// Import Modules
import { useDispatch } from "react-redux";
import reduxActions from "../redux/redux-actions";

// Import File CSS
import classes from "./css/navigation.module.css";

// Import Components
import { Row, Col } from "antd";

// Import Icons
import { LuUser2 } from "react-icons/lu";
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { useRef } from "react";

export default function Navigation() {
  // Create + use Hooks
  const nameProductRef = useRef("");
  const dispatch = useDispatch();

  // Create + use Event handlers
  const showSideMenu = () => {
    dispatch(reduxActions.sideMenu.showSideMenu());
  };

  const searchProductHandler = (event) => {
    event.preventDefault();
    console.log(nameProductRef.current.value);
  };

  return (
    <div className={classes.navigation}>
      <div className={classes["navigation__container"]}>
        <Row className={classes["navigation__row"]}>
          <Col className={classes["navigation__col"]} xl={4}>
            <div className={classes["nav__col__logo"]}>
              <h1>EG SHOP</h1>
              <span>GROCERY</span>
            </div>
          </Col>
          <Col className={classes["navigation__col"]} xl={13}>
            <form
              className={classes["nav__col__form-search"]}
              onSubmit={searchProductHandler}
            >
              <input
                type="text"
                id="name"
                placeholder="Search Product"
                className={classes["form__input"]}
                ref={nameProductRef}
              />
              <button className={classes["form__btn"]} type="submit">
                Search
              </button>
            </form>
          </Col>
          <Col className={classes["navigation__col"]} xl={2}>
            <div className={classes["nav__col__menu"]}>
              <div className={classes["menu__icon"]}>
                <LuUser2
                  className={`${classes.icon} ${classes["icon-user"]}`}
                />
              </div>
              <div className={classes["menu__icon"]}>
                <IoMenuOutline
                  className={`${classes.icon} ${classes["icon-menu"]}`}
                  onClick={showSideMenu}
                />
              </div>
              <div className={classes["menu__icon"]}>
                <AiOutlineShoppingCart
                  className={`${classes.icon} ${classes["icon-cart"]}`}
                />
                <span>10</span>
              </div>
            </div>
          </Col>
          <Col className={classes["navigation__col"]} xl={3}>
            <div className={classes["nav__col__contact"]}>
              <FiPhoneCall className={classes["icon-phone"]} />
              <p>Hot Line Number</p>
              <p>+ (84) 707 111 456</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
