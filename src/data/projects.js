// Portfolio case studies. Written confidentiality-safe: no internal data,
// screenshots, or live company systems. Fill in the placeholder fields
// (impact numbers, links) as they become available.
//
// Shape of each entry:
//   title      — generic, non-confidential system name
//   context    — one line: where/why this was built
//   problem    — the business problem it solved
//   solution   — what you designed/built
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
    problem:
      'Preparing licensing submissions meant manually reading data out of .ai artwork files, cropping logos by hand, and filling Excel templates — slow and error-prone.',
    solution:
      'Built a FastAPI web system with a 3-stage OCR pipeline (PDFMiner → Tesseract → EasyOCR), OpenCV GrabCut auto-cropping, a ResNet18 + FAISS classifier that predicts the target Excel column, full-resolution Excel/ZIP export, and JWT multi-user administration.',
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
    problem:
      'Comparing BOM revisions across versions manually makes it easy to miss changed materials, quantities, or costings during production planning.',
    solution:
      'Built a comparison tool that diffs BOM versions side-by-side and highlights added, removed, and changed line items.',
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
    problem:
      'Production order tracking, QC inspection, and fabric material data lived in separate legacy screens and spreadsheets, slowing down daily operations.',
    solution:
      'Designed and built a single-page web portal covering production orders, proto/sample requests, QC inspection, and fabric materials — with a modular dashboard for each business function.',
    impact: null, // e.g. 'Reduced daily lookup time by X%' — fill in later
    tech: ['Vue 3', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Vite'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'oracle-erp',
    title: 'Oracle ERP Forms & Reports Development',
    context: 'Enterprise ERP for high-volume garment manufacturing',
    problem:
      'Business teams needed reliable, fast ERP screens and operational reports over large transactional datasets.',
    solution:
      'Developed and maintained Oracle Forms and Reports modules backed by advanced PL/SQL packages, with systematic SQL tuning and query optimization for high-volume tables.',
    impact: null,
    tech: ['Oracle Forms', 'Oracle Reports', 'PL/SQL', 'SQL Tuning'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'nodejs-dashboard',
    title: 'Node.js Dashboards & Automated Email Alerts',
    context: 'Bridging Oracle data to modern web reporting',
    problem:
      'Management needed real-time visibility into operational data without logging into legacy ERP screens.',
    solution:
      'Integrated Oracle Database with Node.js services to publish dashboard reports and send automated email alerts on key business events.',
    impact: null,
    tech: ['Node.js', 'Oracle Database', 'SQL', 'Email Automation'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'rpa-automation',
    title: 'RPA Workflow Automation',
    context: 'Robotic process automation for repetitive back-office tasks',
    problem:
      'Recurring manual tasks — data entry, file handling, report distribution — consumed staff hours and introduced human error.',
    solution:
      'Designed UiPath workflows automating repetitive tasks end-to-end, with error handling and scheduling for unattended runs.',
    impact: null,
    tech: ['UiPath', 'RPA', 'Python', 'Workflow Design'],
    demoUrl: null,
    sourceUrl: null,
  },
]
