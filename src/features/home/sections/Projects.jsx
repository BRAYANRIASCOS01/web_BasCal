import { useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const normalizeKey = (text) =>
  text
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const countries = t("home.portfolio.countries", { returnObjects: true }) || [];
  const mapTitle = t("home.portfolio.mapTitle");

  const markers = useMemo(() => {
    const markerPositions = {
      colombia: { top: "52%", left: "16%" },
      ecuador: { top: "54%", left: "15%" },
      venezuela: { top: "52%", left: "18%" },
      mexico: { top: "47%", left: "11%" },
      "estados unidos": { top: "36%", left: "12%" },
      "united states": { top: "36%", left: "12%" },
      usa: { top: "36%", left: "12%" },
    };

    return countries.map((country) => {
      const key = normalizeKey(country);
      const position = markerPositions[key] || { top: "58%", left: "28%" };
      return { name: country, position };
    });
  }, [countries]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const animatedNodes = sectionEl.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    animatedNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
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
    <section className="section projects" id="projects" ref={sectionRef}>
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
            <ul className="projects__markers" aria-hidden="true">
              {markers.map(({ name, position }) => (
                <li
                  key={name}
                  className="projects__marker"
                  style={{ top: position.top, left: position.left }}
                  aria-hidden="true"
                >
                  <span />
                </li>
              ))}
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
