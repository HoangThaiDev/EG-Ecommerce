// Import Modules
import React, { useState } from "react";

// Import File CSS
import "./css/collapseCategory.css";

// Import Components
import { Collapse } from "antd";

export default function CollapseCategory({
  className,
  products,
  categories,
  onSaveValueCategory,
}) {
  // Create + use Hooks
  const [categoryActive, setCategoryActive] = useState("");

  // Create + use item of Collapse
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
      key: "1",
      label: "Categories",
      children: (
        <ul className="category-list">
          {modifiedCategories.map((item) => (
            <li
              key={item._id}
              className={
                categoryActive === item.title
                  ? `${"category-item"} ${"category-item-active"} `
                  : "category-item"
              }
              onClick={() => getValueCategoryHandler(item._id, item.title)}
            >
              <span className="category-item-name">{item.title}</span>
              <span className="category-item-quantity">
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

  // Create + use event handlers
  const getValueCategoryHandler = (_id, title) => {
    onSaveValueCategory(_id, title);
    setCategoryActive(title);
  };

  return (
    <div className="collapse__container">
      <h2 className="collapse__title">EXPLORE</h2>
      <Collapse accordion className={className} items={items} />
    </div>
  );
}
