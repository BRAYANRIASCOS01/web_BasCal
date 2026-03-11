import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./core/i18n/i18n.js";
import "./styles/index.css";
import "./styles/home.css";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);