// Import Modules
import React, { useEffect, useState } from "react";

// Import File CSS
import "./css/collapseCategory.css";

// Import Components
import { Collapse } from "antd";

export default function CollapseCategory({
  className,
  products,
  categories,
  onSaveValueCategory,
  categoryValueSearch,
  categoryCurrent,
}) {
  // Create + use States
  const [categoryActive, setCategoryActive] = useState("");

  // Create + use side Effects
  // -------------- Side Effect: Update Category Active by query url ---------------------
  useEffect(() => {
    if (categoryCurrent) {
      setCategoryActive(categoryCurrent);
    } else {
      setCategoryActive("");
    }
  }, [categoryCurrent]);

  // Create + use Logics
  const modifiedCategories = categories.map((category) => {
    return {
      _id: category._id,
      title: category.title,
      products: products.filter(
        (product) => product.categoryId.title === category.title
      ),
    };
  });

  const items = [
    {
      key: "category",
      label: "Categories",
      children: (
        <ul className="category-list">
          {modifiedCategories.map((item) => (
            <li
              key={item._id}
              className={
                categoryValueSearch === item.title
                  ? "category-item active"
                  : "category-item"
              }
              onClick={() => getValueCategoryHandle(item.title)}
            >
              <span
                className={
                  categoryValueSearch === item.title
                    ? "category-item-name active"
                    : "category-item-name"
                }
              >
                {item.title}
              </span>

              <span
                className={
                  categoryValueSearch === item.title
                    ? "category-item-quantity active"
                    : "category-item-quantity"
                }
              >
                {item.products.length > 10
                  ? `(${item.products.length})`
                  : `(0${item.products.length})`}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  // Create + use event handles
  const getValueCategoryHandle = (title) => {
    // Check category choose by client
    if (title !== categoryActive) {
      setCategoryActive(title);
      onSaveValueCategory(title);
    } else {
      setCategoryActive("");
      onSaveValueCategory("", "");
    }
  };

  return (
    <div className="collapse__container">
      <h2 className="collapse__title">EXPLORE</h2>
      <Collapse
        accordion
        className={className}
        items={items}
        defaultActiveKey={categoryValueSearch ? ["category"] : []}
      />
    </div>
  );
}
