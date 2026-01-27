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
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2.5C6.753 2.5 2.5 6.753 2.5 12S6.753 21.5 12 21.5 21.5 17.247 21.5 12 17.247 2.5 12 2.5Zm0 17.1c-1.157 0-2.27-2.045-2.642-4.6h5.284C14.27 17.555 13.157 19.6 12 19.6Zm-2.816-6.2c-.053-.46-.084-.938-.084-1.4 0-.462.031-.94.084-1.4h5.632c.053.46.084.938.084 1.4 0 .462-.031.94-.084 1.4ZM7.04 12c0-.48.027-.958.08-1.4h2.12c-.047.46-.07.936-.07 1.4 0 .464.023.94.07 1.4h-2.12c-.053-.442-.08-.92-.08-1.4Zm2.36-3.4H7.24c.386-1.91 1.35-3.425 2.46-3.7a15.9 15.9 0 0 0-.3 3.7Zm2.6 0h-1.4c0-1.283.11-2.39.304-3.222.091-.388.189-.62.274-.728A.476.476 0 0 1 12 4.5c.143 0 .388.193.62.95.164.523.3 1.243.38 1.91.049.396.08.832.08 1.24Zm1.36 0c-.042-.5-.102-.992-.18-1.45-.117-.694-.27-1.284-.43-1.75 1.1.268 2.074 1.782 2.46 3.7Zm.12 6.8c-.386 1.918-1.36 3.432-2.46 3.7.16-.466.313-1.056.43-1.75.078-.458.138-.95.18-1.45Zm-3.76 0c0 .408.031.844.08 1.24.08.667.216 1.387.38 1.91.232.757.477.95.62.95.143 0 .388-.193.62-.95.064-.214.132-.492.196-.81.108-.537.207-1.182.28-1.94.049-.396.08-.832.08-1.24Zm-1.36 0c.042.5.102.992.18 1.45.117.694.27 1.284.43 1.75-1.1-.268-2.074-1.782-2.46-3.7ZM16.76 13.4c.053-.442.08-.92.08-1.4 0-.48-.027-.958-.08-1.4h2.12c.053.442.08.92.08 1.4 0 .48-.027.958-.08 1.4Zm2.2-2.8h-2.12c-.132-1.143-.37-2.178-.682-3.032a5.46 5.46 0 0 0-.498-.976 6.42 6.42 0 0 1 3.3 4.008Zm-3.3 6.408c.19-.321.36-.676.498-.976.312-.854.55-1.889.682-3.032h2.12a6.42 6.42 0 0 1-3.3 4.008Zm-7.022-7.84a5.46 5.46 0 0 0-.498.976c-.312.854-.55 1.889-.682 3.032H5.338a6.42 6.42 0 0 1 3.3-4.008ZM4.3 13.4h2.12c.132 1.143.37 2.178.682 3.032.138.3.308.655.498.976A6.42 6.42 0 0 1 4.3 13.4Z"
              fill="currentColor"
            />
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
