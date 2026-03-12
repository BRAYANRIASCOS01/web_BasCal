import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ScrollTop from "../../../shared/components/ScrollTop.jsx";
import WhatsAppButton from "../../../shared/components/WhatsAppButton.jsx";
import SeoHead from "../../../shared/components/SeoHead.jsx";
import { normalizeLang } from "../../../shared/seo/seo-utils.js";

const ServicesStaffAugmentationPage = () => {
  const { t } = useTranslation();
  const { lang = "es" } = useParams();
  const safeLang = normalizeLang(lang);
  const title =
    safeLang === "en"
      ? "Staff Augmentation | BasCal (In development)"
      : "Staff Augmentation | BasCal (En desarrollo)";
  const description =
    safeLang === "en"
      ? "This page is currently under development."
      : "Esta página se encuentra en desarrollo.";

  return (
    <main className="app" id="top">
      <SeoHead
        lang={safeLang}
        path="/servicios/staff-augmentation"
        title={title}
        description={description}
        noindex
      />
      <h1>{safeLang === "en" ? "Staff Augmentation Services" : "Servicios de Staff Augmentation"}</h1>
      <p>{safeLang === "en" ? "Page under development." : "Página en desarrollo."}</p>
      <ScrollTop threshold={260} label={t("home.scrollTop", "Subir")} />
      <WhatsAppButton
        phone="573001112233"
        message={t("home.whatsappMessage", "Hola, quiero más información sobre servicios BIM.")}
        label={t("home.chatLabel", "Chat")}
      />
    </main>
  );
};

export default ServicesStaffAugmentationPage;
