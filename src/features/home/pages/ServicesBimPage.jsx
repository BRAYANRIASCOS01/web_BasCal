import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Hero from "../../../shared/components/Hero.jsx";
import BimIntro from "../sections/BimIntro.jsx";
import ServicesBim from "../sections/Services_Bim.jsx";
import FaqAccordion from "../../../shared/components/FaqAccordion.jsx";
import ContactForm from "../../../shared/components/Form.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import "../../../styles/sections/bim-intro.css";
import "../../../styles/sections/services-bim.css";

const ServicesBimPage = () => {
  const { t, i18n } = useTranslation();
  const { lang = "es" } = useParams();
  const pageRef = useRef(null);

  const canonicalFallback = `https://bascal.com/${lang}/servicios/bim`;
  const canonicalRaw = typeof window !== "undefined" ? window.location.href : canonicalFallback;
  const canonical = canonicalRaw.split("#")[0].split("?")[0].replace(/\/$/, "");
  const ogImage = `${canonical}/og-image.svg`;
  const logoImage = `${canonical}/Log_BasCal.PNG`;
  const ogLocale = i18n.language === "en" ? "en_US" : "es_ES";
  const alternateLocale = ogLocale === "es_ES" ? "en_US" : "es_ES";
  const altLang = i18n.language === "en" ? "es" : "en";
  const alternateUrl = canonical.replace(`/${lang}/`, `/${altLang}/`);

  const bimCards = t("bimPage.services.cards", { returnObjects: true });

  useEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return undefined;

    const animatedNodes = pageEl.querySelectorAll("section [data-animate], .cta-banner[data-animate]");
    if (!animatedNodes.length) return undefined;

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

    return () => {
      animatedNodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, [lang]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("bimPage.seo.title"),
    description: t("bimPage.seo.description"),
    provider: {
      "@type": "Organization",
      name: "BasCal",
      url: canonical,
      logo: logoImage,
      image: logoImage,
    },
    areaServed: ["CO", "EC", "VE", "MX", "US"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t("bimPage.services.title", { defaultValue: t("bimPage.intro.title") }),
      itemListElement: bimCards.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.text,
        },
      })),
    },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonical.replace(/(\/[^/]+){2}$/, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("navbar.services"),
        item: canonical.replace(/\/bim$/, ""),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "BIM",
        item: canonical,
      },
    ],
  };

  return (
    <main className="app" id="top" ref={pageRef}>
      <Helmet>
        <title>{t("bimPage.seo.title")}</title>
        <meta name="description" content={t("bimPage.seo.description")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang={altLang} href={alternateUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BasCal" />
        <meta property="og:title" content={t("bimPage.seo.title")} />
        <meta property="og:description" content={t("bimPage.seo.description")} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={alternateLocale} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t("bimPage.seo.title")} />
        <meta name="twitter:description" content={t("bimPage.seo.description")} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbList)}</script>
      </Helmet>

      <Hero
        title={t("bimPage.hero.title")}
        accent={null}
        subtitle={t("bimPage.hero.subtitle")}
        ctaLabel={t("bimPage.hero.cta")}
        ctaHref="#servicios-bim"
        ctaAriaLabel={t("bimPage.hero.cta")}
        id="hero-bim"
      />

      <BimIntro />

      <ServicesBim />

      <FaqAccordion />

      <ContactForm formName="contacto-bim" />
      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información sobre servicios BIM.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default ServicesBimPage;
