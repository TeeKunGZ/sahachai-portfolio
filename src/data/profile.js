// Personal profile shown in the Hero, About, and Contact sections.
// Phone number and full address are intentionally NOT published on the web —
// they are available only inside the downloadable PDF resume.
import { projects } from './projects.js'

// Unique technologies across all featured projects — drives the hero stat
// so it stays in sync as projects are added or edited.
const techCount = new Set(projects.flatMap((p) => p.tech)).size

export const profile = {
  name: 'Sahachai Siribanjerdsak',
  initials: 'SS',
  title: 'Oracle Development Supervisor',
  tagline:
    'I design, build, and optimize Oracle-based enterprise systems — from PL/SQL and Forms to modern automation with Node.js, Python, and RPA.',
  location: 'Bangkok, Thailand',
  email: 'sahachaiza@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sahachai-siri',
  github: 'https://github.com/TeeKunGZ',
  resumeFile: '/Sahachai-Siribanjerdsak-Resume.pdf',
  // Set to an image path in /public (e.g. '/profile.jpg') to replace the initials placeholder.
  photo: null,
  // Quick stats shown under the hero tagline (animated count-up).
  // Case Studies count is derived from projects.js so it never drifts out of sync.
  stats: [
    { value: 6, suffix: '+', label: 'Years of Experience' },
    { value: techCount, suffix: '+', label: 'Technologies & Tools' },
    { value: projects.length, suffix: '', label: 'Featured Projects' },
  ],
  summary:
    'Oracle Development Supervisor with 6+ years of experience in Oracle application development, PL/SQL programming, business analysis, and enterprise system support. Experienced in leading technical teams, managing cross-functional collaboration, optimizing business processes, and delivering scalable solutions for high-volume operational environments.',
}
