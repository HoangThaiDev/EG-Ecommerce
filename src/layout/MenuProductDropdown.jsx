// Import Modules
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../axios/customAxios";
import reduxActions from "../redux/redux-actions";

// Import File CSS
import classes from "./css/menuProductDd.module.css";

// Import Components
import { Row, Col } from "antd";

export default function MenuProductDropdown({
  productSearch,
  valueName,
  isLoading,
}) {
  // Create + use Hooks
  const [productSlice, setProductSlice] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const menuDropDownRef = useRef();
  const dispatch = useDispatch();

  // Side Effect
  useEffect(() => {
    // Updating when client search value
    setProductSlice(productSearch.slice(0, 9));
  }, [productSearch]);

  useEffect(() => {
    // function get position of cursor
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    // Get position of menu-dropdown element
    const element = menuDropDownRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();

      // compare between cursor and element
      if (
        mousePosition.x > 0 &&
        (mousePosition.x > rect.right ||
          mousePosition.x < rect.left ||
          mousePosition.y > rect.bottom ||
          mousePosition.y < rect.top)
      ) {
        dispatch(reduxActions.menuDropdown.hide());
      }
    }

    window.addEventListener("click", handleMouseMove);

    return () => {
      window.removeEventListener("click", handleMouseMove);
    };
  }, [mousePosition]);

  // Create + use event handlers
  const viewProductDetail = (product_id, product_name) => {
    const modifiedProductName = product_name.split(" ").join("-");
    navigate(`./product/${modifiedProductName}`, {
      state: { productId: product_id },
      replace: true,
    });
  };

  const showProductsHandler = async () => {
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
    <div className={classes["menu-dropdown"]} ref={menuDropDownRef}>
      <div className={classes["menu-dropdown-container"]}>
        <Row className={classes["menu-dropdown-row"]}>
          {!isLoading &&
            productSlice.map((p, i) => (
              <Col className={classes["menu-dropdown-col"]} key={p._id}>
                <div
                  className={classes["menu-dropdown-card"]}
                  onClick={() => viewProductDetail(p._id, p.name)}
                >
                  <img
                    src={p.image_detail.banner}
                    alt={p.image_detail.banner}
                  />
                  <div className={classes["card-info"]}>
                    <h4 className={classes["card-info-name"]}>{p.name}</h4>
                    <div className={classes["card-info-price"]}>
                      <p className={classes["price-current"]}>
                        ${p.price_discount ? p.price_discount : p.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          {isLoading && (
            <p className={classes["noti-loading-products"]}>Loading...</p>
          )}
        </Row>
        <div className={classes["menu-dropdown-footer"]}>
          <button
            className={classes["btn-show"]}
            type="button"
            onClick={showProductsHandler}
          >
            SEE ALL ' {valueName} '
          </button>
        </div>
      </div>
    </div>
  );
}
