import { BASCAL_CONTACT_EMAIL, BASCAL_CONTACT_PHONE } from "../contact.js";

const DEFAULT_SITE_URL = "https://bascal.com";
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
  if (typeof window !== "undefined" && window.location?.origin) {
    return sanitizeUrl(window.location.origin);
  }
  const fromEnv = sanitizeUrl(import.meta.env.VITE_SITE_URL);
  if (fromEnv) return fromEnv;
  return DEFAULT_SITE_URL;
}

export function getAbsoluteUrl(path = "/") {
  const safePath = normalizePagePath(path);
  return `${getSiteUrl()}${safePath}`;
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
  return getAbsoluteUrl(getLocalizedPath(lang, pagePath));
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

function getOrganizationDescription(lang) {
  return normalizeLang(lang) === "en"
    ? "Specialized firm in architectural design, MEP engineering, and advanced BIM/VDC services."
    : "Firma especializada en diseño arquitectónico, ingeniería MEP y servicios BIM/VDC avanzados.";
}

export function getOrganizationSchema(lang = "es") {
  const siteUrl = getSiteUrl();
  const safeLang = normalizeLang(lang);
  const phone = import.meta.env.VITE_CONTACT_PHONE || BASCAL_CONTACT_PHONE;
  const email = import.meta.env.VITE_CONTACT_EMAIL || BASCAL_CONTACT_EMAIL;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BasCal",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/Log_BasCal.PNG`,
    image: `${siteUrl}/Log_BasCal.PNG`,
    description: getOrganizationDescription(safeLang),
    areaServed: ["CO", "EC", "VE", "MX", "US"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: phone,
        email,
        availableLanguage: ["es", "en"],
      },
    ],
  };
}

export function getWebSiteSchema(lang = "es") {
  const safeLang = normalizeLang(lang);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BasCal",
    url: getLocalizedUrl(safeLang, "/"),
    inLanguage: safeLang,
  };
}
