"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { hostelData } from "@/data/hostel";

const slides = hostelData.campusHighlights;

export function CampusHighlightsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevSlideRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.floor(latest * slides.length);
    if (index >= slides.length) index = slides.length - 1;
    if (index < 0) index = 0;
    if (index !== currentSlide) {
      prevSlideRef.current = currentSlide;
      setCurrentSlide(index);
    }
  });

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionStart = rect.top + scrollTop;
    const sectionHeight = rect.height;
    const targetScroll = sectionStart + (index / slides.length) * (sectionHeight - window.innerHeight);

    if (index !== currentSlide) {
      prevSlideRef.current = currentSlide;
      setCurrentSlide(index);
    }
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const nextSlide = () => scrollToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => scrollToSlide((currentSlide - 1 + slides.length) % slides.length);

  const getStackPosition = (index: number, slideVal: number) =>
    (index - slideVal + slides.length) % slides.length;

  return (
    <div
      ref={containerRef}
      id="about"
      className="relative h-[220vh] w-full"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl w-full mx-auto flex flex-col items-center space-y-4 sm:space-y-6">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-2xl text-center space-y-2"
          >
            {/* Badge */}
            <div className="flex justify-center mb-2">
              <span className="section-badge">
                🏛️ &nbsp;Our Campus
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold font-serif leading-tight"
              style={{ color: COLORS.textPrimary }}
            >
              The Sanctuary of{" "}
              <span className="italic gradient-text">Growth</span>
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-500 font-medium max-w-xl mx-auto font-sans">
              Beyond architecture lies an environment carefully curated for spiritual alignment. Our sacred spaces are designed to foster inner peace and intellectual clarity.
            </p>
          </motion.div>

          {/* Active Highlight Text Block */}
          <div className="w-full max-w-2xl text-center min-h-[100px] sm:min-h-[115px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-1.5"
              >
                <span
                  className="inline-block px-3 py-0.5 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-full font-sans"
                  style={{
                    backgroundColor: COLORS.primaryTint,
                    color: COLORS.primary,
                  }}
                >
                  {slides[currentSlide].tag}
                </span>
                <h3
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight"
                  style={{ color: COLORS.textPrimary }}
                >
                  {slides[currentSlide].title}
                  <span
                    className="block text-[10px] sm:text-xs font-semibold mt-1 uppercase tracking-widest italic font-sans"
                    style={{ color: COLORS.secondary }}
                  >
                    — {slides[currentSlide].subtitle} —
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-sans">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card Stack Container (Neat Bounds) */}
          <div className="relative w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] mx-auto select-none mt-2">
            {slides.map((slide, i) => {
              const pos = getStackPosition(i, currentSlide);
              const prevPos = getStackPosition(i, prevSlideRef.current);
              const isActive = pos === 0;

              // Refined stack offsets to prevent bottom overflow
              let yVal: number | string | (number | string)[] = pos === 0 ? 0 : pos === 1 ? 12 : 20;
              if (prevPos === 0 && pos === 2) {
                yVal = [0, "-110%", 20];
              }

              return (
                <motion.div
                  key={slide.id}
                  style={{
                    zIndex: slides.length - pos,
                    transformOrigin: "center center",
                    borderColor: COLORS.borderGold,
                    boxShadow: isActive
                      ? "0 20px 35px -8px rgba(0,0,0,0.18), 0 6px 12px -4px rgba(0,0,0,0.06)"
                      : "0 6px 12px -4px rgba(0,0,0,0.05)",
                    cursor: isActive ? "pointer" : "default",
                  }}
                  animate={{
                    scale: pos === 0 ? 1 : pos === 1 ? 0.95 : 0.90,
                    y: yVal,
                    x: pos === 0 ? 0 : pos === 1 ? 14 : -14,
                    rotate: pos === 0 ? 0 : pos === 1 ? -2.5 : 2.5,
                  }}
                  whileHover={isActive ? { y: -4, scale: 1.01 } : {}}
                  transition={{
                    default: { type: "spring", stiffness: 280, damping: 24 },
                    y: (prevPos === 0 && pos === 2)
                      ? { duration: 0.6, ease: "easeInOut" }
                      : { type: "spring", stiffness: 280, damping: 24 },
                  }}
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden border shadow-xl bg-white touch-none"
                  onClick={() => isActive && nextSlide()}
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />

                  {/* Gradient overlay for text contrast */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 70%)",
                    }}
                  />

                  {/* Darkening overlay for stacked background cards */}
                  <motion.div
                    className="absolute inset-0 bg-black pointer-events-none"
                    animate={{ opacity: pos === 0 ? 0 : pos === 1 ? 0.25 : 0.45 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Active card info bar at bottom */}
                  {isActive && (
                    <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white pointer-events-none font-sans">
                      <p className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold opacity-90">
                        Scroll or click to explore
                      </p>
                      <span className="text-[10px] sm:text-xs opacity-75 font-semibold">
                        {currentSlide + 1} / {slides.length}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-5 pt-1">
            {/* Prev */}
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-2.5 rounded-full border transition-all duration-300 shadow-sm flex items-center justify-center bg-white cursor-pointer"
              style={{ borderColor: COLORS.borderGold, color: COLORS.primary }}
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex items-center space-x-2">
              {slides.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  animate={{
                    width: currentSlide === i ? 20 : 8,
                    backgroundColor: currentSlide === i ? COLORS.primary : COLORS.border,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="h-2 rounded-full cursor-pointer"
                  style={{ minWidth: 8 }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-2.5 rounded-full border transition-all duration-300 shadow-sm flex items-center justify-center bg-white cursor-pointer"
              style={{ borderColor: COLORS.borderGold, color: COLORS.primary }}
              aria-label="Next slide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
