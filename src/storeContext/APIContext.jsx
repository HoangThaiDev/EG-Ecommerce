// Import Modules
import APIServer from "../API/customAPI";

// Import Hooks
import React, { createContext, useEffect, useState } from "react";

// Create Constants
const APIContext = createContext();

export default function Provider({ children }) {
  // Create + use States
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create + use Side Effects
  // --------------- Side Effects: Fetch API get value of Categories & Products ----------------------
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const resOfCategory = await APIServer.category.getCategories();
        const resOfProduct = await APIServer.shop.getProducts();

        if (resOfCategory.status === 200 && resOfProduct.status === 200) {
          setCategories(resOfCategory.data);
          setProducts(resOfProduct.data);
          setIsLoading(true);
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop();
  }, []);

  return (
    <>
      {isLoading && (
        <APIContext.Provider
          value={{ categories: categories, products: products }}
        >
          {children}
        </APIContext.Provider>
      )}
    </>
  );
}

export { APIContext };
