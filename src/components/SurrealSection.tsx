"use client";

import { sectionVariants, surrealTransition } from "@/lib/surreal-motion";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  index?: number;
  className?: string;
};

export function SurrealSection({ children, index = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax only on the decorative glow — never on content (conflicts with whileInView y/scale)
  const driftY = useTransform(scrollYProgress, [0, 0.5, 1], [reduceMotion ? 0 : 24, 0, reduceMotion ? 0 : -16]);
  const driftRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [reduceMotion ? 0 : index % 2 === 0 ? 1 : -1, reduceMotion ? 0 : index % 2 === 0 ? -0.5 : 0.5],
  );

  const variants = sectionVariants[index % sectionVariants.length];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 top-1/2 -z-10 h-[70%] -translate-y-1/2 rounded-[40%] opacity-30 blur-3xl will-change-transform"
        style={{
          y: driftY,
          rotate: driftRotate,
          background:
            index % 3 === 0
              ? "radial-gradient(circle, rgba(0,245,255,0.15), transparent 65%)"
              : index % 3 === 1
                ? "radial-gradient(circle, rgba(255,0,170,0.12), transparent 65%)"
                : "radial-gradient(circle, rgba(176,38,255,0.14), transparent 65%)",
        }}
      />

      <motion.div
        className="origin-center"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
        variants={variants}
        transition={surrealTransition}
      >
        {children}
      </motion.div>
    </div>
  );
}
