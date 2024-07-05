// Import Modules
import React from "react";

// Import Components
import { Pagination } from "antd";

// Import File CSS
import "./css/pagination.css";

export default function PaginationPage({
  pageSize,
  products,
  onSaveNextPageProduct,
  className,
}) {
  // Create + use event handlers
  const onShowSizeChange = (pageCurrent, pageSize) => {
    const startIndexPage = (pageCurrent - 1) * pageSize;
    const endIndexPage = pageSize * pageCurrent;
    const slicePage = products.slice(startIndexPage, endIndexPage);
    onSaveNextPageProduct(slicePage);
  };

  return (
    <Pagination
      className={className}
      showSizeChanger={false}
      defaultCurrent={1}
      total={products.length}
      pageSize={pageSize}
      onChange={onShowSizeChange}
    />
  );
}
