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
  optionCurrent,
  placeholder,
  onSaveValueOption,
}) {
  // Create + use States
  const [selectedValue, setSelectedValue] = useState(optionCurrent);

  // Create + use side Effects
  // ---------------- Side Effect: Update select options value curent from query url --------------------
  useEffect(() => {
    if (optionCurrent) {
      setSelectedValue(optionCurrent);
    } else {
      setSelectedValue(undefined);
    }
  }, [optionCurrent]);

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
