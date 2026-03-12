import Hero from "../../../shared/components/Hero.jsx";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { normalizeLang } from "../../../shared/seo/seo-utils.js";

const ServicesStaffAugmentationPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);

  const title =
    safeLang === "en"
      ? "Staff Augmentation | BasCal (In development)"
      : "Staff Augmentation | BasCal (En desarrollo)";
  const description =
    safeLang === "en"
      ? "This section is currently being expanded with complete information."
      : "Esta seccion se esta ampliando con informacion completa.";

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/servicios/staff-augmentation"
        title={title}
        description={description}
        noindex
      />
      <Hero
        eyebrow={t("navbar.services")}
        title={safeLang === "en" ? "Staff augmentation" : "Staff augmentation"}
        accent={null}
        subtitle={description}
        ctaLabel={safeLang === "en" ? "Contact us" : "Contactanos"}
        ctaHref={`/${safeLang}/contacto`}
        ctaAriaLabel={safeLang === "en" ? "Go to contact" : "Ir a contacto"}
        id="hero-staff"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "920px" }}>
          <p>
            {safeLang === "en"
              ? "We are preparing this page with full scope, team profiles, and engagement models."
              : "Estamos preparando esta pagina con alcance, perfiles de equipo y modelos de contratacion completos."}
          </p>
          <Link className="btn btn--primary" to={`/${safeLang}/contacto`}>
            {safeLang === "en" ? "Request information" : "Solicitar informacion"}
          </Link>
        </div>
      </section>

      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información sobre servicios de staff augmentation.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default ServicesStaffAugmentationPage;
