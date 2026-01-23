import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import Hero from "../sections/Hero.jsx";
import WhyBascal from "../sections/WhyBascal.jsx";
import Services from "../sections/Services.jsx";

import Portfolio from "../sections/Portfolio.jsx";


const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="app">
      <Helmet>
        <title>{t("home.seo.title")}</title>
        <meta name="description" content={t("home.seo.description")} />
      </Helmet>
      <Hero />
      <WhyBascal />
      <Services />
     
      <Portfolio />
     
    </div>
  );
};

export default HomePage;