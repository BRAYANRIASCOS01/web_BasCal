import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hero from "../../../shared/components/Hero.jsx";
import PortfolioGrid from "../sections/PortfolioGrid.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { BASCAL_CONTACT_PHONE } from "../../../shared/contact.js";
import { getLocalizedUrl, normalizeLang } from "../../../shared/seo/seo-utils.js";
import "../../../styles/sections/portfolio-page.css";

const PortafolioPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const canonical = getLocalizedUrl(safeLang, "/portafolio");
  const homeUrl = getLocalizedUrl(safeLang, "/");

  const projects = useMemo(() => {
    const raw = t("portfolioPage.projects", { returnObjects: true });
    return Array.isArray(raw) ? raw : [];
  }, [t, safeLang]);

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("portfolioPage.seo.title"),
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Project",
        name: project.title,
        description: project.description,
        ...(project.location ? { location: project.location } : {}),
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("navbar.portfolio"),
        item: canonical,
      },
    ],
  };

  const keywords =
    safeLang === "en"
      ? "BIM project portfolio, MEP projects, engineering case studies, construction portfolio"
      : "portafolio proyectos BIM, proyectos MEP, casos de ingenieria, portafolio construccion";

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/portafolio"
        title={t("portfolioPage.seo.title")}
        description={t("portfolioPage.seo.description")}
        keywords={keywords}
        structuredData={[portfolioSchema, breadcrumbSchema]}
      />

      <Hero
        eyebrow={t("portfolioPage.hero.eyebrow")}
        title={t("portfolioPage.hero.title")}
        accent={null}
        subtitle={t("portfolioPage.hero.subtitle")}
        ctaLabel={t("portfolioPage.hero.cta")}
        ctaHref="#portfolio-projects"
        ctaAriaLabel={t("portfolioPage.hero.cta")}
        id="hero-portfolio"
      />

      <PortfolioGrid />

      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone={BASCAL_CONTACT_PHONE}
        message={t("portfolioPage.whatsappMessage", "Hola, quiero recibir información sobre los servicios y proyectos de BasCal. Me interesa conocer cómo pueden apoyarme en BIM, diseño arquitectónico, ingeniería MEP o coordinación técnica. ¿Podrían orientarme?")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default PortafolioPage;
