import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "../features/home/pages/HomePage.jsx";

import AppRoutes from "./routes.jsx";
import Navbar from "../shared/components/Navbar.jsx";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <HelmetProvider>
        <AppRoutes />
    </HelmetProvider>
  );
};

export default App;