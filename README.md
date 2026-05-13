# WhatWeBuildNext — Admin Panel

Admin UI for [What We Build Next](https://www.whatwebuildnext.com/) (WWBN): manage portfolio / case studies, team, skills, categories, testimonials, social links, and inquiries — with a dark, glass-style layout aligned to the marketing site.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`, `@import "tailwindcss"` in `src/index.css`)
- [React Router](https://reactrouter.com/) (`react-router-dom`)
- Optional: [Flowbite React](https://flowbite-react.com/), [Axios](https://axios-http.com/), [React Toastify](https://fkhadra.github.io/react-toastify/)

## Getting started

### Requirements

- Node.js 18+ (recommended: current LTS)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project structure (high level)

| Path | Purpose |
|------|---------|
| `src/main.tsx` | App entry: router |
| `src/RootLayout.tsx` | Shell: header + sidebar + `<Outlet />` |
| `src/common/Header.tsx` | Top bar, user menu (profile, settings, sign out) |
| `src/common/Sidebar.tsx` | Accordion nav |
| `src/Pages/` | Feature pages (Dashboard, Portfolio, Team, etc.) |
| `src/index.css` | Tailwind import + global styles |

## Routes (overview)

Most pages use `RootLayout` (header + sidebar). `/login` is standalone (no admin chrome).

| Route | Description |
|-------|-------------|
| `/` | Dashboard (Home) |
| `/login` | Sign in |
| `/profile` | Your profile |
| `/settings` | Settings |
| `/portfolio/add`, `/portfolio/view` | Case studies / portfolio |
| `/team/add`, `/team/view` | Team (experts) |
| `/skills/add`, `/skills/view` | Tech stack / skills |
| `/categories/add`, `/categories/view` | Categories |
| `/testimonials/add`, `/testimonials/view` | Feedback / testimonials |
| `/socially-engaged/add`, `/socially-engaged/view` | Social links |
| `/messages` | Inquiries (placeholder until API wired) |

Wildcard `*` shows the not-found page for unknown paths under the layout.

## Static assets

Place images referenced by the admin UI under **`public/`** (e.g. `public/images/...`) so URLs like `/images/dronetv.png` resolve correctly.

## Environment

Copy or create env files as needed for API base URLs (e.g. `.env` / `.env.local`). Vite exposes variables prefixed with `VITE_`.

## License

Private project unless stated otherwise by the repository owner.
