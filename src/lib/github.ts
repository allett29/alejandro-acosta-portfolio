const GITHUB_USER = "allett29";

export type GithubRepo = {
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  topics: string[];
  isPrivate: boolean;
};

export type ContributionDay = {
  date: string;
  count: number;
};

export type GithubProfile = {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  publicRepos: number;
  totalRepos: number;
  privateRepos: number;
  followers: number;
  following: number;
  createdAt: string;
  totalCommits: number;
  totalContributions: number | null;
  restrictedContributions: number | null;
  includesPrivateData: boolean;
  contributionDays: ContributionDay[];
  repos: GithubRepo[];
};

type RawRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics?: string[];
  private?: boolean;
};

const fallbackRepos: GithubRepo[] = [
  {
    name: "ProyEduMonitorAI",
    description: "EduMonitor AI — classroom attention monitoring project.",
    htmlUrl: "https://github.com/allett29/ProyEduMonitorAI",
    language: "HTML",
    stars: 0,
    forks: 0,
    pushedAt: "2026-01-01T00:00:00Z",
    topics: [],
    isPrivate: false,
  },
  {
    name: "analyticore",
    description: "Microservices analytics prototype.",
    htmlUrl: "https://github.com/allett29/analyticore",
    language: "Java",
    stars: 0,
    forks: 0,
    pushedAt: "2026-01-01T00:00:00Z",
    topics: [],
    isPrivate: false,
  },
  {
    name: "banco-fullstack-devsu",
    description: "Full stack banking sandbox.",
    htmlUrl: "https://github.com/allett29/banco-fullstack-devsu",
    language: "Java",
    stars: 0,
    forks: 0,
    pushedAt: "2026-01-01T00:00:00Z",
    topics: [],
    isPrivate: false,
  },
  {
    name: "gestionsegura",
    description: "Secure management utilities.",
    htmlUrl: "https://github.com/allett29/gestionsegura",
    language: "PHP",
    stars: 0,
    forks: 0,
    pushedAt: "2026-01-01T00:00:00Z",
    topics: [],
    isPrivate: false,
  },
];

const fallbackProfile: GithubProfile = {
  login: GITHUB_USER,
  avatarUrl: "https://avatars.githubusercontent.com/u/178917133?v=4",
  profileUrl: `https://github.com/${GITHUB_USER}`,
  publicRepos: 4,
  totalRepos: 4,
  privateRepos: 0,
  followers: 0,
  following: 0,
  createdAt: "2024-08-20T14:36:27Z",
  totalCommits: 0,
  totalContributions: null,
  restrictedContributions: null,
  includesPrivateData: false,
  contributionDays: [],
  repos: fallbackRepos,
};

function hasGithubToken(): boolean {
  return Boolean(process.env.GITHUB_TOKEN?.trim());
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "alejandro-acosta-portfolio",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

type ContributionFetchResult = {
  totalContributions: number | null;
  restrictedContributions: number | null;
  contributionDays: ContributionDay[];
};

async function fetchContributionData(): Promise<ContributionFetchResult> {
  const authenticated = hasGithubToken();

  const query = authenticated
    ? `
    query {
      viewer {
        contributionsCollection {
          restrictedContributionsCount
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `
    : `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const body = authenticated
    ? { query }
    : { query, variables: { login: GITHUB_USER } };

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...(authenticated
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
      "Content-Type": "application/json",
      "User-Agent": "alejandro-acosta-portfolio",
    },
    body: JSON.stringify(body),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return { totalContributions: null, restrictedContributions: null, contributionDays: [] };
  }

  const json = (await res.json()) as {
    data?: {
      viewer?: {
        contributionsCollection?: {
          restrictedContributionsCount?: number;
          contributionCalendar?: {
            totalContributions?: number;
            weeks?: {
              contributionDays?: { contributionCount?: number; date?: string }[];
            }[];
          };
        };
      };
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions?: number;
            weeks?: {
              contributionDays?: { contributionCount?: number; date?: string }[];
            }[];
          };
        };
      };
    };
  };

  const collection = authenticated
    ? json.data?.viewer?.contributionsCollection
    : json.data?.user?.contributionsCollection;

  const calendar = collection?.contributionCalendar;
  const weeks = calendar?.weeks ?? [];

  const contributionDays: ContributionDay[] = weeks.flatMap((week) =>
    (week.contributionDays ?? []).map((day) => ({
      date: day.date ?? "",
      count: day.contributionCount ?? 0,
    })),
  );

  return {
    totalContributions: calendar?.totalContributions ?? null,
    restrictedContributions: authenticated
      ? (collection as { restrictedContributionsCount?: number })?.restrictedContributionsCount ??
        null
      : null,
    contributionDays,
  };
}

async function fetchPublicRepos(): Promise<RawRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`,
    { headers: githubHeaders(), next: { revalidate: 3600 } },
  );
  if (!res.ok) return [];
  const data = (await res.json()) as RawRepo[];
  return Array.isArray(data) ? data : [];
}

