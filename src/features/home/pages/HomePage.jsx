import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import Hero from "../../../shared/components/Hero.jsx";
import WhyBascal from "../sections/WhyBascal.jsx";
import Services from "../sections/Services.jsx";
import ServicesPro from "../sections/Services_Pro.jsx";
import Projects from "../sections/Projects.jsx";
import FaqAccordion from "../../../shared/components/FaqAccordion.jsx";
import Form from "../../../shared/components/Form.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const canonical = typeof window !== "undefined" ? window.location.href : "https://bascal.com/";
  const baseUrl = canonical.replace(/\/$/, "");
  const ogImage = `${baseUrl}/og-image.svg`;
  const logoImage = `${baseUrl}/Log_BasCal.PNG`;
  const ogLocale = i18n.language === "en" ? "en_US" : "es_ES";
  const alternateLocale = ogLocale === "es_ES" ? "en_US" : "es_ES";
  const services = t("home.services.items", { returnObjects: true });

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("home.servicesTitle"),
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
      <Helmet>
        <title>{t("home.seo.title")}</title>
        <meta name="description" content={t("home.seo.description")} />
        <link rel="canonical" href={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BasCal" />
        <meta property="og:title" content={t("home.seo.title")} />
        <meta property="og:description" content={t("home.seo.description")} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={alternateLocale} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t("home.seo.title")} />
        <meta name="twitter:description" content={t("home.seo.description")} />
        <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>
      </Helmet>
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
