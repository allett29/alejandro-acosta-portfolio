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

export const certifications = [
  {
    title: "Software Development",
    focus: "Full stack engineering, clean architecture, and production delivery.",
    tags: ["Development", "Engineering"],
  },
  {
    title: "Generative AI",
    focus: "LLM workflows, prompt design, and applied GenAI in products.",
    tags: ["GenAI", "LLMs"],
  },
  {
    title: "AI Training",
    focus: "Dataset preparation, model fine-tuning, and evaluation pipelines.",
    tags: ["Training", "ML Ops"],
  },
  {
    title: "Machine Learning",
    focus: "Supervised learning, model selection, and practical ML deployments.",
    tags: ["ML", "Data"],
  },
  {
    title: "Computer Vision",
    focus: "Image classification, pose/emotion detection, and real-time inference.",
    tags: ["Vision", "OpenCV"],
  },
  {
    title: "Process Automation (n8n)",
    focus: "Integrations, webhooks, and automated business workflows.",
    tags: ["n8n", "Automation"],
  },
  {
    title: "CI/CD",
    focus: "Pipelines, automated testing, and reliable release flows.",
    tags: ["DevOps", "Pipelines"],
  },
  {
    title: "Scrum",
    focus: "Agile ceremonies, iterative delivery, and team collaboration.",
    tags: ["Agile", "Scrum"],
  },
  {
    title: "Cybersecurity",
    focus: "Secure coding, hardening, and awareness in application layers.",
    tags: ["Security"],
  },
] as const;

