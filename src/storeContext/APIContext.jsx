// Import Modules
import axiosInstance from "../axios/customAxios";

// Import Hooks
import React, { createContext, useEffect, useState } from "react";

// Create Context (Hook)
const APIContext = createContext();

export default function Provider({ children }) {
  // Create + use Hooks
  const [categroies, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance("/category/categories");

        if (response.status === 200) {
          setCategories(response.data);
          setIsLoading(true);
          return false;
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading && (
        <APIContext.Provider value={categroies}>{children}</APIContext.Provider>
      )}
    </>
  );
}

export { APIContext };
