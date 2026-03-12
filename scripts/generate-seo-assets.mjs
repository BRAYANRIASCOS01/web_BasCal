import { resolve } from "node:path";
import { writeFileSync } from "node:fs";

const DEFAULT_SITE_URL = "https://bascal.com";

function sanitizeSiteUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  const normalized = raw.replace(/\/+$/, "");
  return /^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`;
}

function parseBoolean(value) {
  if (value == null) return null;
  const parsed = String(value).trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(parsed)) return true;
  if (["0", "false", "no", "off"].includes(parsed)) return false;
  return null;
}

const siteUrl = sanitizeSiteUrl(process.env.SEO_SITE_URL || process.env.VITE_SITE_URL);
const explicitIndexing = parseBoolean(process.env.SEO_ALLOW_INDEXING ?? process.env.VITE_ALLOW_INDEXING);
const allowIndexing = explicitIndexing ?? !/\.vercel\.app$/i.test(siteUrl);
const today = new Date().toISOString().slice(0, 10);

const alternates = [
  { es: "/es", en: "/en", priority: "1.0" },
  { es: "/es/servicios/bim", en: "/en/servicios/bim", priority: "0.9" },
  { es: "/es/servicios/profesionales", en: "/en/servicios/profesionales", priority: "0.9" },
  { es: "/es/portafolio", en: "/en/portafolio", priority: "0.8" },
  { es: "/es/empresa/sobre-nosotros", en: "/en/empresa/sobre-nosotros", priority: "0.7" },
  { es: "/es/contacto", en: "/en/contacto", priority: "0.8" },
  { es: "/es/empresa/faq", en: "/en/empresa/faq", priority: "0.7" },
];

const robots = allowIndexing
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : "User-agent: *\nDisallow: /\n";

const sitemapItems = alternates
  .flatMap((route) =>
    ["es", "en"].map((lang) => {
      const loc = `${siteUrl}${route[lang]}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}${route.es}" />`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${route.en}" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${route.es}" />`,
        `    <lastmod>${today}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        `    <priority>${route.priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
  )
  .join("\n");

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
  `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  `${sitemapItems}\n` +
  `</urlset>\n`;

writeFileSync(resolve("public", "robots.txt"), robots, "utf8");
writeFileSync(resolve("public", "sitemap.xml"), sitemap, "utf8");

console.log(`Generated robots.txt and sitemap.xml for ${siteUrl} (indexable=${allowIndexing})`);
