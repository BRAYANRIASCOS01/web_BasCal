import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import ContactForm from "../../../shared/components/Form.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { getLocalizedUrl, normalizeLang } from "../../../shared/seo/seo-utils.js";

const ContactPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const seoTitle =
    safeLang === "en"
      ? "Contact | BasCal Engineering & Construction"
      : "Contacto | BasCal Ingeniería y Construcción";
  const seoDescription =
    safeLang === "en"
      ? "Tell us about your project and our team will get back to you shortly."
      : "Cuéntanos sobre tu proyecto y nuestro equipo te responderá en breve.";

  const contactPageSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: seoTitle,
      description: seoDescription,
      url: getLocalizedUrl(safeLang, "/contacto"),
      inLanguage: safeLang,
    }),
    [safeLang, seoDescription, seoTitle]
  );

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/contacto"
        title={seoTitle}
        description={seoDescription}
        structuredData={contactPageSchema}
      />
      <ContactForm formName={safeLang === "en" ? "contact-en" : "contact-es"} />
      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default ContactPage;
