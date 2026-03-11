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
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="32" cy="32" r="24" strokeDasharray="3 4" />

          <rect x="24" y="22" width="16" height="20" rx="2" />
          <path d="M24 28h16" />
          <path d="M28 26v2" />
          <path d="M32 26v2" />
          <path d="M36 26v2" />
          <path d="M28 32v2" />
          <path d="M32 32v2" />
          <path d="M36 32v2" />
          <path d="M28 38v2" />
          <path d="M32 38v2" />
          <path d="M36 38v2" />

          <path d="M32 22 V18" />
          <path d="M40 28 L46 22" />
          <path d="M40 40 L46 46" />
          <path d="M24 40 L18 46" />
          <path d="M24 28 L18 22" />

          <circle cx="32" cy="10" r="6" />
          <circle cx="32" cy="10" r="1.2" />
          <path d="M32 10 L35 8" />
          <path d="M32 10 L29 8" />
          <path d="M32 10 L35 12" />
          <path d="M32 10 L29 12" />

          <circle cx="54" cy="22" r="6" />
          <path d="M54 17 L51.5 22 H54 L52 27" />

          <circle cx="10" cy="22" r="6" />
          <path
            d="M10 17 C8.2 19.2 7.3 20.8 7.3 22.2
             C7.3 24.5 8.9 26.2 10 26.2
             C11.1 26.2 12.7 24.5 12.7 22.2
             C12.7 20.8 11.8 19.2 10 17 Z"
          />

          <circle cx="54" cy="46" r="6" />
          <path
            d="M54 50
             C51.8 48.9 51.6 47 52.5 45.8
             C53.2 44.9 53.2 44 52.8 43.2
             C54.2 43.7 55.6 45 56 46.7
             C56.4 48.6 55.4 49.6 54 50 Z"
          />

          <circle cx="10" cy="46" r="6" />
          <path d="M7.5 46 h5" />
          <path d="M12.5 46 v3" />
          <path d="M12.5 49 h-5" />
        </g>
      </svg>
    ),
    (
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="32" cy="34" rx="26" ry="18" strokeDasharray="3 4" />

          <path d="M16 46 L32 54 L48 46 L32 38 Z" />
          <path d="M16 46 L16 44 L32 52 L32 54" />
          <path d="M48 46 L48 44 L32 52" />

          <path d="M24 24 L32 18 L40 24 V40 H24 Z" />
          <path d="M24 24 L32 24 L40 24" />
          <path d="M32 18 V24" />

          <rect x="27" y="28" width="4" height="4" fill="currentColor" stroke="none" />
          <rect x="33" y="28" width="4" height="4" fill="currentColor" stroke="none" />
          <rect x="27" y="34" width="4" height="4" fill="currentColor" stroke="none" />
          <rect x="33" y="34" width="4" height="4" fill="currentColor" stroke="none" />

          <path d="M22 40 H42" />
          <path d="M24 40 V46" />
          <path d="M32 40 V46" />
          <path d="M40 40 V46" />
          <path d="M24 44 H40" />

          <circle cx="16" cy="16" r="7" />
          <path d="M12.5 17.5 V22.5 H19.5 V17.5" />
          <path d="M12.5 17.5 L16 14 L19.5 17.5" />
          <path d="M15 22.5 V19.5 H17 V22.5" />

          <circle cx="48" cy="16" r="7" />
          <path d="M42.5 18.5 H53.5" />
          <path d="M43.5 18.5 L48 14.5 L52.5 18.5" />
          <path d="M45.2 18.5 L48 14.5 L50.8 18.5" />
          <path d="M46.3 18.5 L46.3 16.9" />
          <path d="M49.7 18.5 L49.7 16.9" />

          <rect x="28" y="55" width="8" height="7" rx="1.5" />
          <path d="M30 58.5 L31.8 60.2 L34.8 56.8" />
        </g>
      </svg>
    ),
    (
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="32" cy="28" r="22" strokeDasharray="3 4" />

          <rect x="16" y="16" width="32" height="22" rx="2.5" />
          <path d="M28 38 v5" />
          <path d="M36 38 v5" />
          <path d="M24 43 h16" />
          <rect x="26" y="44.5" width="12" height="3.5" rx="1.2" />

          <path d="M22 32 h20" />
          <path d="M24 32 v-8 h16 v8" />
          <path d="M24 24 l8-5 l8 5" />
          <path d="M27 27 h2" />
          <path d="M31 27 h2" />
          <path d="M35 27 h2" />

          <path d="M22 30 l8-6" />
          <path d="M30 24 l6 10" />

          <path d="M32 22 l6 10 h-12 z" />
          <path d="M32 26 v3" />
          <path d="M32 31.5 h0.01" />

          <circle cx="14" cy="10" r="6" />
          <path d="M11 13 h6" />
          <path d="M11 13 v-6 h6" />
          <path d="M13 13 l4-4" />

          <circle cx="50" cy="10" r="6" />
          <circle cx="49" cy="9" r="2.2" />
          <path d="M51 11 l2.6 2.6" />

          <circle cx="14" cy="46" r="6" />
          <path d="M11 44 h6" />
          <path d="M14 41 v10" />

          <circle cx="50" cy="46" r="6" />
          <path d="M47 47 c0-3 2-5 5-5 c3 0 5 2 5 5" />
          <path d="M46.5 48.5 h11" />
          <path d="M50 42 v2" />

          <rect x="26" y="52" width="12" height="9" rx="1.8" />
          <path d="M29 55 h6" />
          <path d="M29 58 h6" />
          <path d="M40 60 l6-6" />
          <path d="M44.5 54.5 l2 2" />
        </g>
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
