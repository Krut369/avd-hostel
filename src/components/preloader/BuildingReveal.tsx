"use client";

import { motion } from "framer-motion";

interface BuildingRevealProps {
  reducedMotion: boolean;
  /** True once the preloader has begun its exit curtain — nudges the building toward the viewer. */
  exiting: boolean;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Phase 3/4 — the hostel building emerges from darkness, sharpens, then grows slightly on exit. */
export function BuildingReveal({ reducedMotion, exiting }: BuildingRevealProps) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#0a0908]/95 to-[#0a0908]" />

      <motion.img
        src="/assets/hsh1.png"
        alt="Hari Saurabh Hostel building"
        className="relative w-[80%] sm:w-[58%] lg:w-[42%] max-h-[80vh] object-contain"
        initial={{ opacity: 0, scale: 0.9, y: 28, filter: "blur(10px)" }}
        animate={{
          opacity: 1,
          scale: exiting && !reducedMotion ? 1.05 : 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: reducedMotion ? 0.25 : exiting ? 0.8 : 1.3,
          ease: easeOut,
        }}
      />
    </motion.div>
  );
}
