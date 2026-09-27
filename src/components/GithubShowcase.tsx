"use client";

import type { GithubProfile } from "@/lib/github";
import { motion } from "framer-motion";
import { Calendar, GitCommit, GitFork, Lock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GithubContributionGraph } from "./GithubContributionGraph";
import { GithubStatsPanel } from "./GithubStatsPanel";
import { IconGitHub } from "./icons/BrandIcons";
import { SectionHeading } from "./SectionHeading";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: typeof GitCommit;
}) {
  return (
    <div className="glass-panel rounded-xl border border-white/10 p-4">
      <div className="flex items-center gap-2 text-neon-cyan">
        <Icon size={16} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          {label}
        </span>
      </div>
      <p className="font-display mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

type Props = {
  data: GithubProfile;
};

export function GithubShowcase({ data }: Props) {
  const memberSince = new Date(data.createdAt).getFullYear();
  const contributionsLabel =
    data.totalContributions !== null ? data.totalContributions : "—";

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="github" eyebrow="04 · Open source" title="GitHub activity" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-panel flex items-center gap-4 rounded-2xl border border-white/10 p-5">
              <Image
                src={data.avatarUrl}
                alt={`${data.login} GitHub avatar`}
                width={72}
                height={72}
                className="rounded-full border border-neon-cyan/30 shadow-[0_0_24px_rgba(0,245,255,0.25)]"
              />
              <div>
                <p className="font-display text-xl font-bold text-white">@{data.login}</p>
                <p className="text-sm text-zinc-500">{data.followers} followers</p>
                <Link
                  href={data.profileUrl}
                  target="_blank"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-neon-cyan hover:underline"
                >
                  <IconGitHub className="h-4 w-4" /> View profile
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label={data.includesPrivateData ? "Total repos" : "Public repos"}
                value={data.includesPrivateData ? data.totalRepos : data.publicRepos}
                icon={GitFork}
              />
              <StatCard label="Commits (all repos)" value={data.totalCommits} icon={GitCommit} />
              <StatCard label="Contributions (12 mo.)" value={contributionsLabel} icon={Calendar} />
              <StatCard
                label={data.includesPrivateData ? "Private repos" : "Followers"}
                value={data.includesPrivateData ? data.privateRepos : data.followers}
                icon={data.includesPrivateData ? Lock : Users}
              />
            </div>

            <GithubStatsPanel
              totalRepos={data.totalRepos}
              publicRepos={data.publicRepos}
              privateRepos={data.privateRepos}
              totalCommits={data.totalCommits}
              totalContributions={data.totalContributions}
              includesPrivateData={data.includesPrivateData}
            />

            <p className="text-xs text-zinc-500">
              GitHub member since {memberSince}. Stats refresh hourly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GithubContributionGraph
              days={data.contributionDays}
              total={data.totalContributions}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
