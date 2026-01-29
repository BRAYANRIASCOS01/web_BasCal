import { NavLink, useLocation, useParams } from "react-router-dom";
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
  const location = useLocation();
  const disabledLabel = t("navbar.inProgress", "En desarrollo");

  const to = (path) => `/${lang}${path === "/" ? "" : path}`;
  const isPathActive = (path) => location.pathname.startsWith(to(path).replace(/\/$/, ""));
  const isServicesSection = ["/servicios/bim", "/servicios/profesionales", "/servicios/construccion", "/servicios/staff-augmentation"].some(
    (p) => isPathActive(p)
  );

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
          <NavLink to={to("/")} end className={({ isActive }) => `navbar__link ${isActive ? "active" : ""}`}>
            {t("navbar.home")}
          </NavLink>

          {/* Servicios dropdown */}
          <div className="navbar__dropdown">
            <button
              className={`navbar__link navbar__dropdownBtn ${isServicesSection ? "active" : ""}`}
              type="button"
              aria-haspopup="menu"
            >
              {t("navbar.services")} <CaretIcon />
            </button>
            <div className="navbar__menu" role="menu">
              <NavLink
                to={to("/servicios/bim")}
                className={({ isActive }) => `navbar__menuItem ${isActive ? "active" : ""}`}
                role="menuitem"
              >
                {t("navbar.servicesItems.bim")}
              </NavLink>
              <NavLink
                to={to("/servicios/profesionales")}
                className={({ isActive }) => `navbar__menuItem ${isActive ? "active" : ""}`}
                role="menuitem"
              >
                {t("navbar.servicesItems.professionals")}
              </NavLink>
              <span
                className="navbar__menuItem navbar__menuItem--disabled"
                role="menuitem"
                aria-disabled="true"
                data-label={disabledLabel}
              >
                {t("navbar.servicesItems.construction")}
              </span>
              <span
                className="navbar__menuItem navbar__menuItem--disabled"
                role="menuitem"
                aria-disabled="true"
                data-label={disabledLabel}
              >
                {t("navbar.servicesItems.staffAugmentation")}
              </span>
            </div>
          </div>

          <span
            className="navbar__link navbar__link--disabled"
            role="link"
            aria-disabled="true"
            data-label={disabledLabel}
          >
            {t("navbar.portfolio")}
          </span>

          {/* Empresa dropdown */}
          <div className="navbar__dropdown">
            <button className="navbar__link navbar__dropdownBtn" type="button" aria-haspopup="menu">
              {t("navbar.company")} <CaretIcon />
            </button>
            <div className="navbar__menu" role="menu">
              <span
                className="navbar__menuItem navbar__menuItem--disabled"
                role="menuitem"
                aria-disabled="true"
                data-label={disabledLabel}
              >
                {t("navbar.companyItems.faq")}
              </span>
              <NavLink to={to("/empresa/sobre-nosotros")} className="navbar__menuItem" role="menuitem">
                {t("navbar.companyItems.about")}
              </NavLink>
              <span
                className="navbar__menuItem navbar__menuItem--disabled"
                role="menuitem"
                aria-disabled="true"
                data-label={disabledLabel}
              >
                {t("navbar.companyItems.blog")}
              </span>
            </div>
          </div>

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
