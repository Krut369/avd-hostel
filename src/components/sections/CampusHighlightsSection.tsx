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
        <div className="flex flex-col items-center space-y-12">
          
          {/* Top Content (Centered) */}
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
            <p className="text-base leading-relaxed text-gray-600 font-medium max-w-2xl mx-auto">
              Beyond architecture lies an environment carefully curated for spiritual alignment. Our sacred spaces are designed to foster inner peace and intellectual clarity.
            </p>
          </motion.div>

          {/* Centered Image Card */}
          <div className="w-full max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative rounded-3xl overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-500 bg-black/5 mx-auto"
              style={{ height: "480px", borderColor: COLORS.borderGold }}
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

                  {/* Diagonal gradient overlay from black to transparent */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(45deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 35%, rgba(0, 0, 0, 0) 70%)"
                    }}
                  />

                  {/* Label Box */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-white text-3xl font-bold drop-shadow-md"
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
