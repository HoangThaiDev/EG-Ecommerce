// Import Modules
import axiosInstance from "../axios/customAxios";

const APIServer = {
  shop: {
    getProducts: () => {
      return axiosInstance.get("/products");
    },
    searchProducts: () => {
      return axiosInstance.get("/products/search");
    },
    addToCart: () => {
      return axiosInstance.post("/products/add-to-cart");
    },
    getProduct: (productID) => {
      return axiosInstance.get(`/products/detail/${productID}`);
    },
  },
  user: {
    login: () => {
      return axiosInstance.post("/user/login");
    },
    register: () => {
      return axiosInstance.post("/user/register");
    },
    logout: () => {
      //   return axiosInstance.get("/user");
    },
  },
  category: {
    getCategories: () => {
      return axiosInstance.get("/categories");
    },
  },
};

export default APIServer;
