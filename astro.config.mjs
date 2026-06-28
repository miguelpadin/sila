import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.silapadin.com',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
});
