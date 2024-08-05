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
  const [productDetail, setProductDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axiosInstance.post(
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
