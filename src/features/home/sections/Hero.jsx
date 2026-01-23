import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../translation/LanguageSwitcher.jsx";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <header className="hero section">
      <div className="container fade-up">
        <p className="eyebrow">{t("home.eyebrow")}</p>
        <h1 className="hero__title">{t("home.heroTitle")}</h1>
        <p className="hero__subtitle text-muted">{t("home.heroSubtitle")}</p>
        <div className="actions">
          <button className="btn btn--primary" type="button">
            {t("home.primaryCta")}
          </button>
          <button className="btn btn--outline" type="button">
            {t("home.secondaryCta")}
          </button>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Hero;