import { useTranslation } from "react-i18next";

const ProfessionalIntro = () => {
  const { t } = useTranslation();

  return (
    <section className="section pro-intro">
      <div className="container pro-intro__inner" data-animate>
        <div className="pro-intro__content">
          <p className="pro-intro__eyebrow">{t("professionalPage.hero.eyebrow", "Servicios profesionales")}</p>
          <h2 className="section-title">{t("professionalPage.services.title", "Servicios profesionales")}</h2>
          <p className="section-subtitle text-muted">{t("professionalPage.services.subtitle")}</p>
          <div className="pro-intro__meta">
            <div>
              <span className="pro-intro__meta-value">5</span>
              <span className="pro-intro__meta-label">{t("professionalPage.intro.metaCountries", "Países de operación")}</span>
            </div>
            <div>
              <span className="pro-intro__meta-value">24/7</span>
              <span className="pro-intro__meta-label">{t("professionalPage.intro.metaSupport", "Soporte de proyectos")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalIntro;
