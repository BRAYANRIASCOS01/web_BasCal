import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import { BASCAL_CONTACT_PHONE } from "../../../shared/contact.js";
import { normalizeLang } from "../../../shared/seo/seo-utils.js";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);

  const title = safeLang === "en" ? "Page not found | BasCal" : "Pagina no encontrada | BasCal";
  const description =
    safeLang === "en"
      ? "The URL does not match a public page on BasCal."
      : "La URL no coincide con una pagina publica de BasCal.";
  const homeHref = `/${safeLang}`;
  const contactHref = `/${safeLang}/contacto`;

  return (
    <main className="app" id="top">
      <SeoHead lang={safeLang} path="/404" title={title} description={description} noindex />
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "96px 24px 72px" }}>
        <p className="eyebrow">{safeLang === "en" ? "Error 404" : "Error 404"}</p>
        <h1 style={{ marginBottom: "12px" }}>{safeLang === "en" ? "Page not found" : "Pagina no encontrada"}</h1>
        <p className="text-muted" style={{ marginBottom: "24px" }}>
          {safeLang === "en"
            ? "The page you requested does not exist or was moved."
            : "La pagina que buscas no existe o fue movida."}
        </p>
        <div className="actions">
          <Link className="btn btn--primary" to={homeHref}>
            {safeLang === "en" ? "Go to home" : "Ir al inicio"}
          </Link>
          <Link className="btn btn--ghost" to={contactHref}>
            {safeLang === "en" ? "Contact us" : "Contactanos"}
          </Link>
        </div>
      </section>

      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone={BASCAL_CONTACT_PHONE}
        message={t("home.whatsappMessage", "Hola, quiero recibir información sobre los servicios y proyectos de BasCal. Me interesa conocer cómo pueden apoyarme en BIM, diseño arquitectónico, ingeniería MEP o coordinación técnica. ¿Podrían orientarme?")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default NotFoundPage;
