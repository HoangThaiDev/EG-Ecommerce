// Import Modules
import axiosInstance from "../axios/customAxios";

// Import Hooks
import React, { createContext, useEffect, useState } from "react";

// Create Context (Hook)
const APIContext = createContext();

export default function Provider({ children }) {
  // Create + use Hooks
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resOfCategory = await axiosInstance("/category/categories");
        const resOfProduct = await axiosInstance("/product/products");

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
    fetchCategories();
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
