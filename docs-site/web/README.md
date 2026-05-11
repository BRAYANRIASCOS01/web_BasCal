# Docs Site (Iconos)

Sitio estático para documentar y descargar los íconos de `../icon`.

## Ejecutar local

Desde la raíz del repo:

```bash
node docs-site/web/generate-manifest.mjs
python3 -m http.server 5178 --directory docs-site --bind 127.0.0.1
```

Luego abre:

- `http://127.0.0.1:5178/web/`

## Actualizar íconos

- Agrega/edita archivos dentro de `docs-site/icon/`.
- Regenera el manifest: `node docs-site/web/generate-manifest.mjs`.

