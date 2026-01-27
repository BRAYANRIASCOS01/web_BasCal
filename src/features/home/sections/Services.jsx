import { useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const services = t("home.services.items", { returnObjects: true });
  const sectionRef = useRef(null);
  const serviceIcons = [
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <path
          d="M7 3h10a1 1 0 0 1 1 1v3h-2V5H8v2H6V4a1 1 0 0 1 1-1Zm9 16v-2H8v2h8Zm2-4a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v5h8V9h2v6Zm-5-2h-2V9h2v4Z"
          fill="currentColor"
        />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <path
          d="M4 6.5 12 3l8 3.5-8 3.5L4 6.5Zm0 6L12 9l8 3.5-8 3.5-8-3.5Zm0 6L12 15l8 3.5-8 3.5-8-3.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <path
          d="M7.5 4A2.5 2.5 0 1 1 5 6.5 2.5 2.5 0 0 1 7.5 4Zm9 0A2.5 2.5 0 1 1 14 6.5 2.5 2.5 0 0 1 16.5 4Zm0 13A2.5 2.5 0 1 1 14 19.5 2.5 2.5 0 0 1 16.5 17ZM8 6.5h3.5a2.5 2.5 0 0 0 2.5 2.5v6.5H11a2.5 2.5 0 1 0 0 1h4.5A2.5 2.5 0 1 0 13 13.5V7A2.5 2.5 0 0 0 10.5 4H7.5a2.5 2.5 0 1 0 .007 2.5H8Z"
          fill="currentColor"
        />
      </svg>
    ),
  ];

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
  }, [services]);

  return (
    <section className="section services" id="services" ref={sectionRef}>
      <div className="container services__inner">
        <div className="services__header" data-animate>
          <p className="section-kicker">{t("home.servicesKicker")}</p>
          <h2 className="section-title">{t("home.servicesTitle")}</h2>
          <p className="services__subtitle text-muted">{t("home.servicesSubtitle")}</p>
        </div>
        <div className="services__grid">
          {services.map((item, index) => (
            <article
              className="service-card"
              key={item.title}
              data-animate
              style={{ transitionDelay: `${0.08 + index * 0.08}s` }}
            >
              <span className="service-card__icon" aria-hidden="true">
                {serviceIcons[index % serviceIcons.length]}
              </span>
              <h3 className="service-card__title">{item.title}</h3>
              <p className="service-card__text text-muted">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="services__actions" data-animate>
          <NavLink to={`/${lang}/servicios/bim`} className="btn btn--ghost">
            {t("home.servicesCta")}
            <span aria-hidden="true" className="btn__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Services;
