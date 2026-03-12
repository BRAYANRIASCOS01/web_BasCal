import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hero from "../../../shared/components/Hero.jsx";
import AboutStory from "../sections/AboutStory.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import "../../../styles/sections/about-story.css";

const EmpresaSobreNosotros = () => {
  const { t, i18n } = useTranslation();
  const { lang = "es" } = useParams();
  const pageRef = useRef(null);

  const canonicalFallback = `https://bascal.com/${lang}/empresa/sobre-nosotros`;
  const canonicalRaw = typeof window !== "undefined" ? window.location.href : canonicalFallback;
  const canonical = canonicalRaw.split("#")[0].split("?")[0].replace(/\/$/, "");
  const ogImage = `${canonical}/og-image.svg`;
  const ogLocale = i18n.language === "en" ? "en_US" : "es_ES";
  const alternateLocale = ogLocale === "es_ES" ? "en_US" : "es_ES";
  const altLang = i18n.language === "en" ? "es" : "en";
  const alternateUrl = canonical.replace(`/${lang}/`, `/${altLang}/`);

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
  }, [i18n.language, lang]);

  return (
    <main className="app" id="top" ref={pageRef}>
      <Helmet>
        <title>{t("aboutPage.seo.title")}</title>
        <meta name="description" content={t("aboutPage.seo.description")} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang={altLang} href={alternateUrl} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={alternateLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BasCal" />
        <meta property="og:title" content={t("aboutPage.seo.title")} />
        <meta property="og:description" content={t("aboutPage.seo.description")} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t("aboutPage.seo.title")} />
        <meta name="twitter:description" content={t("aboutPage.seo.description")} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

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
