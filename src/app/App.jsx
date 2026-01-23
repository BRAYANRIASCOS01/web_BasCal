import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "../features/home/pages/HomePage.jsx";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <HelmetProvider>
      <HomePage />
    </HelmetProvider>
  );
};

export default App;