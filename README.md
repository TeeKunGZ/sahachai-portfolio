# Sahachai Siribanjerdsak - CV & Portfolio

Personal CV/portfolio site built with **Vue 3 + Vite + Tailwind CSS**, deployed on Vercel.

> Oracle Development Supervisor with 6+ years of Oracle ERP and PL/SQL
> experience modernizing workflows, tuning enterprise systems, and delivering
> automation for manufacturing operations.

## Features

- **Single-page CV layout** with sticky navbar, smooth scrolling, and section highlighting
- **Command palette** (`Ctrl+K`) for keyboard-first navigation and quick actions
- **Dark / light mode** persisted to `localStorage`, with no flash on load
- **Portfolio tech filter** for case studies by stack
- **Featured case studies** for Oracle ERP modernization, dashboards, automation, and workflow tools
- **Scroll-reveal animations**, count-up stat counters, and a reading progress bar that respect `prefers-reduced-motion`
- **SEO metadata and JSON-LD** structured data for a professional CV profile

## Architecture

All content lives in plain data modules, so updating the CV does not require touching UI code:

```text
src/
  data/            # profile, skills, experience, projects, education
  components/      # section components + nav, palette, footer, utility UI
  composables/     # theme, command palette, GitHub repo metadata
  directives/      # v-reveal scroll animation
  assets/          # Tailwind entry point
```

Editing content = edit a file in `src/data/`, commit, push, and let Vercel redeploy.

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Privacy by design

The public page intentionally exposes only email, LinkedIn, GitHub, and city-level location.
Full contact details are available only inside the downloadable PDF resume.

## Stack

Vue 3 (Composition API) / Vite / Tailwind CSS / lucide-vue-next / Vercel
