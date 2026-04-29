import architecturalDesignIllustration from "../../../assets/pro-services/diseno.svg";
import electricalIllustration from "../../../assets/pro-services/electrica.svg";
import fireProtectionIllustration from "../../../assets/pro-services/seguridad.svg";
import mechanicalIllustration from "../../../assets/pro-services/mecanica.svg";
import plumbingGasIllustration from "../../../assets/pro-services/plomeria.svg";
import sustainableIllustration from "../../../assets/pro-services/sostenible.svg";
import telecomIllustration from "../../../assets/pro-services/tecnologia.svg";

const normalizeTitle = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const resolveVariant = (service = {}) => {
  if (service.id) return service.id;

  const title = normalizeTitle(service.title);

  if (title.includes("electric") || title.includes("electr")) return "electrical";
  if (title.includes("telecom") || title.includes(" ti ") || title.startsWith("ti ")) return "telecom";
  if (title.includes("edge") || title.includes("leed") || title.includes("certif")) return "edge";
  if (title.includes("mechan") || title.includes("mecan") || title.includes("hvac")) return "mechanical";
  if (title.includes("gas") || title.includes("plomer") || title.includes("sanitar")) return "plumbing-gas";
  if (title.includes("incend") || title.includes("sprinkler") || title.includes("alarm")) return "fire-protection";
  if (title.includes("arquitect") || title.includes("archit") || title.includes("interior")) return "arch-design";

  return "general";
};

const serviceIllustrations = {
  "arch-design": architecturalDesignIllustration,
  electrical: electricalIllustration,
  edge: sustainableIllustration,
  "fire-protection": fireProtectionIllustration,
  general: architecturalDesignIllustration,
  mechanical: mechanicalIllustration,
  "plumbing-gas": plumbingGasIllustration,
  telecom: telecomIllustration,
};

export const hasProfessionalServiceIllustration = (service) => {
  const variant = resolveVariant(service);

  return Boolean(serviceIllustrations[variant]);
};

const ProfessionalServiceIllustration = ({ service }) => {
  const variant = resolveVariant(service);
  const illustration = serviceIllustrations[variant];

  if (!illustration) return null;

  return (
    <img
      className="service-illustration service-illustration--asset"
      src={illustration}
      alt=""
      aria-hidden="true"
      loading="lazy"
    />
  );
};

export default ProfessionalServiceIllustration;
