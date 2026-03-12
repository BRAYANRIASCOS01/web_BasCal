import { Helmet } from "react-helmet-async";
import {
  getAlternateLang,
  getLocalizedUrl,
  getOgLocale,
  getOrganizationSchema,
  getRobotsContent,
  getSiteUrl,
  normalizeLang,
  normalizePagePath,
} from "../seo/seo-utils.js";

const SeoHead = ({
  title,
  description,
  lang = "es",
  path = "/",
  noindex = false,
  type = "website",
  imagePath = "/og-image.svg",
  structuredData,
}) => {
  const safeLang = normalizeLang(lang);
  const safePath = normalizePagePath(path);

  const canonicalUrl = getLocalizedUrl(safeLang, safePath);
  const alternateLang = getAlternateLang(safeLang);
  const alternateUrl = getLocalizedUrl(alternateLang, safePath);
  const xDefaultUrl = getLocalizedUrl("es", safePath);

  const siteUrl = getSiteUrl();
  const normalizedImagePath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  const ogImage = `${siteUrl}${normalizedImagePath}`;

  const ogLocale = getOgLocale(safeLang);
  const alternateLocale = getOgLocale(alternateLang);
  const robotsContent = getRobotsContent({ noindex });

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    inLanguage: safeLang,
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "BasCal",
      url: `${siteUrl}/`,
    },
  };

  const extraStructuredData = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  return (
    <Helmet>
      <html lang={safeLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang={safeLang} href={canonicalUrl} />
      <link rel="alternate" hrefLang={alternateLang} href={alternateUrl} />
      <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="BasCal" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      <script type="application/ld+json">{JSON.stringify(getOrganizationSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      {extraStructuredData.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHead;

