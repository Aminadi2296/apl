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

## Formularios y correo (Resend)
- El formulario de **contacto** envía a `/api/lead/` (`src/pages/api/lead.ts`), una función de Vercel que manda el correo con Resend. El resto del sitio sigue siendo estático.
- Variables (en `.env` local y en Vercel → Settings → Environment Variables): `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL`. Ver `.env.example`.
- Sin dominio verificado, el remitente es `onboarding@resend.dev` y Resend solo entrega al correo dueño de la cuenta.
- Para conectar pre-calificación o solicitud: agregar el formulario en el objeto `forms` de `lead.ts` (solo campos permitidos) y cambiar su `data-endpoint` a `site.leadEndpoint`.

## Pendiente antes de publicar
- Verificar el dominio en Resend y poner `LEADS_FROM_EMAIL=Autos para Latinos <no-reply@dominio>`.
- Pre-calificación y solicitud en MODO PRUEBA: definir destino con el cliente. No enviar SSN/ITIN por correo ni sin cifrado.
- Logo real, video, fotos de autos, og-image.jpg (1200x630) en `/public`.
- Descargar banderas a `/public/flags/` (ahora usan flagcdn.com).
- Confirmar dominio en `astro.config.mjs` y `robots.txt`.
- Pegar GTM/GA4/Google Ads en `src/layouts/Layout.astro` (hay un TODO).
