import React, { useState, useEffect } from "react";

// Import File CSS
import "./css/selectRate.css";
import "./css/selectFilter.css";

// Import Components
import { Select } from "antd";

export default function SelectOptions({
  className,
  popupClassName,
  options,
  placeholder,
  onSaveValueOption,
  stateProducts,
}) {
  // Create + use States
  const [selectedValue, setSelectedValue] = useState(null);

  // Create + use side Effects
  // ---------------- Side Effect:  Reset selected value on page refresh --------------------
  useEffect(() => {
    if (stateProducts && stateProducts.searchedProducts.length > 0) {
      setSelectedValue(null);
    }
  }, [stateProducts]);

  // Create + use event handles
  const onChange = (valueSelect) => {
    setSelectedValue(valueSelect);
    onSaveValueOption(valueSelect);
  };

  return (
    <Select
      allowClear={true}
      className={className}
      popupClassName={popupClassName}
      placeholder={placeholder}
      optionFilterProp="label"
      onChange={onChange}
      options={options}
      value={selectedValue}
    />
  );
}
