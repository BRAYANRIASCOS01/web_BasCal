import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const setLanguage = (language) => {
    i18n.changeLanguage(language);
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