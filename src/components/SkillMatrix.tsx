"use client";

import { skillCategories, spokenLanguages, type SkillCategory } from "@/data/skills-matrix";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { SkillIcon } from "./SkillIcon";

const TAB_DWELL_MS = 4800;

const accentMap = {
  cyan: {
    tab: "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan",
    badge: "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan",
    glow: "shadow-[0_0_40px_rgba(0,245,255,0.12)]",
    line: "from-neon-cyan via-neon-cyan/80 to-neon-magenta/90",
    dot: "bg-neon-cyan shadow-[0_0_10px_#00f5ff]",
  },
  magenta: {
    tab: "border-neon-magenta/50 bg-neon-magenta/10 text-neon-magenta",
    badge: "border-neon-magenta/30 bg-neon-magenta/10 text-neon-magenta",
    glow: "shadow-[0_0_40px_rgba(255,0,170,0.1)]",
    line: "from-neon-magenta via-neon-magenta/80 to-neon-purple/90",
    dot: "bg-neon-magenta shadow-[0_0_10px_#ff00aa]",
  },
  purple: {
    tab: "border-neon-purple/50 bg-neon-purple/10 text-neon-purple",
    badge: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple",
    glow: "shadow-[0_0_40px_rgba(176,38,255,0.12)]",
    line: "from-neon-purple via-neon-purple/80 to-neon-cyan/90",
    dot: "bg-neon-purple shadow-[0_0_10px_#b026ff]",
  },
  green: {
    tab: "border-neon-green/50 bg-neon-green/10 text-neon-green",
    badge: "border-neon-green/30 bg-neon-green/10 text-neon-green",
    glow: "shadow-[0_0_40px_rgba(57,255,20,0.1)]",
    line: "from-neon-green via-neon-green/80 to-neon-cyan/90",
    dot: "bg-neon-green shadow-[0_0_10px_#39ff14]",
  },
};

function SkillPanel({ category }: { category: SkillCategory }) {
  const accent = accentMap[category.color];
  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn("glass-panel neon-border-cyan rounded-2xl border p-6 sm:p-8", accent.glow)}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">{category.subtitle}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {category.items.map((skill, i) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className={cn(
                "inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-xs font-medium sm:gap-3 sm:px-4 sm:text-sm",
                accent.badge,
              )}
            >
              <SkillIcon name={skill} className="h-6 w-6 sm:h-7 sm:w-7" />
              {skill}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

const LINE_PHASE_END = 0.42;

type TabPoint = { x: number; y: number };
type TabBox = { x: number; y: number; w: number; h: number };

function buildConnectorPath(points: TabPoint[]) {
  if (points.length < 2) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function buildProgressLinePath(
  points: TabPoint[],
  segmentIndex: number,
  segmentT: number,
) {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  const seg = Math.max(0, Math.min(segmentIndex, points.length - 2));
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < seg; i++) {
    const p = points[i + 1]!;
    d += ` L ${p.x} ${p.y}`;
  }
  const from = points[seg]!;
  const to = points[seg + 1] ?? from;
  const t = Math.max(0, Math.min(1, segmentT));
  d += ` L ${from.x + (to.x - from.x) * t} ${from.y + (to.y - from.y) * t}`;
  return d;
}

function pillOutlinePath(box: TabBox) {
  const r = box.h / 2;
  const x = box.x;
  const y = box.y;
  const w = box.w;
  const h = box.h;
  return `
    M ${x + r} ${y}
    H ${x + w - r}
    A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}
    H ${x + r}
    A ${r} ${r} 0 0 1 ${x + r} ${y}
  `;
}

function pillPerimeter(w: number, h: number) {
  if (w <= h) return Math.PI * h;
  return Math.PI * h + 2 * (w - h);
}

const accentFill: Record<SkillCategory["color"], string> = {
  cyan: "#00f5ff",
  magenta: "#ff00aa",
  purple: "#b026ff",
  green: "#39ff14",
};

function tabLabelFill(index: number, activeIndex: number, color: SkillCategory["color"]) {
  if (index === activeIndex) return accentFill[color];
  if (index < activeIndex) return "#d4d4d8";
  return "#a1a1aa";
}