async function fetchAuthenticatedRepos(): Promise<RawRepo[]> {
  const all: RawRepo[] = [];
  for (let page = 1; page <= 10; page++) {
    const url = new URL("https://api.github.com/user/repos");
    url.searchParams.set("affiliation", "owner");
    url.searchParams.set("sort", "pushed");
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set("visibility", "all");

    const res = await fetch(url, {
      headers: githubHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) break;

    const batch = (await res.json()) as RawRepo[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

async function fetchRepoCommitCount(repoName: string): Promise<number> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${repoName}/contributors?per_page=100`,
    { headers: githubHeaders(), next: { revalidate: 3600 } },
  );
  if (!res.ok) return 0;
  const contributors = (await res.json()) as { login: string; contributions: number }[];
  if (!Array.isArray(contributors)) return 0;
  return contributors.find((c) => c.login === GITHUB_USER)?.contributions ?? 0;
}

function mapRepos(rawRepos: RawRepo[]): GithubRepo[] {
  return rawRepos.map((r) => ({
    name: r.name,
    description: r.description,
    htmlUrl: r.html_url,
    language: r.language,
    stars: r.stargazers_count,
    forks: r.forks_count,
    pushedAt: r.pushed_at,
    topics: r.topics ?? [],
    isPrivate: Boolean(r.private),
  }));
}

export async function getGithubProfile(): Promise<GithubProfile> {
  try {
    const authenticated = hasGithubToken();
    const [userRes, contributionData, rawRepos] = await Promise.all([
      fetch(
        authenticated ? "https://api.github.com/user" : `https://api.github.com/users/${GITHUB_USER}`,
        { headers: githubHeaders(), next: { revalidate: 3600 } },
      ),
      fetchContributionData(),
      authenticated ? fetchAuthenticatedRepos() : fetchPublicRepos(),
    ]);

    if (!userRes.ok) return fallbackProfile;

    const user = (await userRes.json()) as {
      login: string;
      avatar_url: string;
      html_url: string;
      public_repos: number;
      followers: number;
      following: number;
      created_at: string;
    };

    const repos = mapRepos(rawRepos);
    const privateRepos = repos.filter((r) => r.isPrivate).length;
    const totalRepos = repos.length;

    const commitCounts = await Promise.all(repos.map((r) => fetchRepoCommitCount(r.name)));
    const totalCommits = commitCounts.reduce((a, b) => a + b, 0);

    return {
      login: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      totalRepos: authenticated ? totalRepos : user.public_repos,
      privateRepos: authenticated ? privateRepos : 0,
      followers: user.followers,
      following: user.following,
      createdAt: user.created_at,
      totalCommits,
      totalContributions: contributionData.totalContributions,
      restrictedContributions: contributionData.restrictedContributions,
      includesPrivateData:
        authenticated &&
        (privateRepos > 0 || (contributionData.restrictedContributions ?? 0) > 0),
      contributionDays: contributionData.contributionDays,
      repos,
    };
  } catch {
    return fallbackProfile;
  }
}
