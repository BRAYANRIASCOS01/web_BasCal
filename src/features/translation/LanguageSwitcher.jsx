import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const setLanguage = (language) => {
    i18n.changeLanguage(language);

    const segments = location.pathname.split("/").filter(Boolean);
    const rest = segments[0] === "es" || segments[0] === "en" ? segments.slice(1) : segments;
    const nextPath = `/${[language, ...rest].join("/")}`.replace(/\/+$/, "");

    navigate(nextPath || `/${language}`, { replace: true });
  };

  return (
    <div className="language-switcher" aria-label={t("language.label")}>
      <button
        className={`language-switcher__button${
          i18n.language === "es" ? " language-switcher__button--active" : ""
        }`}
        type="button"
        onClick={() => setLanguage("es")}
      >
        {t("language.spanish")}
      </button>
      <button
        className={`language-switcher__button${
          i18n.language === "en" ? " language-switcher__button--active" : ""
        }`}
        type="button"
        onClick={() => setLanguage("en")}
      >
        {t("language.english")}
      </button>
    </div>
  );
};

export default LanguageSwitcher;