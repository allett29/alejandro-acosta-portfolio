"use client";

import { education, profile } from "@/data/portfolio";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="about" eyebrow="01 · Profile" title="About" />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            className="glass-panel neon-border-cyan rounded-2xl border p-6 sm:p-8"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center gap-2 text-neon-cyan">
              <Sparkles size={18} />
              <span className="font-mono text-xs uppercase tracking-widest">
                Professional summary
              </span>
            </div>
            <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">{profile}</p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {education.map((edu) => (
              <div
                key={edu.title}
                className="glass-panel rounded-2xl border border-white/10 p-5 transition-colors hover:border-neon-magenta/40"
              >
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-magenta/10 text-neon-magenta">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{edu.title}</h3>
                    <p className="text-sm text-zinc-400">{edu.place}</p>
                    {edu.period && (
                      <p className="mt-1 font-mono text-xs text-neon-cyan/80">{edu.period}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
