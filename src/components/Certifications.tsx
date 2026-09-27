"use client";

import { certifications } from "@/data/skills-matrix";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Award, Bot, GitBranch, Shield, Workflow } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const iconFor = (title: string) => {
  if (title.includes("Scrum") || title.includes("CI/CD")) return GitBranch;
  if (title.includes("n8n") || title.includes("Automation")) return Workflow;
  if (title.includes("Cyber")) return Shield;
  if (title.includes("AI") || title.includes("Machine") || title.includes("Vision"))
    return Bot;
  return Award;
};

export function Certifications() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="certifications"
          eyebrow="03 · Credentials"
          title="Certifications"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const Icon = iconFor(cert.title);
            return (
              <motion.article
                key={cert.title}
                className={cn(
                  "group glass-panel rounded-2xl border border-white/10 p-5 transition-colors hover:border-neon-purple/40",
                )}
                initial={{ opacity: 0, y: 28, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (i % 6) * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-purple/10 text-neon-purple transition-colors group-hover:bg-neon-magenta/15 group-hover:text-neon-magenta">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold text-white sm:text-lg">
                      {cert.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{cert.focus}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
