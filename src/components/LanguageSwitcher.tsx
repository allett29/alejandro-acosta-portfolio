"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/types";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale, dict } = useLocale();

  return (
    <div
      className="fixed right-4 top-4 z-[70] flex items-center gap-1 rounded-xl border border-white/10 bg-black/60 p-1 shadow-[0_0_24px_rgba(0,245,255,0.12)] backdrop-blur-md sm:right-6 sm:top-5"
      role="group"
      aria-label={dict.languageSwitcher.label}
    >
      {(["en", "es"] as const satisfies Locale[]).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={cn(
              "min-w-[2.75rem] rounded-lg px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors",
              active
                ? "bg-neon-cyan/15 text-neon-cyan shadow-[0_0_16px_rgba(0,245,255,0.25)]"
                : "text-zinc-400 hover:text-zinc-200",
            )}
          >
            {dict.languageSwitcher[code]}
          </button>
        );
      })}
    </div>
  );
}
