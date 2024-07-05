// Import Modules
import React, { useState } from "react";

// Import File CSS
import "./css/sliderPrice.css";

// Import Components
import { Slider } from "antd";

export default function SliderPrice({ onSaveValueRangePrice }) {
  // Create + use Hooks
  const [rangePrice, setRangePrice] = useState({
    min: 0,
    max: 200,
  });

  // Create + use event Handlers
  const onChangeHandler = (value) => {
    setRangePrice({ min: value[0], max: value[1] });
  };

  const filterProductByPriceHandler = (event) => {
    event.preventDefault();
    onSaveValueRangePrice(rangePrice);
  };

  return (
    <div className="slider-price">
      <div className="slider__container">
        <h2 className="slider__title">PRICE</h2>
        <Slider
          className="slider-range-price"
          range
          defaultValue={[rangePrice.min, rangePrice.max]}
          onChange={onChangeHandler}
        />
        <form
          className="slider__footer-form"
          onSubmit={filterProductByPriceHandler}
        >
          <button type="submit" className="form-btn-filter">
            Filter
          </button>
          <ul className="form-range-price">
            <li className="price-title">Price:</li>
            <li className="price-min">${rangePrice.min}</li>
            <li className="price-symbol">-</li>
            <li className="price-max">${rangePrice.max}</li>
          </ul>
        </form>
      </div>
    </div>
  );
}
