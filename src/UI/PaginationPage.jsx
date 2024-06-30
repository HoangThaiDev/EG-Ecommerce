// Import Modules
import React from "react";

// Import Components
import { Pagination } from "antd";

export default function PaginationPage({
  pageSize,
  products,
  onSaveNextPageProduct,
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
      className="pagination-products"
      showSizeChanger={false}
      defaultCurrent={1}
      total={products.length}
      pageSize={pageSize}
      onChange={onShowSizeChange}
    />
  );
}
