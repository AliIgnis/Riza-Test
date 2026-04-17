# Continuous-Next — Riza Sahin

Professional freelancer showcase site for **Riza Sahin**, founder of **Continuous-Next**. Built with Angular. Bilingual (EN/DE), dark mode, deployed to GitHub Pages.

> **Live demo:** _(fill in URL once deployed)_

## Tech Stack

- **Angular 18** (standalone components, OnPush change detection, SCSS)
- **TypeScript** (strict mode)
- **@ngx-translate/core** + **@ngx-translate/http-loader** for i18n
- **Docker** (multi-stage build, nginx)
- **GitHub Actions** → GitHub Pages

## Features

- Bilingual (EN / DE) with browser detection + localStorage persistence
- Light / dark theme with system preference fallback
- Fully responsive (mobile-first)
- Animated scroll-triggered fade-ins (respects `prefers-reduced-motion`)
- Collapsible project timeline with keyboard navigation
- Animated key-figure counters on scroll
- Docker-ready with gzip + security headers via nginx
- Accessible (WCAG AA — semantic HTML, ARIA, keyboard paths, focus styles)
- Modern GitHub Pages CI/CD (no peaceiris branch shuffling)

## Quick Start

```bash
cd continuous-next
npm install
npm start          # → http://localhost:4200
```

Production build:

```bash
npm run build
```

Output lands in `dist/continuous-next/browser`.

## Docker

```bash
docker build -t continuous-next .
docker run -p 8080:80 continuous-next
# → http://localhost:8080
```

## Deployment (GitHub Pages)

The workflow at `.github/workflows/deploy.yml` builds on every push to `main` and publishes to GitHub Pages via the modern `actions/deploy-pages` action.

1. Push to `main`.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. The workflow auto-derives `--base-href=/<repo-name>/` from the repository name.

No `gh-pages` branch needed.

## Customization

All identity, copy, and data live in two places:

- **`src/app/constants/app.constants.ts`** — owner name, company, email, phone, key figures, project date ranges, feature flags, animation timings, and layout constants.
- **`src/assets/i18n/en.json`** + **`src/assets/i18n/de.json`** — all visible text, with `{{name}}`, `{{company}}`, `{{years}}`-style interpolation for values injected from constants.

To rebrand or repurpose:

1. Change `OWNER_NAME`, `COMPANY_NAME`, `OWNER_EMAIL`, `OWNER_PHONE` in `app.constants.ts`.
2. Update the `EXPERIENCE_PROJECTS` array (IDs + date ranges) and matching entries in the translation files.
3. Adjust key-figure constants (`YEARS_OF_EXPERIENCE`, `PRODUCT_TEAMS_ONBOARDED`, etc).
4. Update certifications, tools, and language proficiencies in the data arrays inside `components/skills-tech/skills-tech.component.ts`.
5. Tweak colors and typography in `src/styles/_variables.scss` and the `:root` / `[data-theme="dark"]` blocks in `src/styles/styles.scss`.

## Project Structure

```
continuous-next/
├── src/
│   ├── app/
│   │   ├── components/       # hero, about, expertise, key-figures, experience, clients, skills-tech, contact, navbar, footer
│   │   ├── directives/       # fade-in directive (IntersectionObserver)
│   │   ├── services/         # theme + scroll services
│   │   ├── models/           # typed interfaces
│   │   ├── constants/        # single source of truth for identity + data shape
│   │   ├── app.component.ts
│   │   └── app.config.ts
│   ├── assets/
│   │   ├── i18n/             # en.json, de.json
│   │   └── images/
│   ├── styles/               # _variables, _mixins, _animations, styles.scss
│   └── environments/
├── Dockerfile
├── nginx.conf
├── angular.json
└── README.md
```

## Code Quality

- Single source of truth for identity (`OWNER_NAME`, `COMPANY_NAME`, `OWNER_EMAIL`) — never duplicated into translations.
- No magic numbers: all layout constants, animation timings, breakpoints, and data values live in `app.constants.ts` or `_variables.scss`.
- Standalone components, `OnPush` change detection, signals for local state.
- CSS custom properties for themeable colors — raw SCSS vars never used in component styles.
- BEM naming convention throughout component SCSS.
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<time>`, `<address>`, `<footer>`.
- ARIA labels on every interactive control; `aria-expanded` + `aria-controls` on collapsible panels.
- `prefers-reduced-motion` disables all animations, counters, and theme transitions.

## License

MIT
