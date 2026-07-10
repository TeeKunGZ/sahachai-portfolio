// Portfolio case studies. Written confidentiality-safe: no internal data,
// screenshots, or live company systems.
//
// Shape of each entry:
//   featured  - highlights strongest case studies in the UI
//   impact    - business/user value; keep qualitative unless verified metrics exist
export const projects = [
  {
    id: 'cv-portfolio',
    featured: true,
    visual: { icon: 'layoutDashboard', label: 'CV Portfolio', accent: 'violet' },
    title: 'Interactive CV Portfolio',
    context: 'Personal portfolio for Oracle ERP, PL/SQL, and automation work',
    role: 'Solo Developer',
    duration: '2026',
    problem:
      'A static resume could not clearly show the range of Oracle ERP modernization, automation, and web development work behind the listed experience.',
    solution:
      'Built a responsive portfolio that turns career history, case studies, GitHub activity, and recruiter contact flows into a polished web experience.',
    highlights: [
      'Designed a Vue 3 and Tailwind CSS single-page portfolio with responsive sections for profile, skills, work experience, and selected case studies.',
      'Added interactive portfolio filtering, drag-friendly project navigation, progress nodes, and featured project badges for faster scanning.',
      'Integrated GitHub repository signals and a command palette so recruiters can jump directly to the strongest proof points.',
      'Refined professional UI details including current-role animation, dark mode support, motion preferences, and no-selection read-only presentation.',
    ],
    impact:
      'Presents the resume as a working product while demonstrating frontend polish, automation mindset, and practical portfolio engineering.',
    tech: ['Vue 3', 'Tailwind CSS', 'Vite', 'JavaScript', 'GitHub API'],
    demoUrl: null,
    sourceUrl: 'https://github.com/TeeKunGZ/sahachai-portfolio',
    repo: 'TeeKunGZ/sahachai-portfolio',
  },
  {
    id: 'artportal',
    featured: true,
    visual: { icon: 'image', label: 'OCR Pipeline', accent: 'cyan' },
    title: 'ArtPortal - Artwork Processing & Export System',
    context: 'AI-assisted licensing submission pipeline for garment artwork',
    role: 'Solo Developer',
    duration: '2026',
    problem:
      'Preparing licensing submissions meant manually reading data out of .ai artwork files, cropping logos by hand, and filling Excel templates - slow and error-prone.',
    solution:
      'Built a FastAPI web system that automates the path from raw artwork file to submission-ready Excel and ZIP exports.',
    highlights: [
      'Designed a 3-stage OCR fallback chain (PDFMiner, Tesseract, EasyOCR) to extract Item ID, Style, Team, and Color from inconsistent artwork layouts.',
      'Built an interactive crop tool with OpenCV GrabCut auto-detection, real-world cm measurement, and per-item crop memory.',
      'Trained a ResNet18 + FAISS similarity classifier that predicts the correct Excel target column from cropped artwork images.',
      'Implemented full-resolution Excel and ZIP export, plus a real-time SSE status monitor for AI/OCR processing steps.',
      'Added JWT-based multi-user authentication with an admin panel for user and team management.',
    ],
    impact:
      'Converts a manual licensing-preparation workflow into a guided export pipeline with OCR, crop memory, classification, and packaged submission output.',
    tech: ['Python', 'FastAPI', 'OpenCV', 'PyTorch', 'FAISS', 'SQLAlchemy'],
    demoUrl: null,
    sourceUrl: 'https://github.com/TeeKunGZ/artwork-v2.1',
    repo: 'TeeKunGZ/artwork-v2.1',
  },
  {
    id: 'auto-bom',
    featured: true,
    visual: { icon: 'fileSpreadsheet', label: 'AI to BOM', accent: 'emerald' },
    metric: { from: '1 hr', to: '15 min', label: '~75% faster' },
    title: 'Auto BOM - AI-Powered Tech Pack Extraction',
    context: 'Automated BOM extraction from PDF to Oracle ERP using Gemini Vision',
    role: 'Solo Developer',
    duration: '2025',
    problem:
      'BOM details from customer tech pack PDFs required tedious manual transcription and formatting before they could be entered into Oracle ERP.',
    solution:
      'Built an AI-driven web application that extracts PDF data, sanitizes it via rule-based logic, and stages it for a streamlined review-and-approve import into Oracle ERP.',
    highlights: [
      'Integrated Gemini Vision AI to perform highly accurate OCR extraction on uploaded unstructured Tech Pack PDFs.',
      'Developed rule-based data cleansing logic to format AI outputs into structured Excel files for an initial layer of user verification.',
      'Engineered an import pipeline that ingests approved Excel data directly into Oracle Database temporary tables via the web application.',
      'Automated the final BOM generation within Oracle ERP, allowing users to simply map Style, Colorway, and Item Names, completely eliminating manual line-by-line entry.',
    ],
    impact:
      'Transformed a heavy manual data entry process into a modern "review-and-approve" workflow, reducing BOM preparation time by approximately 75%.',
    tech: ['Gemini Vision AI', 'Web Application', 'Oracle Database', 'Rule-Based Logic', 'OCR'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'oracle-erp',
    featured: true,
    visual: { icon: 'database', label: 'Oracle ERP Core', accent: 'indigo' },
    title: 'Oracle ERP Forms & Reports Development',
    context: 'Enterprise ERP for high-volume garment manufacturing',
    role: 'Sr. Oracle Developer / Supervisor',
    duration: '2020 - Present',
    problem:
      'Business teams needed reliable ERP screens and operational reports over large manufacturing transaction datasets.',
    solution:
      'Developed and maintained the Oracle Forms, Reports, and PL/SQL layer on Oracle 11g with a focus on reliability, performance, and accurate data mapping.',
    highlights: [
      'Built and maintained Oracle Forms and Reports modules backed by PL/SQL packages, procedures, triggers, and functions on an Oracle 11g database.',
      'Improved logging accuracy by modifying database triggers to capture detailed operational statuses (e.g., isolating error_msg tracking).',
      'Resolved complex data mapping requirements for production lifecycles (e.g., CUS_SEASON alignment).',
      'Ran SQL tuning and query optimization passes on high-volume tables to improve report and screen responsiveness.',
    ],
    impact:
      'Keeps core ERP workflows maintainable and performant across large transactional datasets and daily manufacturing operations.',
    tech: ['Oracle Forms', 'Oracle Reports', 'PL/SQL', 'Oracle 11g', 'SQL Tuning'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'nodejs-dashboard',
    featured: true,
    visual: { icon: 'bell', label: 'Live Alerts', accent: 'amber' },
    title: 'Node.js Dashboards & Automated Email Alerts',
    context: 'Bridging Oracle data to modern web reporting',
    role: 'Sr. Oracle Developer',
    duration: '2020 - 2025',
    problem:
      'Management needed timely operational visibility without repeatedly opening legacy ERP screens or waiting for manual report checks.',
    solution:
      'Integrated Oracle Database with Node.js services to publish browser-based dashboards and event-driven email alerts.',
    highlights: [
      'Built Node.js services querying Oracle Database directly to power lightweight dashboard reports.',
      'Designed automated email alert triggers tied to key business events, replacing manual daily report checks.',
      'Worked with stakeholders to define the metrics, thresholds, and timing that made alerts useful rather than noisy.',
    ],
    impact:
      'Moves key operational visibility out of legacy screens and into lightweight dashboards and automatic notifications.',
    tech: ['Node.js', 'Oracle Database', 'SQL', 'Email Automation'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'production-portal',
    featured: true,
    visual: { icon: 'layoutDashboard', label: 'Operations Portal', accent: 'blue' },
    title: 'Production Management Portal',
    context: 'Internal web portal for a garment manufacturing group',
    role: 'Solo Developer',
    duration: '2026',
    problem:
      'Production order tracking, QC inspection, and fabric material data lived in separate legacy screens and spreadsheets, slowing down daily operations.',
    solution:
      'Designed and built a single-page web portal that unifies production data into one modular dashboard experience.',
    highlights: [
      'Built modular dashboards for production orders, proto/sample requests, QC inspection, and fabric materials behind a shared shell.',
      'Structured state management with Pinia so each business module stays independently testable while sharing common data patterns.',
      'Implemented Vue Router for direct, bookmarkable links into each operational screen.',
    ],
    impact:
      'Creates a single operational workspace for production, QC, sample, and fabric data that would otherwise be checked across separate tools.',
    tech: ['Vue 3', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Vite'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'bom-compare',
    visual: { icon: 'gitCompare', label: 'Revision Diff', accent: 'violet' },
    title: 'BOM Compare App',
    context: 'Bill of Materials revision comparison tool',
    role: 'Solo Developer',
    duration: '2026',
    problem:
      'Comparing BOM revisions manually makes it easy to miss changed materials, quantities, or costing details during production planning.',
    solution:
      'Built a side-by-side diffing tool purpose-built for BOM structures rather than generic text comparison.',
    highlights: [
      'Parsed and normalized BOM line items so equivalent materials match even when row order changes between revisions.',
      'Built a diff engine that classifies each line as added, removed, or changed, with changed fields highlighted individually.',
      'Designed a side-by-side review flow so planners can inspect revisions without cross-referencing separate files.',
    ],
    impact:
      'Gives planners a purpose-built BOM review flow so revision changes are easier to spot before production decisions are made.',
    tech: ['JavaScript', 'Node.js'],
    demoUrl: null,
    sourceUrl: null,
    repo: 'TeeKunGZ/bom-compare-app',
  },
  {
    id: 'rpa-automation',
    visual: { icon: 'bot', label: 'Workflow Bot', accent: 'slate' },
    title: 'RPA Workflow Automation',
    context: 'Robotic process automation for repetitive back-office tasks',
    role: 'Automation Developer',
    duration: '2025-2026',
    problem:
      'Recurring manual tasks such as data entry, file handling, and report distribution consumed staff time and introduced human error.',
    solution:
      'Designed UiPath workflows that automate repetitive back-office tasks end-to-end with structured error handling.',
    highlights: [
      'Mapped manual back-office processes to identify the highest-friction candidates for automation.',
      'Built UiPath workflows with structured error handling so failures alert instead of failing silently.',
      'Scheduled unattended runs for recurring data entry, file handling, and report distribution tasks.',
    ],
    impact:
      'Replaces repetitive back-office steps with scheduled, monitored workflows that reduce manual handling and silent failures.',
    tech: ['UiPath', 'RPA', 'Python', 'Workflow Design'],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'hire-me-bot',
    featured: true,
    visual: { icon: 'bot', label: 'API Bot', accent: 'fuchsia' },
    title: 'Recruitment Automation Bot',
    context: 'Automated contact pipeline for GitHub portfolio',
    role: 'Solo Developer',
    duration: '2026',
    problem:
      'Wanted a standout, automated way for recruiters to reach out directly from my portfolio while keeping my personal inbox organized.',
    solution:
      'Designed a "Hire Me" API bot that captures recruiter inquiries and instantly routes them to a private Discord channel.',
    highlights: [
      'Built a lightweight API backend using Python and FastAPI to process incoming contact requests.',
      'Integrated Discord Webhooks for real-time push notifications straight to mobile.',
      'Implemented input validation to ensure clean data capture and prevent spam.',
    ],
    impact:
      'Transforms a standard portfolio contact form into a real-time, automated recruitment notification system, showcasing practical API integration skills.',
    tech: ['Python', 'FastAPI', 'Discord Webhooks', 'API Integration'],
    demoUrl: null,
    sourceUrl: null, 
  },
]
