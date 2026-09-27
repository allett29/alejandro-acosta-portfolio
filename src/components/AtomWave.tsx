"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

type Accent = "cyan" | "magenta" | "purple";

const accentStyles: Record<
  Accent,
  { ring: string; core: string; ripple: string }
> = {
  cyan: {
    ring: "border-neon-cyan/55",
    core: "bg-neon-cyan shadow-[0_0_14px_#00f5ff]",
    ripple: "border-neon-cyan/35",
  },
  magenta: {
    ring: "border-neon-magenta/50",
    core: "bg-neon-magenta shadow-[0_0_14px_#ff00aa]",
    ripple: "border-neon-magenta/30",
  },
  purple: {
    ring: "border-neon-purple/50",
    core: "bg-neon-purple shadow-[0_0_14px_#b026ff]",
    ripple: "border-neon-purple/30",
  },
};

type Props = {
  active?: boolean;
  hover?: boolean;
  accent?: Accent;
  size?: "sm" | "md";
};

export function AtomWave({ active = false, hover = false, accent = "cyan", size = "sm" }: Props) {
  const reduceMotion = useReducedMotion();
  const styles = accentStyles[accent];
  const energized = active || hover;
  const box = size === "sm" ? "h-9 w-9" : "h-12 w-12";

  if (reduceMotion) {
    return (
      <div className={cn("relative shrink-0", box)}>
        <div className={cn("absolute inset-1 rounded-full border", styles.ring)} />
        <div className={cn("absolute inset-[38%] rounded-full", styles.core)} />
      </div>
    );
  }

  return (
    <div className={cn("relative shrink-0", box)} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className={cn("absolute inset-0 rounded-full border", styles.ripple)}
          animate={
            energized
              ? {
                  scale: [1, 1.35 + i * 0.15, 1.55 + i * 0.2],
                  opacity: [0.55 - i * 0.08, 0.25, 0],
                }
              : { scale: 1, opacity: 0 }
          }
          transition={{
            duration: 2.2,
            repeat: energized ? Infinity : 0,
            ease: "easeOut",
            delay: i * 0.35,
          }}
        />
      ))}

      <motion.span
        className={cn("absolute inset-[18%] rounded-full border border-dashed border-white/15")}
        animate={energized ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: active ? 8 : 14, repeat: Infinity, ease: "linear" }}
      />

      <span className={cn("absolute inset-[22%] rounded-full border", styles.ring)} />

      <motion.span
        className={cn("absolute inset-[40%] rounded-full", styles.core)}
        animate={
          energized
            ? { scale: [1, 1.15, 1], opacity: [1, 0.85, 1] }
            : { scale: 1, opacity: 0.9 }
        }
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
