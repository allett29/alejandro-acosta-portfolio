"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SurrealHeroAura() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[
        { size: 180, top: "15%", left: "8%", delay: 0 },
        { size: 120, top: "55%", left: "75%", delay: 1.2 },
        { size: 90, top: "70%", left: "20%", delay: 0.6 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="surreal-orb absolute rounded-full border border-white/10 bg-gradient-to-br from-neon-cyan/10 to-neon-magenta/5 backdrop-blur-sm"
          style={{ width: orb.size, height: orb.size, top: orb.top, left: orb.left }}
          animate={{
            y: [0, -35, 10, 0],
            x: [0, 20, -15, 0],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "40% 60% 55% 45%", "50%"],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(0,245,255,0.25), transparent, rgba(255,0,170,0.2), transparent)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
