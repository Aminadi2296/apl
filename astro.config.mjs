import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://autosparalatinos.com', // TODO: confirmar dominio real
  trailingSlash: 'always',
  // Las páginas siguen siendo estáticas; solo /api/* (prerender = false) corre como función en Vercel.
  adapter: vercel(),
  integrations: [sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-US', en: 'en-US' } } })],
  vite: { plugins: [tailwindcss()] },
});
