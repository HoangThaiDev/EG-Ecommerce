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
      return axiosInstance.post("/users/login", valuesForm);
    },
    register: (valuesForm) => {
      console.log(valuesForm);

      return axiosInstance.post("/users/register", valuesForm);
    },
    logout: () => {
      return axiosInstance.get("/users/logout");
    },
    getInfo: () => {
      return axiosInstance.get("/users/user");
    },
  },

  category: {
    getCategories: () => {
      return axiosInstance.get("/categories");
    },
  },

  cart: {
    addToCart: (valueProduct) => {
      return axiosInstance.post("/carts/add-to-cart", valueProduct);
    },

    deleteProduct: (productID) => {
      return axiosInstance.delete(`/carts/product/${productID}`);
    },

    deleteProducts: (products) => {
      return axiosInstance.post("/carts/products", products);
    },
  },

  checkout: {
    create: (cart) => {
      return axiosInstance.post("/checkouts/create", cart);
    },

    update: (formValues) => {
      return axiosInstance.post("/checkouts/add-info", formValues);
    },

    getCheckout: () => {
      return axiosInstance.get("/checkouts/checkout");
    },
  },

  order: {
    getOrder: () => {
      return axiosInstance.get("/orders/order");
    },
  },
};

export default APIServer;
