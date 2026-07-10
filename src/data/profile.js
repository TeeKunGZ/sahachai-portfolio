// Personal profile shown in the Hero, About, and Contact sections.
// Phone number and full address are intentionally NOT published on the web;
// they are available only inside the downloadable PDF resume.
import { projects } from './projects.js'

// Unique technologies across all featured projects drives the hero stat
// so it stays in sync as projects are added or edited.
const techCount = new Set(projects.flatMap((p) => p.tech)).size

export const profile = {
  name: 'Sahachai Siribanjerdsak',
  initials: 'SS',
  title: 'Oracle ERP & PL/SQL Technical Lead',
  tagline:
    'I modernize Oracle ERP workflows with PL/SQL, Forms, Reports, SQL tuning, and automation that keeps manufacturing operations moving.',
  location: 'Bangkok, Thailand',
  email: 'sahachaiza@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sahachai-siri',
  github: 'https://github.com/TeeKunGZ',
  resumeFile:
    'https://raw.githubusercontent.com/TeeKunGZ/sahachai-portfolio/main/public/Sahachai-Siribanjerdsak-Resume.pdf',
  photo: 'https://raw.githubusercontent.com/TeeKunGZ/sahachai-portfolio/main/public/profile.png',
  // Quick stats shown under the hero tagline (animated count-up).
  // Case Studies count is derived from projects.js so it never drifts out of sync.
  stats: [
    { value: 6, suffix: '+', label: 'Years of Experience' },
    { value: techCount, suffix: '+', label: 'Technologies & Tools' },
    { value: projects.length, suffix: '', label: 'Featured Projects' },
  ],
  oracleProof: [
    'Oracle Forms',
    'Oracle Reports',
    'PL/SQL Packages',
    'SQL Tuning',
    'ERP Workflow Automation',
  ],
  strengths: [
    {
      title: 'Oracle ERP Modernization',
      detail:
        'Turn legacy Oracle Forms, Reports, and PL/SQL workflows into more maintainable systems without disrupting daily operations.',
    },
    {
      title: 'Performance & Reliability',
      detail:
        'Tune SQL, troubleshoot database issues, and stabilize high-volume operational processes used by business teams every day.',
    },
    {
      title: 'Business Process Automation',
      detail:
        'Bridge business requirements with Node.js, Python, RPA, and lightweight web tools to remove repetitive manual work.',
    },
  ],
  summary:
    'Oracle / PL/SQL technical lead with 6+ years of experience building, tuning, and supporting enterprise systems for manufacturing operations. Combines hands-on Oracle development with business analysis, UAT coordination, team mentoring, and automation delivery across legacy ERP and modern web tooling.',
}
