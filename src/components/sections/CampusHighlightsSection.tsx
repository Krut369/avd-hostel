"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { COLORS } from "@/constants/colors";

export function CampusHighlightsSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // High quality peaceful Swaminarayan temple & spiritual campus videos
  const videos = {
    spiritualLife: "https://www.youtube.com/embed/2v8vzfE8-G8?autoplay=1",
    temple: "https://www.youtube.com/embed/7D5A8M4O31U?autoplay=1",
    sabha: "https://www.youtube.com/embed/N-0J_z4H5bM?autoplay=1"
  };

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 border-t overflow-hidden"
      style={{ backgroundColor: COLORS.background, borderColor: `${COLORS.primary}15` }}
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
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveVideo(videos.spiritualLife)}
              className="flex items-center gap-4 group mt-4 w-fit focus:outline-none"
            >
              <div
                className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-white"
                style={{ borderColor: COLORS.primary, color: COLORS.primary }}
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-amber-600"
                style={{ color: COLORS.primary }}
              >
                Experience Spiritual Life
              </span>
            </motion.button>
          </motion.div>

          {/* Right Cards Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            
            {/* The Temple Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              onClick={() => setActiveVideo(videos.temple)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer border shadow-lg sm:translate-y-8 hover:shadow-xl transition-all duration-500"
              style={{ height: "460px", borderColor: COLORS.borderGold }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: "url('/temple.jpg')",
                }}
              />

              {/* Gradient Overlay for overlay text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Hover Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Glassmorphic Frosted Label Box */}
              <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md bg-black/35 border-t border-white/10 transition-all duration-300 group-hover:bg-black/45">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-white text-2xl font-bold"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    The Temple
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0 sm:hidden">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
                <p className="text-white/90 text-sm mt-1 leading-relaxed font-medium">
                  A place for meditation and daily prayers.
                </p>
              </div>
            </motion.div>

            {/* Sabha Hall Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onClick={() => setActiveVideo(videos.sabha)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer border shadow-lg hover:shadow-xl transition-all duration-500"
              style={{ height: "460px", borderColor: COLORS.borderGold }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: "url('/prayer-hall.jpg')",
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Hover Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Glassmorphic Frosted Label Box */}
              <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md bg-black/35 border-t border-white/10 transition-all duration-300 group-hover:bg-black/45">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-white text-2xl font-bold"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Sabha Hall
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0 sm:hidden">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
                <p className="text-white/90 text-sm mt-1 leading-relaxed font-medium">
                  Spiritual discourses and collective wisdom.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={activeVideo}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
