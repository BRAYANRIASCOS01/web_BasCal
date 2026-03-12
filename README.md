# BasCal — Arquitectura de carpetas

Solo estructura, sin código implementado todavía.

```
.
├─ public/          # estáticos sin build (favicons, imágenes globales)
├─ src/             # código de la app
│  ├─ app/          # providers, rutas (pendiente)
│  ├─ core/         # config y servicios base (env, http, Cloudinary)
│  ├─ shared/       # UI y hooks reutilizables
│  ├─ features/     # módulos 
│  ├─ assets/       # imágenes/íconos locales mínimos
│  └─ styles/       # estilos globales
├─ index.html       # punto de entrada HTML y metadatos base
└─ package.json     # scripts de Vite y dependencias
```

## SEO técnico (programación)

El proyecto aplica SEO por página desde React (`react-helmet-async`) y además genera:

- `public/robots.txt`
- `public/sitemap.xml`

con el script:

```bash
npm run seo:generate
```

Variables de entorno recomendadas:

- `VITE_SITE_URL=https://tu-dominio.com`
- `VITE_ALLOW_INDEXING=true` en producción
- `VITE_ALLOW_INDEXING=false` en staging/previews

Build:

```bash
npm run build
```

## Lineamientos

- Mantener enfoque de clean code en toda implementación.
- Priorizar siempre SEO profesional (metadatos, accesibilidad, semántica, performance).
