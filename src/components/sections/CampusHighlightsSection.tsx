"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/constants/colors";

const slides = [
  {
    id: "temple",
    title: "The Temple",
    image: "https://www.avdvvn.org/assets/images/t1.jpeg",
  },
  {
    id: "prayer-hall",
    title: "Prayer Hall",
    image: "/prayer-hall.jpg",
  }
];

export function CampusHighlightsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000); // 4 seconds transition
    return () => clearInterval(timer);
  }, []);
  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6 pr-0 lg:pr-8"
          >
            <div className="space-y-2">
              <span
                className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: COLORS.primary }}
              >
                Spiritual Foundation
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold leading-[1.15]"
                style={{ fontFamily: "Playfair Display, serif", color: COLORS.textPrimary }}
              >
                The Sanctuary of <span className="gradient-text italic">Growth</span>
              </h2>
            </div>
            
            <p className="text-base leading-relaxed text-gray-600 font-medium">
              Beyond architecture lies an environment carefully curated for spiritual alignment. Our sacred spaces are designed to foster inner peace and intellectual clarity.
            </p>
          </motion.div>

          {/* Right Cards Column - Unified Crossfading Card */}
          <div className="lg:col-span-7">
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative rounded-3xl overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-500 bg-black/5"
              style={{ height: "400px", borderColor: COLORS.borderGold }}
            >
              <AnimatePresence>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0"
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${slides[currentSlide].image}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat"
                    }}
                  />

                  {/* Gradient Overlay for overlay text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Label Box */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-white text-3xl font-bold drop-shadow-md"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {slides[currentSlide].title}
                    </motion.h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
