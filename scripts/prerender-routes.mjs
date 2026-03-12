import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const DEFAULT_SITE_URL = "https://bascal.com";
const DEFAULT_CONTACT_EMAIL = "contacto@bascal.com";
const DEFAULT_CONTACT_PHONE = "+57 300 111 2233";
const DEFAULT_OG_IMAGE = "/og-image-1200x630.jpg";

function sanitizeSiteUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  const normalized = raw.replace(/\/+$/, "");
  return /^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`;
}

function getByPath(object, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), object);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizePagePath(path = "/") {
  if (!path || path === "/") return "/";
  return `/${String(path).replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

function toLocalizedPath(lang, pagePath = "/") {
  const safePath = normalizePagePath(pagePath);
  if (safePath === "/") return `/${lang}`;
  return `/${lang}${safePath}`;
}

function getAlternateLang(lang) {
  return lang === "en" ? "es" : "en";
}

function getOgLocale(lang) {
  return lang === "en" ? "en_US" : "es_CO";
}

function getRobotsContent({ noindex = false } = {}) {
  return noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
}

const siteUrl = sanitizeSiteUrl(process.env.SEO_SITE_URL || process.env.VITE_SITE_URL);
const contactEmail = process.env.VITE_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;
const contactPhone = process.env.VITE_CONTACT_PHONE || DEFAULT_CONTACT_PHONE;

const locales = {
  es: JSON.parse(readFileSync(resolve("src/shared/locales/es.json"), "utf8")),
  en: JSON.parse(readFileSync(resolve("src/shared/locales/en.json"), "utf8")),
};

const routes = [
  {
    pagePath: "/",
    getMeta: (lang) => ({
      title: getByPath(locales[lang], "home.seo.title"),
      description: getByPath(locales[lang], "home.seo.description"),
      noindex: false,
    }),
  },
  {
    pagePath: "/servicios/bim",
    getMeta: (lang) => ({
      title: getByPath(locales[lang], "bimPage.seo.title"),
      description: getByPath(locales[lang], "bimPage.seo.description"),
      noindex: false,
    }),
  },
  {
    pagePath: "/servicios/profesionales",
    getMeta: (lang) => ({
      title: getByPath(locales[lang], "professionalPage.seo.title"),
      description: getByPath(locales[lang], "professionalPage.seo.description"),
      noindex: false,
    }),
  },
  {
    pagePath: "/servicios/construccion",
    getMeta: (lang) => ({
      title: lang === "en" ? "Construction Services | BasCal (In development)" : "Servicios de Construccion | BasCal (En desarrollo)",
      description:
        lang === "en"
          ? "This section is currently being expanded with complete information."
          : "Esta seccion se esta ampliando con informacion completa.",
      noindex: true,
    }),
  },
  {
    pagePath: "/servicios/staff-augmentation",
    getMeta: (lang) => ({
      title: lang === "en" ? "Staff Augmentation | BasCal (In development)" : "Staff Augmentation | BasCal (En desarrollo)",
      description:
        lang === "en"
          ? "This section is currently being expanded with complete information."
          : "Esta seccion se esta ampliando con informacion completa.",
      noindex: true,
    }),
  },
  {
    pagePath: "/portafolio",
    getMeta: (lang) => ({
      title: getByPath(locales[lang], "portfolioPage.seo.title"),
      description: getByPath(locales[lang], "portfolioPage.seo.description"),
      noindex: false,
    }),
  },
  {
    pagePath: "/empresa/sobre-nosotros",
    getMeta: (lang) => ({
      title: getByPath(locales[lang], "aboutPage.seo.title"),
      description: getByPath(locales[lang], "aboutPage.seo.description"),
      noindex: false,
    }),
  },
  {
    pagePath: "/empresa/faq",
    getMeta: (lang) => ({
      title: lang === "en" ? "FAQ | BasCal BIM and engineering" : "FAQ | BasCal BIM e ingenieria",
      description: getByPath(locales[lang], "faq.subtitle"),
      noindex: false,
    }),
  },
  {
    pagePath: "/empresa/blog",
    getMeta: (lang) => ({
      title: lang === "en" ? "Blog | BasCal (In development)" : "Blog | BasCal (En desarrollo)",
      description: lang === "en" ? "This section is currently under development." : "Esta seccion se encuentra en desarrollo.",
      noindex: true,
    }),
  },
  {
    pagePath: "/contacto",
    getMeta: (lang) => {
      const pageTitle = getByPath(locales[lang], "contactInfo.pageTitle") || (lang === "en" ? "Contact" : "Contacto");
      const pageSubtitle =
        getByPath(locales[lang], "contactInfo.pageSubtitle") ||
        (lang === "en"
          ? "Tell us about your project and we will get back to you as soon as possible."
          : "Cuentanos sobre tu proyecto y te responderemos en el menor tiempo posible.");
      return {
        title: `${pageTitle} | BasCal`,
        description: pageSubtitle,
        noindex: false,
      };
    },
  },
  {
    pagePath: "/404",
    getMeta: (lang) => ({
      title: lang === "en" ? "Page not found | BasCal" : "Pagina no encontrada | BasCal",
      description:
        lang === "en"
          ? "The URL does not match a public page on BasCal."
          : "La URL no coincide con una pagina publica de BasCal.",
      noindex: true,
    }),
  },
];

function getOrganizationDescription(lang) {
  return lang === "en"
    ? "Specialized firm in architectural design, MEP engineering, and advanced BIM/VDC services."
    : "Firma especializada en diseno arquitectonico, ingenieria MEP y servicios BIM/VDC avanzados.";
}

function buildOrganizationSchema(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BasCal",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/Log_BasCal.PNG`,
    image: `${siteUrl}/Log_BasCal.PNG`,
    description: getOrganizationDescription(lang),
    areaServed: ["CO", "EC", "VE", "MX", "US"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: contactPhone,
        email: contactEmail,
        availableLanguage: ["es", "en"],
      },
    ],
  };
}

