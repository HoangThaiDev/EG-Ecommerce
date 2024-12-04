// Import Modules
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import calculatePrice from "../helper/products/calculator";
import APIServer from "../API/customAPI";
import reduxActions from "../redux/redux-actions";

// Import File CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/slideProducts.css";
import "../components/Home/css/ant-design/rate.css";

// Import Components
import Slider from "react-slick";
import { Rate } from "antd";

// Import Icons
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";

// Custom + use Slide
function CustomSlide(props) {
  // Create + use Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use States
  const { isLoggedIn } = useSelector((state) => state.user);

  // Create + use props
  const { product, ...otherProps } = props;

  // Create + use event handles
  const viewProductDetailHandle = (product_name, product_id) => {
    // Check page current is a page product detail
    const modifiedProductName = product_name.split(" ").join("-");
    navigate(`../product/${modifiedProductName}`, {
      state: { productId: product_id },
    });
  };

  const addToCartHandle = async (product) => {
    // Check client loggedIn to use
    if (!isLoggedIn) {
      return alert("You need to login to use 'Add to cart'");
    }

    // Calculate price of product
    const updatePrice = calculatePrice(
      product.price,
      product.percent_discount,
      1
    );

    const valueProduct = {
      _id: product._id,
      quantity: 1,
      totalPrice: updatePrice,
    };

    try {
      const res = await APIServer.cart.addToCart(valueProduct);

      if (res.status === 200) {
        const { cart } = res.data;
        alert("Add to cart success!");
        dispatch(reduxActions.user.updateCart(cart));
      }
    } catch (error) {
      const { data, status } = error.response;
      if (status !== 200) {
        alert(data.message);
      }
    }
  };

  return (
    <div {...otherProps} className="slide-item">
      <div
        className={
          product.quantity > 0 ? "card card-active" : "card card-sold-out"
        }
      >
        {product.percent_discount > 0 && (
          <span className="card__percent-discount">
            -{product.percent_discount}% Off
          </span>
        )}
        <IoSearchSharp
          className="card-icon-search"
          onClick={() => viewProductDetailHandle(product.name, product._id)}
        />
        <img
          src={product.image_detail.banner}
          alt={product.image_detail.banner}
          onClick={() => viewProductDetailHandle(product.name, product._id)}
        />
        <div className="card-detail">
          <h3
            className="card-detail-name"
            onClick={() => viewProductDetailHandle(product.name, product._id)}
          >
            {product.name}
          </h3>
          <div className="card-detail-price">
            {product.price_discount ? (
              <>
                <p className="card-detail-price-origin-old">${product.price}</p>

                <p className="card-detail-price-discount">
                  ${product.price_discount}/ {product.unit}
                </p>
              </>
            ) : (
              <p className="card-detail-price-origin">
                ${product.price}/ {product.unit}
              </p>
            )}
          </div>

          <div className="card-detail-rating">
            <Rate
              className="card__rates"
              allowHalf
              disabled
              defaultValue={product.rating}
            />
          </div>

          {product.quantity === 0 && (
            <button className="card-detail-btn-sold-out" type="button" disabled>
              Sold Out
            </button>
          )}

          {product.quantity > 0 && (
            <button
              className="card-detail-btn-add"
              type="button"
              onClick={() => addToCartHandle(product)}
            >
              Add To Cart
              <HiOutlinePlusSm className="card-detail-icon-btn" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SlideProducts({ className, products, settings }) {
  return (
    <Slider {...settings} className={className}>
      {products.map((product) => (
        <div key={product._id} className="slider-product-container">
          <CustomSlide product={product} key={products.id} />
        </div>
      ))}
    </Slider>
  );
}
