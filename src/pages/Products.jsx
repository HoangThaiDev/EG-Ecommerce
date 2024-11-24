// Import Modules
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import APIServer from "../API/customAPI";
import { APIContext } from "../storeContext/APIContext";

// Import Components
import Header from "../UI/Header";
import SidebarProduct from "../components/Products/SidebarProduct";

const Products = () => {
  // Create + use Hooks
  const location = useLocation();

  // Create + use States
  const { categories } = useContext(APIContext); // Get data products from server
  const [products, setProducts] = useState({
    value: [],
    total: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Create + use side Effects
  // -------------- Side Effect: Fetch products have query or not
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Modify path query
        const newQueries = location.search.replace("?", "");

        const res = await APIServer.shop.getProductsByQueries(newQueries);

        if (res.status === 200) {
          const { totalProducts, sliceProducts } = await res.data;

          // Update States
          setProducts((prevState) => ({
            ...prevState,
            value: sliceProducts,
            total: totalProducts,
          }));
          setIsLoading(true);
        }
      } catch (error) {
        const { status } = error.response;
        if (status === 400) {
          setProducts((prevState) => ({
            ...prevState,
            value: [],
            total: [],
          }));
        }
        setIsLoading(true);
        if (status === 500) {
          setIsLoading(false);
        }
      }
    };

    // Call function
    fetchProducts();
  }, [location]);

  return (
    <>
      <Header title="Products" linkBack="Home" linkCurrent="Products" />
      {isLoading && (
        <SidebarProduct categories={categories} products={products} />
      )}
    </>
  );
};

export default Products;
