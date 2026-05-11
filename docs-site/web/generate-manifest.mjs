import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_ROOT = path.resolve(__dirname, "../icon");
const OUTPUT_FILE = path.resolve(__dirname, "./manifest.json");

const ALLOWED_EXTENSIONS = new Set(["svg", "png", "webp", "jpg", "jpeg"]);

const slugify = (value) =>
  String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const toPosixPath = (value) => value.split(path.sep).join("/");

const listFilesRecursive = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const absPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await listFilesRecursive(absPath)));
      continue;
    }
    if (entry.isFile()) results.push(absPath);
  }

  return results;
};

const buildIconEntry = (fileAbsPath) => {
  const relFromIconsRoot = path.relative(ICONS_ROOT, fileAbsPath);
  const group = toPosixPath(path.dirname(relFromIconsRoot));
  const fileName = path.basename(fileAbsPath);
  const ext = path.extname(fileName).slice(1).toLowerCase();
  const baseName = path.basename(fileName, path.extname(fileName));

  const relFromWebDir = toPosixPath(path.relative(__dirname, fileAbsPath));

  return {
    id: slugify(`${group}/${baseName}`),
    name: baseName,
    fileName,
    group: group === "." ? "" : group,
    ext,
    path: relFromWebDir,
  };
};

const main = async () => {
  const allFiles = await listFilesRecursive(ICONS_ROOT);
  const icons = allFiles
    .filter((fileAbsPath) => {
      const ext = path.extname(fileAbsPath).slice(1).toLowerCase();
      return ALLOWED_EXTENSIONS.has(ext);
    })
    .map(buildIconEntry)
    .sort((a, b) => {
      const byGroup = (a.group || "").localeCompare(b.group || "", "es");
      if (byGroup !== 0) return byGroup;
      return a.fileName.localeCompare(b.fileName, "es");
    });

  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    icons,
  };

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(payload, null, 2) + "\n", "utf8");
  // eslint-disable-next-line no-console
  console.log(`Manifest generado: ${path.relative(process.cwd(), OUTPUT_FILE)} (${icons.length} íconos)`);
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
});

