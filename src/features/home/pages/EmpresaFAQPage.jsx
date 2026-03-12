import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import FaqAccordion from "../../../shared/components/FaqAccordion.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { normalizeLang } from "../../../shared/seo/seo-utils.js";

const EmpresaFAQPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const faqItems = t("faq.items", { returnObjects: true }) || [];
  const seoTitle = safeLang === "en" ? "FAQ | BasCal" : "Preguntas frecuentes | BasCal";
  const seoDescription = t("faq.subtitle");

  const faqSchema = useMemo(
    () => ({
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
    }),
    [faqItems]
  );

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/empresa/faq"
        title={seoTitle}
        description={seoDescription}
        structuredData={faqSchema}
      />
      <FaqAccordion />
      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default EmpresaFAQPage;
