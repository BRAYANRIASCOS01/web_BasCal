import { useTranslation } from "react-i18next";

const Portfolio = () => {
  const { t } = useTranslation();
  const countries = t("home.portfolio.countries", { returnObjects: true });

  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <p className="section-kicker">{t("home.portfolio.kicker")}</p>
        <h2 className="section-title">{t("home.portfolio.title")}</h2>
        <p className="section-subtitle text-muted">{t("home.portfolio.subtitle")}</p>
        <div className="portfolio-grid">
          <div>
            <h3 className="portfolio__heading">{t("home.portfolio.mapTitle")}</h3>
            <ul className="portfolio__list">
              {countries.map((country) => (
                <li key={country}>{country}</li>
              ))}
            </ul>
          </div>
          <div className="portfolio__card">
            <p className="text-muted">{t("home.portfolio.cardText")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;