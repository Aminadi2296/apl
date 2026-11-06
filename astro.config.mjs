import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://autosparalatinos.com', // TODO: confirmar dominio real
  trailingSlash: 'always',
  integrations: [sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-US', en: 'en-US' } } })],
  vite: { plugins: [tailwindcss()] },
});
