import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Hero from "../../../shared/components/Hero.jsx";
import WhyBascal from "../sections/WhyBascal.jsx";
import Services from "../sections/Services.jsx";
import ServicesPro from "../sections/Services_Pro.jsx";
import Projects from "../sections/Projects.jsx";
import FaqAccordion from "../../../shared/components/FaqAccordion.jsx";
import Form from "../../../shared/components/Form.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { BASCAL_CONTACT_PHONE } from "../../../shared/contact.js";
import { getLocalizedUrl, getSiteUrl, normalizeLang } from "../../../shared/seo/seo-utils.js";

const HomePage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const servicesRaw = t("home.services.items", { returnObjects: true });
  const services = Array.isArray(servicesRaw) ? servicesRaw : [];
  const faqItems = useMemo(() => {
    const items = t("faq.items", { returnObjects: true });
    return Array.isArray(items) ? items : [];
  }, [t, safeLang]);

  const homeUrl = getLocalizedUrl(safeLang, "/");
  const logoImage = `${getSiteUrl()}/Log_BasCal.PNG`;

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("home.servicesTitle"),
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
      name: t("home.servicesTitle"),
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.text,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const keywords =
    safeLang === "en"
      ? "BIM services, MEP engineering, BIM coordination, construction engineering, digital construction"
      : "servicios BIM, ingenieria MEP, coordinacion BIM, ingenieria de construccion, construccion digital";

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/"
        title={t("home.seo.title")}
        description={t("home.seo.description")}
        keywords={keywords}
        structuredData={[servicesSchema, faqSchema]}
      />
      <Hero accent={null} />
      <WhyBascal />
      <Services />
      <ServicesPro />
      <Projects />
      <FaqAccordion />
      <Form />
      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone={BASCAL_CONTACT_PHONE}
        message={t("home.whatsappMessage", "Hola, quiero recibir información sobre los servicios y proyectos de BasCal. Me interesa conocer cómo pueden apoyarme en BIM, diseño arquitectónico, ingeniería MEP o coordinación técnica. ¿Podrían orientarme?")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default HomePage;
