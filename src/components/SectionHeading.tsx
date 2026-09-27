"use client";

import { headingVariants, surrealEase } from "@/lib/surreal-motion";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, className }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={cn("mb-12 scroll-mt-28", className)}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={headingVariants}
    >
      <motion.p
        className="font-mono text-xs uppercase tracking-[0.35em] text-neon-cyan/80"
        variants={{
          hidden: { opacity: 0, letterSpacing: "0.6em", filter: "blur(4px)" },
          visible: {
            opacity: 1,
            letterSpacing: "0.35em",
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: surrealEase },
          },
        }}
      >
        {eyebrow}
      </motion.p>
      <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        <motion.span
          className="neon-text-cyan surreal-title inline-block"
          variants={{
            hidden: { opacity: 0, x: -24, skewX: -8 },
            visible: {
              opacity: 1,
              x: 0,
              skewX: 0,
              transition: { duration: 0.85, delay: 0.08, ease: surrealEase },
            },
          }}
        >
          {title}
        </motion.span>
      </h2>
      <motion.div
        className="neon-line mt-4 h-px w-24 max-w-full origin-left"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 1, delay: 0.15, ease: surrealEase },
          },
        }}
      />
    </motion.div>
  );
}
