"use client";

import { site } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";

export function Footer() {
  const year = new Date().getFullYear();
  const { dict } = useLocale();

  return (
    <footer className="border-t border-white/5 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm text-zinc-500 sm:flex-row sm:text-left">
        <p>
          © {year}{" "}
          <span className="text-zinc-400">{site.shortName}</span>
          <span className="mx-2 text-neon-cyan/50">·</span>
          {dict.footer.builtWith}
        </p>
        <p className="font-mono text-xs tracking-wider text-neon-magenta/60">
          {dict.footer.neonMode}
        </p>
      </div>
    </footer>
  );
}