function buildWebsiteSchema(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BasCal",
    url: `${siteUrl}${toLocalizedPath(lang, "/")}`,
    inLanguage: lang,
  };
}

function buildWebPageSchema({ title, description, lang, canonicalUrl }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    inLanguage: lang,
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "BasCal",
      url: `${siteUrl}/`,
    },
  };
}

function getPrerenderHeading(lang, pagePath, fallbackTitle) {
  const localized = {
    "/": getByPath(locales[lang], "home.heroTitle"),
    "/servicios/bim": getByPath(locales[lang], "bimPage.hero.title"),
    "/servicios/profesionales": getByPath(locales[lang], "professionalPage.hero.title"),
    "/portafolio": getByPath(locales[lang], "portfolioPage.hero.title"),
    "/empresa/sobre-nosotros": getByPath(locales[lang], "aboutPage.hero.title"),
    "/empresa/faq": getByPath(locales[lang], "faq.title"),
    "/contacto": getByPath(locales[lang], "contactInfo.pageTitle"),
    "/404": lang === "en" ? "Page not found" : "Pagina no encontrada",
  };

  if (localized[pagePath]) return String(localized[pagePath]);
  return String(fallbackTitle || "").split("|")[0].trim() || "BasCal";
}

function getPrerenderHighlights(lang, pagePath) {
  if (pagePath === "/") {
    return asArray(getByPath(locales[lang], "home.services.items"))
      .map((item) => item?.title)
      .filter(Boolean)
      .slice(0, 4);
  }

  if (pagePath === "/servicios/bim") {
    return asArray(getByPath(locales[lang], "bimPage.pillars.items"))
      .map((item) => item?.title)
      .filter(Boolean)
      .slice(0, 4);
  }

  if (pagePath === "/servicios/profesionales") {
    return asArray(getByPath(locales[lang], "professionalPage.services.items"))
      .map((item) => item?.title)
      .filter(Boolean)
      .slice(0, 4);
  }

  if (pagePath === "/portafolio") {
    return asArray(getByPath(locales[lang], "portfolioPage.projects"))
      .map((item) => item?.title)
      .filter(Boolean)
      .slice(0, 4);
  }

  if (pagePath === "/empresa/sobre-nosotros") {
    return asArray(getByPath(locales[lang], "aboutPage.blocks"))
      .map((item) => item?.title)
      .filter(Boolean)
      .slice(0, 4);
  }

  if (pagePath === "/empresa/faq") {
    return asArray(getByPath(locales[lang], "faq.items"))
      .map((item) => item?.q)
      .filter(Boolean)
      .slice(0, 4);
  }

  return [];
}

