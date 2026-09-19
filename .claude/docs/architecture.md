# Architecture

> Partially auto-generated. Fill in sections marked with `<!-- TODO -->`.

## Project Overview

- **Name**: portfolio-website
- **Type**: React SPA (Vite), no backend
- **Repo**: git@github.com:yaz231/portfolio-website.git

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite 7, Tailwind CSS 3, no router (single page, in-page scroll) |
| Backend | None |
| Database | None |
| Storage | Static assets in `src/assets/` and `public/` |
| Auth | None |
| Deployment | Vercel, static build (`vite build`); GitHub is source of truth |

## Data Flow

```
User → App.jsx (single page) → Web3Forms API (contact form POST) → email to owner
```
All other content (projects, work highlights, resume PDF) is static, bundled at build time.

## Key Directories

| Path | Purpose |
|------|---------|
| `src/App.jsx` | Nearly all UI: hero, projects, about, resume, contact sections and their data |
| `src/components/` | Shared UI components (VoCDiagram, ExpandableGallery) |
| `src/hooks/` | `useDarkMode`, `useActiveSection` |
| `src/utils/` | `techColors` static config |
| `public/Resume.pdf` | Served resume file, linked/downloaded from Resume section |

## External Services & Env Vars

| Service | Env Var | Purpose |
|---------|---------|---------|
| Web3Forms | none (access key hardcoded in `App.jsx`) | Contact form submission |

## Known Gotchas
- Contact form access key is hardcoded client-side in `App.jsx`; this is expected for Web3Forms (public key by design).

## Change Log

<!-- Optional: brief log of major structural changes -->
| Date | Change |
|------|--------|
| portfolio-website init | Initial doc generation |
