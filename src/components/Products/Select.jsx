import React from "react";
// Import Components
import { Select } from "antd";

export default function Select({
  className,
  popupClassName,
  defaultValue,
  options,
  placeholder,
}) {
  // Create + use event handlers
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Select
      allowClear={true}
      className={className}
      popupClassName={popupClassName}
      placeholder={placeholder}
      defaultValue="Filter"
      optionFilterProp="label"
      onChange={onChange}
      options={options}
    />
  );
}
