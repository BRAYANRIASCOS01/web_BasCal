import "../../styles/footer.css";
import { Link } from "react-router-dom";
import { useIdioma } from "../../core/i18n/useIdioma";

function formatYearText(text, year) {
  return String(text || "").replace("{year}", String(year));
}

export default function Footer() {
  const { lang, dict } = useIdioma();
  const base = `/${lang}`;
  const f = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Columna 1: About */}
        <div className="footer__col footer__col--about">
          <div className="footer__brand">{f.aboutTitle}</div>
          <p className="footer__text">{f.aboutText}</p>
        </div>

        {/* Columna 2: Links */}
        <div className="footer__col">
          <div className="footer__title">{f.linksTitle}</div>
          <ul className="footer__list">
            <li><Link to={base}>{f.home}</Link></li>
            <li><Link to={`${base}/portafolio`}>{f.portfolio}</Link></li>
            <li><Link to={`${base}/contacto`}>{f.contact}</Link></li>
          </ul>
        </div>

        {/* Columna 3: Servicios */}
        <div className="footer__col">
          <div className="footer__title">{f.servicesTitle}</div>
          <ul className="footer__list">
            <li><Link to={`${base}/servicios/bim`}>{f.servicesBim}</Link></li>
            <li><Link to={`${base}/servicios/prof`}>{f.servicesProf}</Link></li>
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div className="footer__col">
          <div className="footer__title">{f.contactTitle}</div>

          <div className="footer__contact">
            <div className="footer__label">{f.addressLabel}</div>
            <div className="footer__value">{f.addressValue}</div>
          </div>

          <div className="footer__contact">
            <div className="footer__label">{f.phoneLabel}</div>
            <a className="footer__value" href={`tel:${f.phoneValue.replace(/\s/g, "")}`}>
              {f.phoneValue}
            </a>
          </div>

          <div className="footer__contact">
            <div className="footer__label">{f.emailLabel}</div>
            <a className="footer__value" href={`mailto:${f.emailValue}`}>
              {f.emailValue}
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        {formatYearText(f.copyright, year)}
      </div>
    </footer>
  );
}
