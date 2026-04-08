import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import { BASCAL_CONTACT_PHONE } from "../../../shared/contact.js";
import { normalizeLang } from "../../../shared/seo/seo-utils.js";

const EmpresaBlogPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);

  const title = safeLang === "en" ? "Blog | BasCal (In development)" : "Blog | BasCal (En desarrollo)";
  const description =
    safeLang === "en" ? "This section is currently under development." : "Esta sección se encuentra en desarrollo.";

  return (
    <main className="app" id="top">
      <SeoHead lang={safeLang} path="/empresa/blog" title={title} description={description} noindex />
      <section style={{ padding: "72px 24px", maxWidth: 920, margin: "0 auto" }}>
        <h1>{safeLang === "en" ? "Blog" : "Blog"}</h1>
        <p>{safeLang === "en" ? "Section under development." : "Sección en desarrollo."}</p>
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

export default EmpresaBlogPage;
