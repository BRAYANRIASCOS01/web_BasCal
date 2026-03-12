import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hero from "../../../shared/components/Hero.jsx";
import AboutStory from "../sections/AboutStory.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { getLocalizedUrl, normalizeLang } from "../../../shared/seo/seo-utils.js";
import "../../../styles/sections/about-story.css";

const EmpresaSobreNosotros = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const pageRef = useRef(null);
  const canonical = getLocalizedUrl(safeLang, "/empresa/sobre-nosotros");
  const homeUrl = getLocalizedUrl(safeLang, "/");

  useEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return undefined;
    const animated = pageEl.querySelectorAll("section [data-animate]");
    if (!animated.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.25 }
    );
    animated.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [safeLang]);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("aboutPage.seo.title"),
    description: t("aboutPage.seo.description"),
    inLanguage: safeLang,
    url: canonical,
    mainEntity: {
      "@type": "Organization",
      name: "BasCal",
      url: homeUrl,
    },
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
        name: t("navbar.companyItems.about"),
        item: canonical,
      },
    ],
  };

  const keywords =
    safeLang === "en"
      ? "about BasCal, engineering company, BIM specialists, MEP firm"
      : "sobre BasCal, empresa de ingenieria, especialistas BIM, firma MEP";

  return (
    <main className="app" id="top" ref={pageRef}>
      <SeoHead
        lang={safeLang}
        path="/empresa/sobre-nosotros"
        title={t("aboutPage.seo.title")}
        description={t("aboutPage.seo.description")}
        keywords={keywords}
        structuredData={[aboutSchema, breadcrumbSchema]}
      />

      <Hero
        eyebrow={t("aboutPage.hero.eyebrow")}
        title={t("aboutPage.hero.title")}
        accent={null}
        subtitle={t("aboutPage.hero.subtitle")}
        ctaLabel={t("aboutPage.hero.cta")}
        ctaHref="#about-blocks"
        ctaAriaLabel={t("aboutPage.hero.cta")}
        id="hero-about"
      />

      <div id="about-blocks">
        <AboutStory />
      </div>

      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información sobre servicios BIM.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default EmpresaSobreNosotros;
