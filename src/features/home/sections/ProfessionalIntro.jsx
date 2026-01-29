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
              <span className="pro-intro__meta-value">12</span>
              <span className="pro-intro__meta-label">{t("professionalPage.intro.metaCountries", "Países de operación")}</span>
            </div>
            <div>
              <span className="pro-intro__meta-value">24/7</span>
              <span className="pro-intro__meta-label">{t("professionalPage.intro.metaSupport", "Soporte de proyectos")}</span>
            </div>
          </div>
        </div>

        <div className="pro-intro__media">
          <div className="pro-intro__media-glow" />
          <div className="pro-intro__media-frame">
            <iframe
              src="https://www.youtube.com/embed/1pD-AglN0bs?si=SUPDPQrPpLEqDOwb"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalIntro;
