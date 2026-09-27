"use client";

import { portalSkillOrbits } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { SkillIcon } from "./SkillIcon";

type Props = {
  index: number;
};

type Accent = "cyan" | "magenta" | "purple";

const skillIconName: Record<string, string> = {
  Tailwind: "Tailwind CSS",
};

function resolveSkillName(label: string) {
  return skillIconName[label] ?? label;
}

/** Ellipse radii in px (2D atom — no perspective squash) */
const ORBIT_RX = 108;
const ORBIT_RY = 44;

const ORBIT_PLANES: { rotateZ: number; duration: number; phase: number }[] = [
  { rotateZ: 0, duration: 22, phase: 0 },
  { rotateZ: 60, duration: 26, phase: (Math.PI * 2) / 3 },
  { rotateZ: -60, duration: 30, phase: (Math.PI * 4) / 3 },
];

function accentStroke(accent: Accent) {
  if (accent === "cyan") return { stroke: "rgba(0,245,255,0.8)", glow: "rgba(0,245,255,0.5)" };
  if (accent === "magenta") return { stroke: "rgba(255,0,170,0.75)", glow: "rgba(255,0,170,0.45)" };
  return { stroke: "rgba(176,38,255,0.78)", glow: "rgba(176,38,255,0.48)" };
}

function ProtonIcon({ skill, accent }: { skill: string; accent: Accent }) {
  const border =
    accent === "cyan"
      ? "border-neon-cyan/55 shadow-[0_0_22px_rgba(0,245,255,0.35)]"
      : accent === "magenta"
        ? "border-neon-magenta/50 shadow-[0_0_22px_rgba(255,0,170,0.28)]"
        : "border-neon-purple/50 shadow-[0_0_22px_rgba(176,38,255,0.3)]";

  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-[#050508]/95 backdrop-blur-md md:h-12 md:w-12",
        border,
      )}
      title={skill}
    >
      <SkillIcon name={resolveSkillName(skill)} className="h-6 w-6 md:h-7 md:w-7" />
    </div>
  );
}

function EllipticalOrbit({
  skill,
  accent,
  planeRotation,
  duration,
  phase,
  rx,
  ry,
}: {
  skill: string;
  accent: Accent;
  planeRotation: number;
  duration: number;
  phase: number;
  rx: number;
  ry: number;
}) {
  const { stroke, glow } = accentStroke(accent);
  const pad = 10;
  const w = rx * 2 + pad * 2;
  const h = ry * 2 + pad * 2;
  const cx = rx + pad;
  const cy = ry + pad;

  const theta = useMotionValue(phase);

  useEffect(() => {
    theta.set(phase);
    const controls = animate(theta, phase + Math.PI * 2, {
      duration,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [duration, phase, theta]);

  const x = useTransform(theta, (t) => rx * Math.cos(t));
  const y = useTransform(theta, (t) => ry * Math.sin(t));

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        transform: `rotate(${planeRotation}deg)`,
        transformOrigin: "center center",
      }}
    >
      <svg
        className="absolute inset-0 overflow-visible"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        aria-hidden
      >
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          style={{ filter: `drop-shadow(0 0 8px ${glow})` }}
        />
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
        style={{ x, y }}
      >
        <ProtonIcon skill={skill} accent={accent} />
      </motion.div>
    </div>
  );
}

export function SectionPortal({ index }: Props) {
  const reduceMotion = useReducedMotion();
  const skills = portalSkillOrbits[index % portalSkillOrbits.length] ?? portalSkillOrbits[0];

  const accent: Accent = index % 3 === 0 ? "cyan" : index % 3 === 1 ? "magenta" : "purple";
  const { stroke, glow } = accentStroke(accent);

  if (reduceMotion) {
    return <div className="h-20" aria-hidden />;
  }

  return (
    <div
      className="relative z-30 flex min-h-[15rem] items-center justify-center overflow-visible py-10 md:min-h-[17rem] md:py-14"
      aria-hidden
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 md:h-[22rem] md:w-[22rem]">
        <div className="portal-warp absolute inset-0 rounded-full opacity-40" />
        <div
          className={cn(
            "absolute inset-[12%] rounded-full blur-3xl",
            accent === "cyan" && "bg-neon-cyan/12",
            accent === "magenta" && "bg-neon-magenta/10",
            accent === "purple" && "bg-neon-purple/11",
          )}
        />
      </div>

      <motion.div
        className="absolute h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-white/15 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative h-[13.5rem] w-[min(100%,24rem)] md:h-[15rem] md:w-[26rem]">
        {ORBIT_PLANES.map((plane, i) => {
          const skill = skills[i % skills.length];
          if (!skill) return null;
          return (
            <EllipticalOrbit
              key={`${index}-${plane.rotateZ}-${skill}`}
              skill={skill}
              accent={accent}
              planeRotation={plane.rotateZ}
              duration={plane.duration}
              phase={plane.phase}
              rx={ORBIT_RX}
              ry={ORBIT_RY}
            />
          );
        })}

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div
            className="relative flex h-6 w-6 items-center justify-center rounded-full md:h-7 md:w-7"
            style={{ boxShadow: `0 0 22px ${glow}, 0 0 44px ${glow}` }}
          >
            <span
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: stroke, background: "rgba(255,255,255,0.06)" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full md:h-3 md:w-3"
              style={{ background: stroke, boxShadow: `0 0 14px ${glow}` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
