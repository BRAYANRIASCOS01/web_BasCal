import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gasPlantaImage from "../../../assets/GAS_planta.png";
import gasPlantaNavarraImage from "../../../assets/GAS_Planta-2.png";
import rciCuartoBombasImage from "../../../assets/RCI_CUARTO BOMBAS.png";
import scanToBimAirportImage from "../../../assets/image (11).png";
import rciRedPerimetralImage from "../../../assets/RCI, Red Perimetral.png";
import scanToBimHospitalChileImage from "../../../assets/RVT_Image_01.png";
import shopDrawingsHvacUsImage from "../../../assets/Image_01.webp";

const normalizeText = (text) =>
  text
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const PortfolioGrid = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const cardRefs = useRef({});
  const lastScrollRef = useRef(null);

  const projects = useMemo(() => {
    const raw = t("portfolioPage.projects", { returnObjects: true });
    return Array.isArray(raw) ? raw : [];
  }, [t, i18n.language]);

  const projectImages = useMemo(
    () => ({
      "cdi-barrio-nuevo": gasPlantaImage,
      "cdi-navarra": gasPlantaNavarraImage,
      "megacolegio-bello": rciCuartoBombasImage,
      "scan-to-bim-airport": scanToBimAirportImage,
      "pao-bello": rciRedPerimetralImage,
      "scan-to-bim-hospital-chile": scanToBimHospitalChileImage,
      "shop-drawings-hvac-us": shopDrawingsHvacUsImage,
    }),
    []
  );

  const categories = useMemo(() => {
    const fromLocale = t("portfolioPage.filters.categories", { returnObjects: true });
    if (Array.isArray(fromLocale) && fromLocale.length > 0) {
      return fromLocale;
    }
    const values = projects.map((project) => project.category).filter(Boolean);
    return Array.from(new Set(values));
  }, [projects, t, i18n.language]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [visibleIds, setVisibleIds] = useState([]);

  useEffect(() => {
    setActiveCategory("all");
    setSearchTerm("");
    setExpandedId(null);
    setVisibleIds([]);
  }, [i18n.language]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);
    return projects.filter((project) => {
      if (activeCategory !== "all" && project.category !== activeCategory) return false;
      if (!normalizedSearch) return true;

      const haystack = [
        project.title,
        project.type,
        project.location,
        project.description,
        project.scale,
        project.category,
        Array.isArray(project.services) ? project.services.join(" ") : "",
        Array.isArray(project.software) ? project.software.join(" ") : "",
      ]
        .filter(Boolean)
        .join(" ");

      return normalizeText(haystack).includes(normalizedSearch);
    });
  }, [projects, activeCategory, searchTerm]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const animated = el.querySelectorAll("[data-animate]");
    if (!animated.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-card-id");
          if (!id) {
            entry.target.classList.add("is-visible");
            return;
          }
          setVisibleIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
        });
      },
      { threshold: 0.2 }
    );
    animated.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [i18n.language, activeCategory, projects.length]);

  const metaLabel = {
    type: t("portfolioPage.meta.type"),
    location: t("portfolioPage.meta.location"),
    scale: t("portfolioPage.meta.scale"),
    services: t("portfolioPage.meta.services"),
    software: t("portfolioPage.meta.software"),
  };

  const iconMap = {
    fire: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 3.5c1.6 1.7 2.2 3.1 2.2 4.6 0 1.3-.5 2.3-1.4 3.2-.7.7-1.1 1.6-1.1 2.6 0 1.9 1.5 3.4 3.4 3.4 3.1 0 5-2.7 5-5.6 0-3.6-2.1-6.7-5.7-8.2"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M9.2 10.6c1 .9 1.4 1.8 1.4 2.9 0 1.9-1.5 3.4-3.4 3.4-2.6 0-4.2-2.3-4.2-4.8 0-2.2 1.2-4.1 3.3-5.4"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        />
      </svg>
    ),
    alarm: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 5a6.5 6.5 0 0 1 6.5 6.5v2.7H5.5v-2.7A6.5 6.5 0 0 1 12 5Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M9.5 17a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
    gas: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 20V4.8A2.3 2.3 0 0 1 8.3 2.5h4.9A2.3 2.3 0 0 1 15.5 4.8V20" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M6 13h9.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M17 9.5h2v6.2a2.3 2.3 0 0 1-2.3 2.3h-1.2" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
    safety: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3.5 19 6v5.5c0 4.2-3 7.3-7 9-4-1.7-7-4.8-7-9V6l7-2.5Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M9 12.5 11 14.5l4-4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
    generic: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 12.5h12M9 8.5h6M9 16.5h6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
  };

  const resolveServiceLabel = (service) => {
    const normalized = normalizeText(service);
    if (!normalized) return service;
    if (normalized.includes("proteccion contra incendios") || normalized.includes("spci")) return "SPCI";
    if (normalized.includes("deteccion") || normalized.includes("alarma") || normalized.includes("sda")) return "SDA";
    if (normalized.includes("gas natural") || normalized.includes("gas")) return "Gas natural";
    if (normalized.includes("seguridad humana") || normalized.includes("seguridad")) return "Seguridad humana";
    return service.length > 26 ? `${service.slice(0, 23)}...` : service;
  };

  const resolveServiceIcon = (service) => {
    const normalized = normalizeText(service);
    if (!normalized) return iconMap.generic;
    if (normalized.includes("incendio") || normalized.includes("spci")) return iconMap.fire;
    if (normalized.includes("deteccion") || normalized.includes("alarma") || normalized.includes("sda")) return iconMap.alarm;
    if (normalized.includes("gas")) return iconMap.gas;
    if (normalized.includes("seguridad")) return iconMap.safety;
    return iconMap.generic;
  };

  return (
    <section className="section portfolio-page" id="portfolio-projects" ref={sectionRef}>
      <div className="container">
        <header className="portfolio-page__header" data-animate>
          <p className="section-kicker">{t("portfolioPage.section.kicker")}</p>
          <h2 className="section-title">{t("portfolioPage.section.title")}</h2>
          <p className="section-subtitle text-muted">{t("portfolioPage.section.subtitle")}</p>
        </header>

        <div className="portfolio-page__filters" data-animate style={{ transitionDelay: "0.06s" }}>
          <label className="portfolio-page__filters-label" htmlFor="portfolio-search">
            {t("portfolioPage.filters.searchLabel")}
          </label>
          <div className="portfolio-page__search">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              id="portfolio-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={t("portfolioPage.filters.searchPlaceholder")}
            />
          </div>

          {categories.length > 0 && (
            <div className="portfolio-page__chips" role="list" aria-label={t("portfolioPage.filters.label")}>
              <button
                type="button"
                className={`portfolio-page__chip ${activeCategory === "all" ? "is-active" : ""}`}
                onClick={() => setActiveCategory("all")}
                aria-pressed={activeCategory === "all"}
              >
                {t("portfolioPage.filters.all")}
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`portfolio-page__chip ${activeCategory === category ? "is-active" : ""}`}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="portfolio-page__grid">
          {filteredProjects.map((project, index) => {
            const image = projectImages[project.id] || gasPlantaImage;
            const highlights = Array.isArray(project.services)
              ? project.services.slice(0, 4).map((service) => ({
                  label: resolveServiceLabel(service),
                  icon: resolveServiceIcon(service),
                }))
              : [];
            const isExpanded = expandedId === project.id;
            const isVisible = visibleIds.includes(project.id);
            const categoryKey = project.category
              ? normalizeText(project.category).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
              : "";

            return (
              <article
                key={project.id || project.title}
                className={`portfolio-card ${isVisible ? "is-visible" : ""} ${isExpanded ? "is-expanded" : ""}`}
                data-animate
                data-card-id={project.id}
                style={{ transitionDelay: `${0.08 + index * 0.08}s` }}
                ref={(el) => {
                  if (el) cardRefs.current[project.id] = el;
                }}
              >
                <div className="portfolio-card__media">
                  <img src={image} alt={project.title} loading="lazy" decoding="async" />
                  <span className="portfolio-card__icon-pill" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path
                        d="M6 19V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11M5 19h14M9 8V5h6v3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path d="M9 12h6M9 15h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </span>
                  {project.category && (
                    <span className="portfolio-card__badge" data-category={categoryKey}>
                      {project.category}
                    </span>
                  )}
                </div>
                <div className="portfolio-card__body">
                  <h3 className="portfolio-card__title">{project.title}</h3>
                  {project.location && <p className="portfolio-card__subtitle">{project.location}</p>}
                  {project.type && <p className="portfolio-card__meta-line">{project.type}</p>}
                  {project.scale && <p className="portfolio-card__meta-line">{project.scale}</p>}

                  {highlights.length > 0 && (
                    <div className="portfolio-card__highlights" aria-label={metaLabel.services}>
                      {highlights.map((item) => (
                        <div className="portfolio-card__highlight" key={item.label}>
                          <span className="portfolio-card__highlight-icon" aria-hidden="true">
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {isExpanded && (
                    <div className="portfolio-card__detail">
                      {project.description && (
                        <>
                          <p className="portfolio-card__detail-title">{t("portfolioPage.card.detailTitle")}</p>
                          <p className="portfolio-card__detail-text">{project.description}</p>
                        </>
                      )}
                      {Array.isArray(project.services) && project.services.length > 0 && (
                        <div className="portfolio-card__detail-block">
                          <p className="portfolio-card__detail-label">{metaLabel.services}</p>
                          <ul>
                            {project.services.map((service) => (
                              <li key={service}>{service}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(project.software) && project.software.length > 0 && (
                        <div className="portfolio-card__detail-block">
                          <p className="portfolio-card__detail-label">{metaLabel.software}</p>
                          <ul>
                            {project.software.map((tool) => (
                              <li key={tool}>{tool}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    className={`portfolio-card__cta ${isExpanded ? "is-expanded" : ""}`}
                    aria-expanded={isExpanded}
                    onClick={() => {
                      setExpandedId((prev) => {
                        const next = prev === project.id ? null : project.id;
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
                        if (cardRefs.current[project.id]) {
                          requestAnimationFrame(() => {
                            cardRefs.current[project.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
                          });
                        }
                        return next;
                      });
                    }}
                  >
                    {isExpanded ? t("portfolioPage.card.detailClose") : t("portfolioPage.card.cta", "Ver más")}
                  </button>

                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
