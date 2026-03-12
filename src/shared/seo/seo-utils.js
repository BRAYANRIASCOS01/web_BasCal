const DEFAULT_SITE_URL = "https://web-bas-cal.vercel.app";
const SUPPORTED_LANGUAGES = ["es", "en"];

function sanitizeUrl(url) {
  return String(url || "")
    .trim()
    .replace(/\/+$/, "");
}

export function normalizeLang(value = "es") {
  const normalized = String(value || "es")
    .toLowerCase()
    .split("-")[0];
  return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : "es";
}

export function getSiteUrl() {
  const fromEnv = sanitizeUrl(import.meta.env.VITE_SITE_URL);
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined" && window.location?.origin) {
    return sanitizeUrl(window.location.origin);
  }
  return DEFAULT_SITE_URL;
}

export function normalizePagePath(path = "/") {
  if (!path || path === "/") return "/";
  const normalized = `/${String(path).replace(/^\/+/, "")}`.replace(/\/+$/, "");
  return normalized || "/";
}

export function getLocalizedPath(lang, pagePath = "/") {
  const safeLang = normalizeLang(lang);
  const safePath = normalizePagePath(pagePath);
  if (safePath === "/") return `/${safeLang}`;
  return `/${safeLang}${safePath}`;
}

export function getLocalizedUrl(lang, pagePath = "/") {
  return `${getSiteUrl()}${getLocalizedPath(lang, pagePath)}`;
}

export function getAlternateLang(lang) {
  return normalizeLang(lang) === "en" ? "es" : "en";
}

export function getOgLocale(lang) {
  return normalizeLang(lang) === "en" ? "en_US" : "es_CO";
}

function parseBoolean(rawValue) {
  if (rawValue == null) return null;
  const value = String(rawValue).trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(value)) return true;
  if (["0", "false", "no", "off"].includes(value)) return false;
  return null;
}

export function shouldIndexSite() {
  const fromEnv = parseBoolean(import.meta.env.VITE_ALLOW_INDEXING);
  if (fromEnv !== null) return fromEnv;

  if (typeof window !== "undefined") {
    return !/\.vercel\.app$/i.test(window.location.hostname || "");
  }

  return true;
}

export function getRobotsContent({ noindex = false } = {}) {
  if (noindex) return "noindex, nofollow";
  return shouldIndexSite() ? "index, follow, max-image-preview:large" : "noindex, nofollow";
}

export function getOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BasCal",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/Log_BasCal.PNG`,
    image: `${siteUrl}/Log_BasCal.PNG`,
    description:
      "Firma especializada en diseño arquitectónico, ingeniería MEP y servicios BIM/VDC avanzados.",
    areaServed: ["CO", "EC", "VE", "MX", "US"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+57 000 000 0000",
        email: "contacto@bascal.com",
        availableLanguage: ["es", "en"],
      },
    ],
  };
}

