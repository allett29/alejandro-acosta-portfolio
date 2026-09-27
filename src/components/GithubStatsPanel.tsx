"use client";

import type { GithubProfile } from "@/lib/github";
import { motion } from "framer-motion";
import { Calendar, GitCommit, GitFork, Lock } from "lucide-react";

type Props = Pick<
  GithubProfile,
  | "totalRepos"
  | "publicRepos"
  | "privateRepos"
  | "totalCommits"
  | "totalContributions"
  | "includesPrivateData"
>;

export function GithubStatsPanel({
  totalRepos,
  publicRepos,
  privateRepos,
  totalCommits,
  totalContributions,
  includesPrivateData,
}: Props) {
  const items = [
    {
      label: includesPrivateData ? "Total repos" : "Public repos",
      value: includesPrivateData ? totalRepos : publicRepos,
      icon: GitFork,
      max: Math.max(totalRepos, publicRepos, 1),
    },
    {
      label: "Commits",
      value: totalCommits,
      icon: GitCommit,
      max: Math.max(totalCommits, 1),
    },
    {
      label: "Contributions",
      value: totalContributions ?? 0,
      icon: Calendar,
      max: Math.max(totalContributions ?? 0, 1),
    },
    ...(includesPrivateData
      ? [
          {
            label: "Private repos",
            value: privateRepos,
            icon: Lock,
            max: Math.max(privateRepos, 1),
          },
        ]
      : []),
  ];

  return (
    <div className="glass-panel rounded-2xl border border-white/10 p-5">
      <p className="font-display text-sm font-semibold text-neon-cyan">GitHub stats</p>
      <p className="mt-1 text-xs text-zinc-500">Live data from your account</p>
      <ul className="mt-4 space-y-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          const pct = Math.min(100, Math.round((Number(item.value) / item.max) * 100));
          return (
            <li key={item.label}>
              <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 text-zinc-400">
                  <Icon size={14} className="text-neon-magenta" />
                  {item.label}
                </span>
                <span className="font-display font-bold text-white">
                  {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.08 }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
