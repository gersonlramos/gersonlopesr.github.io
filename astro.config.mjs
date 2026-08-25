// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://gersonlramos.github.io',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('404') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
