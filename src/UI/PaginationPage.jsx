// Import Modules
import React, { useEffect, useState } from "react";

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
  // Create + use States
  const [currentPage, setCurrentPage] = useState(1);

  // Create + use side Effects
  // ------------ Side EffectL Update current page to 1 when ever products change
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  // Create + use event handles
  const onShowSizeChange = (pageCurrent, pageSize) => {
    const startIndexPage = (pageCurrent - 1) * pageSize;
    const endIndexPage = pageSize * pageCurrent;
    const slicePage = products.slice(startIndexPage, endIndexPage);
    setCurrentPage(pageCurrent);
    onSaveNextPageProduct(slicePage);
  };

  return (
    <Pagination
      className={className}
      showSizeChanger={false}
      total={products.length}
      pageSize={pageSize}
      onChange={onShowSizeChange}
      current={currentPage}
    />
  );
}
