export function normalizeLang(value) {
  const v = String(value || "").toLowerCase();
  return v === "en" ? "en" : "es";
}

export function switchLangPath(pathname, nextLang) {
  const lang = normalizeLang(nextLang);
  const parts = String(pathname || "/").split("/").filter(Boolean);

  // / -> /es
  if (parts.length === 0) return `/${lang}`;

  const hasLangPrefix = parts[0] === "es" || parts[0] === "en";

  if (hasLangPrefix) {
    parts[0] = lang;
    return "/" + parts.join("/");
  }

  // si no tenía prefijo, lo agrega
  return "/" + [lang, ...parts].join("/");
}
