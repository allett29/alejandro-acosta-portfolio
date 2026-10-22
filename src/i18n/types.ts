export type Locale = "en" | "es";

export type SkillCategory = {
  id: string;
  title: string;
  subtitle: string;
  color: "cyan" | "magenta" | "purple" | "green";
  items: string[];
};

export type NavLink = {
  href: string;
  sectionId: string;
  label: string;
};

export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  mode: string;
  highlights: string[];
  link?: string;
};

export type ProjectEntry = {
  title: string;
  description: string;
  stack: string[];
  href: string | null;
  github: string | null;
  featured: boolean;
  accent: "cyan" | "magenta" | "purple" | "green";
};

export type EducationEntry = {
  title: string;
  place: string;
  period: string;
};

export type SpokenLanguage = {
  name: string;
  level: string;
  percent: number;
  note: string;
};

export type Dictionary = {
  meta: {
    htmlLang: string;
    contactEmailSubject: string;
  };
  site: {
    role: string;
    tagline: string;
  };
  nav: NavLink[];
  hero: {
    viewProjects: string;
    contact: string;
    cvPdf: string;
    scrollDown: string;
    photoAltSuffix: string;
  };
  sections: {
    about: { eyebrow: string; title: string; summaryLabel: string };
    skills: { eyebrow: string; title: string; autoTour: string; spokenLanguages: string };
    github: { eyebrow: string; title: string };
    experience: { eyebrow: string; title: string; viewSite: string };
    projects: { eyebrow: string; title: string; featured: string; liveDemo: string; github: string; privateProject: string };
    contact: { eyebrow: string; title: string; intro: string; sendEmail: string; downloadCv: string };
  };
  profile: string;
  typewriterRoles: string[];
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skillCategories: SkillCategory[];
  spokenLanguages: SpokenLanguage[];
  footer: {
    builtWith: string;
    neonMode: string;
  };
  github: {
    followers: string;
    followersStat: string;
    viewProfile: string;
    totalRepos: string;
    publicRepos: string;
    commitsAllRepos: string;
    contributions12mo: string;
    privateRepos: string;
    memberSince: string;
    statsRefresh: string;
    statsTitle: string;
    statsSubtitle: string;
    commits: string;
    contributions: string;
    activityGraph: string;
    activityGraphSub: string;
    contributionsInPeriod: string;
    contributionCalendar: string;
    calendarAria: string;
    less: string;
    more: string;
    noContributionData: string;
  };
  languageSwitcher: {
    label: string;
    en: string;
    es: string;
  };
};
