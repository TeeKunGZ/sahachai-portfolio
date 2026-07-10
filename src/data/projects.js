// Portfolio case studies. Written confidentiality-safe: no internal data,
// screenshots, or live company systems. Fill in the placeholder fields
// (impact numbers, links) as they become available.
//
// Shape of each entry:
//   title      — generic, non-confidential system name
//   context    — one line: where/why this was built
//   role       — your role on the project
//   duration   — how long it ran / has been running
//   problem    — the business problem it solved
//   solution   — one-line summary of what you built
//   highlights — 3-5 specific technical achievements (bullet list, like Experience)
//   impact     — measurable result (use null until you have a number)
//   tech       — stack chips
//   demoUrl    — public mock-data demo (null = hidden)
//   sourceUrl  — public repo (null = hidden)
//   repo       — 'owner/name' of a public GitHub repo; when set, the card shows
//                live stats (language, stars, last update) fetched from the GitHub API.
//                Harmless if the repo is private/missing — the strip simply hides.
export const projects = [
  {
    id: 'artportal',
    title: 'ArtPortal — Artwork Processing & Export System',
    context: 'AI-assisted licensing submission pipeline for garment artwork',
    role: 'Solo Developer',
    duration: '2026',
    problem:
      'Preparing licensing submissions meant manually reading data out of .ai artwork files, cropping logos by hand, and filling Excel templates — slow and error-prone.',
    solution:
      'Built a FastAPI web system that automates the entire pipeline from raw artwork file to submission-ready export.',
    highlights: [
      'Designed a 3-stage OCR fallback chain (PDFMiner → Tesseract → EasyOCR) to reliably extract Item ID, Style, Team, and Color from inconsistent .ai file layouts.',
      'Built an interactive crop tool with OpenCV GrabCut auto-detection and real-world cm measurement, with per-item crop memory.',
      'Trained a ResNet18 + FAISS similarity classifier that predicts the correct Excel target column from a cropped image, retrainable directly in the app.',
      'Implemented full-resolution Excel and ZIP export preserving embedded image quality, plus a real-time SSE status monitor for every AI/OCR module.',
      'Added JWT-based multi-user auth with an admin panel for user and team management.',
    ],
    impact: null,
    tech: ['Python', 'FastAPI', 'OpenCV', 'PyTorch', 'FAISS', 'SQLAlchemy'],
    demoUrl: null,
    sourceUrl: 'https://github.com/TeeKunGZ/artwork-v2.1',
    repo: 'TeeKunGZ/artwork-v2.1',
  },
  {
    id: 'bom-compare',
    title: 'BOM Compare App',
    context: 'Bill of Materials revision comparison tool',
    role: 'Solo Developer',
    duration: '2026',
    problem:
      'Comparing BOM revisions across versions manually makes it easy to miss changed materials, quantities, or costings during production planning.',
    solution:
      'Built a side-by-side diffing tool purpose-built for BOM structures rather than generic text diffing.',
    highlights: [
      'Parsed and normalized BOM line items so equivalent materials are matched even when row order changes between revisions.',
      'Built a diff engine that classifies each line as added, removed, or changed, with changed fields highlighted individually.',
      'Designed a side-by-side view so planners can review revisions without cross-referencing two separate files.',
    ],
    impact: null,
    tech: ['JavaScript', 'Node.js'],
    demoUrl: null,
    sourceUrl: null,
    repo: 'TeeKunGZ/bom-compare-app',
  },
  {
    id: 'production-portal',
    title: 'Production Management Portal',
    context: 'Internal web portal for a garment manufacturing group',
    role: 'Solo Developer',
    duration: '2026',
    problem:
      'Production order tracking, QC inspection, and fabric material data lived in separate legacy screens and spreadsheets, slowing down daily operations.',
    solution:
      'Designed and built a single-page web portal unifying production data into one modular dashboard.',
    highlights: [
      'Built modular dashboards for production orders, proto/sample requests, QC inspection, and fabric materials behind a single shared shell.',
      'Structured state management with Pinia so each business module stays independently testable while sharing a common data layer.',
      'Implemented client-side routing with Vue Router for direct, bookmarkable links into each operational screen.',
    ],
    impact: null, // e.g. 'Reduced daily lookup time by X%' — fill in later
    tech: ['Vue 3', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Vite'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'oracle-erp',
    title: 'Oracle ERP Forms & Reports Development',
    context: 'Enterprise ERP for high-volume garment manufacturing',
    role: 'Sr. Oracle Developer / Supervisor',
    duration: '2020 — Present',
    problem:
      'Business teams needed reliable, fast ERP screens and operational reports over large transactional datasets.',
    solution:
      'Developed and maintained the Oracle Forms and Reports layer of the ERP, with a focus on database performance.',
    highlights: [
      'Built and maintained Oracle Forms and Reports modules backed by advanced PL/SQL packages, procedures, triggers, and functions.',
      'Ran systematic SQL tuning and query optimization passes on high-volume transactional tables to cut report and screen load times.',
      'Owned ETL and data migration logic for moving and transforming data across business environments.',
      'Led root cause analysis for recurring database errors and performance bottlenecks, reducing repeat incidents.',
    ],
    impact: null,
    tech: ['Oracle Forms', 'Oracle Reports', 'PL/SQL', 'SQL Tuning'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'nodejs-dashboard',
    title: 'Node.js Dashboards & Automated Email Alerts',
    context: 'Bridging Oracle data to modern web reporting',
    role: 'Sr. Oracle Developer',
    duration: '2020 — 2025',
    problem:
      'Management needed real-time visibility into operational data without logging into legacy ERP screens.',
    solution:
      'Integrated Oracle Database with Node.js services to publish web dashboards and event-driven alerts.',
    highlights: [
      'Built Node.js services querying Oracle Database directly to power lightweight, browser-based dashboard reports.',
      'Designed automated email alert triggers tied to key business events, replacing manual daily report checks.',
      'Coordinated with business stakeholders to define which metrics and thresholds warranted a real-time alert.',
    ],
    impact: null,
    tech: ['Node.js', 'Oracle Database', 'SQL', 'Email Automation'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'rpa-automation',
    title: 'RPA Workflow Automation',
    context: 'Robotic process automation for repetitive back-office tasks',
    role: 'Automation Developer',
    duration: '2020 — Present',
    problem:
      'Recurring manual tasks — data entry, file handling, report distribution — consumed staff hours and introduced human error.',
    solution:
      'Designed UiPath workflows that automate repetitive back-office tasks end-to-end.',
    highlights: [
      'Mapped manual back-office processes to identify the highest-friction, most repetitive candidates for automation.',
      'Built UiPath workflows with structured error handling so failures alert rather than fail silently.',
      'Scheduled unattended runs for recurring data entry, file handling, and report distribution tasks.',
    ],
    impact: null,
    tech: ['UiPath', 'RPA', 'Python', 'Workflow Design'],
    demoUrl: null,
    sourceUrl: null,
  },
]
