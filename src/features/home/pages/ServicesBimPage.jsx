import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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
import SeoHead from "../../../shared/components/SeoHead.jsx";
import {
  getLocalizedUrl,
  getSiteUrl,
  normalizeLang,
} from "../../../shared/seo/seo-utils.js";

const ServicesBimPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const pageRef = useRef(null);
  const siteUrl = getSiteUrl();
  const logoImage = `${siteUrl}/Log_BasCal.PNG`;

  const rawBimCards = t("bimPage.services.cards", { returnObjects: true });
  const bimCards = Array.isArray(rawBimCards) ? rawBimCards : [];

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
      url: `${siteUrl}/`,
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
        item: getLocalizedUrl(safeLang, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "BIM",
        item: getLocalizedUrl(safeLang, "/servicios/bim"),
      },
    ],
  };

  return (
    <main className="app" id="top" ref={pageRef}>
      <SeoHead
        lang={safeLang}
        path="/servicios/bim"
        title={t("bimPage.seo.title")}
        description={t("bimPage.seo.description")}
        structuredData={[serviceSchema, breadcrumbList]}
      />

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
