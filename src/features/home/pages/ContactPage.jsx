import Hero from "../../../shared/components/Hero.jsx";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Form from "../../../shared/components/Form.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { getLocalizedUrl, normalizeLang } from "../../../shared/seo/seo-utils.js";

const ContactPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const canonical = getLocalizedUrl(safeLang, "/contacto");
  const title =
    safeLang === "en"
      ? `${t("contactInfo.pageTitle", "Contact")} | BasCal`
      : `${t("contactInfo.pageTitle", "Contacto")} | BasCal`;
  const description = t(
    "contactInfo.pageSubtitle",
    safeLang === "en"
      ? "Tell us about your project and we will get back to you as soon as possible."
      : "Cuentanos sobre tu proyecto y te responderemos en el menor tiempo posible."
  );
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "contacto@bascal.com";
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || "+57 300 111 2233";
  const whatsappPhone = String(contactPhone).replace(/\D+/g, "");
  const whatsappMessage = encodeURIComponent(
    t("home.whatsappMessage", "Hola, quiero más información sobre servicios BIM.")
  );

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: title,
    description,
    inLanguage: safeLang,
    url: canonical,
    mainEntity: {
      "@type": "Organization",
      name: "BasCal",
      url: getLocalizedUrl(safeLang, "/"),
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: contactEmail,
          telephone: contactPhone,
          availableLanguage: ["es", "en"],
        },
      ],
    },
  };

  const keywords =
    safeLang === "en"
      ? "contact BasCal, engineering quote, BIM consulting, MEP project contact"
      : "contacto BasCal, cotizacion ingenieria, asesoria BIM, contacto proyectos MEP";

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/contacto"
        title={title}
        description={description}
        keywords={keywords}
        structuredData={contactSchema}
      />
      <Hero
        title={t("contacthero.hero.title")}
        accent={null}
        subtitle={t("contacthero.hero.subtitle")}
        ctaLabel={t("contacthero.hero.cta")}
        ctaHref="#contact-form"
        ctaAriaLabel={t("contacthero.hero.cta")}
        id="hero-contact"
      />

      {/* SECCION estilo Servicios BIM (titulo centrado + subtitulo + separador) */}
      <section className="section contact-section">
        <div className="container">
          <header className="section-header">
            <h2 className="section-header__title">
              {t("contactInfo.sectionTitle", "Hablemos")}
            </h2>
            <p className="section-header__subtitle">
              {t(
                "contactInfo.sectionSubtitle",
                "Completa el formulario y te contactaremos en 24–48 horas hábiles."
              )}
            </p>
            <div className="section-header__divider" />
          </header>

          <div className="contact-layout" id="contact-form">
            {/* Card del formulario */}
            <div className="contact-card">
              <Form formName="contacto-general" />
              <div className="contact-whatsapp">
                <p className="contact-whatsapp__text">
                  {t("contactInfo.btnwhats", "¿Prefieres escribirnos directamente?")}
                </p>

                <a
                  href={`https://wa.me/${whatsappPhone}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-whatsapp__button"
                  aria-label="Contactar por WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Card informativa (mismo patrón visual) */}
            <aside className="contact-info-card" aria-label="Información de contacto">
              <div className="contact-info-card__head">
                <h3 className="contact-info-card__title">
                  {t("contactInfo.infoTitle", "Información de contacto")}
                </h3>
                <p className="contact-info-card__muted">
                  {t("contactInfo.infoSubtitle", "También puedes escribirnos directamente.")}
                </p>
              </div>

              <div className="contact-info-card__item">
                <p className="contact-info-card__label">{t("contactInfo.emailLabel", "Correo")}</p>
                <a className="contact-info-card__value" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </div>

              <div className="contact-info-card__item">
                <p className="contact-info-card__label">{t("contactInfo.locationLabel", "Ubicación")}</p>
                <p className="contact-info-card__value">Medellín, Colombia</p>
              </div>

              <div className="contact-info-card__item">
                <p className="contact-info-card__label">{t("contactInfo.responseLabel", "Tiempo de respuesta")}</p>
                <p className="contact-info-card__value">
                  {t("contactInfo.responseValue", "24–48 horas hábiles")}
                </p>
              </div>

              <div className="contact-info-card__trust">
                <p className="contact-info-card__trustTitle">
                  {t("contactInfo.coverageTitle", "Cobertura de proyectos")}
                </p>
                <p className="contact-info-card__trustCountries">
                  Colombia · Ecuador · Venezuela · Mexico · Estados Unidos
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información sobre servicios BIM.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default ContactPage;
