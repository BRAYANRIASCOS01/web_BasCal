import { useTranslation } from "react-i18next";

const BimIntro = () => {
  const { t } = useTranslation();

  return (
    <section className="section bim-intro">
      <div className="container bim-intro__inner" data-animate>
        <h2 className="section-title">{t("bimPage.intro.title")}</h2>
        <p className="section-subtitle text-muted">{t("bimPage.intro.text")}</p>
      </div>
    </section>
  );
};

export default BimIntro;
