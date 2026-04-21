import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import bimMedImage from "../../../assets/BIM-MED.jpeg";
import gasPlantaImage from "../../../assets/GAS_planta.png";
import rciImage from "../../../assets/RCI, Edf 6.1.png";
import mechanicalShopImage from "../../../assets/RCI_CUARTO BOMBAS_2.png";
import archRenderImage from "../../../assets/SDA_PLAN.png";

const ServicesProfessionalList = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const services = t("professionalPage.services.items", { returnObjects: true }) || [];
  const serviceItems = Array.isArray(services) ? services : [];
  const serviceImages = {
    "fire-protection": gasPlantaImage,
    "plumbing-gas": rciImage,
    mechanical: mechanicalShopImage,
    "arch-design": archRenderImage,
  };

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
          {serviceItems.map((svc, idx) => (
            <li className="pro-services-grid__item" key={svc.title}>
              <article
                className="pro-service__card pro-services-grid__card"
                data-animate
                style={{ transitionDelay: `${0.06 + idx * 0.05}s` }}
              >
                <div className="pro-service__media">
                  <img
                    src={serviceImages[svc.id] || bimMedImage}
                    alt={`${svc.title} | BasCal`}
                    className="pro-service__image"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="pro-services-grid__badge pro-services-grid__badge--overlay" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="pro-service__content">
                <div className="pro-services-grid__card-head">
                  <h3 className="pro-service__title">{svc.title}</h3>
                </div>
                  <ul className="pro-service__list text-muted">
                    {svc.points?.map((pt) => (
                      <li key={pt} className="pro-service__point">
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {svc.link && (
                    <a className="pro-services-grid__link" href={svc.link} target="_blank" rel="noreferrer">
                      {svc.linkLabel || svc.link}
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServicesProfessionalList;
