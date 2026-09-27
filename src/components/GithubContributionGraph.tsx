"use client";

import type { ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function levelClass(count: number): string {
  if (count <= 0) return "bg-white/[0.06]";
  if (count <= 2) return "bg-neon-cyan/30 shadow-[0_0_6px_rgba(0,245,255,0.2)]";
  if (count <= 5) return "bg-neon-cyan/50 shadow-[0_0_8px_rgba(0,245,255,0.35)]";
  if (count <= 9) return "bg-neon-cyan/70 shadow-[0_0_10px_rgba(0,245,255,0.45)]";
  return "bg-neon-cyan shadow-[0_0_12px_rgba(0,245,255,0.6)]";
}

type Props = {
  days: ContributionDay[];
  total: number | null;
};

export function GithubContributionGraph({ days, total }: Props) {
  if (days.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-zinc-500">
        Contribution data unavailable. Check GITHUB_TOKEN or try again later.
      </div>
    );
  }

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < sorted.length; i += 7) {
    weeks.push(sorted.slice(i, i + 7));
  }

  const maxWeeks = weeks.length;
  const chartDays = sorted.slice(-84);
  const maxCount = Math.max(1, ...chartDays.map((d) => d.count));
  const width = 100;
  const height = 48;
  const points = chartDays.map((d, i) => {
    const x = (i / Math.max(chartDays.length - 1, 1)) * width;
    const y = height - (d.count / maxCount) * (height - 4);
    return `${x},${y}`;
  });
  const linePath = points.length > 1 ? `M ${points.join(" L ")}` : "";
  const areaPath =
    points.length > 1 ? `${linePath} L ${width},${height} L 0,${height} Z` : "";

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-display text-sm font-semibold text-white">Activity graph</p>
            <p className="text-xs text-zinc-500">Last ~12 months (from GitHub API)</p>
          </div>
          {total !== null && (
            <p className="font-mono text-xs text-neon-cyan">
              {total.toLocaleString()} contributions
            </p>
          )}
        </div>
        {linePath && (
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-28 w-full text-neon-cyan"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,245,255,0.35)" />
                <stop offset="100%" stopColor="rgba(0,245,255,0)" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#activityFill)" />
            <motion.path
              d={linePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
        <p className="mb-3 font-display text-sm font-semibold text-white">Contribution calendar</p>
        <div
          className="contribution-scroll overflow-x-auto overflow-y-hidden pb-2"
          role="region"
          aria-label="Contribution calendar — scroll horizontally"
        >
        <div className="flex gap-[3px]" style={{ minWidth: maxWeeks * 14 }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.count} contributions`}
                  className={cn("h-2.5 w-2.5 rounded-sm sm:h-3 sm:w-3", levelClass(day.count))}
                />
              ))}
            </div>
          ))}
        </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-zinc-500">
          <span>Less</span>
          {[0, 2, 5, 9, 12].map((n) => (
            <div key={n} className={cn("h-2.5 w-2.5 rounded-sm", levelClass(n))} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
