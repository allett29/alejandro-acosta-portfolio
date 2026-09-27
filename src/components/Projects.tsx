"use client";

import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { IconGitHub } from "@/components/icons/BrandIcons";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MouseEvent } from "react";
import { SectionHeading } from "./SectionHeading";

const accentStyles = {
  cyan: {
    ring: "from-neon-cyan/20",
    title: "group-hover:text-neon-cyan",
    dot: "bg-neon-cyan shadow-[0_0_10px_#00f5ff]",
  },
  magenta: {
    ring: "from-neon-magenta/20",
    title: "group-hover:text-neon-magenta",
    dot: "bg-neon-magenta shadow-[0_0_10px_#ff00aa]",
  },
  purple: {
    ring: "from-neon-purple/20",
    title: "group-hover:text-neon-purple",
    dot: "bg-neon-purple shadow-[0_0_10px_#b026ff]",
  },
  green: {
    ring: "from-neon-green/20",
    title: "group-hover:text-neon-green",
    dot: "bg-neon-green shadow-[0_0_10px_#39ff14]",
  },
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const styles = accentStyles[project.accent];
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function onMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(0,245,255,0.12), transparent 55%)`;

  const primaryHref = project.href ?? project.github;

  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8",
        project.featured && "md:col-span-2",
      )}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onMouseMove={onMove}
      whileHover={{ y: -6 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br to-transparent blur-2xl",
          styles.ring,
        )}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            {project.featured && (
              <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
                Destacado
              </span>
            )}
            <h3
              className={cn(
                "font-display text-2xl font-bold text-white transition-colors",
                styles.title,
              )}
            >
              {project.title}
            </h3>
          </div>
          <span className={cn("mt-2 h-2 w-2 shrink-0 rounded-full", styles.dot)} />
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400 sm:text-base">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-black/30 px-2 py-1 font-mono text-[11px] text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.href && (
            <Link
              href={project.href}
              target="_blank"
              className="neon-btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
            >
              Live demo <ArrowUpRight size={16} />
            </Link>
          )}
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              className="neon-btn-ghost inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
            >
              <IconGitHub className="h-4 w-4" /> GitHub
            </Link>
          )}
          {!primaryHref && (
            <span className="text-sm text-zinc-500">Private / institutional project</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="projects" eyebrow="06 · Selected work" title="Projects" />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
