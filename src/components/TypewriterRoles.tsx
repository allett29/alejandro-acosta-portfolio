"use client";

import { typewriterRoles } from "@/data/portfolio";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const sequence = typewriterRoles.flatMap((role) => [role, 1800] as const);

/** Evita mismatch SSR: el typewriter solo corre tras montar en el cliente. */
export function TypewriterRoles() {
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
