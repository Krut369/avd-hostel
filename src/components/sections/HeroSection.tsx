"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { COLORS } from "@/constants/colors";

const stats = [
  { num: "500+", label: "Students" },
  { num: "15+",  label: "Years Legacy" },
  { num: "14",   label: "Amenities" },
  { num: "4",    label: "Room Types" },
];

export function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 3) setVideoReady(true);
    video.play().catch(() => {});
  }, []);

  const handleScrollDown = () => {
    const about = document.getElementById("about");
    if (about) about.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        onPlay={() => setVideoReady(true)}
        onLoadedData={() => setVideoReady(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 0 }}
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay (video playing) */}
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-[2000ms] ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Light fallback overlay (before video) */}
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-[2000ms] ${
          videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4EC]/90 via-[#FFF4EC]/80 to-[#FFF4EC]/95" />
        {/* Ambient floating dots for loading state */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: 8 + (i % 3) * 6,
                height: 8 + (i % 3) * 6,
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                backgroundColor: `${COLORS.primary}20`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-36 lg:pt-28">

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.15] mb-4 drop-shadow-lg transition-colors duration-[2000ms]"
          style={{ color: videoReady ? "#ffffff" : COLORS.textPrimary }}
        >
          Atmiya{" "}
          <span className="italic gradient-text">Vidya</span>
          <br />
          <span className="inline-block mt-2">Dham</span>
        </motion.h1>

        {/* Animated divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-24 h-0.5 mx-auto mb-6"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${
              videoReady ? "rgba(255,255,255,0.6)" : COLORS.accent
            }, transparent)`,
          }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed text-center drop-shadow-sm transition-colors duration-[2000ms]"
          style={{ color: videoReady ? "rgba(255,255,255,0.88)" : COLORS.textPrimary }}
        >
          Developed in the laps of nature, AVD is the epitome of the education system that has diverse youth from across the country studying in various colleges. It is not just a hostel but a platform to instill cultural and moral values along with providing environment for academic proficiency.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#rooms"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group glass-shine flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 text-sm cursor-pointer"
            style={{
              backgroundColor: COLORS.primary,
              boxShadow: `0 10px 28px -6px ${COLORS.primary}55`,
            }}
          >
            Explore Rooms
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 backdrop-blur-sm"
            style={{
              color: videoReady ? "#fff" : COLORS.primary,
              borderColor: videoReady ? "rgba(255,255,255,0.55)" : COLORS.primary,
            }}
          >
            Apply Now
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden border shadow-sm max-w-xl mx-auto sm:max-w-full backdrop-blur-md transition-colors duration-[2000ms]"
          style={{
            backgroundColor: videoReady ? "rgba(0,0,0,0.35)" : `${COLORS.surface}b0`,
            borderColor: videoReady ? "rgba(255,255,255,0.15)" : COLORS.border,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="py-4 sm:py-5 px-3 sm:px-4 text-center relative"
            >
              {/* Vertical divider (except first item) */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/4 h-1/2 w-px"
                  style={{
                    backgroundColor: videoReady ? "rgba(255,255,255,0.12)" : `${COLORS.border}80`,
                  }}
                />
              )}
              <div
                className="text-lg sm:text-2xl font-bold transition-colors duration-[2000ms]"
                style={{ color: videoReady ? "#FF9E79" : COLORS.primary }}
              >
                {stat.num}
              </div>
              <div
                className="text-[9px] sm:text-xs mt-1 font-medium tracking-wide uppercase transition-colors duration-[2000ms]"
                style={{ color: videoReady ? "rgba(255,255,255,0.65)" : COLORS.textMuted }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll-down indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          onClick={handleScrollDown}
          aria-label="Scroll down"
          className="mt-10 mx-auto flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none group"
        >
          <span
            className="text-[10px] font-medium uppercase tracking-widest transition-colors duration-[2000ms]"
            style={{ color: videoReady ? "rgba(255,255,255,0.5)" : COLORS.textMuted }}
          >
            Scroll
          </span>
          <div
            className="w-6 h-9 rounded-full border-2 flex items-start justify-center pt-1.5 transition-colors duration-[2000ms]"
            style={{ borderColor: videoReady ? "rgba(255,255,255,0.35)" : `${COLORS.primary}50` }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ backgroundColor: videoReady ? "rgba(255,255,255,0.6)" : COLORS.primary }}
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.button>
      </div>
    </section>
  );
}
