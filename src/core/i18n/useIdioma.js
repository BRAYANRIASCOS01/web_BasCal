import { useLocation } from "react-router-dom";
import { getDict } from "./i18n";
import { normalizeLang, switchLangPath } from "./routes";

/**
 * Hook central de idioma.
 * - Detecta idioma desde la URL (/es o /en)
 * - Devuelve el diccionario correcto
 * - Calcula la URL equivalente para cambiar idioma
 */
export function useIdioma() {
  const { pathname } = useLocation();

  // 1. Obtener idioma desde la URL
  const lang = normalizeLang(
    pathname.split("/").filter(Boolean)[0] || "es"
  );

  // 2. Cargar diccionario del idioma actual
  const dict = getDict(lang);

  // 3. Calcular idioma alternativo
  const otherLang = lang === "es" ? "en" : "es";

  // 4. Construir URL equivalente en el otro idioma
  const switchTo = switchLangPath(pathname, otherLang);

  return {
    lang,
    dict,
    otherLang,
    switchTo
  };
}
