export type SkillCategory = {
  id: string;
  title: string;
  subtitle: string;
  color: "cyan" | "magenta" | "purple" | "green";
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend",
    subtitle: "APIs, services & business logic",
    color: "cyan",
    items: [
      "NestJS",
      "TypeScript",
      "Node.js",
      "Laravel",
      "Django",
      "FastAPI",
      "Spring Boot",
      "PHP 8",
      "REST",
      "GraphQL",
      "Microservices",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "Web & mobile-facing UIs",
    color: "magenta",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PWA",
      "Flutter",
      "GraphQL Client",
    ],
  },
  {
    id: "languages",
    title: "Languages",
    subtitle: "Primary programming languages",
    color: "purple",
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Java",
      "PHP",
      "Dart",
      "SQL",
    ],
  },
  {
    id: "databases",
    title: "Databases",
    subtitle: "Relational & document stores",
    color: "cyan",
    items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Informix", "SQLite"],
  },
  {
    id: "ai",
    title: "AI & Automation",
    subtitle: "ML, LLMs, vision & workflows",
    color: "green",
    items: [
      "Generative AI",
      "LLM integration",
      "Computer vision",
      "Machine learning",
      "Model training",
      "n8n",
      "Face-API.js",
      "Prompt engineering",
    ],
  },
  {
    id: "devops",
    title: "DevOps & Quality",
    subtitle: "Delivery, security & methods",
    color: "purple",
    items: [
      "Docker",
      "CI/CD",
      "Git",
      "GitHub Actions",
      "VPS",
      "Render",
      "Scrum",
      "Cybersecurity basics",
    ],
  },
];

export const spokenLanguages = [
  {
    name: "Spanish",
    level: "Native",
    percent: 100,
    note: "Native speaker",
  },
  {
    name: "English",
    level: "Mid",
    percent: 62,
    note: "",
  },
] as const;

