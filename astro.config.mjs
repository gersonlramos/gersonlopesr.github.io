// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL || 'https://gersonlramos.github.io';
const base = process.env.BASE_PATH === ''
  ? undefined
  : (process.env.BASE_PATH ?? '/gersonlopesr.github.io');

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('404') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
