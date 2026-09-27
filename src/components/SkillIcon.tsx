import {
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFlutter,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiHuggingface,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiN8N,
  SiNodedotjs,
  SiOpencv,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRender,
  SiScrumalliance,
  SiSpringboot,
  SiSqlite,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiPhp,
  SiDart,
  SiOpenjdk,
  SiPwa,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { FaShieldHalved, FaServer, FaNetworkWired, FaCubes } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

const skillAliases: Record<string, string> = {
  Tailwind: "Tailwind CSS",
  ML: "Machine learning",
  Mobile: "Flutter",
  Cybersecurity: "Cybersecurity basics",
  "Computer Vision": "Computer vision",
};

function resolveSkillName(name: string) {
  return skillAliases[name] ?? name;
}

/** Official brand hex colors (Simple Icons / brand guidelines) */
const skillBrandColor: Record<string, string> = {
  NestJS: "#E0234E",
  TypeScript: "#3178C6",
  "Node.js": "#339933",
  Laravel: "#FF2D20",
  Django: "#092E20",
  FastAPI: "#009688",
  "Spring Boot": "#6DB33F",
  "PHP 8": "#777BB4",
  PHP: "#777BB4",
  REST: "#0EA5E9",
  GraphQL: "#E10098",
  "GraphQL Client": "#E10098",
  Microservices: "#6366F1",
  React: "#61DAFB",
  "Next.js": "#FFFFFF",
  "Tailwind CSS": "#06B6D4",
  PWA: "#5A0FC8",
  Flutter: "#02569B",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Java: "#437291",
  Dart: "#0175C2",
  SQL: "#4169E1",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  "SQL Server": "#CC2927",
  MongoDB: "#47A248",
  Informix: "#054ADA",
  SQLite: "#003B57",
  "Generative AI": "#412991",
  "LLM integration": "#412991",
  "Computer vision": "#5C3EE8",
  "Machine learning": "#FF6F00",
  "Model training": "#FFD21E",
  n8n: "#EA4B71",
  "Face-API.js": "#F7DF1E",
  "Prompt engineering": "#412991",
  Docker: "#2496ED",
  "CI/CD": "#2088FF",
  Git: "#F05032",
  "GitHub Actions": "#2088FF",
  VPS: "#94A3B8",
  Render: "#FFFFFF",
  Scrum: "#009FDA",
  "Cybersecurity basics": "#EF4444",
};

const skillIconMap: Record<string, IconType> = {
  NestJS: SiNestjs,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Laravel: SiLaravel,
  Django: SiDjango,
  FastAPI: SiFastapi,
  "Spring Boot": SiSpringboot,
  "PHP 8": SiPhp,
  PHP: SiPhp,
  REST: FaNetworkWired,
  GraphQL: SiGraphql,
  "GraphQL Client": SiGraphql,
  Microservices: FaCubes,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  PWA: SiPwa,
  Flutter: SiFlutter,
  JavaScript: SiJavascript,
  Python: SiPython,
  Java: SiOpenjdk,
  Dart: SiDart,
  SQL: SiPostgresql,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  SQLite: SiSqlite,
  "Generative AI": RiOpenaiFill,
  "LLM integration": RiOpenaiFill,
  "Computer vision": SiOpencv,
  "Machine learning": SiTensorflow,
  "Model training": SiHuggingface,
  n8n: SiN8N,
  "Face-API.js": SiJavascript,
  "Prompt engineering": RiOpenaiFill,
  Docker: SiDocker,
  "CI/CD": SiGithubactions,
  Git: SiGit,
  "GitHub Actions": SiGithubactions,
  VPS: FaServer,
  Render: SiRender,
  Scrum: SiScrumalliance,
  "Cybersecurity basics": FaShieldHalved,
};

const skillLocalLogo: Record<string, string> = {
  "SQL Server": "/icons/microsoftsqlserver.svg",
  Informix: "/icons/ibm.svg",
};

type Props = {
  name: string;
  className?: string;
};

export function SkillIcon({ name, className }: Props) {
  const resolved = resolveSkillName(name);
  const localLogo = skillLocalLogo[resolved];
  if (localLogo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={localLogo}
        alt=""
        className={cn("h-6 w-6 shrink-0 sm:h-7 sm:w-7", className)}
        aria-hidden
      />
    );
  }

  const Icon = skillIconMap[resolved];
  const color = skillBrandColor[resolved];

  if (!Icon) {
    return (
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-zinc-300 sm:h-7 sm:w-7 sm:text-xs",
          className,
        )}
        aria-hidden
      >
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <Icon
      className={cn("h-6 w-6 shrink-0 sm:h-7 sm:w-7", className)}
      style={color ? { color } : undefined}
      aria-hidden
    />
  );
}
