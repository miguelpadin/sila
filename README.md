# Sila Padín Studio — Website

[![Astro](https://img.shields.io/badge/Astro-6.2.2-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build) [![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org) [![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

Photography portfolio and brand website for [Sila Padín Studio](https://www.silapadin.com), a photographer based in Galicia, Spain, specialising in editorial, maternity, portrait, lifestyle, and wedding photography.

The site is built as a fast static experience with a strong editorial feel: image-led pages, service and portfolio routes, legal/privacy content, SEO metadata per page, accessible navigation patterns, and a consent-based analytics flow.

## Tech stack

- [Astro 6.2.2](https://astro.build) — static site generation, file-based routing, shared layouts, and componentized page structure.
- [TypeScript 6.0.3](https://www.typescriptlang.org) — type checking through `astro check` before production builds.
- Vanilla CSS — custom properties, responsive layouts, reduced-motion support, focus states, and project-wide styling in `src/styles/global.css`.
- Vanilla JavaScript — mobile navigation, reveal animations, portfolio filters, current-year rendering, and cookie consent handling in `public/main.js`.
- [Vercel](https://vercel.com) — static hosting for the generated `dist/` output, with the production domain redirect configured in `vercel.json`.
- Release automation — Release Please is configured for Conventional Commits, changelog updates, SemVer tags, and GitHub Releases.

## Project focus

- **SEO:** shared metadata in `BaseLayout`, canonical URLs, `hreflang`, robots directives, Google Search Console verification, Open Graph, Twitter cards, JSON-LD structured data, `sitemap.xml`, and `robots.txt`.
- **Accessibility:** Spanish document language, skip link, labelled navigation, `aria-current`, menu state with `aria-expanded`, visible focus styles, screen-reader-only status updates, live regions, and reduced-motion fallbacks.
- **Performance:** static output, WebP image assets, preconnected font origins, direct asset references, and HTML kept readable with `compressHTML: false`.
- **Privacy:** cookie banner with explicit accept/reject actions; Google Analytics loads only after consent is accepted.
- **Deployment:** Vercel builds with `pnpm build`, serves `dist/`, and redirects `sila-fawn.vercel.app` to `www.silapadin.com` with a 301.

## Project structure

```
src/
  components/     # Header, Footer, CookieBanner
  layouts/        # BaseLayout (shared HTML shell, SEO meta tags)
  pages/          # One .astro file per route
  styles/         # global.css
public/
  assets/         # Images (WebP), favicon, brand assets
  sitemap.xml
  robots.txt
```

## Development

```bash
pnpm install
pnpm dev        # starts dev server at http://localhost:3000
pnpm build      # production build → dist/
pnpm preview    # preview the production build locally
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/portafolio.html` | Portfolio gallery |
| `/servicios.html` | Services |
| `/historias.html` | Stories / weddings |
| `/sobre-mi.html` | About |
| `/contacto.html` | Contact |
| `/aviso-legal.html` | Legal notice |
| `/politica-de-cookies.html` | Cookie policy |
| `/politica-de-privacidad.html` | Privacy policy |

## Deployment

Vercel detects Astro automatically and runs `pnpm build` on every push to `main`. The `dist/` folder is served as the site root. The domain `sila-fawn.vercel.app` redirects to `www.silapadin.com` via a 301 configured in `vercel.json`.
