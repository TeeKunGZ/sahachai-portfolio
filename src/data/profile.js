// Personal profile shown in the Hero, About, and Contact sections.
// Phone number and full address are intentionally NOT published on the web;
// they are available only inside the downloadable PDF resume.
import { projects } from './projects.js'

export const profile = {
  name: 'Sahachai Siribanjerdsak',
  initials: 'SS',
  title: 'Oracle Development Supervisor',
  tagline:
    'I modernize Oracle ERP workflows by combining PL/SQL expertise with hands-on manufacturing process knowledge, reliable systems support, and practical automation.',
  location: 'Bangkok, Thailand',
  email: 'sahachaiza@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sahachai-siri',
  github: 'https://github.com/TeeKunGZ',
  resumeFile: '/Sahachai-Siribanjerdsak-Resume.pdf',
  photo: '/profile.png',
  // Quick stats shown under the hero tagline (animated count-up).
  // Case Studies count is derived from projects.js so it never drifts out of sync.
  stats: [
    { value: 9, suffix: '+', label: 'Manufacturing Years' },
    { value: 6, suffix: '+', label: 'Oracle ERP Years' },
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
    'Oracle Development Supervisor with 6+ years of Oracle application development, PL/SQL programming, business analysis, and enterprise system support. Combines hands-on Oracle development with manufacturing-domain experience, UAT coordination, team mentoring and automation delivery across legacy ERP and modern web tooling.',
}
