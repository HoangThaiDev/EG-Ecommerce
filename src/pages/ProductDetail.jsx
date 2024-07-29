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
      const response = await axiosInstance.post(
        `products/detail/${state.productId}`
      );
      setProductDetail(response.data);
      setIsLoading(true);
    };

    if (state.productId !== "") {
      fetchProductDetail();
    }
  }, []);

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
