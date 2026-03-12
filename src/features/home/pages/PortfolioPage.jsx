import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hero from "../../../shared/components/Hero.jsx";
import PortfolioGrid from "../sections/PortfolioGrid.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import "../../../styles/sections/portfolio-page.css";

const PortafolioPage = () => {
  const { t, i18n } = useTranslation();
  const { lang = "es" } = useParams();

  const canonicalFallback = `https://bascal.com/${lang}/portafolio`;
  const canonicalRaw = typeof window !== "undefined" ? window.location.href : canonicalFallback;
  const canonical = canonicalRaw.split("#")[0].split("?")[0].replace(/\/$/, "");
  const ogImage = `${canonical}/og-image.svg`;
  const ogLocale = i18n.language === "en" ? "en_US" : "es_ES";
  const alternateLocale = ogLocale === "es_ES" ? "en_US" : "es_ES";
  const altLang = i18n.language === "en" ? "es" : "en";
  const alternateUrl = canonical.replace(`/${lang}/`, `/${altLang}/`);

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
      <Helmet>
        <title>{t("portfolioPage.seo.title")}</title>
        <meta name="description" content={t("portfolioPage.seo.description")} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang={altLang} href={alternateUrl} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={alternateLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BasCal" />
        <meta property="og:title" content={t("portfolioPage.seo.title")} />
        <meta property="og:description" content={t("portfolioPage.seo.description")} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t("portfolioPage.seo.title")} />
        <meta name="twitter:description" content={t("portfolioPage.seo.description")} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(portfolioSchema)}</script>
      </Helmet>

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
