import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  const services = t("home.services.items", { returnObjects: true });

  return (
    <section className="section section--alt">
      <div className="container">
        <p className="section-kicker">{t("home.servicesKicker")}</p>
        <h2 className="section-title">{t("home.servicesTitle")}</h2>
        <div className="grid">
          {services.map((item) => (
            <article className="card fade-in" key={item.title}>
              <h3 className="card__title">{item.title}</h3>
              <p className="text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;