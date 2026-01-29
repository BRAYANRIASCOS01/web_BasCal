import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hero from "../../../shared/components/Hero.jsx";
import ServicesProfessionalList from "../sections/ServicesProfessionalList.jsx";
import ProfessionalIntro from "../sections/ProfessionalIntro.jsx";
import FaqAccordion from "../../../shared/components/FaqAccordion.jsx";
import ContactForm from "../../../shared/components/Form.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import "../../../styles/sections/services-pro-list.css";
import "../../../styles/sections/pro-intro.css";

const ServicesProfessionalPage = () => {
  const { t, i18n } = useTranslation();
  const { lang = "es" } = useParams();
  const pageRef = useRef(null);

  const canonicalFallback = `https://bascal.com/${lang}/servicios/profesionales`;
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

    const animatedNodes = pageEl.querySelectorAll("section [data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.25 }
    );

    animatedNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="app" id="top" ref={pageRef}>
      <Helmet>
        <title>{t("professionalPage.seo.title")}</title>
        <meta name="description" content={t("professionalPage.seo.description")} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang={altLang} href={alternateUrl} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={alternateLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BasCal" />
        <meta property="og:title" content={t("professionalPage.seo.title")} />
        <meta property="og:description" content={t("professionalPage.seo.description")} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t("professionalPage.seo.title")} />
        <meta name="twitter:description" content={t("professionalPage.seo.description")} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Hero
        eyebrow={t("professionalPage.hero.eyebrow")}
        title={t("professionalPage.hero.title")}
        accent={null}
        subtitle={t("professionalPage.hero.subtitle")}
        ctaLabel={t("professionalPage.hero.cta")}
        ctaHref="#professional-services"
        ctaAriaLabel={t("professionalPage.hero.cta")}
        id="hero-professional"
      />

      <ProfessionalIntro />

      <ServicesProfessionalList />

      <FaqAccordion />

      <ContactForm formName="contacto-profesionales" />
      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información sobre servicios BIM.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default ServicesProfessionalPage;
