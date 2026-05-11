const MANIFEST_URL = "./manifest.json";

const $ = (selector, root = document) => root.querySelector(selector);

const normalizeQuery = (value) =>
  String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const debounce = (fn, waitMs) => {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), waitMs);
  };
};

const ensureLeadingDot = (ext) => (ext.startsWith(".") ? ext : `.${ext}`);

const safeUrl = (rawUrl) => encodeURI(rawUrl);

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

const fetchBlob = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No se pudo cargar: ${response.status} ${response.statusText}`);
  return response.blob();
};

const fetchText = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No se pudo cargar: ${response.status} ${response.statusText}`);
  return response.text();
};

const parseViewBox = (svgText) => {
  const match = svgText.match(/\bviewBox\s*=\s*"[^"]*?(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)"/i);
  if (!match) return null;
  const width = Number(match[3]);
  const height = Number(match[4]);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return null;
  return { width, height };
};

const imageFromUrl = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("No se pudo cargar la imagen para convertirla."));
    img.src = url;
  });

const canvasToPngBlob = (canvas) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("No se pudo generar PNG."))), "image/png");
  });

const svgUrlToPngBlob = async (svgUrl, { sizePx }) => {
  const svgText = await fetchText(svgUrl);
  const viewBox = parseViewBox(svgText);

  const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
  const svgObjectUrl = URL.createObjectURL(svgBlob);

  try {
    const img = await imageFromUrl(svgObjectUrl);
    const sourceWidth = viewBox?.width || img.naturalWidth || sizePx;
    const sourceHeight = viewBox?.height || img.naturalHeight || sizePx;
    const scale = sizePx / Math.max(sourceWidth, sourceHeight);
    const width = Math.max(1, Math.round(sourceWidth * scale));
    const height = Math.max(1, Math.round(sourceHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("Canvas no disponible.");
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    return await canvasToPngBlob(canvas);
  } finally {
    URL.revokeObjectURL(svgObjectUrl);
  }
};

const rasterUrlToPngBlob = async (assetUrl, { sizePx }) => {
  const blob = await fetchBlob(assetUrl);
  const objectUrl = URL.createObjectURL(blob);

  try {
    const img = await imageFromUrl(objectUrl);
    const sourceWidth = img.naturalWidth || sizePx;
    const sourceHeight = img.naturalHeight || sizePx;
    const scale = sizePx / Math.max(sourceWidth, sourceHeight);
    const width = Math.max(1, Math.round(sourceWidth * scale));
    const height = Math.max(1, Math.round(sourceHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("Canvas no disponible.");
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    return await canvasToPngBlob(canvas);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

class IconRepository {
  constructor(manifestUrl) {
    this.manifestUrl = manifestUrl;
  }

  async load() {
    const response = await fetch(this.manifestUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Manifest no disponible (${response.status}).`);
    const payload = await response.json();
    const icons = Array.isArray(payload?.icons) ? payload.icons : [];

    return {
      generatedAt: payload?.generatedAt ?? null,
      icons,
    };
  }
}

class DownloadService {
  async downloadSvg(icon) {
    if (icon.ext !== "svg") throw new Error("Este ícono no tiene SVG como formato origen.");
    const srcUrl = safeUrl(icon.path);
    const blob = await fetchBlob(srcUrl);
    downloadBlob(blob, `${icon.name}${ensureLeadingDot("svg")}`);
  }

  async downloadPng(icon, { sizePx }) {
    const srcUrl = safeUrl(icon.path);

    if (icon.ext === "png") {
      const blob = await fetchBlob(srcUrl);
      downloadBlob(blob, `${icon.name}${ensureLeadingDot("png")}`);
      return;
    }

    if (icon.ext === "svg") {
      const pngBlob = await svgUrlToPngBlob(srcUrl, { sizePx });
      downloadBlob(pngBlob, `${icon.name}${ensureLeadingDot("png")}`);
      return;
    }

    const pngBlob = await rasterUrlToPngBlob(srcUrl, { sizePx });
    downloadBlob(pngBlob, `${icon.name}${ensureLeadingDot("png")}`);
  }
}

const dom = {
  manifestStatus: $("#manifestStatus"),
  searchInput: $("#searchInput"),
  groupSelect: $("#groupSelect"),
  formatSelect: $("#formatSelect"),
  pngSizeSelect: $("#pngSizeSelect"),
  resetBtn: $("#resetBtn"),
  resultsCount: $("#resultsCount"),
  resultsHint: $("#resultsHint"),
  grid: $("#grid"),
  template: $("#iconCardTemplate"),
};

const state = {
  allIcons: [],
  filteredIcons: [],
  query: "",
  group: "all",
  format: "all",
  pngSize: Number(dom.pngSizeSelect?.value ?? 256),
};

const setBadge = (text, { tone = "neutral" } = {}) => {
  dom.manifestStatus.textContent = text;
  dom.manifestStatus.dataset.tone = tone;
  dom.manifestStatus.style.borderColor =
    tone === "danger"
      ? "rgba(255, 107, 107, 0.55)"
      : tone === "success"
        ? "rgba(140, 255, 191, 0.55)"
        : "var(--color-border)";
};

const buildGroupOptions = (icons) => {
  const groups = Array.from(new Set(icons.map((icon) => icon.group).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "es")
  );

  for (const group of groups) {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = group;
    dom.groupSelect.appendChild(option);
  }
};

const matchesFilters = (icon) => {
  if (state.group !== "all" && icon.group !== state.group) return false;
  if (state.format !== "all" && icon.ext !== state.format) return false;
  if (!state.query) return true;

  const q = normalizeQuery(state.query);
  const haystack = normalizeQuery(`${icon.name} ${icon.fileName} ${icon.group} ${icon.path}`);
  return haystack.includes(q);
};

const applyFilters = () => {
  state.filteredIcons = state.allIcons.filter(matchesFilters);
};

const updateSummary = () => {
  dom.resultsCount.textContent = String(state.filteredIcons.length);

  const parts = [];
  if (state.group !== "all") parts.push(`Ubicación: ${state.group}`);
  if (state.format !== "all") parts.push(`Formato: ${state.format.toUpperCase()}`);
  if (state.query) parts.push(`Buscar: “${state.query}”`);
  dom.resultsHint.textContent = parts.join(" · ");
};

const createCard = (icon, { downloadService }) => {
  const fragment = dom.template.content.cloneNode(true);
  const card = fragment.querySelector(".card");
  const img = fragment.querySelector(".card__img");
  const nameEl = fragment.querySelector(".card__name");
  const pathEl = fragment.querySelector(".card__path");
  const formatEl = fragment.querySelector(".card__format");
  const svgBtn = fragment.querySelector(".js-download-svg");
  const pngBtn = fragment.querySelector(".js-download-png");
  const noteEl = fragment.querySelector(".js-note");

  const encodedSrc = safeUrl(icon.path);
  img.src = encodedSrc;

  nameEl.textContent = icon.name;
  pathEl.textContent = icon.group ? `${icon.group}/${icon.fileName}` : icon.fileName;
  formatEl.textContent = icon.ext.toUpperCase();

  svgBtn.disabled = icon.ext !== "svg";
  svgBtn.title = icon.ext === "svg" ? "Descargar SVG" : "No disponible";
  pngBtn.title = "Descargar PNG";

  const setNote = (value, { tone = "neutral" } = {}) => {
    noteEl.textContent = value ?? "";
    noteEl.style.color = tone === "danger" ? "var(--danger)" : "var(--muted)";
  };

  svgBtn.addEventListener("click", async () => {
    try {
      setNote("Descargando SVG…");
      await downloadService.downloadSvg(icon);
      setNote("SVG listo.", { tone: "success" });
    } catch (error) {
      setNote(error?.message ?? "Error al descargar SVG.", { tone: "danger" });
    }
  });

  pngBtn.addEventListener("click", async () => {
    try {
      setNote("Preparando PNG…");
      await downloadService.downloadPng(icon, { sizePx: state.pngSize });
      setNote("PNG listo.", { tone: "success" });
    } catch (error) {
      setNote(error?.message ?? "Error al descargar PNG.", { tone: "danger" });
    }
  });

  card.dataset.iconId = icon.id;
  return fragment;
};

const renderGrid = ({ downloadService }) => {
  dom.grid.innerHTML = "";

  const fragment = document.createDocumentFragment();
  for (const icon of state.filteredIcons) {
    fragment.appendChild(createCard(icon, { downloadService }));
  }
  dom.grid.appendChild(fragment);
};

const resetFilters = () => {
  state.query = "";
  state.group = "all";
  state.format = "all";
  state.pngSize = Number(dom.pngSizeSelect.value ?? 256);

  dom.searchInput.value = "";
  dom.groupSelect.value = "all";
  dom.formatSelect.value = "all";
  dom.pngSizeSelect.value = String(state.pngSize);
};

const wireEvents = ({ downloadService }) => {
  const rerender = () => {
    applyFilters();
    updateSummary();
    renderGrid({ downloadService });
  };

  dom.searchInput.addEventListener(
    "input",
    debounce(() => {
      state.query = dom.searchInput.value;
      rerender();
    }, 120)
  );

  dom.groupSelect.addEventListener("change", () => {
    state.group = dom.groupSelect.value;
    rerender();
  });

  dom.formatSelect.addEventListener("change", () => {
    state.format = dom.formatSelect.value;
    rerender();
  });

  dom.pngSizeSelect.addEventListener("change", () => {
    state.pngSize = Number(dom.pngSizeSelect.value);
    updateSummary();
  });

  dom.resetBtn.addEventListener("click", () => {
    resetFilters();
    rerender();
  });
};

const main = async () => {
  const repository = new IconRepository(MANIFEST_URL);
  const downloadService = new DownloadService();

  try {
    setBadge("Cargando manifest…");
    const { icons, generatedAt } = await repository.load();
    state.allIcons = icons;
    buildGroupOptions(state.allIcons);

    applyFilters();
    updateSummary();
    renderGrid({ downloadService });
    wireEvents({ downloadService });

    const suffix = generatedAt ? ` · ${new Date(generatedAt).toLocaleString()}` : "";
    setBadge(`OK (${icons.length})${suffix}`, { tone: "success" });
  } catch (error) {
    setBadge("Error al cargar", { tone: "danger" });
    dom.resultsHint.textContent = error?.message ?? "No se pudo iniciar la app.";
  }
};

main();
