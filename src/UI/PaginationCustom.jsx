// Import Modules
import React, { useEffect, useState } from "react";

// Import Components
import { Pagination } from "antd";

// Import File CSS
import "./css/pagination.css";

export default function PaginationCustom({
  pageSize,
  onSaveNextPageProduct,
  className,
  currentPage,
  total,
}) {
  // // Create + use Hooks
  // const location = useLocation();

  // // Create + use States
  const [pageActive, setPageActive] = useState(1);

  // // Create + use side Effects
  // // ------------ Side Effect: Update current page to 1 when reload page
  useEffect(() => {
    setPageActive(currentPage);
  }, [currentPage]);

  // Create + use event handles
  const onChange = (pageSelect) => {
    setPageActive(pageSelect);
    onSaveNextPageProduct(pageSelect);
  };

  return (
    <Pagination
      className={className}
      showSizeChanger={false}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      current={pageActive}
    />
  );
}
