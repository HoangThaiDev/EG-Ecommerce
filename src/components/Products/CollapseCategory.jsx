// Import Modules
import React, { useEffect, useState } from "react";

// Import File CSS
import "./css/collapseCategory.css";

// Import Components
import { Collapse } from "antd";
import { useLocation } from "react-router-dom";

export default function CollapseCategory({
  className,
  products,
  categories,
  onSaveValueCategory,
  categoryValueSearch,
}) {
  // Create + use Hooks
  const [categoryActive, setCategoryActive] = useState({
    title: "",
  });
  const { search: pathSearch } = useLocation();

  // Side Effect: Update CategoryActive
  useEffect(() => {
    if (pathSearch.length > 0) {
      const valueCategorySearch = pathSearch.split("=")[1].replace(/%20/g, " ");
      setCategoryActive({ state: true, title: valueCategorySearch });
    }
  }, []);

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
              onClick={() => getValueCategoryHandler(item._id, item.title)}
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

  // Create + use event handlers
  const getValueCategoryHandler = (_id, title) => {
    // Check category chosen by client

    if (title !== categoryActive.title) {
      setCategoryActive({ title: title });
      onSaveValueCategory(_id, title);
    } else {
      setCategoryActive({ title: "" });
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
