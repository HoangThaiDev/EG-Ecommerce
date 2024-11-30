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
  },
  user: {
    login: (valuesForm) => {
      return axiosInstance.post("/user/login", valuesForm);
    },
    register: (valuesForm) => {
      return axiosInstance.post("/user/register", valuesForm);
    },
    logout: () => {
      return axiosInstance.get("/user/logout");
    },
    getInfo: () => {
      return axiosInstance.get("/user/");
    },
  },
  category: {
    getCategories: () => {
      return axiosInstance.get("/categories");
    },
  },
  cart: {
    addToCart: (valueProduct) => {
      return axiosInstance.post("/cart/add-to-cart", valueProduct);
    },
  },
};

export default APIServer;
