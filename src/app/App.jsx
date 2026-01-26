import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";

import HomePage from "../features/home/pages/HomePage.jsx";

const SUPPORTED_LANGS = ["es", "en"];
const DEFAULT_LANG = "es";

function getInitialLang() {
  const saved = localStorage.getItem("lang");
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

  const nav = (navigator.language || DEFAULT_LANG).toLowerCase();
  const base = nav.split("-")[0];
  if (SUPPORTED_LANGS.includes(base)) return base;

  return DEFAULT_LANG;
}

const App = () => {
  const { i18n } = useTranslation();

  // Mantiene <html lang="..."> sincronizado (lo tuyo, intacto)
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const initialLang = getInitialLang();

  return (
    <HelmetProvider>
      <Routes>
        {/* / -> /es o /en */}
        <Route path="/" element={<Navigate to={`/${initialLang}`} replace />} />

        {/* Home por idioma */}
        <Route path="/:lang" element={<HomePage />} />

        {/* Cualquier otra ruta -> /es */}
        <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
