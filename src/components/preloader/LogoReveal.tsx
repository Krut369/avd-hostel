"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/constants/colors";

interface LogoRevealProps {
  reducedMotion: boolean;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Phase 1 — logo scales/fades in from center on a dark field, wordmark settles beneath it. */
export function LogoReveal({ reducedMotion }: LogoRevealProps) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.5 }}
    >
      <motion.img
        src="/assets/logo.png"
        alt="Hari Saurabh Hostel logo"
        className="relative w-24 h-24 sm:w-32 sm:h-32 object-contain"
        style={{ filter: `drop-shadow(0 0 30px ${COLORS.primary}55)` }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0.25 : 0.9, ease: easeOut }}
      />

      <motion.span
        initial={{
          opacity: 0,
          y: 10,
          letterSpacing: reducedMotion ? "0.3em" : "0.55em",
        }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
        transition={{
          duration: reducedMotion ? 0.2 : 0.8,
          delay: reducedMotion ? 0 : 0.35,
          ease: easeOut,
        }}
        className="mt-6 text-white/90 text-xs sm:text-sm font-semibold uppercase"
      >
        Atmiya Vidya Dham
      </motion.span>
    </motion.div>
  );
}
