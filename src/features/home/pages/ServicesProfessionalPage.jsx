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
import "../../../styles/sections/services-pro.css";
import "../../../styles/sections/services-pro-list.css";
import "../../../styles/sections/pro-intro.css";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { normalizeLang } from "../../../shared/seo/seo-utils.js";

const ServicesProfessionalPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const pageRef = useRef(null);

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
      <SeoHead
        lang={safeLang}
        path="/servicios/profesionales"
        title={t("professionalPage.seo.title")}
        description={t("professionalPage.seo.description")}
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
