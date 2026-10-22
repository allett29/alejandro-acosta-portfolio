/** Contact & identity — not locale-specific. Copy lives in src/i18n. */
export const site = {
  name: "Bryan Alejandro Acosta Vergara",
  shortName: "Alejandro Acosta",
  location: "Quito, Ecuador",
  email: "alejoav.2905@gmail.com",
  phone: "+593 995 053 499",
  linkedin: "https://linkedin.com/in/aleacostadev",
  github: "https://github.com/allett29",
} as const;

/** Three tech icons per section portal atom (one per elliptical orbit). */
export const portalSkillOrbits: readonly (readonly string[])[] = [
  ["NestJS", "TypeScript", "GraphQL"],
  ["React", "Next.js", "Tailwind"],
  ["PostgreSQL", "Docker", "CI/CD"],
  ["Laravel", "FastAPI", "Spring Boot"],
  ["Python", "Flutter", "n8n"],
];
