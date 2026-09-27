"use client";

import { navLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Briefcase,
  FileDown,
  FolderKanban,
  Home,
  Layers,
  Mail,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IconGitHub } from "./icons/BrandIcons";
import { WaveIconBubble } from "./WaveIconBubble";

const accents = ["cyan", "magenta", "purple"] as const;

const iconByLabel: Record<string, LucideIcon> = {
  Home,
  About: User,
  Skills: Layers,
  Certs: Award,
  Experience: Briefcase,
  Projects: FolderKanban,
  Contact: Mail,
};

type DockNavProps = {
  onNavigate?: () => void;
};

function WaveLabelPill({ label, accent, active }: { label: string; accent: (typeof accents)[number]; active: boolean }) {
  const border =
    accent === "cyan"
      ? "border-neon-cyan/40"
      : accent === "magenta"
        ? "border-neon-magenta/35"
        : "border-neon-purple/35";

  return (
    <motion.span
      initial={{ scaleX: 0, opacity: 0, x: -12 }}
      animate={{ scaleX: 1, opacity: 1, x: 0 }}
      exit={{ scaleX: 0, opacity: 0, x: -12 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={{ originX: 0 }}
      className={cn(
        "inline-flex origin-left items-center rounded-full border bg-black/35 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider backdrop-blur-sm",
        border,
        active ? "text-neon-cyan" : "text-zinc-100",
      )}
    >
      <motion.span
        animate={{
          textShadow: [
            "0 0 8px rgba(0,245,255,0.2)",
            "0 0 16px rgba(0,245,255,0.45)",
            "0 0 8px rgba(0,245,255,0.2)",
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {label}
      </motion.span>
    </motion.span>
  );
}

function DockNav({ onNavigate }: DockNavProps) {
  const [activeId, setActiveId] = useState("home");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const observeSections = useCallback(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.45] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = observeSections();
    window.addEventListener("hashchange", observeSections);
    return () => {
      cleanup?.();
      window.removeEventListener("hashchange", observeSections);
    };
  }, [observeSections]);

  return (
    <nav
      className="flex h-full min-h-dvh w-full flex-col justify-between bg-transparent py-8 pl-3 pr-2"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <ul className="flex flex-1 flex-col justify-evenly">
        {navLinks.map((link, index) => {
          const id = link.href.replace("#", "");
          const active = activeId === id;
          const hovered = hoveredIndex === index;
          const expanded = hovered || active;
          const accent = accents[index % accents.length];
          const bubbleSize = expanded ? 48 : 42;
          const isGitHub = link.label === "GitHub";

          return (
            <motion.li
              key={link.href}
              layout
              className="relative flex items-center"
              style={{ zIndex: expanded ? 50 : 10 - index }}
              animate={{
                scale: reduceMotion ? 1 : expanded ? 1.18 : 0.92,
                x: expanded ? 4 : 0,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
            >
              <Link
                href={link.href}
                onClick={() => {
                  setActiveId(id);
                  onNavigate?.();
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                className="relative flex items-center"
              >
                <WaveIconBubble
                  accent={accent}
                  waveIndex={index}
                  energized={expanded}
                  size={bubbleSize}
                  icon={isGitHub ? undefined : (iconByLabel[link.label] ?? Home)}
                >
                  {isGitHub ? (
                    <IconGitHub className="h-[18px] w-[18px] text-neon-cyan" />
                  ) : undefined}
                </WaveIconBubble>

                <AnimatePresence mode="wait">
                  {expanded && (
                    <motion.div
                      className="ml-2 overflow-visible"
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <WaveLabelPill label={link.label} accent={accent} active={active} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.li>
          );
        })}
      </ul>

      <Link
        href="/cv-alejandro-acosta.pdf"
        target="_blank"
        className="mb-2 flex items-center justify-start"
      >
        <WaveIconBubble
          accent="cyan"
          waveIndex={0}
          energized={false}
          size={42}
          icon={FileDown}
        />
      </Link>
    </nav>
  );
}

export function SidebarNav() {
  return (
    <aside className="pointer-events-auto fixed inset-y-0 left-0 z-[60] w-[4.5rem] md:w-20">
      <DockNav />
    </aside>
  );
}