function SkillTabRail({
  activeIndex,
  progress,
  onSelect,
  onPause,
  onResume,
}: {
  activeIndex: number;
  progress: number;
  onSelect: (index: number) => void;
  onPause: () => void;
  onResume: () => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<TabPoint[]>([]);
  const [boxes, setBoxes] = useState<TabBox[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const railRect = rail.getBoundingClientRect();
    const buttons = rail.querySelectorAll<HTMLButtonElement>("[data-skill-tab]");
    const nextPoints: TabPoint[] = [];
    const nextBoxes: TabBox[] = [];
    buttons.forEach((btn) => {
      const r = btn.getBoundingClientRect();
      nextPoints.push({
        x: r.left + r.width / 2 - railRect.left,
        y: r.top + r.height / 2 - railRect.top,
      });
      nextBoxes.push({
        x: r.left - railRect.left,
        y: r.top - railRect.top,
        w: r.width,
        h: r.height,
      });
    });
    setPoints(nextPoints);
    setBoxes(nextBoxes);
    setSvgSize({ w: rail.offsetWidth, h: rail.offsetHeight });
  }, []);

  const layoutReady =
    boxes.length === skillCategories.length && svgSize.w > 0 && svgSize.h > 0;

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const rail = railRef.current;
    const ro = rail ? new ResizeObserver(measure) : null;
    if (rail && ro) ro.observe(rail);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [measure]);

  useLayoutEffect(() => {
    if (layoutReady) measure();
  }, [layoutReady, measure]);

  const pathD = buildConnectorPath(points);
  const linePhaseEnd = activeIndex === 0 ? 0 : LINE_PHASE_END;
  const inLinePhase = progress < linePhaseEnd;
  const lineT = linePhaseEnd > 0 && inLinePhase ? progress / linePhaseEnd : 1;
  const outlineT = inLinePhase ? 0 : (progress - linePhaseEnd) / (1 - linePhaseEnd);

  const activeBox = boxes[activeIndex];
  const activeOutlineD = activeBox ? pillOutlinePath(activeBox) : "";
  const activeOutlineLen = activeBox ? pillPerimeter(activeBox.w, activeBox.h) : 0;

  const progressLineD = (() => {
    if (points.length < 2) return "";
    const p0 = points[0]!;
    if (activeIndex === 0) {
      return inLinePhase ? `M ${p0.x} ${p0.y}` : `M ${p0.x} ${p0.y}`;
    }
    const seg = activeIndex - 1;
    return buildProgressLinePath(points, seg, inLinePhase ? lineT : 1);
  })();

  return (
    <div
      className="relative mb-6"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocus={onPause}
      onBlur={onResume}
    >
      <div
        ref={railRef}
        className={cn(
          "relative w-full",
          !layoutReady && "flex flex-wrap items-center gap-x-3 gap-y-4 sm:gap-x-4",
        )}
        style={layoutReady ? { height: svgSize.h } : undefined}
      >
        {layoutReady && pathD && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            width={svgSize.w}
            height={svgSize.h}
            aria-hidden
          >
            <defs>
              <linearGradient id="skillTabLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="55%" stopColor="#ff00aa" />
                <stop offset="100%" stopColor="#b026ff" />
              </linearGradient>
              <filter id="skillTabGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={pathD}
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {progressLineD && (
              <path
                d={progressLineD}
                fill="none"
                stroke="url(#skillTabLine)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#skillTabGlow)"
              />
            )}

            {boxes.map((box, i) => (
              <rect
                key={`fill-${skillCategories[i]?.id ?? i}`}
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                rx={box.h / 2}
                fill="#050508"
                fillOpacity={0.92}
              />
            ))}

            {boxes.map((box, i) => {
              if (i <= activeIndex) return null;
              return (
                <path
                  key={`idle-${skillCategories[i]?.id ?? i}`}
                  d={pillOutlinePath(box)}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={1.5}
                />
              );
            })}

            {boxes.map((box, i) => {
              if (i >= activeIndex) return null;
              return (
                <path
                  key={`done-${skillCategories[i]?.id ?? i}`}
                  d={pillOutlinePath(box)}
                  fill="none"
                  stroke="url(#skillTabLine)"
                  strokeWidth={2}
                  opacity={0.5}
                />
              );
            })}

            {activeOutlineD && (
              <>
                <path
                  d={activeOutlineD}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={2.5}
                />
                {outlineT > 0 && (
                  <path
                    d={activeOutlineD}
                    fill="none"
                    stroke="url(#skillTabLine)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeDasharray={activeOutlineLen}
                    strokeDashoffset={activeOutlineLen * (1 - outlineT)}
                    filter="url(#skillTabGlow)"
                  />
                )}
              </>
            )}

            {boxes.map((box, i) => {
              const cat = skillCategories[i];
              if (!cat) return null;
              return (
                <text
                  key={`label-${cat.id}`}
                  x={box.x + box.w / 2}
                  y={box.y + box.h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={tabLabelFill(i, activeIndex, cat.color)}
                  className="pointer-events-none select-none font-sans text-[11px] font-medium sm:text-[13px]"
                >
                  {cat.title}
                </text>
              );
            })}
          </svg>
        )}

        {skillCategories.map((cat, index) => {
          const box = boxes[index];
          return (
            <button
              key={cat.id}
              type="button"
              data-skill-tab
              aria-label={layoutReady ? cat.title : undefined}
              onClick={() => onSelect(index)}
              style={
                layoutReady && box
                  ? {
                      position: "absolute",
                      left: box.x,
                      top: box.y,
                      width: box.w,
                      height: box.h,
                    }
                  : undefined
              }
              className={cn(
                layoutReady
                  ? "z-10 m-0 cursor-pointer rounded-full border-0 bg-transparent p-0 opacity-0"
                  : "inline-flex min-h-8 items-center justify-center rounded-full border-0 bg-transparent px-3 py-1.5 text-xs font-medium leading-none text-zinc-400 sm:min-h-9 sm:px-4 sm:text-sm",
              )}
            >
              {!layoutReady ? cat.title : null}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
        <span>Auto tour</span>
        <span className="text-neon-cyan/80">
          {skillCategories[activeIndex]?.title}
          <span className="ml-2 text-zinc-500">
            {Math.round(progress * 100)}%
          </span>
        </span>
      </div>
    </div>
  );
}

export function SkillMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const cycleStartRef = useRef(performance.now());

  const current = skillCategories[activeIndex] ?? skillCategories[0];

  useEffect(() => {
    if (paused) return;

    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - cycleStartRef.current;
      const totalLoop = TAB_DWELL_MS * skillCategories.length;
      const wrapped = elapsed % totalLoop;
      const idx = Math.floor(wrapped / TAB_DWELL_MS);
      const p = (wrapped % TAB_DWELL_MS) / TAB_DWELL_MS;
      setActiveIndex(idx);
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const selectTab = (index: number) => {
    cycleStartRef.current = performance.now() - index * TAB_DWELL_MS;
    setActiveIndex(index);
    setProgress(0);
  };

  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="skills"
          eyebrow="02 · Skill arsenal"
          title="Technical skills"
        />

        <SkillTabRail
          activeIndex={activeIndex}
          progress={progress}
          onSelect={selectTab}
          onPause={() => setPaused(true)}
          onResume={() => setPaused(false)}
        />

        <AnimatePresence mode="wait">
          <SkillPanel key={current.id} category={current} />
        </AnimatePresence>

        <motion.div
          className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="mb-5 flex items-center gap-2 text-neon-magenta">
            <Languages size={18} />
            <h3 className="font-display text-lg font-semibold text-white">Spoken languages</h3>
          </div>
          <ul className="space-y-5">
            {spokenLanguages.map((lang) => (
              <li key={lang.name}>
                <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <span className="font-medium text-zinc-200">{lang.name}</span>
                    <span className="ml-2 font-mono text-xs text-neon-cyan">{lang.level}</span>
                  </div>
                  {lang.note ? (
                    <span className="text-xs text-zinc-500">{lang.note}</span>
                  ) : null}
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
