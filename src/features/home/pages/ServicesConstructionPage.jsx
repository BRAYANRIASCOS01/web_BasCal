import Hero from "../../../shared/components/Hero.jsx";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { normalizeLang } from "../../../shared/seo/seo-utils.js";

const ServicesConstructionPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);

  const title =
    safeLang === "en"
      ? "Construction Services | BasCal (In development)"
      : "Servicios de Construccion | BasCal (En desarrollo)";
  const description =
    safeLang === "en"
      ? "This section is currently being expanded with complete information."
      : "Esta seccion se esta ampliando con informacion completa.";

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/servicios/construccion"
        title={title}
        description={description}
        noindex
      />
      <Hero
        eyebrow={t("navbar.services")}
        title={safeLang === "en" ? "Construction services" : "Servicios de construccion"}
        accent={null}
        subtitle={description}
        ctaLabel={safeLang === "en" ? "Contact us" : "Contactanos"}
        ctaHref={`/${safeLang}/contacto`}
        ctaAriaLabel={safeLang === "en" ? "Go to contact" : "Ir a contacto"}
        id="hero-construction"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "920px" }}>
          <p>
            {safeLang === "en"
              ? "We are preparing this page with full scope, methodology, and deliverables."
              : "Estamos preparando esta pagina con alcance, metodologia y entregables completos."}
          </p>
          <Link className="btn btn--primary" to={`/${safeLang}/contacto`}>
            {safeLang === "en" ? "Request information" : "Solicitar informacion"}
          </Link>
        </div>
      </section>

      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información sobre servicios de construcción.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default ServicesConstructionPage;
