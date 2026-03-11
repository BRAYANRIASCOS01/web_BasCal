import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const Hero = ({
  eyebrow,
  title,
  accent = "BIM/VDC",
  subtitle,
  ctaLabel,
  ctaHref = "#services",
  ctaAriaLabel,
  id = "hero",
  className = "",
}) => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const resolvedEyebrow = eyebrow ?? t("home.eyebrow");
  const resolvedTitle = title ?? t("home.heroTitle");
  const resolvedSubtitle = subtitle ?? t("home.heroSubtitle");
  const resolvedCtaLabel = ctaLabel ?? t("home.secondaryCta");
  const resolvedCtaAria = ctaAriaLabel ?? resolvedCtaLabel;

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return undefined;

    const animatedNodes = sectionEl.querySelectorAll("[data-animate]");
    if (!animatedNodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    animatedNodes.forEach((node) => observer.observe(node));

    return () => {
      animatedNodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, [resolvedTitle, resolvedSubtitle, resolvedEyebrow]);

  const wrapperClass = ["hero section", className].filter(Boolean).join(" ");

  return (
    <header className={wrapperClass} ref={sectionRef} id={id}>
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
          {resolvedEyebrow}
        </p>
        <h1 className="hero__title" data-animate style={{ transitionDelay: "0.1s" }}>
          {resolvedTitle}
          {accent && <span className="hero__accent">{accent}</span>}
        </h1>
        <p className="hero__subtitle text-muted" data-animate style={{ transitionDelay: "0.15s" }}>
          {resolvedSubtitle}
        </p>
        <div className="actions hero__actions" data-animate style={{ transitionDelay: "0.2s" }}>
          <a className="btn btn--primary" href={ctaHref} aria-label={resolvedCtaAria}>
            {resolvedCtaLabel}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
