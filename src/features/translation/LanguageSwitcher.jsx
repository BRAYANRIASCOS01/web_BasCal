import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const normalizeLang = (value = "es") => value.split("-")[0];
  const currentLanguage = normalizeLang(i18n.language);

  const setLanguage = (language) => {
    const nextLanguage = normalizeLang(language);
    if (currentLanguage === nextLanguage) {
      setOpen(false);
      return;
    }

    i18n.changeLanguage(nextLanguage);

    const segments = location.pathname.split("/").filter(Boolean);
    const rest = segments[0] === "es" || segments[0] === "en" ? segments.slice(1) : segments;
    const nextPath = `/${[nextLanguage, ...rest].join("/")}`.replace(/\/+$/, "");

    navigate(nextPath || `/${nextLanguage}`, { replace: true });
    setOpen(false);
  };

  const languages = [
    { code: "es", shortLabel: "ES", name: t("language.spanish") },
    { code: "en", shortLabel: "EN", name: t("language.english") },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        type="button"
        className="language-switcher__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language.label")}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="language-switcher__triggerIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="10" r="5.5" />
              <path d="M4.8 10h10.4" />
              <path d="M10 4.8c1.5 1.5 2.4 3.2 2.4 5.2 0 2-0.9 3.7-2.4 5.2" />
              <path d="M10 4.8c-1.5 1.5-2.4 3.2-2.4 5.2 0 2 0.9 3.7 2.4 5.2" />
            </g>
          </svg>
        </span>
        <span className="language-switcher__triggerLabel" lang={currentLanguage}>
          {currentLanguage.toUpperCase()}
        </span>
        <span className="language-switcher__caret" aria-hidden="true">
          ▾
        </span>
      </button>

      <ul
        className={`language-switcher__menu${open ? " is-open" : ""}`}
        role="listbox"
        aria-label={t("language.label")}
      >
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <li key={lang.code} role="option" aria-selected={isActive}>
              <button
                type="button"
                className={`language-switcher__item${isActive ? " language-switcher__item--active" : ""}`}
                onClick={() => setLanguage(lang.code)}
              >
                <span className="language-switcher__itemCode" lang={lang.code}>
                  {lang.shortLabel}
                </span>
                <span className="language-switcher__itemName">{lang.name}</span>
                {isActive && <span className="language-switcher__pill" aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
