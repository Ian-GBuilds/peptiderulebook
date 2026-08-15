// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://peptiderulebook.com',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const noindex = [
          '/search',
          '/jurisdictions/california',
          '/authors/regulatory-reviewer',
        ];
        const pathname = new URL(page).pathname.replace(/\/$/, '');
        return !noindex.some((p) => pathname === p || pathname.startsWith(p + '/'));
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
