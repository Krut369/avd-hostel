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
      className="relative h-[200vh] w-full"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center">

          {/* Section Header */}
          <div className="relative text-center max-w-3xl mx-auto z-20 px-6 sm:px-8 select-none mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#C44D28]/10 text-[#C44D28] mb-3 border border-[#C44D28]/20">
              🏛️ &nbsp;ABOUT US
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 font-serif leading-tight">
              Campus <span className="gradient-text italic">Highlights</span>
            </h2>
          </div>

          <div className="w-full max-w-2xl text-center flex flex-col items-center justify-center mb-6 sm:mb-8 min-h-[60px] sm:min-h-[48px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-sans font-light">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card Stack Container (Well-Separated with Generous Margin) */}
          <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl h-[210px] sm:h-[250px] md:h-[280px] lg:h-[300px] mx-auto select-none mt-20 sm:mt-24 mb-4">
            {slides.map((slide, i) => {
              const pos = getStackPosition(i, currentSlide);
              const prevPos = getStackPosition(i, prevSlideRef.current);
              const isActive = pos === 0;

              // Top stack shifting logic
              let yVal: number | string | (number | string)[] = pos * -36;
              let scaleVal: number | (number)[] = 1 - pos * 0.05;
              let xVal: number | string | (number | string)[] = 0;

              // Sliding card animation when active slide goes to the back
              const isExiting = prevPos === 0 && pos === slides.length - 1;
              if (isExiting) {
                yVal = [0, 240, pos * -36];
                scaleVal = [1, 0.85, 1 - pos * 0.05];
                xVal = [0, 60, 0];
              }

              // Hardware-accelerated and composited transition optimization
              const cardTransition = isExiting
                ? ({
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.6,
                } as const)
                : ({
                  type: "spring",
                  stiffness: 150,
                  damping: 22,
                  mass: 0.85,
                } as const);

              return (
                <motion.div
                  key={slide.id}
                  style={{
                    zIndex: 50 - pos,
                    transformOrigin: "bottom center",
                    borderColor: COLORS.borderGold,
                    boxShadow: isActive
                      ? "0 20px 40px -10px rgba(196,77,40,0.22), 0 6px 16px -4px rgba(0,0,0,0.08)"
                      : "0 4px 12px -2px rgba(0,0,0,0.06)",
                    cursor: isActive ? "pointer" : "default",
                    willChange: "transform",
                  }}
                  animate={{
                    scale: scaleVal,
                    y: yVal,
                    x: xVal,
                  }}
                  whileHover={isActive ? { y: -4, scale: 1.01 } : {}}
                  transition={cardTransition}
                  className="absolute inset-0 rounded-[28px] overflow-hidden border bg-white touch-none"
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
                      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 70%)",
                    }}
                  />

                  {/* Darkening overlay for stacked background cards */}
                  <motion.div
                    className="absolute inset-0 bg-black pointer-events-none"
                    animate={{ opacity: pos === 0 ? 0 : pos === 1 ? 0.25 : 0.45 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Active card info overlay */}
                  <div className="absolute inset-x-0 bottom-0 pt-24 pb-8 px-6 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col items-center justify-end text-center pointer-events-none">
                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-white uppercase tracking-wider leading-tight drop-shadow-md">
                      {slide.title}
                    </h3>
                    <p className="text-[9px] sm:text-xs font-bold tracking-[0.25em] uppercase text-orange-200 mt-2 opacity-95">
                      {slide.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-4 mt-6">
            {/* Prev */}
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-full border transition-all duration-300 shadow-sm flex items-center justify-center bg-white cursor-pointer"
              style={{ borderColor: COLORS.borderGold, color: COLORS.primary }}
              aria-label="Previous slide"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    width: currentSlide === i ? 18 : 6,
                    backgroundColor: currentSlide === i ? COLORS.primary : COLORS.border,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="h-1.5 rounded-full cursor-pointer"
                  style={{ minWidth: 6 }}
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
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

        </div>
      </div>
    </div>
  );
}
