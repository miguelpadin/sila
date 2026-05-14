import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.silapadin.com',
  output: 'static',
  compressHTML: false,
  build: {
    format: 'file',
  },
});
