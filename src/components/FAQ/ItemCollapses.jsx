// Import Modules
import React from "react";

// Import File CSS
import "./css/itemCollapses.css";

// Import Components
import { Collapse } from "antd";

function ItemCollapses({ title, items, className, expandicon }) {
  return (
    <div className="collapse-faq">
      <div className="collapse-faq-container">
        <h2>{title}</h2>
        <Collapse
          accordion
          className={className}
          items={items}
          expandIcon={() => expandicon}
        />
      </div>
    </div>
  );
}

export default ItemCollapses;
