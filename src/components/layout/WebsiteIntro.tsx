"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { hostelData } from "@/data/hostel";

const SESSION_KEY = "avd-intro-played";

type Phase = "reveal" | "hold" | "exit" | "done";

/**
 * Full-screen cinematic brand intro shown once per browser session,
 * before the Hero Section. Skips instantly on repeat visits within
 * the same session and respects prefers-reduced-motion.
 */
export function WebsiteIntro() {
  // Decided once, at first render, from external state — must NOT be
  // re-derived inside the effect below, since React.StrictMode runs
  // that effect twice in dev and the first run already flips the flag.
  const [shouldPlay] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== "1";
    } catch {
      return false;
    }
  });
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("reveal");
  const [reducedMotion, setReducedMotion] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const skipIntro = useCallback(() => {
    clearTimeout(holdTimerRef.current);
    clearTimeout(exitTimerRef.current);
    setPhase((p) => (p === "exit" || p === "done" ? p : "exit"));
  }, []);

  useEffect(() => {
    if (!shouldPlay) return;

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);
    setActive(true);

    if (prefersReduced) {
      exitTimerRef.current = setTimeout(() => setPhase("exit"), 250);
      return () => clearTimeout(exitTimerRef.current);
    }

    holdTimerRef.current = setTimeout(() => setPhase("hold"), 1500);
    exitTimerRef.current = setTimeout(() => setPhase("exit"), 2100);
    return () => {
      clearTimeout(holdTimerRef.current);
      clearTimeout(exitTimerRef.current);
    };
  }, [shouldPlay]);

  // Lock scroll while the intro is on screen.
  useEffect(() => {
    if (!active || phase === "done") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active, phase]);

  // Let impatient / returning-in-spirit visitors skip with Escape.
  useEffect(() => {
    if (!active || phase === "exit" || phase === "done") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipIntro();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, phase, skipIntro]);

  if (!active || phase === "done") return null;

  const showOverlay = phase === "reveal" || phase === "hold";
  const revealDuration = reducedMotion ? 0.25 : 1.3;
  const exitDuration = reducedMotion ? 0.3 : 1.0;
  const zoomEase = [0.76, 0, 0.24, 1] as const;
  const barSize = "clamp(16px, 6vh, 56px)";

  return (
    <AnimatePresence onExitComplete={() => setPhase("done")}>
      {showOverlay && (
        <motion.div
          key="avd-intro"
          role="presentation"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(circle at 50% 45%, #171310 0%, #0a0908 70%)",
          }}
          exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.15 }}
          transition={{ duration: exitDuration, ease: zoomEase }}
        >
          {/* Cinematic letterbox bars — frame the scene, then draw back on exit */}
          <motion.div
            aria-hidden
            className="absolute top-0 inset-x-0 bg-[#08070680]"
            style={{ height: barSize }}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: reducedMotion ? 0 : "-100%" }}
            transition={{ duration: reducedMotion ? 0.2 : 0.8, ease: zoomEase }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-0 inset-x-0 bg-[#08070680]"
            style={{ height: barSize }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: reducedMotion ? 0 : "100%" }}
            transition={{ duration: reducedMotion ? 0.2 : 0.8, ease: zoomEase }}
          />

          {/* Ambient glow — breathes gently on hold, blooms into a light burst on exit */}
          <motion.div
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 420,
              height: 420,
              background: `radial-gradient(circle, ${COLORS.primary}33 0%, transparent 70%)`,
              filter: "blur(50px)",
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              phase === "hold"
                ? { opacity: [0.65, 1, 0.75], scale: [1, 1.08, 1.02] }
                : { opacity: 0.55, scale: 1 }
            }
            exit={{
              opacity: 0,
              scale: reducedMotion ? 1 : 3.2,
              transition: { duration: exitDuration, ease: zoomEase },
            }}
            transition={
              phase === "hold"
                ? { duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
                : { duration: revealDuration, ease: "easeOut" }
            }
          />

          <motion.div
            className="relative flex flex-col items-center gap-6"
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.9 }}
            transition={{ duration: exitDuration * 0.9, ease: zoomEase }}
          >
            {/* Logo — focus-pull entrance with a thin progress ring */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.75, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: revealDuration,
                delay: reducedMotion ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {!reducedMotion && (
                <svg
                  aria-hidden
                  width="140"
                  height="140"
                  viewBox="0 0 140 140"
                  className="absolute -inset-[18px] sm:-inset-2 pointer-events-none"
                >
                  <motion.circle
                    cx="70"
                    cy="70"
                    r="64"
                    fill="none"
                    stroke={COLORS.primary}
                    strokeOpacity={0.55}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.1, ease: "linear" }}
                  />
                </svg>
              )}

              <img
                src="/logo.png"
                alt={hostelData.hostelInfo.siteName}
                className="relative w-20 h-20 sm:w-28 sm:h-28 object-contain"
                style={{ filter: `drop-shadow(0 0 26px ${COLORS.primary}66)` }}
              />
            </motion.div>

            {/* Wordmark — divider draws in, letters converge to their resting tracking */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0.2 : 0.8,
                delay: reducedMotion ? 0.05 : 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center gap-2.5"
            >
              <motion.div
                className="w-10 h-px"
                style={{ backgroundColor: `${COLORS.primary}80`, transformOrigin: "center" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reducedMotion ? 0.15 : 0.6,
                  delay: reducedMotion ? 0 : 0.55,
                  ease: "easeOut",
                }}
              />
              <motion.span
                initial={{ letterSpacing: reducedMotion ? "0.35em" : "0.6em" }}
                animate={{ letterSpacing: "0.35em" }}
                transition={{
                  duration: reducedMotion ? 0 : 1,
                  delay: reducedMotion ? 0 : 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-white/90 text-xs sm:text-sm font-semibold uppercase"
              >
                {hostelData.hostelInfo.siteName}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Skip affordance — respects an impatient visitor without breaking the mood */}
          {!reducedMotion && (
            <motion.button
              type="button"
              onClick={skipIntro}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.25em] uppercase text-white/40 hover:text-white/80 focus-visible:text-white/90 transition-colors duration-300 focus:outline-none"
            >
              Skip Intro
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
