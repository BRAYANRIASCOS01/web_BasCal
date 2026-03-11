import { useTranslation } from "react-i18next";
import { useMemo, useRef, useState } from "react";
import bimAccentImage from "../../../assets/bim2.png";
import scanToBimImage from "../../../assets/Laser_Scanning.png";
import mepProjectImage from "../../../assets/VISTA REDES_page-0001.jpg";

const ServicesBim = () => {
  const { t } = useTranslation();
  const cards = useMemo(() => t("bimPage.services.cards", { returnObjects: true }), [t]);
  const [expandedId, setExpandedId] = useState(null);
  const hasExpanded = Boolean(expandedId);
  const cardRefs = useRef({});
  const lastScrollRef = useRef(null);
  const cardImages = {
    mep: mepProjectImage,
    "scan-to-bim": scanToBimImage,
  };

  const icons = [
    // Building / arquitectura
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <path d="M6 5.5h4v13H4v-11a2.5 2.5 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M12 3.5h6v15h-6z" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M6.7 9.5H8M6.7 12H8M6.7 14.5H8M13.5 7.5h3M13.5 10h3M13.5 12.5h3M13.5 15h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M4 18.5h14" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    // Información / people
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M7 18.5c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M12 3.5v1.6M12 18.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    // Modelado / monitor con cubo
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <rect x="4" y="5" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M10 17v2.5m4-2.5v2.5M8 19.5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M9 8.8 12 7l3 1.8V12l-3 1.8-3-1.8V8.8Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M12 8v3.6" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
    // Software / engrane
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M12 5.5V4m0 16v-1.5m4.95-9.45 1.25-.72M5.8 17.67l1.25-.72m11.2-2.78H20M4 12.44h1.75m10.5 3.86 1.25.72M5.8 6.33l1.25.72" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    // Diseño / lápiz sobre plano
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <rect x="5" y="6" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M9 11.5h6M9 14h3.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="m9.5 9 4.6-2.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="m14.8 6.5 1.7 1.7-5 5-2.2.5.5-2.2 5-5Z" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
    // Plan / plano con marcas
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <path d="M6 6.5h9.5v11H6A1.5 1.5 0 0 1 4.5 16V8A1.5 1.5 0 0 1 6 6.5Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M15.5 6.5 19 8v8l-3.5 1.5v-11Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M8 10.5h4.5M8 13h2.8M8 15.5h3.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="10" cy="9" r="0.7" fill="currentColor" />
      </svg>
    ),
    // Computador / hardware
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <rect x="5" y="6" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M7 8.5h8m-8 2.5h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M9 17h4l.7 2H8.3L9 17Z" stroke="currentColor" strokeWidth="1.1" fill="none" />
        <rect x="17" y="7" width="2" height="7" rx="0.6" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="18" cy="9" r="0.5" fill="currentColor" />
      </svg>
    ),
  ];

  return (
    <section className="section bim-services" id="servicios-bim-cards">
      <div className="container">
        <div className={`bim-services__grid ${hasExpanded ? "is-expanded" : ""}`}>
          {cards.map((card, index) => {
            const id = card.id || card.title;
            const isExpanded = expandedId === id;
            const image = cardImages[id] || bimAccentImage;
            return (
            <article
              key={card.title}
              className={`bim-card ${isExpanded ? "is-expanded" : ""}`}
              ref={(el) => {
                if (el) cardRefs.current[id] = el;
              }}
              style={{
                transitionDelay: `${0.06 + index * 0.06}s`,
                animationDelay: `${index * 70}ms`,
              }}
            >
              {!isExpanded && (
                <div className="bim-card__media" aria-hidden="true">
                  <img src={image} alt="" className="bim-card__hero" loading="lazy" decoding="async" />
                  <span className="bim-card__icon bim-card__icon--overlay">{icons[index % icons.length]}</span>
                </div>
              )}
              <div className="bim-card__head">
                {isExpanded && <span className="bim-card__icon bim-card__icon--inline">{icons[index % icons.length]}</span>}
                <h3 className="bim-card__title">{card.title}</h3>
              </div>
              <p className="bim-card__text text-muted">{card.text}</p>
              <button
                type="button"
                className="bim-card__cta"
                onClick={() => {
                  if (!card.detail) return;
                  setExpandedId((prev) => {
                    const next = prev === id ? null : id;
                    if (next === null) {
                      const restoreTo = lastScrollRef.current;
                      if (typeof window !== "undefined" && typeof restoreTo === "number") {
                        requestAnimationFrame(() => {
                          window.scrollTo({ top: restoreTo, behavior: "smooth" });
                        });
                      }
                      return null;
                    }
                    if (typeof window !== "undefined") {
                      lastScrollRef.current = window.scrollY;
                    }
                    if (next === id && cardRefs.current[id]) {
                      requestAnimationFrame(() => {
                        cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                      });
                    }
                    return next;
                  });
                }}
                disabled={!card.detail}
                aria-expanded={isExpanded}
                aria-label={`${t("bimPage.services.cta")} - ${card.title}`}
              >
                <span>{isExpanded ? t("bimPage.services.detailClose") : t("bimPage.services.cta")}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {card.detail && isExpanded && (
                <div className="bim-card__detail">
                  <p className="bim-card__detail-eyebrow">{card.detail.eyebrow}</p>
                  <h4 className="bim-card__detail-title">{card.detail.title}</h4>
                  <div className="bim-card__detail-body">
                    <div className="bim-card__detail-copy">
                      {card.detail.blocks
                        ? card.detail.blocks.map((block) => (
                            <div className="bim-card__detail-block" key={block.title}>
                              <div className="bim-card__detail-row">
                                <span className="bim-card__detail-bullet" aria-hidden="true">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M9 12.5 11.2 15l4.8-6"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                                <div>
                                  <p className="bim-card__detail-block-title">{block.title}</p>
                                  <p className="text-muted">{block.text}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        : (
                            <>
                              <div className="bim-card__detail-row">
                                <span className="bim-card__detail-bullet" aria-hidden="true">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M9 12.5 11.2 15l4.8-6"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                                <p className="text-muted">{card.detail.body}</p>
                              </div>
                              {card.detail.body2 && (
                                <div className="bim-card__detail-row">
                                  <span className="bim-card__detail-bullet" aria-hidden="true">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                      <path
                                        d="M9 12.5 11.2 15l4.8-6"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                  <p className="text-muted">{card.detail.body2}</p>
                                </div>
                              )}
                              {card.detail.body3 && (
                                <div className="bim-card__detail-row">
                                  <span className="bim-card__detail-bullet" aria-hidden="true">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                      <path
                                        d="M9 12.5 11.2 15l4.8-6"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                  <p className="text-muted">{card.detail.body3}</p>
                                </div>
                              )}
                              {card.detail.points && card.detail.points.length > 0 && (
                                <ul className="bim-card__detail-points">
                                  {card.detail.points.map((pt) => (
                                    <li key={pt}>{pt}</li>
                                  ))}
                                </ul>
                              )}
                            </>
                          )}
                    </div>
                    <div className="bim-card__detail-media" aria-hidden="true">
                      <img src={image} alt="" className="bim-card__detail-image" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  {card.detail.softwares && (
                    <div className="bim-card__detail-soft">
                      <p className="bim-card__detail-eyebrow">{t("bimPage.services.softwaresLabel", "Softwares")}</p>
                      <ul>
                        {card.detail.softwares.map((tool) => (
                          <li key={tool}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesBim;
