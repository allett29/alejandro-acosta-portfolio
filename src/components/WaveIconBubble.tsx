"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Accent = "cyan" | "magenta" | "purple";

const accentMap: Record<
  Accent,
  { bubble: string; icon: string; ripple: string }
> = {
  cyan: {
    bubble: "border-neon-cyan/50 bg-neon-cyan/10 shadow-[0_0_20px_rgba(0,245,255,0.25)]",
    icon: "text-neon-cyan",
    ripple: "border-neon-cyan/40",
  },
  magenta: {
    bubble: "border-neon-magenta/45 bg-neon-magenta/10 shadow-[0_0_20px_rgba(255,0,170,0.2)]",
    icon: "text-neon-magenta",
    ripple: "border-neon-magenta/35",
  },
  purple: {
    bubble: "border-neon-purple/45 bg-neon-purple/10 shadow-[0_0_20px_rgba(176,38,255,0.22)]",
    icon: "text-neon-purple",
    ripple: "border-neon-purple/35",
  },
};

type Props = {
  icon?: LucideIcon;
  children?: ReactNode;
  accent: Accent;
  waveIndex: number;
  energized: boolean;
  size?: number;
};

export function WaveIconBubble({
  icon: Icon,
  children,
  accent,
  waveIndex,
  energized,
  size = 40,
}: Props) {
  const reduceMotion = useReducedMotion();
  const styles = accentMap[accent];
  const phase = waveIndex * 0.55;

  return (
    <motion.div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -5, 0, 4, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: phase,
            }
      }
    >
      {[0, 1, 2].map((ring) => (
        <motion.span
          key={ring}
          className={cn("absolute inset-0 rounded-full border", styles.ripple)}
          animate={
            energized
              ? {
                  scale: [1, 1.25 + ring * 0.12, 1.45 + ring * 0.15],
                  opacity: [0.5 - ring * 0.1, 0.15, 0],
                }
              : { scale: 1, opacity: 0 }
          }
          transition={{
            duration: 1.8,
            repeat: energized ? Infinity : 0,
            ease: "easeOut",
            delay: ring * 0.28,
          }}
        />
      ))}

      <motion.span
        className={cn(
          "relative flex items-center justify-center rounded-full border backdrop-blur-md",
          styles.bubble,
        )}
        style={{ width: size, height: size }}
        animate={{
          scale: energized ? 1.08 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      >
        {children ??
          (Icon ? <Icon className={cn("h-[18px] w-[18px]", styles.icon)} strokeWidth={2} /> : null)}
      </motion.span>
    </motion.div>
  );
}
