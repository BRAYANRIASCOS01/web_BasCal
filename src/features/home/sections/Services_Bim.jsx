import { useTranslation } from "react-i18next";
import { useMemo, useRef, useState } from "react";

const ServicesBim = () => {
  const { t } = useTranslation();
  const cards = useMemo(() => t("bimPage.services.cards", { returnObjects: true }), [t]);
  const [expandedId, setExpandedId] = useState(null);
  const hasExpanded = Boolean(expandedId);
  const cardRefs = useRef({});

  const icons = [
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
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <path
          d="M6 3h12v3H6V3Zm0 5h12v3H6V8Zm0 5h12v3H6v-3Zm0 5h12v3H6v-3Z"
          fill="currentColor"
        />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <path
          d="M12 3 2 8.5 12 14l10-5.5L12 3Zm0 13.5L2 21l10 5 10-5-10-4.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <path
          d="M7 4h10v2H7V4Zm0 4h10v2H7V8Zm0 4h6v2H7v-2Zm-3 5h16v2H4v-2Z"
          fill="currentColor"
        />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
        <path
          d="M12 2a8 8 0 0 0-8 8v5H2v2h20v-2h-2v-5a8 8 0 0 0-8-8Zm0 2a6 6 0 0 1 6 6v5H6v-5a6 6 0 0 1 6-6Zm-2 16a2 2 0 1 0 4 0h-4Z"
          fill="currentColor"
        />
      </svg>
    ),
  ];

  return (
    <section className="section bim-services" id="servicios-bim-cards">
      <div className="container">
        <div className={`bim-services__grid ${hasExpanded ? "is-expanded" : ""}`}>
          {cards.map((card, index) => (
            <article
              key={card.title}
              className={`bim-card ${expandedId === (card.id || card.title) ? "is-expanded" : ""}`}
              ref={(el) => {
                const id = card.id || card.title;
                if (el) cardRefs.current[id] = el;
              }}
              style={{
                transitionDelay: `${0.06 + index * 0.06}s`,
                animationDelay: `${index * 70}ms`,
              }}
            >
              <span className="bim-card__icon" aria-hidden="true">
                {icons[index % icons.length]}
              </span>
              <h3 className="bim-card__title">{card.title}</h3>
              <p className="bim-card__text text-muted">{card.text}</p>
              <button
                type="button"
                className="bim-card__cta"
                onClick={() => {
                  if (!card.detail) return;
                  const id = card.id || card.title;
                  setExpandedId((prev) => {
                    const next = prev === id ? null : id;
                    if (next === id && cardRefs.current[id]) {
                      requestAnimationFrame(() => {
                        cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                      });
                    }
                    return next;
                  });
                }}
                disabled={!card.detail}
                aria-expanded={expandedId === (card.id || card.title)}
                aria-label={`${t("bimPage.services.cta")} - ${card.title}`}
              >
                <span>{expandedId === (card.id || card.title) ? t("bimPage.services.detailClose") : t("bimPage.services.cta")}</span>
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

              {card.detail && expandedId === (card.id || card.title) && (
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
                    <div className="bim-card__detail-media" aria-hidden="true" />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesBim;
