import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ProfessionalServiceIllustration, {
  hasProfessionalServiceIllustration,
} from "../../../shared/components/icons/ProfessionalServiceIllustration.jsx";

const ServicesProfessionalList = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const services = t("professionalPage.services.items", { returnObjects: true }) || [];
  const serviceItems = Array.isArray(services) ? services : [];

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
  }, [serviceItems]);

  return (
    <section className="section pro-services-grid" ref={sectionRef}>
      <div className="container">
        <ol className="pro-services-grid__list" aria-label={t("professionalPage.services.title")}>
          {serviceItems.map((svc, idx) => {
            const hasIllustration = hasProfessionalServiceIllustration(svc);
            const points = Array.isArray(svc.points) ? svc.points : [];

            return (
              <li className="pro-services-grid__item" key={svc.title}>
                <article
                  className={`pro-service__card pro-services-grid__card${
                    hasIllustration ? "" : " pro-services-grid__card--text-only"
                  }`}
                  data-animate
                  style={{ transitionDelay: `${0.06 + idx * 0.05}s` }}
                >
                  {hasIllustration && (
                    <div className="pro-service__media pro-service__media--illustration" aria-hidden="true">
                      <div className="pro-service__illustration">
                        <ProfessionalServiceIllustration service={svc} />
                      </div>
                      <span className="pro-services-grid__badge pro-services-grid__badge--overlay" aria-hidden="true">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <div className="pro-service__content">
                    <div className="pro-services-grid__card-head">
                      {!hasIllustration && (
                        <span className="pro-services-grid__badge" aria-hidden="true">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      )}
                      <h3 className="pro-service__title">{svc.title}</h3>
                    </div>
                    {points.length > 0 && (
                      <ul className="pro-service__list text-muted">
                        {points.map((pt) => (
                          <li key={pt} className="pro-service__point">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                    {svc.link && (
                      <a className="pro-services-grid__link" href={svc.link} target="_blank" rel="noreferrer">
                        {svc.linkLabel || svc.link}
                      </a>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ServicesProfessionalList;
