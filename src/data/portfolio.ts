export const site = {
  name: "Bryan Alejandro Acosta Vergara",
  shortName: "Alejandro Acosta",
  role: "Full Stack Developer",
  tagline: "Production backends with NestJS & TypeScript",
  location: "Quito, Ecuador",
  email: "alejoav.2905@gmail.com",
  phone: "+593 995 053 499",
  linkedin: "https://linkedin.com/in/aleacostadev",
  github: "https://github.com/allett29",
} as const;

export const profile = `Full Stack Developer experienced in building backends with NestJS and TypeScript: REST APIs, GraphQL, PostgreSQL, and microservices architectures. Since 2024 I have developed and maintained Urbano Sport Center in production—a full sports management platform. In financial services I contribute to legacy system migrations and technical guidance on agile teams. Also comfortable with Java (Spring Boot), Python (Django, FastAPI), React, Next.js, Docker, and deployment on VPS and cloud.`;

export const typewriterRoles = [
  "NestJS & TypeScript",
  "GraphQL & REST APIs",
  "PostgreSQL",
  "React & Next.js",
  "Docker & CI/CD",
  "Microservices",
];

/** Three tech icons per section portal atom (one per elliptical orbit). */
export const portalSkillOrbits: readonly (readonly string[])[] = [
  ["NestJS", "TypeScript", "GraphQL"],
  ["React", "Next.js", "Tailwind"],
  ["PostgreSQL", "Docker", "CI/CD"],
  ["Laravel", "FastAPI", "Spring Boot"],
  ["Python", "Flutter", "n8n"],
];

export const skillGroups = [
  {
    title: "Backend",
    color: "cyan" as const,
    items: [
      "NestJS",
      "TypeScript",
      "Laravel",
      "Django",
      "FastAPI",
      "Spring Boot",
      "PHP 8",
    ],
  },
  {
    title: "Frontend",
    color: "magenta" as const,
    items: ["React", "Next.js", "Tailwind CSS", "PWA", "GraphQL Client"],
  },
  {
    title: "Data & Infra",
    color: "purple" as const,
    items: [
      "PostgreSQL",
      "Informix",
      "Docker",
      "Git",
      "CI/CD",
      "VPS",
      "Render",
    ],
  },
];

export const experience = [
  {
    period: "2024 — Jul 2026",
    role: "Full Stack Developer",
    company: "Urbano Sport Center",
    mode: "Remote · Full-time",
    highlights: [
      "End-to-end platform: tournaments, bookings, payments, academies, live streams, and real-time IoT scoreboards.",
      "NestJS backend with GraphQL/REST on PostgreSQL; mobile PWA.",
      "Architecture, deployment, and production maintenance end-to-end.",
    ],
    link: "https://urbanosportcenter.com",
  },
  {
    period: "Feb — Aug 2026",
    role: "Programmer Analyst",
    company: "Cooperativa de Ahorro y Crédito Andina Ltda.",
    mode: "Full-time · Latacunga, Ecuador",
    highlights: [
      "Migration of the financial core from PHP 5 to PHP 8 (backend, frontend, and QA).",
      "New modules on the cooperative financial system; Informix queries.",
      "Customer-service chatbot for cooperative operations (design, integration, and rollout).",
      "Modern UIs, code review, and informal technical guidance for the team.",
    ],
  },
  {
    period: "Aug — Oct 2025",
    role: "Full Stack Developer",
    company: "Unidad Educativa Blaise Pascal",
    mode: "Remote · Full-time",
    highlights: [
      "Institutional academic management system with Laravel, PostgreSQL, and Docker.",
      "Grades, attendance, reports, and role-based access modules.",
      "Institutional chatbot for FAQs and academic queries, tied to school workflows.",
      "VPS deployment and end-user training.",
    ],
  },
  {
    period: "Internship",
    role: "Technical Support",
    company: "Ministry of Finance · IT Area",
    mode: "2 months",
    highlights: [
      "User support in a public-sector entity.",
      "Preventive and corrective maintenance of computer equipment.",
    ],
  },
];

export const projects = [
  {
    title: "Urbano Sport Center",
    description:
      "Full sports operations: tournaments, court reservations, online payments, academies, and live IoT scoreboards.",
    stack: ["NestJS", "GraphQL", "PostgreSQL", "PWA", "TypeScript"],
    href: "https://urbanosportcenter.com",
    github: null,
    featured: true,
    accent: "cyan" as const,
  },
  {
    title: "EduMonitor AI",
    description:
      "Classroom attention monitoring with emotion and pose recognition plus real-time participation metrics.",
    stack: ["Django", "Python", "Face-API.js", "Tailwind", "SQLite"],
    href: "https://allett29.pythonanywhere.com/",
    github: null,
    featured: true,
    accent: "magenta" as const,
  },
  {
    title: "Institutional academic system",
    description:
      "Student, faculty, and admin management: grades, attendance, reports, and role-based access control.",
    stack: ["Laravel", "PostgreSQL", "Docker", "VPS"],
    href: null,
    github: null,
    featured: false,
    accent: "purple" as const,
  },
  {
    title: "AnalytiCore",
    description:
      "Cloud microservices for sentiment analysis and keyword extraction: React, FastAPI, and Spring Boot.",
    stack: ["React", "FastAPI", "Spring Boot", "PostgreSQL", "Docker"],
    href: null,
    github: "https://github.com/allett29",
    featured: false,
    accent: "green" as const,
  },
];

export const education = [
  {
    title: "Software Engineering",
    place: "Universidad de las Fuerzas Armadas ESPE",
    period: "2020 — 2026",
  },
  {
    title: "Technical High School Diploma in IT",
    place: "Graduated 2019",
    period: "",
  },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certs" },
  { href: "#github", label: "GitHub" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];
