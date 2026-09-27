"use client";

import { experience } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="experience"
          eyebrow="05 · Career"
          title="Experience"
        />

        <div className="relative">
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-gradient-to-b from-neon-cyan/80 via-neon-magenta/50 to-transparent md:left-1/2 md:-translate-x-px" />

          <ul className="space-y-10">
            {experience.map((job, i) => (
              <motion.li
                key={`${job.company}-${job.period}`}
                className="relative md:grid md:grid-cols-2 md:gap-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <div
                  className={`mb-4 md:mb-0 ${i % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}
                >
                  <span className="font-mono text-sm text-neon-cyan">{job.period}</span>
                  <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                    {job.mode}
                  </p>
                </div>

                <div
                  className={`md:row-start-1 ${i % 2 === 0 ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`}
                >
                  <div className="glass-panel group relative ml-8 rounded-2xl border border-white/10 p-6 transition-all hover:border-neon-cyan/40 md:ml-0">
                    <span className="absolute -left-[29px] top-6 flex h-5 w-5 items-center justify-center rounded-full border-2 border-neon-cyan bg-[#050508] md:left-auto md:-translate-x-1/2 md:odd:left-1/2">
                      <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_12px_#00f5ff]" />
                    </span>

                    <div className="flex items-start gap-3">
                      <div className="hidden rounded-lg bg-neon-magenta/10 p-2 text-neon-magenta sm:block">
                        <Briefcase size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg font-bold text-white">
                          {job.role}
                        </h3>
                        <p className="text-neon-magenta/90">{job.company}</p>
                        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-400">
                          {job.highlights.map((h) => (
                            <li key={h} className="flex gap-2">
                              <span className="text-neon-cyan">▹</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        {"link" in job && job.link && (
                          <Link
                            href={job.link}
                            target="_blank"
                            className="mt-4 inline-flex items-center gap-1 text-sm text-neon-cyan hover:underline"
                          >
                            View site <ExternalLink size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
