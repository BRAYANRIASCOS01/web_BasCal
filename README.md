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
