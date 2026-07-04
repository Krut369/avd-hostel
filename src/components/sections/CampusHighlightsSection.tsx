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

  // Scroll Progress Tracking for linked slide transition
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
    
    // Calculate the target scroll position based on slide index
    const targetScroll = sectionStart + (index / slides.length) * (sectionHeight - window.innerHeight);
    
    if (index !== currentSlide) {
      prevSlideRef.current = currentSlide;
      setCurrentSlide(index);
    }

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    scrollToSlide(prevIndex);
  };

  const getStackPosition = (index: number, slideVal: number) => {
    return (index - slideVal + slides.length) % slides.length;
  };

  return (
    <div
      ref={containerRef}
      id="about"
      className="relative h-[220vh] w-full"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Sticky container that stays in the viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto flex flex-col items-center space-y-8 md:space-y-12">
          
          {/* Main Title Content (Centered) */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-3xl text-center space-y-4"
          >
            <h2
              className="text-4xl sm:text-5xl font-bold leading-[1.15]"
              style={{ color: COLORS.textPrimary }}
            >
              The Sanctuary of <span className="italic" style={{ color: COLORS.primary }}>Growth</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-gray-600 font-medium max-w-2xl mx-auto">
              Beyond architecture lies an environment carefully curated for spiritual alignment. Our sacred spaces are designed to foster inner peace and intellectual clarity.
            </p>
          </motion.div>

          {/* Active Highlight Details (Crossfading on Slide Change) */}
          <div className="w-full max-w-3xl text-center min-h-[160px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                <span
                  className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full"
                  style={{
                    backgroundColor: COLORS.primaryTint,
                    color: COLORS.primary,
                  }}
                >
                  {slides[currentSlide].tag}
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: COLORS.textPrimary }}
                >
                  {slides[currentSlide].title}
                  <span className="block text-sm font-semibold mt-1.5 uppercase tracking-widest italic" style={{ color: COLORS.secondary }}>
                    — {slides[currentSlide].subtitle} —
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card Stack Deck Container */}
          <div 
            className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] mx-auto select-none mt-4"
          >
            {slides.map((slide, i) => {
              const pos = getStackPosition(i, currentSlide);
              const prevPos = getStackPosition(i, prevSlideRef.current);
              const isActive = pos === 0;

              // Calculate y offset with percentage for responsive scaling
              let yVal: string | string[] = pos === 0 ? "0%" : pos === 1 ? "8%" : "16%";
              if (prevPos === 0 && pos === 2) {
                // Swipe up out of view, then return to the back of the stack
                yVal = ["0%", "-115%", "16%"];
              }

              return (
                <motion.div
                  key={slide.id}
                  style={{
                    zIndex: slides.length - pos,
                    transformOrigin: "bottom center",
                    borderColor: COLORS.borderGold,
                    boxShadow: isActive 
                      ? "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.05)"
                      : "0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.05)",
                    cursor: isActive ? "pointer" : "default"
                  }}
                  animate={{
                    scale: pos === 0 ? 1 : pos === 1 ? 0.95 : 0.90,
                    y: yVal,
                    x: pos === 0 ? 0 : pos === 1 ? 16 : -16, // slightly fan out to left/right
                    rotate: pos === 0 ? 0 : pos === 1 ? -3 : 3,
                  }}
                  whileHover={isActive ? { y: "-1.5%", scale: 1.01 } : {}}
                  transition={{
                    default: {
                      type: "spring",
                      stiffness: 260,
                      damping: 22,
                    },
                    y: (prevPos === 0 && pos === 2)
                      ? {
                          duration: 0.65,
                          ease: "easeInOut",
                        }
                      : {
                          type: "spring",
                          stiffness: 260,
                          damping: 22,
                        }
                  }}
                  className="absolute inset-0 rounded-3xl overflow-hidden border shadow-xl bg-white touch-none"
                  onClick={() => isActive && nextSlide()}
                >
                  {/* Image */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat"
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 55%)"
                    }}
                  />

                  {/* Dynamic Darkening Overlay for depth (solid black with opacity, doesn't leak transparency of cards) */}
                  <motion.div
                    className="absolute inset-0 bg-black pointer-events-none"
                    animate={{
                      opacity: pos === 0 ? 0 : pos === 1 ? 0.25 : 0.45
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Top card swipe instruction overlay */}
                  {isActive && (
                    <div className="absolute bottom-6 left-6 text-white pointer-events-none drop-shadow-md">
                      <p className="text-xs uppercase tracking-widest font-semibold opacity-90">Scroll or click to cycle</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col items-center space-y-4 w-full">
            <div className="flex items-center space-x-6">
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="p-3 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 shadow-md flex items-center justify-center bg-white cursor-pointer"
                style={{
                  borderColor: COLORS.borderGold,
                  color: COLORS.primary,
                }}
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center space-x-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSlide(i)}
                    className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: currentSlide === i ? "24px" : "8px",
                      backgroundColor: currentSlide === i ? COLORS.primary : COLORS.border,
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="p-3 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 shadow-md flex items-center justify-center bg-white cursor-pointer"
                style={{
                  borderColor: COLORS.borderGold,
                  color: COLORS.primary,
                }}
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
