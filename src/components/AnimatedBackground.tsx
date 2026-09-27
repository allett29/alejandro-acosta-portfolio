"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 h-[100dvh] w-full overflow-hidden"
      aria-hidden
    >
      {/* Grid: fixed size & opacity — no scroll-driven animation (conflicted with Lenis) */}
      <div className="neon-grid absolute inset-0" />
      <div className="neon-grid-vignette absolute inset-0" />

      <div className="absolute inset-0">
        <motion.div
          className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[#00f5ff]/20 blur-[120px]"
          animate={reduceMotion ? undefined : { x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full bg-[#ff00aa]/15 blur-[110px]"
          animate={reduceMotion ? undefined : { x: [0, -60, 0], y: [0, 50, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="surreal-blob absolute bottom-1/4 left-[15%] h-48 w-48 bg-neon-purple/10 blur-[80px]"
          animate={
            reduceMotion
              ? undefined
              : {
                  borderRadius: ["50%", "42% 58% 45% 55%", "50%"],
                  rotate: [0, 120, 0],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#b026ff]/10 blur-[100px]"
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="aurora-shift absolute inset-0 opacity-[0.1]" />
      <div className="scanlines absolute inset-0 opacity-[0.025]" />
      <div className="film-grain absolute inset-0 opacity-[0.03]" />
    </div>
  );
}
