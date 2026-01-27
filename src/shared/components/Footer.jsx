import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();

  const to = (path) => `/${lang}${path === "/" ? "" : path}`;

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
            <li>
              <NavLink to={to("/servicios/bim")}>BIM</NavLink>
            </li>
            <li>
              <NavLink to={to("/servicios/profesionales")}>Profesionales</NavLink>
            </li>
            <li>
              <NavLink to={to("/servicios/construccion")}>Construcción</NavLink>
            </li>
            <li>
              <NavLink to={to("/servicios/staff-augmentation")}>Staff Augmentation</NavLink>
            </li>
          </ul>
        </div>

        {/* Empresa */}
        <div className="footer__column">
          <h4 className="footer__heading">{t("navbar.company")}</h4>
          <ul>
            <li>
              <NavLink to={to("/empresa/sobre-nosotros")}>
                {t("navbar.companyItems.about")}
              </NavLink>
            </li>
            <li>
              <NavLink to={to("/empresa/faq")}>FAQ</NavLink>
            </li>
            <li>
              <NavLink to={to("/empresa/blog")}>Blog</NavLink>
            </li>
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
