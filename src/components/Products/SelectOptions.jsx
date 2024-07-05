import React from "react";

// Import File CSS
import "./css/selectRate.css";
import "./css/selectFilter.css";

// Import Components
import { Select } from "antd";

export default function SelectOptions({
  className,
  popupClassName,
  defaultValue,
  options,
  placeholder,
  onSaveValueOption,
}) {
  // Create + use event handlers
  const onChange = (value) => {
    onSaveValueOption(value);
  };
  return (
    <Select
      allowClear={true}
      className={className}
      popupClassName={popupClassName}
      placeholder={placeholder}
      defaultValue={defaultValue}
      optionFilterProp="label"
      onChange={onChange}
      options={options}
    />
  );
}
