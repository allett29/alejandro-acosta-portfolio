"use client";

import { skillGroups } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const accentMap = {
  cyan: {
    border: "hover:border-neon-cyan/50",
    badge: "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]",
  },
  magenta: {
    border: "hover:border-neon-magenta/50",
    badge: "border-neon-magenta/30 bg-neon-magenta/10 text-neon-magenta",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,0,170,0.15)]",
  },
  purple: {
    border: "hover:border-neon-purple/50",
    badge: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple",
    glow: "group-hover:shadow-[0_0_30px_rgba(176,38,255,0.15)]",
  },
};

export function Skills() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="stack" eyebrow="02 · Tecnologías" title="Stack" />

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const accent = accentMap[group.color];
            return (
              <motion.article
                key={group.title}
                className={cn(
                  "group glass-panel rounded-2xl border border-white/10 p-6 transition-all duration-300",
                  accent.border,
                  accent.glow,
                )}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <h3 className="font-display text-xl font-bold text-white">{group.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill, si) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.05 + si * 0.03 }}
                    >
                      <span
                        className={cn(
                          "inline-block rounded-full border px-3 py-1 text-xs font-medium",
                          accent.badge,
                        )}
                      >
                        {skill}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
