# Sila Padín Studio — Website

Photography portfolio and brand website for [Sila Padín Studio](https://www.silapadin.com), a photographer based in Galicia, Spain, specialising in editorial, maternity, portrait, lifestyle, and wedding photography.

## Tech stack

- [Astro](https://astro.build) — static site generator
- Vanilla CSS with CSS custom properties
- Deployed on [Vercel](https://vercel.com)

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
