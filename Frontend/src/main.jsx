import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductProvider } from "./Context/ProductContext";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./Authentication/store/reducer";

const store = configureStore({ reducer });

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ProductProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ProductProvider>
  </Provider>
);
