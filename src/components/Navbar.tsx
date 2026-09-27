"use client";

import { navLinks, site } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6",
        scrolled && "pt-3",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled
            ? "glass-panel border-white/10 shadow-[0_0_40px_rgba(0,245,255,0.08)]"
            : "border-transparent bg-transparent",
        )}
      >
        <Link
          href="#inicio"
          className="font-display text-lg font-bold tracking-wide text-white"
          onClick={() => setOpen(false)}
        >
          <span className="text-neon-cyan">&lt;</span>
          AA
          <span className="text-neon-magenta">/&gt;</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-neon-cyan"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/cv-alejandro-acosta.pdf"
              target="_blank"
              className="neon-btn ml-2 inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium"
            >
              CV
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex rounded-lg border border-white/10 p-2 text-zinc-300 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel neon-border-cyan mx-auto mt-2 max-w-6xl rounded-2xl border p-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-zinc-200"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/cv-alejandro-acosta.pdf"
                target="_blank"
                className="neon-btn mt-2 block rounded-lg px-3 py-3 text-center font-medium"
                onClick={() => setOpen(false)}
              >
                Descargar CV
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
