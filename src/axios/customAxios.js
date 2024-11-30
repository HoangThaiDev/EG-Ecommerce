// Import Modules
import axios from "axios";
import { API_ROOT } from "../utils/constant";
import store from "../redux/store";
import reduxActions from "../redux/redux-actions";

// Create + use Instance Axios
const axiosInstance = axios.create({
  baseURL: API_ROOT,
  proxy: 1,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Get state of user from store redux
    const { isLoggedIn, accessToken } = store.getState().user;

    // Check user loggedIn then add accessToken in header request
    if (isLoggedIn) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Get state of user from store redux
    const { isLoggedIn, accessToken } = store.getState().user;

    // Update accessToken current in store
    if (isLoggedIn) {
      const newAccessToken = response.headers["x-access-token"];
      store.dispatch(reduxActions.user.updateAccesstoken(newAccessToken));
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
