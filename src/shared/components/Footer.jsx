import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const disabledLabel = t("navbar.inProgress", lang === "en" ? "In development" : "En desarrollo");

  const to = (path) => `/${lang}${path === "/" ? "" : path}`;
  const serviceLinks = [
    { key: "bim", to: to("/servicios/bim"), disabled: false },
    { key: "professionals", to: to("/servicios/profesionales"), disabled: false },
    { key: "construction", disabled: true },
    { key: "staffAugmentation", disabled: true },
  ];
  const companyLinks = [
    { key: "about", to: to("/empresa/sobre-nosotros"), disabled: false },
    { key: "faq", disabled: true },
    { key: "blog", disabled: true },
  ];

  return (
    <footer className="footer">
      <div className="footer__inner container">
        {/* Marca */}
        <div className="footer__brand">
          <h3 className="footer__title">BasCal</h3>
          <p className="footer__text">{t("home.footer.brand.text")}</p>
        </div>

        {/* Servicios */}
        <div className="footer__column">
          <h4 className="footer__heading">{t("home.footer.services.title")}</h4>
          <ul>
            {serviceLinks.map((item) => (
              <li key={item.key}>
                {item.disabled ? (
                  <span className="footer__link footer__link--disabled" aria-disabled="true" title={disabledLabel}>
                    {t(`navbar.servicesItems.${item.key}`)}
                  </span>
                ) : (
                  <NavLink to={item.to}>{t(`navbar.servicesItems.${item.key}`)}</NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Empresa */}
        <div className="footer__column">
          <h4 className="footer__heading">{t("navbar.company")}</h4>
          <ul>
            {companyLinks.map((item) => (
              <li key={item.key}>
                {item.disabled ? (
                  <span className="footer__link footer__link--disabled" aria-disabled="true" title={disabledLabel}>
                    {t(`navbar.companyItems.${item.key}`)}
                  </span>
                ) : (
                  <NavLink to={item.to}>{t(`navbar.companyItems.${item.key}`)}</NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer__column">
          <h4 className="footer__heading">{t("home.footer.contact.title")}</h4>
          <ul>
            {t("home.footer.contact.items", { returnObjects: true }).map(
              (item, index) => (
                <li key={index}>
                  <strong>{item.label}:</strong> {item.value}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <div className="container">
          <p>{t("home.footer.bottom")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
