"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { hostelData } from "@/data/hostel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COLORS } from "@/constants/colors";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reviews = hostelData.reviews;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto scroll slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentReview = reviews[activeIndex];

  return (
    <section
      id="reviews"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Decorative Blur Background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${COLORS.primary}05` }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${COLORS.primary}05` }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader
          title="What Our Students"
          titleHighlight="Say"
          subtitle="Real stories from the people who call Harisaurabh Hostel their second home."
        />

        {/* Carousel Outer Border Shadow Container */}
        <div 
          className="rounded-[32px] overflow-hidden border transition-all duration-300"
          style={{ borderColor: COLORS.borderGold }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[460px]">
            
            {/* LEFT COLUMN: Dark Student Profile Panel */}
            <div className="lg:col-span-5 relative bg-stone-950 flex flex-col justify-end p-6 lg:p-10 overflow-hidden h-[300px] lg:h-auto border-r lg:border-r-0 border-stone-800">
              
              {/* Animated Profile Background Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-cover"
                  style={{
                    backgroundImage: `url('${currentReview.image}'), linear-gradient(to bottom, #1c1917, #0c0a09)`,
                    backgroundPosition: (currentReview as { bgPosition?: string }).bgPosition ?? "top center",
                  }}
                />
              </AnimatePresence>

              {/* Dark Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-transparent z-10" />

              {/* Profile Details Container */}
              <div className="relative z-20 space-y-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReview.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3
                      className="text-white text-2xl lg:text-3xl font-bold leading-tight"
                    >
                      {currentReview.name}
                    </h3>
                    <p 
                      className="text-xs font-bold uppercase tracking-[0.2em] mt-1"
                      style={{ color: "#EA923E" }}
                    >
                      {currentReview.tag}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 lg:p-10 flex flex-col justify-between space-y-6 relative h-full">
              
              {/* Top Right Navigation Chevrons */}
              <div className="absolute top-6 right-6 lg:top-8 lg:right-8 flex items-center gap-1.5 z-20">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-500 transition-colors focus:outline-none cursor-pointer bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-500 transition-colors focus:outline-none cursor-pointer bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quote Review Body text */}
              <div className="flex-grow flex flex-col justify-start relative pt-8 pb-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReview.id}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 px-10 py-8"
                  >
                    {/* Top-Left Quote Icon (Opening Quote) */}
                    <Quote 
                      className="absolute top-0 left-0 w-10 h-10 select-none opacity-20 rotate-180 pointer-events-none" 
                      style={{ color: COLORS.primary }}
                    />
                    
                    <p 
                      className="text-sm sm:text-base lg:text-md leading-relaxed text-stone-600 font-medium text-justify"
                    >
                      {currentReview.review}
                    </p>

                    {/* Bottom-Right Quote Icon (Closing Quote) */}
                    <Quote 
                      className="absolute bottom-0 right-0 w-10 h-10 select-none opacity-20 pointer-events-none" 
                      style={{ color: COLORS.primary }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Navigation Indicators Row */}
              <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                {/* Current Slide Counter */}
                <div 
                  className="text-sm font-bold tracking-wider"
                  style={{ color: COLORS.primary }}
                >
                  {String(activeIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
                </div>

                {/* Slider Progress Indicator Dots */}
                <div className="flex gap-2">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className="h-1 rounded-full transition-all duration-300 focus:outline-none cursor-pointer"
                      style={{
                        width: activeIndex === idx ? "24px" : "8px",
                        backgroundColor: activeIndex === idx ? COLORS.primary : `${COLORS.primary}25`
                      }}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
