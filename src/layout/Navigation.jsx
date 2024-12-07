// Import Modules
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState, useTransition } from "react";
import { APIContext } from "../storeContext/APIContext";
import reduxActions from "../redux/redux-actions";
import axiosInstance from "../axios/customAxios";

// Import File CSS
import classes from "./css/navigation.module.css";

// Import Components
import { Row, Col } from "antd";
import MenuProductDropdown from "./MenuProductDropdown";

// Import Icons
import { LuUser2 } from "react-icons/lu";
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

export default function Navigation() {
  // Create + use Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useContext(APIContext);
  const [isLoading, startTransaction] = useTransition();

  // Create + use States
  const userLoggedIn = useSelector((state) => state.user);

  const { isShow: isMenuDropDownShow } = useSelector(
    (state) => state.menuDropdown
  );

  const [isScrollActive, setIsScrollActive] = useState(false);
  const [productSearch, setProductSearch] = useState([]);
  const [valueName, setValueName] = useState(
    JSON.parse(sessionStorage.getItem("search-product"))
      ? JSON.parse(sessionStorage.getItem("search-product"))
      : ""
  );

  // Create + use side Effects
  // ------------- Side effect: When change page then hide MenuDropdown ----------------
  useEffect(() => {
    dispatch(reduxActions.menuDropdown.hide());
  }, [location]);

  // ------------- Side effect: When scroll down then set mark CSS Navigation ----------------
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 400) {
        setIsScrollActive(true);
      } else {
        setIsScrollActive(false);
      }
    };

    document.addEventListener("scroll", scrollHandler);

    // Clear event DOM
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // Create + use Event handles
  const showSideCartHandle = async () => {
    if (location.pathname !== "/cart") {
      dispatch(reduxActions.sideCart.toggle());
    }
  };

  const changeValueNameHandle = (e) => {
    let valueSearch = e.target.value;
    // Filter data products by value search
    const filterProducts = products.filter((p) =>
      p.name.toLowerCase().includes(
        valueSearch
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D")
          .toLowerCase()
      )
    );
    if (valueSearch.length > 0) {
      dispatch(reduxActions.menuDropdown.show());
    } else {
      dispatch(reduxActions.menuDropdown.hide());
    }

    startTransaction(() => {
      setProductSearch(filterProducts);
      setValueName(valueSearch);
    });
  };

  const clearValueIpnutSearchHandle = () => {
    dispatch(reduxActions.menuDropdown.hide());
    setValueName("");
    sessionStorage.removeItem("search-product");
    // navigate(location.pathname);
  };

  const goHomeHandler = () => {
    navigate("/");
  };

  const showSideMenu = () => {
    dispatch(reduxActions.sideMenu.toggle());
  };

  const nextPageHandler = (linkPage) => {
    navigate(`/${linkPage}`);
  };

  const searchProductsHandle = (event) => {
    event.preventDefault();

    if (valueName.length === 0) {
      sessionStorage.removeItem("search-product");
      return navigate("/products");
    }
    sessionStorage.setItem("search-product", JSON.stringify(valueName));
    navigate(`/products?name=${valueName}`);
  };

  return (
    <div
      className={
        isScrollActive
          ? `${classes.navigation} ${classes["navigation-active"]}`
          : `${classes.navigation}`
      }
    >
      <div className={classes["navigation__container"]}>
        <Row className={classes["navigation__row"]}>
          {/* -------------------------JSX: Logo------------------------------- */}
          <Col className={classes["navigation__col"]} xl={4}>
            <div className={classes["nav__col__logo"]} onClick={goHomeHandler}>
              <h1>EG SHOP</h1>
              <span>GROCERY</span>
            </div>
            <h1
              className={classes["nav__col__logo-mobile"]}
              onClick={goHomeHandler}
            >
              EG
            </h1>
          </Col>

          {/* -------------------------JSX: Form Search------------------------------- */}
          <Col className={classes["navigation__col"]} xl={14}>
            <form
              className={classes["nav__col__form-search"]}
              onSubmit={searchProductsHandle}
            >
              <input
                type="text"
                placeholder="Search Product"
                className={classes["form__input"]}
                onChange={changeValueNameHandle}
                value={valueName}
              />
              <IoSearchSharp
                className={classes["form__icon-search"]}
                onClick={searchProductsHandle}
              />
              {valueName.length > 0 && (
                <IoMdCloseCircle
                  className={classes["form__icon-clear"]}
                  onClick={clearValueIpnutSearchHandle}
                />
              )}
              <button className={classes["form__btn"]} type="submit">
                Search
              </button>
            </form>

            {/* -------------------------JSX: Menu Product Dropdown------------------------------- */}
            {isMenuDropDownShow && (
              <MenuProductDropdown
                productSearch={productSearch}
                valueName={valueName}
                isLoading={isLoading}
              />
            )}
          </Col>

          {/* -------------------------JSX: Menu------------------------------- */}
          <Col className={classes["navigation__col"]} xl={2}>
            <div className={classes["nav__col__menu"]}>
              <div className={classes["menu__icon"]}>
                <LuUser2
                  className={`${classes.icon} ${classes["icon-user"]}`}
                  onClick={
                    userLoggedIn.isLoggedIn
                      ? () => nextPageHandler("setting-account")
                      : () => nextPageHandler("login")
                  }
                />
              </div>
              <div className={classes["menu__icon"]}>
                <IoMenuOutline
                  className={`${classes.icon} ${classes["icon-menu"]}`}
                  onClick={showSideMenu}
                />
              </div>
              <div
                className={classes["menu__icon"]}
                onClick={() => showSideCartHandle()}
              >
                <AiOutlineShoppingCart
                  className={`${classes.icon} ${classes["icon-cart"]}`}
                />
                {userLoggedIn.isLoggedIn && (
                  <span className={classes["quantity-item-cart"]}>
                    {userLoggedIn.cart.items.length}
                  </span>
                )}
              </div>
            </div>
          </Col>

          {/* -------------------------JSX: Contact------------------------------- */}
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
