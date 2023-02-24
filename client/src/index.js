import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./store/user";
import postReducer from "./store/postReducer";
import ChatReducer from "./store/ChatReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    chat: ChatReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
const root = ReactDOM.createRoot(document.getElementById("root2"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
