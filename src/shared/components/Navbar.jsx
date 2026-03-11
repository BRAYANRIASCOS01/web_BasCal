import { useEffect, useRef, useState } from "react";
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
  const navRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);

  const to = (path) => `/${lang}${path === "/" ? "" : path}`;
  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleHomeClick = (event) => {
    if (location.pathname === to("/")) {
      event.preventDefault();
      closeMenus();
      scrollToTop();
    }
  };
  const isPathActive = (path) => location.pathname.startsWith(to(path).replace(/\/$/, ""));
  const isServicesSection = ["/servicios/bim", "/servicios/profesionales", "/servicios/construccion", "/servicios/staff-augmentation"].some(
    (p) => isPathActive(p)
  );
  const closeMenus = () => {
    setOpenMenu(null);
    if (typeof document === "undefined") return;
    const active = document.activeElement;
    if (active && active instanceof HTMLElement) {
      requestAnimationFrame(() => active.blur());
    }
  };
  const toggleMenu = (menuId) => {
    setOpenMenu((prev) => (prev === menuId ? null : menuId));
  };

  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target)) {
        closeMenus();
      }
    };
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className="navbar" ref={navRef}>
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo">
          <NavLink
            to={to("/")}
            className="navbar__brand"
            aria-label={t("navbar.home")}
            onClick={handleHomeClick}
          >
            <img src={logoSrc} alt={logoAlt || t("navbar.logoAlt")} />
          </NavLink>
        </div>

        {/* Menú */}
        <nav className="navbar__center" aria-label="Navegación principal">
          <NavLink
            to={to("/")}
            end
            className={({ isActive }) => `navbar__link ${isActive ? "active" : ""}`}
            onClick={closeMenus}
            onClickCapture={handleHomeClick}
          >
            {t("navbar.home")}
          </NavLink>

          {/* Servicios dropdown */}
          <div className={`navbar__dropdown ${openMenu === "services" ? "is-open" : ""}`}>
            <button
              className={`navbar__link navbar__dropdownBtn ${isServicesSection ? "active" : ""}`}
              type="button"
              aria-haspopup="menu"
              aria-expanded={openMenu === "services"}
              onClick={() => toggleMenu("services")}
            >
              {t("navbar.services")} <CaretIcon />
            </button>
            <div className="navbar__menu" role="menu">
              <NavLink
                to={to("/servicios/bim")}
                className={({ isActive }) => `navbar__menuItem ${isActive ? "active" : ""}`}
                role="menuitem"
                onClick={closeMenus}
              >
                {t("navbar.servicesItems.bim")}
              </NavLink>
              <NavLink
                to={to("/servicios/profesionales")}
                className={({ isActive }) => `navbar__menuItem ${isActive ? "active" : ""}`}
                role="menuitem"
                onClick={closeMenus}
              >
                {t("navbar.servicesItems.professionals")}
              </NavLink>
              <span
                className="navbar__menuItem navbar__menuItem--disabled"
                role="menuitem"
                aria-disabled="true"
                data-label={disabledLabel}
                onClick={closeMenus}
              >
                {t("navbar.servicesItems.construction")}
              </span>
              <span
                className="navbar__menuItem navbar__menuItem--disabled"
                role="menuitem"
                aria-disabled="true"
                data-label={disabledLabel}
                onClick={closeMenus}
              >
                {t("navbar.servicesItems.staffAugmentation")}
              </span>
            </div>
          </div>

          <NavLink
            to={to("/portafolio")}
            className={({ isActive }) => `navbar__link ${isActive ? "active" : ""}`}
            onClick={closeMenus}
          >
            {t("navbar.portfolio")}
          </NavLink>

          {/* Empresa dropdown */}
          <div className={`navbar__dropdown ${openMenu === "company" ? "is-open" : ""}`}>
            <button
              className="navbar__link navbar__dropdownBtn"
              type="button"
              aria-haspopup="menu"
              aria-expanded={openMenu === "company"}
              onClick={() => toggleMenu("company")}
            >
              {t("navbar.company")} <CaretIcon />
            </button>
            <div className="navbar__menu" role="menu">
              <span
                className="navbar__menuItem navbar__menuItem--disabled"
                role="menuitem"
                aria-disabled="true"
                data-label={disabledLabel}
                onClick={closeMenus}
              >
                {t("navbar.companyItems.faq")}
              </span>
              <NavLink to={to("/empresa/sobre-nosotros")} className="navbar__menuItem" role="menuitem" onClick={closeMenus}>
                {t("navbar.companyItems.about")}
              </NavLink>
              <span
                className="navbar__menuItem navbar__menuItem--disabled"
                role="menuitem"
                aria-disabled="true"
                data-label={disabledLabel}
                onClick={closeMenus}
              >
                {t("navbar.companyItems.blog")}
              </span>
            </div>
          </div>

        </nav>

        {/* Acciones */}

        <div className="navbar__actions">
          <LanguageSwitcher />
          <NavLink to={to("/contacto")} className="navbar__contact" onClick={closeMenus}>
            {t("navbar.contact")}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
