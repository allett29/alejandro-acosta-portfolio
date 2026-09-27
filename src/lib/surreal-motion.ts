import type { Transition, Variants } from "framer-motion";

export const surrealEase = [0.16, 1, 0.3, 1] as const;

export const surrealTransition: Transition = {
  duration: 0.75,
  ease: surrealEase,
};

/** Section enter — opacity + transform only (no filter: blur on large blocks; causes scroll jank) */
export const sectionVariants: Variants[] = [
  {
    hidden: { opacity: 0, y: 56, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  {
    hidden: { opacity: 0, x: -40, y: 32, scale: 0.98 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  },
  {
    hidden: { opacity: 0, x: 40, y: 32, scale: 0.98 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  },
  {
    hidden: { opacity: 0, y: -28, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
];

export const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const portalRingTransition: Transition = {
  duration: 22,
  repeat: Infinity,
  ease: "linear",
};
