"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TempleTransitionProps {
  reducedMotion: boolean;
  /** Delay, in ms after mount, before crossfading from the first temple image to the second. */
  swapAt: number;
}

const zoomEase = [0.25, 0.1, 0.25, 1] as const;

const images = [
  { key: "t1", src: "/assets/t1.png", alt: "Temple architecture near Hari Saurabh Hostel" },
  { key: "t2", src: "/assets/t2.jpeg", alt: "Temple spires near Hari Saurabh Hostel" },
] as const;

/** Phase 2 — the two temple photos crossfade with a slow zoom and slight horizontal drift. */
export function TempleTransition({ reducedMotion, swapAt }: TempleTransitionProps) {
  const [showSecond, setShowSecond] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(() => setShowSecond(true), swapAt);
    return () => clearTimeout(timer);
  }, [reducedMotion, swapAt]);

  const active = images[showSecond ? 1 : 0];

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
    >
      <AnimatePresence>
        <motion.img
          key={active.key}
          src={active.src}
          alt={active.alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05, x: reducedMotion ? 0 : 24 }}
          animate={{ opacity: 1, scale: reducedMotion ? 1 : 1.12, x: 0 }}
          exit={{ opacity: 0, x: reducedMotion ? 0 : -24 }}
          transition={{
            opacity: { duration: reducedMotion ? 0.2 : 0.9, ease: "easeInOut" },
            x: { duration: reducedMotion ? 0.2 : 0.9, ease: zoomEase },
            scale: { duration: reducedMotion ? 0.2 : 1.6, ease: "linear" },
          }}
        />
      </AnimatePresence>

      {/* Keeps the logo/text legible against bright temple photography */}
      <div className="absolute inset-0 bg-black/55" />
    </motion.div>
  );
}
