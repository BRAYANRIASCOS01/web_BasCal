import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../translation/LanguageSwitcher.jsx";

const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const animatedNodes = sectionEl.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.25 }
    );

    animatedNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="hero section" ref={sectionRef}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__photo hero__photo--arch" />
        <span className="hero__photo hero__photo--offices" />
        <span className="hero__photo hero__photo--mesh" />
        <div className="hero__grid">
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
          <span className="hero__tile" />
        </div>
        <div className="hero__lines">
          <span className="hero__line hero__line--h hero__line--h1" />
          <span className="hero__line hero__line--h hero__line--h2" />
          <span className="hero__line hero__line--h hero__line--h3" />
          <span className="hero__line hero__line--v hero__line--v1" />
          <span className="hero__line hero__line--v hero__line--v2" />
          <span className="hero__line hero__line--v hero__line--v3" />
          <span className="hero__box hero__box--a" />
          <span className="hero__box hero__box--b" />
          <span className="hero__ring hero__ring--a" />
          <span className="hero__ring hero__ring--b" />
        </div>
      </div>

      <div className="container hero__content" data-animate>
        <p className="eyebrow" data-animate style={{ transitionDelay: "0.05s" }}>
          {t("home.eyebrow")}
        </p>
        <h1 className="hero__title" data-animate style={{ transitionDelay: "0.1s" }}>
          {t("home.heroTitle")}
          <span className="hero__accent">BIM/VDC</span>
        </h1>
        <p className="hero__subtitle text-muted" data-animate style={{ transitionDelay: "0.15s" }}>
          {t("home.heroSubtitle")}
        </p>
        <div className="actions hero__actions" data-animate style={{ transitionDelay: "0.2s" }}>
          <a className="btn btn--primary" href="#services" aria-label={t("home.secondaryCta")}>
            {t("home.secondaryCta")}
          </a>
        </div>
        <div data-animate style={{ transitionDelay: "0.25s" }}>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Hero;
