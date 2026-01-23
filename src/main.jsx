import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./core/i18n/i18n.js";
import "./styles/index.css";
import "./styles/home.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);