function getPrerenderLinks(lang, pagePath) {
  const links = [
    { path: "/", label: lang === "en" ? "Home" : "Inicio" },
    { path: "/servicios/bim", label: "BIM" },
    { path: "/servicios/profesionales", label: lang === "en" ? "Professional services" : "Servicios profesionales" },
    { path: "/portafolio", label: lang === "en" ? "Portfolio" : "Portafolio" },
    { path: "/empresa/sobre-nosotros", label: lang === "en" ? "About us" : "Sobre nosotros" },
    { path: "/contacto", label: lang === "en" ? "Contact" : "Contacto" },
  ];

  return links.filter((link) => link.path !== pagePath);
}

function buildPrerenderMain({ lang, pagePath, title, description, noindex }) {
  const heading = getPrerenderHeading(lang, pagePath, title);
  const highlights = getPrerenderHighlights(lang, pagePath);
  const links = getPrerenderLinks(lang, pagePath);

  const summaryLabel = lang === "en" ? "Pre-rendered summary" : "Resumen pre-renderizado";
  const linksLabel = lang === "en" ? "Main sections" : "Secciones principales";
  const noindexNote =
    noindex && pagePath !== "/404"
      ? lang === "en"
        ? "This page is not indexable at this stage."
        : "Esta pagina no es indexable en esta etapa."
      : "";

  const highlightsHtml = highlights.length
    ? `<ul style="margin: 0 0 22px 18px; color: #27324b; line-height: 1.6;">
${highlights.map((item) => `          <li>${escapeHtml(item)}</li>`).join("\n")}
        </ul>`
    : "";

  const linksHtml = links.length
    ? `<nav aria-label="${escapeHtml(linksLabel)}">
        <p style="margin: 0 0 8px; font-weight: 700; color: #0f1b3d;">${escapeHtml(linksLabel)}</p>
        <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 10px 16px;">
${links
  .map(
    (link) =>
      `          <li><a href="${escapeHtml(toLocalizedPath(lang, link.path))}" style="color: #123ea3; text-decoration: underline;">${escapeHtml(link.label)}</a></li>`
  )
  .join("\n")}
        </ul>
      </nav>`
    : "";

  const noteHtml = noindexNote
    ? `<p style="margin: 0 0 18px; color: #6a7286; font-style: italic;">${escapeHtml(noindexNote)}</p>`
    : "";

  return `
      <main aria-label="${escapeHtml(summaryLabel)}" style="max-width: 920px; margin: 0 auto; padding: 92px 20px 64px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <article style="background: #f8faff; border: 1px solid #dce3f4; border-radius: 18px; padding: 26px;">
          <p style="margin: 0 0 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #4a5d87;">${escapeHtml(summaryLabel)}</p>
          <h1 style="margin: 0 0 12px; font-size: clamp(1.65rem, 2.8vw, 2.2rem); line-height: 1.2; color: #0f1b3d;">${escapeHtml(heading)}</h1>
          <p style="margin: 0 0 18px; color: #33405f; line-height: 1.7;">${escapeHtml(description)}</p>
          ${noteHtml}
          ${highlightsHtml}
          ${linksHtml}
        </article>
      </main>
    `.trim();
}

