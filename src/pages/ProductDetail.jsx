// Import Modules
import axiosInstance from "../axios/customAxios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Import Component
import Header from "../UI/Header";
import MainSection from "../components/ProductDetail/MainSection";

function ProductDetail() {
  // Create + use Hooks
  const { state } = useLocation();

  // Create + use States
  const [productDetail, setProductDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Create + use side effects
  // --------------------- Side Effect: Fetch API Get ProductDetail from Server -------------------------
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axiosInstance.get(
          `products/detail/${state.productId}`
        );
        if (response.status === 200) {
          setProductDetail(response.data);
          setIsLoading(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (state.productId !== "") {
      fetchProductDetail();
    }
  }, [state]);

  // --------------------- Side Effect: When page ProductDetail reload then scroll to info product  -------------------------
  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        window.scrollTo({ top: 400, left: 0, behavior: "smooth" });
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  return (
    <>
      <Header
        title="Product Details"
        linkBack="Home"
        linkCurrent="Product Details"
      />

      {isLoading && <MainSection productDetail={productDetail} />}
    </>
  );
}

export default ProductDetail;
