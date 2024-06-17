// Import Modules
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";
import { Provider as ProviderRedux } from "react-redux";
import ProviderContext from "./storeContext/APIContext.jsx";

// Import Components
import App from "./App.jsx";

// Import Files CSS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProviderContext>
      <ProviderRedux store={store}>
        <App />
      </ProviderRedux>
    </ProviderContext>
  </React.StrictMode>
);
