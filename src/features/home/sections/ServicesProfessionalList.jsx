import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ServicesProfessionalList = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const services = t("professionalPage.services.items", { returnObjects: true }) || [];

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return undefined;
    const animated = sectionEl.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
      },
      { threshold: 0.2 }
    );
    animated.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [services]);

  return (
    <section className="section pro-services-grid" ref={sectionRef}>
      <div className="container">
        <header className="pro-services-grid__header" data-animate>
          <p className="section-kicker">{t("home.professionalServices.kicker")}</p>
          <h2 className="section-title">{t("professionalPage.services.title")}</h2>
          <p className="section-subtitle text-muted">{t("professionalPage.services.subtitle")}</p>
        </header>

        <div className="pro-services-grid__list">
          {services.map((svc, idx) => (
            <article
              key={svc.title}
              className="pro-services-grid__card"
              data-animate
              style={{ transitionDelay: `${0.06 + idx * 0.05}s` }}
            >
              <div className="pro-services-grid__card-head">
                <span className="pro-services-grid__badge" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="pro-services-grid__title">{svc.title}</h3>
              </div>
              <ul className="pro-services-grid__points text-muted">
                {svc.points?.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              {svc.link && (
                <a className="pro-services-grid__link" href={svc.link} target="_blank" rel="noreferrer">
                  {svc.linkLabel || svc.link}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesProfessionalList;
