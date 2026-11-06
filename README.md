# Autos para Latinos

Astro 5 + Tailwind 4. Sitio bilingüe (ES en `/`, EN en `/en/`).

## Comandos
    npm install
    npm run dev       # http://localhost:4321
    npm run build     # genera /dist

## Dónde cambiar cosas
- `src/data/site.ts`  → teléfono, dirección, horarios, redes, video del hero (`public/video/hero.mp4`)
- `src/data/cars.json` → inventario (datos de ejemplo)
- `src/components/CarCard.astro` → tarjeta de auto reutilizable
- `src/i18n/ui.ts` → todos los textos ES/EN, rutas y SEO por página
- `src/styles/global.css` → colores (#FF5804 naranja, #16232A azul oscuro)

## Pendiente antes de publicar
- Formularios en MODO PRUEBA: definir destino y poner `PUBLIC_FORM_ENDPOINT` en `.env`. No enviar SSN/ITIN sin cifrado.
- Logo real, video, fotos de autos, og-image.jpg (1200x630) en `/public`.
- Descargar banderas a `/public/flags/` (ahora usan flagcdn.com).
- Confirmar dominio en `astro.config.mjs` y `robots.txt`.
- Pegar GTM/GA4/Google Ads en `src/layouts/Layout.astro` (hay un TODO).
