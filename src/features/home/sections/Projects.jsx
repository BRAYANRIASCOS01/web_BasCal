import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const normalizeKey = (text) =>
  text
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const MARKER_POSITIONS = {
  "estados unidos": { top: "39%", left: "11%" },
  colombia: { top: "49.5%", left: "14.9%" },
  chile: { top: "61.5%", left: "15.5%" },
  argentina: { top: "59%", left: "17%" },
  espana: { top: "37.5%", left: "27%" },
};

const COUNTRY_KEY_ALIASES = {
  usa: "estados unidos",
  eeuu: "estados unidos",
  "united states": "estados unidos",
  "estados unidos": "estados unidos",
  spain: "espana",
  espana: "espana",
};

const toCountryKey = (value) => {
  const key = normalizeKey(value);
  return COUNTRY_KEY_ALIASES[key] || key;
};

const Projects = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const isEnglish = String(i18n.language || "").toLowerCase().startsWith("en");

  const countriesRaw = t("home.portfolio.countries", { returnObjects: true });
  const countries = Array.isArray(countriesRaw) ? countriesRaw : [];
  const portfolioProjectsRaw = t("portfolioPage.projects", { returnObjects: true });
  const portfolioProjects = Array.isArray(portfolioProjectsRaw) ? portfolioProjectsRaw : [];
  const mapTitle = t("home.portfolio.mapTitle");

  const projectStatsByCountry = useMemo(() => {
    const stats = new Map();

    portfolioProjects.forEach((project) => {
      const countryKey = toCountryKey(project?.location);
      if (!countryKey) return;

      const current = stats.get(countryKey) || { projects: 0, categories: new Set() };
      current.projects += 1;
      if (project?.category) current.categories.add(project.category);
      stats.set(countryKey, current);
    });

    return stats;
  }, [portfolioProjects]);

  const markers = useMemo(() => {
    const noProjectsLabel = isEnglish ? "No registered projects yet" : "Sin proyectos registrados";

    return countries.map((country) => {
      const countryKey = toCountryKey(country);
      const position = MARKER_POSITIONS[countryKey] || { top: "58%", left: "28%" };
      const stats = projectStatsByCountry.get(countryKey);
      const categories = stats ? Array.from(stats.categories).slice(0, 2) : [];

      return {
        id: countryKey || country,
        name: country,
        position,
        projects: stats?.projects || 0,
        label: categories.length ? categories.join(" · ") : noProjectsLabel,
      };
    });
  }, [countries, isEnglish, projectStatsByCountry]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const animatedNodes = sectionEl.querySelectorAll("[data-animate]");
    const animationsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        const inView = Boolean(entry?.isIntersecting);
        setIsSectionInView(inView);
        if (!inView) setActiveMarker(null);
      },
      { threshold: 0.12 }
    );

    animatedNodes.forEach((node) => animationsObserver.observe(node));
    sectionObserver.observe(sectionEl);

    return () => {
      animationsObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const coverageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("home.portfolio.title"),
    itemListElement: countries.map((country, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Place",
        name: country,
        address: country,
      },
    })),
  };

  return (
    <section className={`section projects ${isSectionInView ? "projects--inview" : ""}`} id="projects" ref={sectionRef}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(coverageSchema)}</script>
      </Helmet>
      <div className="container projects__inner">
        <header className="projects__header" data-animate>
          <p className="section-kicker">{t("home.portfolio.kicker")}</p>
          <h2 className="section-title">{t("home.portfolio.title")}</h2>
          <p className="section-subtitle text-muted">{t("home.portfolio.subtitle")}</p>
        </header>

        <article className="projects__card" data-animate style={{ transitionDelay: "0.12s" }}>
          <div className="projects__map">
            <img
              src="/continents2High.svg"
              alt={mapTitle}
              className="projects__map-image"
              loading="lazy"
              decoding="async"
            />
            <ul className="projects__markers" aria-label={mapTitle}>
              {markers.map(({ id, name, position, projects, label }) => {
                const isActive = activeMarker === id;
                const projectsLabel = isEnglish ? "projects delivered" : "proyectos ejecutados";
                const leftValue = Number.parseFloat(position.left);
                const tooltipAlign = leftValue < 20 ? "start" : leftValue > 80 ? "end" : "center";

                return (
                  <li
                    key={id}
                    className={`projects__marker${isActive ? " is-active" : ""}`}
                    style={{ top: position.top, left: position.left }}
                  >
                    <button
                      type="button"
                      className="projects__markerButton"
                      onMouseEnter={() => setActiveMarker(id)}
                      onMouseLeave={() => setActiveMarker((prev) => (prev === id ? null : prev))}
                      onFocus={() => setActiveMarker(id)}
                      onBlur={() => setActiveMarker((prev) => (prev === id ? null : prev))}
                      onClick={() => setActiveMarker((prev) => (prev === id ? null : id))}
                      aria-label={`${name}: ${projects} ${projectsLabel}`}
                    >
                      <span />
                    </button>

                    <div
                      className={`projects__markerTooltip projects__markerTooltip--${tooltipAlign}`}
                      role="status"
                      aria-live="polite"
                    >
                      <p className="projects__markerCountry">{name}</p>
                      <p className="projects__markerCount">
                        <strong>{projects}</strong> {projectsLabel}
                      </p>
                      <p className="projects__markerTag">{label}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="projects__info">
            <h3 className="projects__title">{mapTitle}</h3>
            <ul className="projects__list">
              {countries.map((country) => (
                <li key={country} className="projects__country text-muted">
                  {country}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Projects;
