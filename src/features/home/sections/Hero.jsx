import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../translation/LanguageSwitcher.jsx";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <header className="hero hero--brand section">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__photo hero__photo--arch" />
        <span className="hero__photo hero__photo--offices" />
        <span className="hero__photo hero__photo--mesh" />
      </div>

      <div className="container hero__content fade-up">
        <p className="eyebrow">{t("home.eyebrow")}</p>
        <h1 className="hero__title">
          {t("home.heroTitle")}
          <span className="hero__accent">BIM/VDC</span>
        </h1>
        <p className="hero__subtitle text-muted">{t("home.heroSubtitle")}</p>
        <div className="actions hero__actions">
          <a className="btn btn--primary" href="#services" aria-label={t("home.secondaryCta")}>
            {t("home.secondaryCta")}
          </a>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Hero;
