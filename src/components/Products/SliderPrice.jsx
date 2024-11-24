// Import Modules
import React, { useState, useEffect } from "react";

// Import File CSS
import "./css/sliderPrice.css";

// Import Components
import { Slider } from "antd";

export default function SliderPrice({
  onSaveValueRangePrice,
  rangePriceCurrent,
}) {
  // Create + use States
  const [rangePrice, setRangePrice] = useState({
    min: 0,
    max: 200,
  });

  // Create + use side Effects
  // --------------- Side Effect: Update rangePrice current by query url --------------------
  useEffect(() => {
    if (rangePriceCurrent) {
      setRangePrice((prevState) => ({
        ...prevState,
        min: rangePriceCurrent.min,
        max: rangePriceCurrent.max,
      }));
    } else {
      setRangePrice({
        min: 0,
        max: 200,
      });
    }
  }, [rangePriceCurrent]);

  // Create + use event Handles
  const onChangeHandle = (value) => {
    setRangePrice({ min: value[0], max: value[1] });
  };

  const filterProductByPriceHandle = (event) => {
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
          value={[rangePrice.min, rangePrice.max]}
          defaultValue={[rangePrice.min, rangePrice.max]}
          onChange={onChangeHandle}
        />
        <form
          className="slider__footer-form"
          onSubmit={filterProductByPriceHandle}
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
