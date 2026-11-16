"use client";

import { site } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { motion } from "framer-motion";
import { IconGitHub, IconLinkedIn } from "@/components/icons/BrandIcons";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";

const links = [
  { href: `mailto:${site.email}`, label: site.email, icon: Mail },
  { href: `tel:${site.phone.replace(/\s/g, "")}`, label: site.phone, icon: Phone },
  { href: site.linkedin, label: "LinkedIn", icon: IconLinkedIn },
  { href: site.github, label: "GitHub", icon: IconGitHub },
];

export function Contact() {
  const { dict } = useLocale();
  const { sections, meta } = dict;

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="contact"
          eyebrow={sections.contact.eyebrow}
          title={sections.contact.title}
        />

        <motion.div
          className="neon-border-gradient relative overflow-hidden rounded-3xl border p-[1px]"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-panel rounded-[23px] p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-lg text-zinc-300 sm:text-xl">
                  {sections.contact.intro}
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                  <MapPin size={16} className="text-neon-magenta" />
                  {site.location}
                </p>
              </div>

              <ul className="space-y-3">
                {links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-4 transition-all hover:border-neon-cyan/50 hover:bg-neon-cyan/5"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
                        <link.icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm text-zinc-200 sm:text-base">{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-4 sm:justify-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`mailto:${site.email}?subject=${encodeURIComponent(meta.contactEmailSubject)}`}
                className="neon-btn-primary rounded-xl px-8 py-3 text-sm font-semibold"
              >
                {sections.contact.sendEmail}
              </Link>
              <Link
                href="/cv-alejandro-acosta.pdf?v=2026-11"
                target="_blank"
                className="neon-btn-ghost rounded-xl border px-8 py-3 text-sm font-semibold"
              >
                {sections.contact.downloadCv}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
