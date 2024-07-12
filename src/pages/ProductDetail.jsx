// Import Modules
import axiosInstance from "../axios/customAxios";
import { useLocation } from "react-router-dom";

// Import Component
import ItemDetail from "../components/ProductDetail/ItemDetail";
import Header from "../UI/Header";
import { useEffect, useState } from "react";

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
      console.log(state);
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
      {isLoading && <ItemDetail productDetail={productDetail} />}
    </>
  );
}

export default ProductDetail;
