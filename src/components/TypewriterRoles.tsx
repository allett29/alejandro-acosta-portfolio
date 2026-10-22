"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { useEffect, useMemo, useState } from "react";
import { TypeAnimation } from "react-type-animation";

/** Evita mismatch SSR: el typewriter solo corre tras montar en el cliente. */
export function TypewriterRoles() {
  const { dict } = useLocale();
  const typewriterRoles = dict.typewriterRoles;
  const sequence = useMemo(
    () => typewriterRoles.flatMap((role) => [role, 1800] as const),
    [typewriterRoles],
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span className="text-neon-cyan/90" aria-hidden>
        {typewriterRoles[0]}
      </span>
    );
  }

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={40}
      repeat={Infinity}
      cursor
    />
  );
}
