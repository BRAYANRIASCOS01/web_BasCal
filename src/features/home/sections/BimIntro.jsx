import { useTranslation } from "react-i18next";

const BimIntro = () => {
  const { t } = useTranslation();

  return (
    <section className="section bim-intro">
      <div className="container bim-intro__inner" data-animate>
        <div className="bim-intro__content">
          <p className="bim-intro__eyebrow">{t("bimPage.services.eyebrow", "Servicios BIM & VDC")}</p>
          <h2 className="section-title">{t("bimPage.intro.title")}</h2>
          <p className="section-subtitle text-muted">{t("bimPage.intro.text")}</p>
          <div className="bim-intro__meta">
            <div>
              <span className="bim-intro__meta-value">LOD 300-400</span>
              <span className="bim-intro__meta-label">{t("bimPage.intro.metaDetail", "Nivel de detalle")}</span>
            </div>
            <div>
              <span className="bim-intro__meta-value">+18%</span>
              <span className="bim-intro__meta-label">{t("bimPage.intro.metaSavings", "Ahorro estimado")}</span>
            </div>
          </div>
        </div>

        <div className="bim-intro__media">
          <div className="bim-intro__media-glow" />
          <div className="bim-intro__media-frame">
            <iframe
              src="https://www.youtube.com/embed/VRXwJnaZ22U?si=lvCTLCH4HRKK3nEF&start=1"
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

export default BimIntro;
