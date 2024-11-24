// Import Modules
import axiosInstance from "../axios/customAxios";

const APIServer = {
  shop: {
    getProducts: () => {
      return axiosInstance.get("/products");
    },
    getProduct: (productID) => {
      return axiosInstance.get(`/products/detail/${productID}`);
    },
    getProductsByQueries: (queriesValue) => {
      return axiosInstance.get(`/products/query?${queriesValue}`);
    },
    addToCart: () => {
      return axiosInstance.post("/products/add-to-cart");
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
