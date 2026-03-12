import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hero from "../../../shared/components/Hero.jsx";
import ServicesProfessionalList from "../sections/ServicesProfessionalList.jsx";
import ProfessionalIntro from "../sections/ProfessionalIntro.jsx";
import FaqAccordion from "../../../shared/components/FaqAccordion.jsx";
import ContactForm from "../../../shared/components/Form.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { getLocalizedUrl, getSiteUrl, normalizeLang } from "../../../shared/seo/seo-utils.js";
import "../../../styles/sections/services-pro.css";
import "../../../styles/sections/services-pro-list.css";
import "../../../styles/sections/pro-intro.css";

const ServicesProfessionalPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const pageRef = useRef(null);

  const canonical = getLocalizedUrl(safeLang, "/servicios/profesionales");
  const homeUrl = getLocalizedUrl(safeLang, "/");
  const logoImage = `${getSiteUrl()}/Log_BasCal.PNG`;
  const professionalItems = t("professionalPage.services.items", { returnObjects: true });

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("professionalPage.seo.title"),
    description: t("professionalPage.seo.description"),
    provider: {
      "@type": "Organization",
      name: "BasCal",
      url: homeUrl,
      logo: logoImage,
      image: logoImage,
    },
    areaServed: ["CO", "EC", "VE", "MX", "US"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t("professionalPage.services.title"),
      itemListElement: (Array.isArray(professionalItems) ? professionalItems : []).map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: Array.isArray(item.points) ? item.points.join(" ") : "",
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
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("navbar.servicesItems.professionals"),
        item: canonical,
      },
    ],
  };

  const keywords =
    safeLang === "en"
      ? "MEP engineering design, architectural design services, HVAC design, fire protection design, BIM consulting"
      : "diseno ingenieria MEP, diseno arquitectonico, diseno HVAC, diseno contra incendios, consultoria BIM";

  return (
    <main className="app" id="top" ref={pageRef}>
      <SeoHead
        lang={safeLang}
        path="/servicios/profesionales"
        title={t("professionalPage.seo.title")}
        description={t("professionalPage.seo.description")}
        keywords={keywords}
        structuredData={[serviceSchema, breadcrumbList]}
      />

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
