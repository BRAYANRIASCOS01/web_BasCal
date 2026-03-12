import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../shared/locales/en.json";
import es from "../../shared/locales/es.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
};

const SUPPORTED_LANGUAGES = ["es", "en"];
const DEFAULT_LANG = "es";

function resolveInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANG;

  const fromPath = window.location.pathname.split("/").filter(Boolean)[0];
  if (SUPPORTED_LANGUAGES.includes(fromPath)) return fromPath;

  const fromStorage = window.localStorage.getItem("lang");
  if (SUPPORTED_LANGUAGES.includes(fromStorage)) return fromStorage;

  return DEFAULT_LANG;
}

const initialLanguage = resolveInitialLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANG,
  interpolation: {
    escapeValue: false,
  },
});

if (typeof document !== "undefined") {
  document.documentElement.lang = initialLanguage;
}

export default i18n;
