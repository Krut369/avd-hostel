"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { COLORS } from "@/constants/colors";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [videoPlay, setVideoPlay] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: COLORS.background }}>
      {/* Intro Video */}
      {!videoEnded && (
        <video
          autoPlay
          muted
          playsInline
          onPlaying={() => setVideoPlay(true)}
          onEnded={() => setVideoEnded(true)}
          className={`fixed inset-0 w-screen h-screen object-contain bg-black transition-opacity duration-1000 z-50 ${
            videoPlay ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      )}

      {/* Skip button for intro video */}
      {!videoEnded && videoPlay && (
        <button
          onClick={() => setVideoEnded(true)}
          className="fixed bottom-8 right-8 z-50 px-4 py-2 bg-black/50 text-white rounded-full text-sm font-semibold backdrop-blur-md hover:bg-black/70 transition-colors"
        >
          Skip Intro
        </button>
      )}

      {/* Light gradient overlays to ensure text readability while keeping the screen light */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${videoEnded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/80 to-[#FAF7F2]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/30 via-transparent to-transparent" />
      </div>

      {/* Animated particles */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${videoEnded ? "opacity-100" : "opacity-0"}`}>
        {mounted && Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `${COLORS.accent}40`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 lg:pt-0 transition-opacity duration-1000 ${videoEnded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>


        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-none mb-4"
          style={{ fontFamily: "Playfair Display, serif", color: COLORS.textPrimary }}
        >
          Atmiya{" "}
          <span className="italic gradient-text">Vidya</span>
          <br />
          Dham
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-24 h-0.5 mx-auto mb-4"
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${COLORS.accent}, transparent)` }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl sm:text-2xl font-semibold mb-3"
          style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", color: COLORS.primary }}
        >
          Harisaurabh Hostel
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: COLORS.textPrimary }}
        >
          Value-Centered Student Residence — where brotherhood, discipline, and spiritual growth shape the leaders of tomorrow.
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
              backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.primaryLight})`,
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
            className="flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl border transition-all duration-300 cursor-pointer hover:bg-stone-100"
            style={{ color: COLORS.primary, borderColor: COLORS.primary }}
          >
            Apply Now
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border shadow-sm"
          style={{ backgroundColor: `${COLORS.surface}b0`, borderColor: COLORS.borderGold }}
        >
          {[
            { num: "500+", label: "Students" },
            { num: "15+", label: "Years Legacy" },
            { num: "14", label: "Amenities" },
            { num: "4", label: "Room Types" },
          ].map((stat) => (
            <div key={stat.label} className="py-5 px-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: COLORS.primary }}>
                {stat.num}
              </div>
              <div className="text-xs mt-1" style={{ color: COLORS.textPrimary }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
          style={{ color: COLORS.textMuted }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
