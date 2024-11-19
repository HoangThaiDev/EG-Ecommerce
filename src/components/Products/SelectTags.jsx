// Import Modules
import React, { useContext, useState, useEffect } from "react";

// Import File CSS
import "./css/selectTags.css";
import { APIContext } from "../../storeContext/APIContext";

// Import Components
import { Tag } from "antd";

export default function SelectTags({ stateProducts, onSaveValueTags }) {
  // Create + use Hooks
  const { products } = useContext(APIContext);

  // Create + use States
  const [selectedTags, setSelectedTags] = useState([]);

  // Create + use Logics
  const tagsData = [
    ...new Set(products.flatMap((product) => product.tags)),
  ].filter((tag) => tag !== "Can");

  // Create + use side Effects
  // --------------- Side Effect:  Reset selected value on page refresh --------------------
  useEffect(() => {
    if (stateProducts && stateProducts.searchedProducts.length > 0) {
      setSelectedTags([]);
    }
  }, [stateProducts]);

  // Create + use event handlers
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    onSaveValueTags(nextSelectedTags);
  };

  return (
    <div className="tags">
      <h2 className="tags__title">PRODUCT TAG</h2>
      <div className="tag-list">
        {tagsData.map((tag, index) => (
          <p key={index}>
            <Tag.CheckableTag
              className="tag-product"
              key={tag.title}
              checked={selectedTags.includes(tag)}
              onChange={(checked) => handleChange(tag, checked)}
            >
              {tag}
            </Tag.CheckableTag>
          </p>
        ))}
      </div>
    </div>
  );
}
