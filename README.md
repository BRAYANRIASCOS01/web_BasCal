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

## Lineamientos

- Mantener enfoque de clean code en toda implementación.
- Priorizar siempre SEO profesional (metadatos, accesibilidad, semántica, performance).

## SEO (produccion)

- Definir `VITE_SITE_URL` con el dominio canonico real (ejemplo: `https://bascal.com`).
- Definir `VITE_ALLOW_INDEXING=true` para publicar `robots.txt` indexable.
- Ejecutar `npm run build` (incluye `npm run seo:generate` para regenerar `public/robots.txt` y `public/sitemap.xml`).
