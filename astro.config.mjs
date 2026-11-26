import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zutizi.blog',
  output: 'static',
  build: {
    format: 'file'
  },
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap({
      filter: (page) => !page.includes('/404')
    })
  ]
});
