// Import Modules
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";
import { Provider } from "react-redux";

// Import Components
import App from "./App.jsx";

// Import Files CSS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
