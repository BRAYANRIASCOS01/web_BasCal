import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./core/i18n/i18n.js";
import "./styles/index.css";
import "./styles/home.css";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
const ROUTER_FUTURE_FLAGS = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

root.render(
  <React.StrictMode>
    <BrowserRouter future={ROUTER_FUTURE_FLAGS}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