function buildSeoHead({ title, description, lang, canonicalUrl, alternateUrl, xDefaultUrl, noindex }) {
  const ogLocale = getOgLocale(lang);
  const alternateLocale = getOgLocale(getAlternateLang(lang));
  const robots = getRobotsContent({ noindex });
  const ogImage = `${siteUrl}${DEFAULT_OG_IMAGE}`;
  const organizationSchema = buildOrganizationSchema(lang);
  const websiteSchema = buildWebsiteSchema(lang);
  const pageSchema = buildWebPageSchema({ title, description, lang, canonicalUrl });

  return [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<link rel="alternate" hrefLang="${lang}" href="${escapeHtml(canonicalUrl)}" />`,
    `<link rel="alternate" hrefLang="${getAlternateLang(lang)}" href="${escapeHtml(alternateUrl)}" />`,
    `<link rel="alternate" hrefLang="x-default" href="${escapeHtml(xDefaultUrl)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="BasCal" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:locale" content="${ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${alternateLocale}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(title)}" />`,
    `<meta name="author" content="BasCal" />`,
    `<meta name="application-name" content="BasCal" />`,
    `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`,
    `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`,
    `<script type="application/ld+json">${JSON.stringify(pageSchema)}</script>`,
  ].join("\n    ");
}

function renderHtml(baseHtml, { lang, title, description, canonicalUrl, alternateUrl, xDefaultUrl, noindex, pagePath }) {
  const seoBlock = buildSeoHead({ title, description, lang, canonicalUrl, alternateUrl, xDefaultUrl, noindex });
  const prerenderMain = buildPrerenderMain({ lang, pagePath, title, description, noindex });

  let html = baseHtml;
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);

  const marker = '<meta name="x-prerender-seo" content="placeholder" />';
  if (html.includes(marker)) {
    html = html.replace(marker, seoBlock);
  } else {
    html = html.replace("</head>", `    ${seoBlock}\n  </head>`);
  }

  html = html.replace('<div id="root"></div>', `<div id="root">\n${prerenderMain}\n    </div>`);
  return html;
}

function renderRootRedirectHtml(baseHtml, options) {
  let html = renderHtml(baseHtml, options);
  html = html.replace("</head>", '    <meta http-equiv="refresh" content="0; url=/es/" />\n  </head>');
  html = html.replace(
    "</body>",
    '    <script>if (window.location.pathname === "/") { window.location.replace("/es/"); }</script>\n  </body>'
  );
  return html;
}

function writeHtmlForPath(routePath, html) {
  if (routePath === "/") {
    writeFileSync(resolve("dist", "index.html"), html, "utf8");
    return;
  }
  const safePath = routePath.replace(/^\/+/, "");
  const targetPath = resolve("dist", safePath, "index.html");
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, html, "utf8");
}

const distIndexPath = resolve("dist", "index.html");
const template = readFileSync(distIndexPath, "utf8");

for (const lang of ["es", "en"]) {
  for (const route of routes) {
    const { title, description, noindex } = route.getMeta(lang);
    const localizedPath = toLocalizedPath(lang, route.pagePath);
    const canonicalUrl = `${siteUrl}${localizedPath}`;
    const alternateUrl = `${siteUrl}${toLocalizedPath(getAlternateLang(lang), route.pagePath)}`;
    const xDefaultUrl = `${siteUrl}${toLocalizedPath("es", route.pagePath)}`;
    const html = renderHtml(template, {
      lang,
      title,
      description,
      canonicalUrl,
      alternateUrl,
      xDefaultUrl,
      noindex,
      pagePath: route.pagePath,
    });
    writeHtmlForPath(localizedPath, html);
  }
}

const rootMeta = routes[0].getMeta("es");
const rootHtml = renderRootRedirectHtml(template, {
  lang: "es",
  title: rootMeta.title,
  description: rootMeta.description,
  canonicalUrl: `${siteUrl}/es`,
  alternateUrl: `${siteUrl}/en`,
  xDefaultUrl: `${siteUrl}/es`,
  noindex: true,
  pagePath: "/",
});
writeHtmlForPath("/", rootHtml);

const notFoundMeta = routes.find((route) => route.pagePath === "/404").getMeta("es");
const root404Html = renderHtml(template, {
  lang: "es",
  title: notFoundMeta.title,
  description: notFoundMeta.description,
  canonicalUrl: `${siteUrl}/es/404`,
  alternateUrl: `${siteUrl}/en/404`,
  xDefaultUrl: `${siteUrl}/es/404`,
  noindex: true,
  pagePath: "/404",
});
writeFileSync(resolve("dist", "404.html"), root404Html, "utf8");

console.log("Generated prerendered route HTML files with route-specific SEO metadata.");
