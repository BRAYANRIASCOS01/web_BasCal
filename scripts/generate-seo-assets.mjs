import { resolve } from "node:path";
import { writeFileSync } from "node:fs";

const DEFAULT_SITE_URL = "https://web-bas-cal.vercel.app";

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

const indexablePaths = [
  "/es",
  "/en",
  "/es/servicios/bim",
  "/en/servicios/bim",
  "/es/servicios/profesionales",
  "/en/servicios/profesionales",
  "/es/portafolio",
  "/en/portafolio",
  "/es/empresa/sobre-nosotros",
  "/en/empresa/sobre-nosotros",
  "/es/contacto",
  "/en/contacto",
  "/es/empresa/faq",
  "/en/empresa/faq",
];

const robots = allowIndexing
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : "User-agent: *\nDisallow: /\n";

const sitemapItems = indexablePaths
  .map((path) => {
    const url = `${siteUrl}${path}`;
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${path === "/es" || path === "/en" ? "1.0" : "0.8"}</priority>\n  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapItems}\n</urlset>\n`;

writeFileSync(resolve("public", "robots.txt"), robots, "utf8");
writeFileSync(resolve("public", "sitemap.xml"), sitemap, "utf8");

console.log(`Generated robots.txt and sitemap.xml for ${siteUrl} (indexable=${allowIndexing})`);
