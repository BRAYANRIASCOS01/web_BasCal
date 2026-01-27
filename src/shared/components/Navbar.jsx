import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../features/translation/LanguageSwitcher.jsx";

const CaretIcon = () => (
  <svg
    className="navbar__caret"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M6.5 9.25 12 14.5l5.5-5.25"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar = ({ logoSrc = "/Log_BasCal.PNG", logoAlt }) => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();

  const to = (path) => `/${lang}${path === "/" ? "" : path}`;

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo">
          <NavLink to={to("/")} className="navbar__brand" aria-label={t("navbar.home")}>
            <img src={logoSrc} alt={logoAlt || t("navbar.logoAlt")} />
          </NavLink>
        </div>

        {/* Menú */}
        <nav className="navbar__center" aria-label="Navegación principal">
          <NavLink to={to("/")} className={({ isActive }) => `navbar__link ${isActive ? "active" : ""}`}>
            {t("navbar.home")}
          </NavLink>

          {/* Servicios dropdown */}
          <div className="navbar__dropdown">
            <button className="navbar__link navbar__dropdownBtn" type="button" aria-haspopup="menu">
              {t("navbar.services")} <CaretIcon />
            </button>
            <div className="navbar__menu" role="menu">
              <NavLink to={to("/servicios/bim")} className="navbar__menuItem" role="menuitem">
                {t("navbar.servicesItems.bim")}
              </NavLink>
              <NavLink to={to("/servicios/profesionales")} className="navbar__menuItem" role="menuitem">
                {t("navbar.servicesItems.professionals")}
              </NavLink>
              <NavLink to={to("/servicios/construccion")} className="navbar__menuItem" role="menuitem">
                {t("navbar.servicesItems.construction")}
              </NavLink>
              <NavLink to={to("/servicios/staff-augmentation")} className="navbar__menuItem" role="menuitem">
                {t("navbar.servicesItems.staffAugmentation")}
              </NavLink>
            </div>
          </div>

          <NavLink
            to={to("/portafolio")}
            className={({ isActive }) => `navbar__link ${isActive ? "active" : ""}`}
          >
            {t("navbar.portfolio")}
          </NavLink>

          {/* Empresa dropdown */}
          <div className="navbar__dropdown">
            <button className="navbar__link navbar__dropdownBtn" type="button" aria-haspopup="menu">
              {t("navbar.company")} <CaretIcon />
            </button>
            <div className="navbar__menu" role="menu">
              <NavLink to={to("/empresa/faq")} className="navbar__menuItem" role="menuitem">
                {t("navbar.companyItems.faq")}
              </NavLink>
              <NavLink to={to("/empresa/sobre-nosotros")} className="navbar__menuItem" role="menuitem">
                {t("navbar.companyItems.about")}
              </NavLink>
              <NavLink to={to("/empresa/blog")} className="navbar__menuItem" role="menuitem">
                {t("navbar.companyItems.blog")}
              </NavLink>
            </div>
          </div>

          <NavLink
            to={to("/contacto")}
            className={({ isActive }) => `navbar__link ${isActive ? "active" : ""}`}
          >
            {t("navbar.contact")}
          </NavLink>
        </nav>

        {/* Acciones */}

        <div className="navbar__actions">
          <LanguageSwitcher />
          <NavLink to={to("/contacto")} className="navbar__contact">
            {t("navbar.contact")}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
