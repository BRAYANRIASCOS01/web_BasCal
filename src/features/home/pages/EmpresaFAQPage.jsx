import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { getLocalizedUrl, normalizeLang } from "../../../shared/seo/seo-utils.js";

const EmpresaFAQPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const faqItems = useMemo(() => {
    const items = t("faq.items", { returnObjects: true });
    return Array.isArray(items) ? items : [];
  }, [t, safeLang]);

  const title =
    safeLang === "en"
      ? `FAQ | BasCal BIM and engineering`
      : `FAQ | BasCal BIM e ingenieria`;
  const description = t("faq.subtitle");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: safeLang,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
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
        name: "FAQ",
        item: getLocalizedUrl(safeLang, "/empresa/faq"),
      },
    ],
  };

  const keywords =
    safeLang === "en"
      ? "BIM FAQ, engineering FAQ, MEP questions, BasCal support"
      : "preguntas frecuentes BIM, FAQ ingenieria, dudas MEP, soporte BasCal";

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/empresa/faq"
        title={title}
        description={description}
        keywords={keywords}
        structuredData={[faqSchema, breadcrumbSchema]}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "920px" }}>
          <header className="section-header">
            <h1 className="section-header__title">{t("faq.title")}</h1>
            <p className="section-header__subtitle">{t("faq.subtitle")}</p>
            <div className="section-header__divider" />
          </header>

          <div className="faq-list" style={{ display: "grid", gap: "1rem" }}>
            {faqItems.map((item, index) => (
              <article key={`faq-${index}`} className="faq-list__item">
                <h2 style={{ marginBottom: "0.5rem" }}>{item.q}</h2>
                <p style={{ margin: 0 }}>{item.a}</p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <p>{t("faq.cta.text")}</p>
            <Link className="btn btn--primary" to={`/${safeLang}/contacto`}>
              {t("faq.cta.button")}
            </Link>
          </div>
        </div>
      </section>

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
