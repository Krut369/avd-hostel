"use client";

import { motion } from "framer-motion";

interface UnifiedRevealProps {
  reducedMotion: boolean;
  exiting: boolean;
}

const easeOutCustom = [0.16, 1, 0.3, 1] as const;

/**
 * Unified Preloader Screen (Dark Theme with hsh1.png & Clean Logo)
 * Displays all three visual assets simultaneously on one cinematic canvas:
 * 1. Background Temple Imagery (t1.jpeg with high visibility under dark vignette)
 * 2. Foreground Hostel Building (hsh1.png centered with deep shadow)
 * 3. Top Brand Mark & Wordmark (Logo without orange backglow, white wordmark)
 */
export function UnifiedReveal({ reducedMotion, exiting }: UnifiedRevealProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-10 px-4 overflow-hidden pointer-events-none select-none">
      {/* 1. BACKGROUND: Temple Image with Dark Vignette Overlay */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden bg-[#0a0908]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.4 : 1.2 }}
      >
        {/* Temple background image with continuous subtle zoom */}
        <motion.img
          src="/assets/t1.png"
          alt="Temple Architecture"
          className="w-full h-full object-cover opacity-65"
          initial={{ scale: 1.05 }}
          animate={{
            scale: exiting && !reducedMotion ? 1.14 : reducedMotion ? 1 : 1.09,
          }}
          transition={{
            duration: exiting ? 1.1 : 5.0,
            ease: "easeOut",
          }}
        />

        {/* Dark Vignette overlays for contrast & legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,9,8,0.85) 0%, rgba(10,9,8,0.55) 50%, rgba(10,9,8,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(10,9,8,0.3) 0%, rgba(10,9,8,0.85) 100%)",
          }}
        />
      </motion.div>

      {/* 2. TOP BRANDING: Logo & Wordmark (Clean & Dark Theme) */}
      <motion.div
        className="relative z-20 flex flex-col items-center pt-4 sm:pt-8"
        initial={{ opacity: 0, y: -24, scale: 0.94 }}
        animate={{
          opacity: 1,
          y: exiting && !reducedMotion ? -35 : 0,
          scale: exiting && !reducedMotion ? 0.95 : 1,
        }}
        transition={{
          duration: reducedMotion ? 0.4 : 1.3,
          delay: reducedMotion ? 0 : 0.2,
          ease: easeOutCustom,
        }}
      >
        {/* Clean Logo without orange backglow gradient */}
        <motion.img
          src="/assets/logo.png"
          alt="Hari Saurabh Hostel Logo"
          className="relative w-20 h-20 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        />

        <motion.span
          className="mt-4 text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-center text-white/95 drop-shadow-md"
          initial={{ opacity: 0, letterSpacing: "0.55em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{
            duration: reducedMotion ? 0.4 : 1.2,
            delay: reducedMotion ? 0 : 0.4,
            ease: easeOutCustom,
          }}
        >
          Atmiya Vidya Dham
        </motion.span>
      </motion.div>

      {/* 3. CENTER / FOREGROUND: Hostel Building PNG (hsh1.png) */}
      <motion.div
        className="relative z-10 w-full max-w-4xl flex-1 flex items-center justify-center my-2 sm:my-4"
        initial={{ opacity: 0, y: 35, scale: 0.93, filter: "blur(6px)" }}
        animate={{
          opacity: 1,
          y: exiting && !reducedMotion ? -12 : 0,
          scale: exiting && !reducedMotion ? 1.06 : 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: reducedMotion ? 0.4 : exiting ? 1.1 : 1.4,
          delay: reducedMotion ? 0 : 0.3,
          ease: easeOutCustom,
        }}
      >
        <img
          src="/assets/hsh1.png"
          alt="Hari Saurabh Hostel Building"
          className="max-h-[45vh] sm:max-h-[52vh] lg:max-h-[58vh] w-auto max-w-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)]"
        />
      </motion.div>
    </div>
  );
}
