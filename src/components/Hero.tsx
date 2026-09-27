"use client";

import { site, typewriterRoles } from "@/data/portfolio";
import { motion } from "framer-motion";
import { IconGitHub, IconLinkedIn } from "@/components/icons/BrandIcons";
import { ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center px-4 pb-20 pt-32 sm:px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="font-mono text-sm uppercase tracking-[0.4em] text-neon-magenta/90"
            >
              {site.location}
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {site.shortName.split(" ").map((word, i) => (
                <span key={word} className="block sm:inline">
                  {i === 1 ? (
                    <span className="neon-text-gradient">{word}</span>
                  ) : (
                    <span>{word} </span>
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p variants={item} className="mt-4 text-lg text-zinc-400 sm:text-xl">
              {site.role}
              <span className="text-neon-cyan"> · </span>
              {site.tagline}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 flex min-h-[2.5rem] items-center font-mono text-base text-neon-cyan sm:text-lg"
            >
              <TypeAnimation
                sequence={typewriterRoles.flatMap((role) => [role, 1800])}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                cursor
              />
            </motion.div>

            <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="neon-btn-primary rounded-xl px-6 py-3 text-sm font-semibold"
              >
                View projects
              </Link>
              <Link
                href="#contact"
                className="neon-btn-ghost rounded-xl border px-6 py-3 text-sm font-semibold"
              >
                Contact
              </Link>
              <Link
                href="/cv-alejandro-acosta.pdf?v=2026-09"
                target="_blank"
                className="neon-btn-ghost rounded-xl border px-6 py-3 text-sm font-semibold"
              >
                CV PDF
              </Link>
            </motion.div>

            <motion.div variants={item} className="mt-12 flex gap-4">
              <SocialIcon href={site.github} label="GitHub" icon={IconGitHub} />
              <SocialIcon href={site.linkedin} label="LinkedIn" icon={IconLinkedIn} />
              <SocialIcon href={`mailto:${site.email}`} label="Email" icon={Mail} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex w-full max-w-sm justify-center lg:mx-0 lg:justify-end"
          >
            <div className="relative w-full max-w-[17.5rem] sm:max-w-[19rem] lg:max-w-[20rem]">
              <div
                className="pointer-events-none absolute -inset-2 rounded-[1.35rem] opacity-80 blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,245,255,0.45), rgba(255,0,170,0.35), rgba(176,38,255,0.4))",
                }}
                aria-hidden
              />
              <div className="neon-border-gradient relative overflow-hidden rounded-[1.25rem] border p-[2px]">
                <Image
                  src="/foto.jpg"
                  alt={`${site.shortName} — professional photo`}
                  width={640}
                  height={800}
                  priority
                  className="relative aspect-[4/5] w-full rounded-[1.15rem] object-cover object-top"
                  sizes="(max-width: 1024px) 280px, 320px"
                />
              </div>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 lg:text-right">
                {site.role}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neon-cyan/70"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <ArrowDown size={28} />
      </motion.a>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      className="glass-panel flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-zinc-300 transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
      whileHover={{ scale: 1.08, boxShadow: "0 0 24px rgba(0,245,255,0.35)" }}
      whileTap={{ scale: 0.96 }}
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  );
}
