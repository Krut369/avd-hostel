"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UnifiedReveal } from "./UnifiedReveal";

const SESSION_KEY = "hsh-intro-played";
const PRELOAD_SRCS = ["/assets/logo.png", "/assets/t1.png", "/assets/t2.jpeg", "/assets/hsh1.png"];
const PRELOAD_TIMEOUT_MS = 1800;

// Relaxed cinematic timing
const DISPLAY_MS = 3800;
const EXIT_MS = 1100;
const REDUCED_DISPLAY_MS = 500;
const REDUCED_EXIT_MS = 400;

type Phase = "loading" | "reveal" | "exit" | "done";

function preloadImages(srcs: string[]): Promise<void> {
  const loaders = srcs.map(
    (src) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      })
  );
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, PRELOAD_TIMEOUT_MS));
  return Promise.race([Promise.all(loaders).then(() => undefined), timeout]);
}

const zoomEase = [0.76, 0, 0.24, 1] as const;

/**
 * Dark Theme Full-Screen Cinematic Intro Preloader:
 * Displays all 3 assets (Logo mark, Temple background, Hostel building hsh1.png)
 * on a single dark page, followed by a curtain reveal to the hero section.
 */
export function Preloader() {
  const [shouldPlay] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== "1";
    } catch {
      return false;
    }
  });
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("loading");
  const [showLoadingHint, setShowLoadingHint] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  }, []);

  const runExit = useCallback(
    (reduced: boolean) => {
      clearTimers();
      setPhase("exit");
      schedule(() => setPhase("done"), reduced ? REDUCED_EXIT_MS : EXIT_MS);
    },
    [schedule]
  );

  const skipIntro = useCallback(() => {
    setPhase((p) => {
      if (p === "exit" || p === "done") return p;
      runExit(reducedMotion);
      return p;
    });
  }, [reducedMotion, runExit]);

  useEffect(() => {
    if (!shouldPlay) return;

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);
    setActive(true);

    const hintTimer = setTimeout(() => setShowLoadingHint(true), 220);

    preloadImages(PRELOAD_SRCS).then(() => {
      clearTimeout(hintTimer);
      if (prefersReduced) {
        setPhase("reveal");
        schedule(() => runExit(true), REDUCED_DISPLAY_MS);
        return;
      }

      setPhase("reveal");
      schedule(() => runExit(false), DISPLAY_MS);
    });

    return () => {
      clearTimeout(hintTimer);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPlay]);

  // Lock scroll while preloader is active
  useEffect(() => {
    if (!active || phase === "done") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active, phase]);

  // Handle Escape key skip
  useEffect(() => {
    if (!active || phase === "exit" || phase === "done" || phase === "loading") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipIntro();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, phase, skipIntro]);

  if (!active || phase === "done") return null;

  const exitDuration = reducedMotion ? REDUCED_EXIT_MS / 1000 : EXIT_MS / 1000;
  const exiting = phase === "exit";

  return (
    <motion.div
      role="presentation"
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 45%, #171310 0%, #0a0908 70%)",
        pointerEvents: exiting ? "none" : "auto",
      }}
      initial={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      animate={
        exiting
          ? {
              clipPath: reducedMotion ? "inset(0% 0% 0% 0%)" : "inset(50% 0% 50% 0%)",
              opacity: reducedMotion ? 0 : 1,
            }
          : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
      }
      transition={{ duration: exiting ? exitDuration : 0.01, ease: zoomEase }}
    >
      {/* Dark Theme Canvas displaying Temple background + Building (hsh1.png) + Logo */}
      <AnimatePresence>
        {phase === "loading" && <motion.div key="loading" className="absolute inset-0 bg-[#0a0908]" />}
        {(phase === "reveal" || phase === "exit") && (
          <UnifiedReveal key="unified" reducedMotion={reducedMotion} exiting={exiting} />
        )}
      </AnimatePresence>

      {/* Loading hint */}
      {phase === "loading" && showLoadingHint && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-28 h-0.5 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="h-full w-1/3 rounded-full bg-white/60"
            animate={{ x: ["-100%", "220%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}

      {/* Skip button styled for dark theme */}
      {!reducedMotion && phase !== "loading" && phase !== "exit" && (
        <motion.button
          type="button"
          onClick={skipIntro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 text-[11px] font-semibold tracking-[0.25em] uppercase text-white/50 hover:text-white focus-visible:text-white transition-colors duration-300 focus:outline-none"
        >
          Skip Intro
        </motion.button>
      )}
    </motion.div>
  );
}
