import { useTranslation } from "react-i18next";

const WhyBascal = () => {
  const { t } = useTranslation();
  const paragraphs = t("home.whyBascal.paragraphs", { returnObjects: true });

  return (
    <section className="section why-bascal">
      <div className="container">
        <p className="section-kicker">{t("home.whyBascal.kicker")}</p>
        <h2 className="section-title">{t("home.whyBascal.title")}</h2>
        <div className="why-bascal__content">
          {paragraphs.map((text) => (
            <p className="text-muted" key={text}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBascal;