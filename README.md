# Sahachai Siribanjerdsak — CV & Portfolio

Personal CV/portfolio site built with **Vue 3 + Vite + Tailwind CSS**, deployed on Vercel.

> Oracle Development Supervisor with 6+ years of experience in Oracle application
> development, PL/SQL programming, business analysis, and enterprise system support.

## Features

- **Single-page layout** with sticky navbar, smooth scrolling, and scroll-spy section highlighting
- **Command palette** (`Ctrl+K`) — keyboard-first navigation and quick actions (download CV, email, LinkedIn, theme toggle)
- **Dark / light mode** — persisted to `localStorage`, defaults to the OS color scheme, no flash on load
- **Portfolio tech filter** — filter case studies by stack with animated `TransitionGroup` reflow
- **Live GitHub stats** — cards linked to a public repo fetch language, stars, and last-push time from the GitHub API at runtime (session-cached, silent fallback when unavailable)
- **Scroll-reveal animations** via a custom `v-reveal` directive (IntersectionObserver with an in-viewport failsafe), count-up stat counters, and a reading progress bar — all respecting `prefers-reduced-motion`
- **SEO-ready** — Open Graph tags and JSON-LD (`schema.org/Person`) structured data

## Architecture

All content lives in plain data modules — updating the site never requires touching UI code:

```
src/
├── data/            # content only: profile, skills, experience, projects, education
├── components/      # one component per section + NavBar, CommandPalette, BackToTop
├── composables/     # useTheme (dark mode), useCommandPalette (shared state)
├── directives/      # v-reveal scroll animation
└── assets/          # Tailwind entry point
```

Editing content = edit a file in `src/data/`, commit, push — Vercel redeploys automatically.

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Privacy by design

The public page intentionally exposes only email, LinkedIn, and city-level location.
Full contact details are available only inside the downloadable PDF resume.

## Stack

Vue 3 (Composition API) · Vite · Tailwind CSS · lucide-vue-next · Vercel
