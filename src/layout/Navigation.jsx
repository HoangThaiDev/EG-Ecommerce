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
  // Get API From Server
  const { products } = useContext(APIContext);

  // Create + use Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useLocation();
  const { isShow: isMenuDropDownShow } = useSelector(
    (state) => state.menuDropdown
  );

  const [isLoading, startTransaction] = useTransition();

  const [isScrollActive, setIsScrollActive] = useState(false);
  const [productSearch, setProductSearch] = useState([]);
  const [valueName, setValueName] = useState(
    JSON.parse(sessionStorage.getItem("search-product"))
      ? JSON.parse(sessionStorage.getItem("search-product"))
      : ""
  );

  // Side Effect
  useEffect(() => {
    // When change page then hide MenuDropdown
    dispatch(reduxActions.menuDropdown.hide());
  }, [state]);

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

  // Create + use Event handlers
  const changeValueNameHandler = (e) => {
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

  const clearValueIpnutSearchHandler = () => {
    dispatch(reduxActions.menuDropdown.hide());
    setValueName("");
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

  const searchProductsHandler = (event) => {
    event.preventDefault();
    fetchProduct(valueName);
  };

  const fetchProduct = async (valueName) => {
    try {
      const response = await axiosInstance(
        `/products/search?name=${valueName}`
      );
      if (valueName.length === 0) {
        navigate(`/products`, {
          state: { searchedProducts: response.data },
        });
        sessionStorage.removeItem("search-product"); // cLear value input search when search no name
      } else {
        // Remember value input search when search has name
        sessionStorage.setItem("search-product", JSON.stringify(valueName));

        navigate(`/products?name=${valueName}`, {
          state: { searchedProducts: response.data },
        });
      }
    } catch (error) {
      const message = error.response.data;
      console.log(message);
      if (message) {
        navigate(`/products?name=${valueName}`, {
          state: { searchedProducts: [] },
        });
      }
    }
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
              onSubmit={searchProductsHandler}
            >
              <input
                type="text"
                placeholder="Search Product"
                className={classes["form__input"]}
                onChange={changeValueNameHandler}
                value={valueName}
              />
              <IoSearchSharp
                className={classes["form__icon-search"]}
                onClick={searchProductsHandler}
              />
              {valueName.length > 0 && (
                <IoMdCloseCircle
                  className={classes["form__icon-clear"]}
                  onClick={clearValueIpnutSearchHandler}
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
                  onClick={() => nextPageHandler("login")}
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
                onClick={() => nextPageHandler("cart")}
              >
                <AiOutlineShoppingCart
                  className={`${classes.icon} ${classes["icon-cart"]}`}
                />
                <span className={classes["quantity-item-cart"]}>10</span>
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
