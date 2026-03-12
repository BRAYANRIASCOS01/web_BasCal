import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hero from "../../../shared/components/Hero.jsx";
import PortfolioGrid from "../sections/PortfolioGrid.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import "../../../styles/sections/portfolio-page.css";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { normalizeLang } from "../../../shared/seo/seo-utils.js";

const PortafolioPage = () => {
  const { t, i18n } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);

  const projects = useMemo(() => {
    const raw = t("portfolioPage.projects", { returnObjects: true });
    return Array.isArray(raw) ? raw : [];
  }, [t, i18n.language]);

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

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/portafolio"
        title={t("portfolioPage.seo.title")}
        description={t("portfolioPage.seo.description")}
        structuredData={portfolioSchema}
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
        phone="573001112233"
        message={t("portfolioPage.whatsappMessage", "Hola, quiero más información sobre el portafolio.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default PortafolioPage;
