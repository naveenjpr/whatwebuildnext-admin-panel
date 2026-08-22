# WhatWeBuildNext — Admin Panel

Admin UI for [What We Build Next](https://www.whatwebuildnext.com/) (WWBN): manage portfolio / case studies, team, skills, categories, testimonials, social links, and inquiries — with a dark, glass-style layout aligned to the marketing site.

---

## 🧰 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI Framework |
| [TypeScript](https://www.typescriptlang.org/) | ~6.0 | Type Safety |
| [Vite](https://vite.dev/) | 8 | Build Tool / Dev Server |
| [Tailwind CSS v4](https://tailwindcss.com/) | 4.x | Styling |
| [React Router](https://reactrouter.com/) | 7.x | Client-side Routing |
| [Redux Toolkit](https://redux-toolkit.js.org/) | 2.x | State Management |
| [Supabase](https://supabase.com/) | 2.x | Backend / Database |
| [Flowbite React](https://flowbite-react.com/) | 0.12 | UI Components |
| [Axios](https://axios-http.com/) | 1.x | HTTP Client |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | 11.x | Notifications |

---

## 📁 Project Structure

```
whatwebuild_admin_panel/
├── .env                          # Environment variables (Supabase keys)
├── .dockerignore                 # Docker build ignore rules
├── .gitignore
├── Dockerfile                    # Docker dev image (Node 20 Alpine)
├── docker-compose.yaml           # Docker Compose setup
├── index.html                    # HTML entry point
├── loading.tsx                   # Global loading component
├── package.json
├── vite.config.ts                # Vite + Tailwind + React config
├── vercel.json                   # Vercel deployment config
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
│
├── public/                       # Static public assets
│   ├── favicon.svg
│   └── icons.svg
│
├── utils/                        # Utility helpers
│   └── supabase.ts               # Supabase client initialization
│
└── src/
    ├── main.tsx                  # App entry: router setup
    ├── App.tsx                   # Root App component
    ├── App.css                   # App-level styles
    ├── index.css                 # Tailwind import + global styles
    ├── RootLayout.tsx            # Shell: Header + Sidebar + <Outlet />
    │
    ├── assets/                   # Static assets (images, SVGs)
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    │
    ├── common/                   # Shared layout components
    │   ├── Header.tsx            # Top bar, user menu (profile, settings, sign out)
    │   └── Sidebar.tsx           # Accordion navigation sidebar
    │
    ├── redux/                    # Global state management
    │   ├── adminslice.ts         # Admin auth/state slice
    │   └── store.ts              # Redux store configuration
    │
    └── Pages/                   # Feature pages
        ├── SimplePage.tsx
        ├── Categories/
        │   ├── Addcategories.tsx
        │   └── Viewcategories.tsx
        ├── Feedback/
        │   ├── AddFeedback.tsx
        │   └── ViewFeedback.tsx
        ├── Home/
        │   └── Home.tsx          # Dashboard
        ├── Inquiries/
        │   └── viewInquiries.tsx
        ├── Meet the Experts/
        │   ├── AddMeettheExperts.tsx
        │   └── ViewMeettheExperts.tsx
        ├── NotFoundPage/
        │   └── NotFoundPage.tsx
        ├── Portfolio/
        │   ├── AddPortfolio.tsx
        │   └── ViewPortfolio.tsx
        ├── Settings/
        │   └── Settings.tsx
        ├── Skills/
        │   ├── Addskills.tsx
        │   └── Viewskills.tsx
        ├── Socially_Engaged/
        │   ├── AddSociallyEngaged.tsx
        │   └── ViewSociallyEngaged.tsx
        ├── Yourprofile/
        │   └── profile.tsx
        └── login/
            └── Login.tsx
```

---

## 🚀 Getting Started

### Requirements

- Node.js 20+
- npm

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Production Build

```bash
npm run build
npm run preview
```

### 5. Lint

```bash
npm run lint
```

---

## 🐳 Docker Setup

This project is fully Dockerized for development.

### Files

| File | Purpose |
|---|---|
| `Dockerfile` | Node 20 Alpine image, runs `npm run dev` |
| `docker-compose.yaml` | Orchestrates container with hot reload & env vars |
| `.dockerignore` | Excludes `node_modules`, `dist`, `.env`, etc. |

### Run with Docker Compose

```bash
# Build and start (first time)
docker-compose up --build

# Start (after first time)
docker-compose up

# Stop
docker-compose down
```

App will be available at `http://localhost:5173`

### Docker Hub Image

```
naveensainijpr/whatwebuild_admin_panel:latest
```

Pull and run directly:

```bash
docker pull naveensainijpr/whatwebuild_admin_panel:latest
docker run -p 5173:5173 --env-file .env naveensainijpr/whatwebuild_admin_panel:latest
```

---

## 🗺️ Routes Overview

Most pages use `RootLayout` (Header + Sidebar). `/login` is standalone.

| Route | Page | Description |
|---|---|---|
| `/` | Home | Dashboard |
| `/login` | Login | Admin Sign In |
| `/profile` | Your Profile | Admin profile page |
| `/settings` | Settings | App settings |
| `/portfolio/add` | Add Portfolio | Add case study |
| `/portfolio/view` | View Portfolio | List all portfolio items |
| `/team/add` | Add Expert | Add team member |
| `/team/view` | View Experts | List team members |
| `/skills/add` | Add Skill | Add tech skill |
| `/skills/view` | View Skills | List all skills |
| `/categories/add` | Add Category | Add category |
| `/categories/view` | View Categories | List categories |
| `/testimonials/add` | Add Feedback | Add testimonial |
| `/testimonials/view` | View Feedback | List testimonials |
| `/socially-engaged/add` | Add Social Link | Add social entry |
| `/socially-engaged/view` | View Social Links | List social entries |
| `/messages` | Inquiries | View contact inquiries |
| `*` | 404 | Not Found page |

---

## 🌐 Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable (anon) key |

> ⚠️ Never commit your `.env` file to version control. It is already listed in `.gitignore` and `.dockerignore`.

---

## 📦 Static Assets

Place images referenced by the admin UI under **`public/`** so URLs like `/images/example.png` resolve correctly at runtime.

---

## 🚢 Deployment

This project is configured for **Vercel** deployment via `vercel.json`.

For Docker-based deployment, use the Docker Hub image:
```
naveensainijpr/whatwebuild_admin_panel:latest
```

---

## 📄 License

Private project unless stated otherwise by the repository owner.
