import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../features/translation/LanguageSwitcher.jsx";

const CaretIcon = ({ open }) => (
  <svg
    className={`navbar__caret ${open ? "is-open" : ""}`}
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

const HamburgerIcon = ({ open }) => (
  <span className={`navbar__burger ${open ? "is-open" : ""}`} aria-hidden="true">
    <span />
    <span />
    <span />
  </span>
);

const Navbar = ({ logoSrc = "/Log_BasCal.PNG", logoAlt }) => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const location = useLocation();

  const disabledLabel = t("navbar.inProgress", "En desarrollo");
  const to = (path) => `/${lang}${path === "/" ? "" : path}`;

  const isPathActive = (path) => location.pathname.startsWith(to(path).replace(/\/$/, ""));
  const isServicesSection = useMemo(
    () =>
      ["/servicios/bim", "/servicios/profesionales", "/servicios/construccion", "/servicios/staff-augmentation"].some((p) =>
        isPathActive(p)
      ),
    [location.pathname]
  );

  const isCompanySection = useMemo(
    () => ["/empresa/faq", "/empresa/sobre-nosotros", "/empresa/blog"].some((p) => isPathActive(p)),
    [location.pathname]
  );

  // ✅ Móvil: menú abierto/cerrado
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Móvil: dropdowns por click
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  // Cerrar menú al navegar
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Bloquear scroll cuando el panel móvil está abierto
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo">
          <NavLink to={to("/")} className="navbar__brand" aria-label={t("navbar.home")}>
            <img src={logoSrc} alt={logoAlt || t("navbar.logoAlt")} />
          </NavLink>
        </div>

        {/* Desktop nav */}
        <nav className="navbar__center navbar__center--desktop" aria-label="Navegación principal">
          <NavLink to={to("/")} end className={({ isActive }) => `navbar__link ${isActive ? "active" : ""}`}>
            {t("navbar.home")}
          </NavLink>

          {/* Servicios dropdown (desktop hover) */}
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

              <span className="navbar__menuItem navbar__menuItem--disabled" aria-disabled="true" data-label={disabledLabel}>
                {t("navbar.servicesItems.construction")}
              </span>

              <span className="navbar__menuItem navbar__menuItem--disabled" aria-disabled="true" data-label={disabledLabel}>
                {t("navbar.servicesItems.staffAugmentation")}
              </span>
            </div>
          </div>

          <span className="navbar__link navbar__link--disabled" aria-disabled="true" data-label={disabledLabel}>
            {t("navbar.portfolio")}
          </span>

          {/* Empresa dropdown (desktop hover) */}
          <div className="navbar__dropdown">
            <button className={`navbar__link navbar__dropdownBtn ${isCompanySection ? "active" : ""}`} type="button" aria-haspopup="menu">
              {t("navbar.company")} <CaretIcon />
            </button>
            <div className="navbar__menu" role="menu">
              <span className="navbar__menuItem navbar__menuItem--disabled" aria-disabled="true" data-label={disabledLabel}>
                {t("navbar.companyItems.faq")}
              </span>

              <NavLink to={to("/empresa/sobre-nosotros")} className="navbar__menuItem" role="menuitem">
                {t("navbar.companyItems.about")}
              </NavLink>

              <span className="navbar__menuItem navbar__menuItem--disabled" aria-disabled="true" data-label={disabledLabel}>
                {t("navbar.companyItems.blog")}
              </span>
            </div>
          </div>
        </nav>

        {/* Desktop acciones */}
        <div className="navbar__actions navbar__actions--desktop">
          <LanguageSwitcher />
          <NavLink to={to("/contacto")} className="navbar__contact">
            {t("navbar.contact")}
          </NavLink>
        </div>

        {/* Botón hamburguesa (móvil) */}
        <button
          className="navbar__mobileToggle"
          type="button"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <HamburgerIcon open={mobileOpen} />
        </button>

        {/* Overlay + Panel móvil */}
        <div className={`navbar__overlay ${mobileOpen ? "is-open" : ""}`} onClick={() => setMobileOpen(false)} />

        <aside className={`navbar__panel ${mobileOpen ? "is-open" : ""}`} aria-label="Menú móvil">
          <div className="navbar__panelHead">
            <span className="navbar__panelTitle">{t("navbar.menu", "Menú")}</span>
            <button className="navbar__panelClose" type="button" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
              ✕
            </button>
          </div>

          <div className="navbar__panelBody">
            <NavLink to={to("/")} end className={({ isActive }) => `navbar__mLink ${isActive ? "active" : ""}`}>
              {t("navbar.home")}
            </NavLink>

            {/* Servicios (móvil click) */}
            <button
              type="button"
              className={`navbar__mLink navbar__mLinkBtn ${mobileServicesOpen ? "is-open" : ""}`}
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
            >
              <span>{t("navbar.services")}</span>
              <CaretIcon open={mobileServicesOpen} />
            </button>

            <div className={`navbar__mSub ${mobileServicesOpen ? "is-open" : ""}`}>
              <NavLink to={to("/servicios/bim")} className="navbar__mSubItem">
                {t("navbar.servicesItems.bim")}
              </NavLink>
              <NavLink to={to("/servicios/profesionales")} className="navbar__mSubItem">
                {t("navbar.servicesItems.professionals")}
              </NavLink>

              <span className="navbar__mSubItem is-disabled" aria-disabled="true">
                {t("navbar.servicesItems.construction")} <em>({disabledLabel})</em>
              </span>
              <span className="navbar__mSubItem is-disabled" aria-disabled="true">
                {t("navbar.servicesItems.staffAugmentation")} <em>({disabledLabel})</em>
              </span>
            </div>

            {/* Portafolio */}
            <span className="navbar__mLink is-disabled" aria-disabled="true">
              {t("navbar.portfolio")} <em>({disabledLabel})</em>
            </span>

            {/* Empresa (móvil click) */}
            <button
              type="button"
              className={`navbar__mLink navbar__mLinkBtn ${mobileCompanyOpen ? "is-open" : ""}`}
              onClick={() => setMobileCompanyOpen((v) => !v)}
              aria-expanded={mobileCompanyOpen}
            >
              <span>{t("navbar.company")}</span>
              <CaretIcon open={mobileCompanyOpen} />
            </button>

            <div className={`navbar__mSub ${mobileCompanyOpen ? "is-open" : ""}`}>
              <span className="navbar__mSubItem is-disabled" aria-disabled="true">
                {t("navbar.companyItems.faq")} <em>({disabledLabel})</em>
              </span>
              <NavLink to={to("/empresa/sobre-nosotros")} className="navbar__mSubItem">
                {t("navbar.companyItems.about")}
              </NavLink>
              <span className="navbar__mSubItem is-disabled" aria-disabled="true">
                {t("navbar.companyItems.blog")} <em>({disabledLabel})</em>
              </span>
            </div>

            <div className="navbar__panelFooter">
              <LanguageSwitcher />
              <NavLink to={to("/contacto")} className="navbar__mCta">
                {t("navbar.contact")}
              </NavLink>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
