import { useTranslation } from "react-i18next";
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
import { getSiteUrl, normalizeLang } from "../../../shared/seo/seo-utils.js";

const HomePage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const siteUrl = getSiteUrl();
  const logoImage = `${siteUrl}/Log_BasCal.PNG`;
  const rawServices = t("home.services.items", { returnObjects: true });
  const services = Array.isArray(rawServices) ? rawServices : [];

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("home.servicesTitle"),
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

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/"
        title={t("home.seo.title")}
        description={t("home.seo.description")}
        structuredData={[
          servicesSchema,
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "BasCal",
            url: `${siteUrl}/`,
            inLanguage: [safeLang, safeLang === "es" ? "en" : "es"],
          },
        ]}
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
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información sobre servicios BIM.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default HomePage;
