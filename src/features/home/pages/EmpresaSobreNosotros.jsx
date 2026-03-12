import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hero from "../../../shared/components/Hero.jsx";
import AboutStory from "../sections/AboutStory.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import "../../../styles/sections/about-story.css";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { normalizeLang } from "../../../shared/seo/seo-utils.js";

const EmpresaSobreNosotros = () => {
  const { t, i18n } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const pageRef = useRef(null);

  useEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return undefined;
    const animated = pageEl.querySelectorAll("section [data-animate]");
    if (!animated.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.25 }
    );
    animated.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [i18n.language, lang]);

  return (
    <main className="app" id="top" ref={pageRef}>
      <SeoHead
        lang={safeLang}
        path="/empresa/sobre-nosotros"
        title={t("aboutPage.seo.title")}
        description={t("aboutPage.seo.description")}
      />

      <Hero
        eyebrow={t("aboutPage.hero.eyebrow")}
        title={t("aboutPage.hero.title")}
        accent={null}
        subtitle={t("aboutPage.hero.subtitle")}
        ctaLabel={t("aboutPage.hero.cta")}
        ctaHref="#about-blocks"
        ctaAriaLabel={t("aboutPage.hero.cta")}
        id="hero-about"
      />

      <div id="about-blocks">
        <AboutStory />
      </div>

      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información sobre servicios BIM.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default EmpresaSobreNosotros;
