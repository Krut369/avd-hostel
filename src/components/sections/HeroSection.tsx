"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COLORS } from "@/constants/colors";

export function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If video is already loaded or ready, set state immediately
    if (video.readyState >= 3) {
      setVideoReady(true);
    }

    // Try to play
    video.play().catch(() => {});
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: COLORS.background }}>

      {/* Background Video — fades in once ready */}
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

      {/* Overlay — only visible when video is playing */}
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-[2000ms] ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45" />
      </div>

      {/* Fallback light gradient overlays (visible before video loads) */}
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-[2000ms] ${
          videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF4EC]/90 via-[#FFF4EC]/80 to-[#FFF4EC]/95" />
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

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-24 h-0.5 mx-auto mb-4"
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${COLORS.accent}, transparent)` }}
        />

        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl sm:text-2xl font-semibold mb-3 drop-shadow-md"
          style={{ color: COLORS.backgroundSecondary }}
        >
          Hari Saurabh Hostel
        </motion.p> */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed text-center drop-shadow-sm transition-colors duration-[2000ms]"
          style={{ color: videoReady ? "rgba(255,255,255,0.9)" : COLORS.textPrimary }}
        >
          Developed in the laps of nature, AVD is the epitome of the education system that has diverse youth from across the country studying in various colleges. It is not just a hostel but a platform to instill cultural and moral values along with providing environment for academic proficiency. To make students learn from the best mentors and fostering a harmonious atmosphere is what we constantly strive for.
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
            className="group flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 text-sm cursor-pointer"
            style={{
              backgroundColor: COLORS.primary,
              boxShadow: `0 10px 25px -5px ${COLORS.primary}40`
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
            className="flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 backdrop-blur-sm"
            style={{
              color: videoReady ? "#fff" : COLORS.primary,
              borderColor: videoReady ? "rgba(255,255,255,0.5)" : COLORS.primary
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
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border shadow-sm max-w-xl mx-auto sm:max-w-full backdrop-blur-md transition-colors duration-[2000ms]"
          style={{
            backgroundColor: videoReady ? "rgba(0,0,0,0.35)" : `${COLORS.surface}b0`,
            borderColor: videoReady ? "rgba(255,255,255,0.15)" : COLORS.borderGold
          }}
        >
          {[
            { num: "500+", label: "Students" },
            { num: "15+", label: "Years Legacy" },
            { num: "14", label: "Amenities" },
            { num: "4", label: "Room Types" },
          ].map((stat) => (
            <div key={stat.label} className="py-3 sm:py-5 px-2.5 sm:px-4 text-center">
              <div
                className="text-lg sm:text-2xl font-bold transition-colors duration-[2000ms]"
                style={{ color: videoReady ? "#FF9E79" : COLORS.primary }}
              >
                {stat.num}
              </div>
              <div
                className="text-[9px] sm:text-xs mt-1 transition-colors duration-[2000ms]"
                style={{ color: videoReady ? "rgba(255,255,255,0.7)" : COLORS.textPrimary }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

