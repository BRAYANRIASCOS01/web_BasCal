import { useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import archDesignImage from "../../../assets/BIM-MED.jpeg";
import mechanicalImage from "../../../assets/bim2.png";
import plumbingImage from "../../../assets/bim3.png";

const ServicesPro = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const { lang = "es" } = useParams();

  const services = t("home.professionalServices.items", { returnObjects: true }) || [];
  const professionalServices = Array.isArray(services) ? services : [];
  const contactItems = t("home.footer.contact.items", { returnObjects: true }) || [];
  const contactEmail = contactItems?.[2]?.value || "contact@bascal.com";

  const serviceImages = [archDesignImage, mechanicalImage, plumbingImage];

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
  }, [professionalServices]);

  const professionalServicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("home.professionalServices.title"),
    itemListElement: professionalServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: Array.isArray(service.points) ? service.points.join(" ") : "",
        provider: { "@type": "Organization", name: "BasCal" },
        areaServed: ["CO", "EC", "VE", "MX", "US"],
      },
    })),
  };

  return (
    <section className="section professional-services" id="professional-services" ref={sectionRef}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(professionalServicesSchema)}</script>
      </Helmet>
      <div className="container professional-services__inner">
        <div className="professional-services__header" data-animate>
          <p className="section-kicker">{t("home.professionalServices.kicker")}</p>
          <div className="professional-services__title-row">
            <h2 className="section-title">{t("home.professionalServices.title")}</h2>
          </div>
          <p className="section-subtitle text-muted professional-services__subtitle">
            {t("home.professionalServices.subtitle")}
          </p>
        </div>

        <ol className="services-stack" aria-label={t("home.professionalServices.title")}>
          {professionalServices.map((service, index) => {
            const image = serviceImages[index % serviceImages.length];
            const delay = 0.12 + index * 0.08;

            return (
              <li className="pro-service" key={service.title}>
                <article
                  className="pro-service__card"
                  data-animate
                  style={{ transitionDelay: `${delay}s` }}
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <div className="pro-service__media">
                    <img
                      src={image}
                      alt={`${service.title} - BasCal`}
                      className="pro-service__image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="pro-service__content">
                    <h3 className="pro-service__title" itemProp="name">
                      {service.title}
                    </h3>
                    <ul className="pro-service__list text-muted" itemProp="description">
                      {service.points?.map((point) => (
                        <li key={point} className="pro-service__point">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <NavLink
                    className="pro-service__action"
                    to={`/${lang}/servicios/profesionales`}
                    aria-label={`${t("home.primaryCta")} - ${service.title}`}
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                      <path
                        d="M13 5l7 7-7 7M4 12h16"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                      />
                    </svg>
                  </NavLink>
                </article>
              </li>
            );
          })}
        </ol>
        <div className="professional-services__actions" data-animate>
          <NavLink to={`/${lang}/servicios/profesionales`} className="pro-btn pro-btn--ghost">
            {t("home.servicesCta")}
            <span aria-hidden="true" className="pro-btn__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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

export default ServicesPro;
