"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  View,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { hostelData } from "@/data/hostel";
import { CTASection } from "@/components/sections/CTASection";
import { COLORS } from "@/constants/colors";

const categoryStyles: Record<string, { bg: string; text: string }> = {
  Premium:  { bg: "#F59E0B", text: "#fff" },
  Standard: { bg: "#3B82F6", text: "#fff" },
  Economy:  { bg: "#10B981", text: "#fff" },
  Juniors:  { bg: "#8B5CF6", text: "#fff" },
};

export function RoomsContent() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const openLightbox = (images: string[], index: number) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return;
    const next = (lightbox.index + dir + lightbox.images.length) % lightbox.images.length;
    setLightbox({ ...lightbox, index: next });
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: COLORS.background }}
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: COLORS.primary }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: COLORS.secondary }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="flex justify-center mb-5">
              <span className="section-badge">
                🛏 &nbsp;Accommodation
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5"
              style={{ color: COLORS.textPrimary }}
            >
              Find Your Perfect{" "}
              <span className="gradient-text italic">Room</span>
            </h1>
            <p
              className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: COLORS.textSecondary }}
            >
              Four thoughtfully curated room types — each designed to support
              your academic journey and personal growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rooms List */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="max-w-7xl mx-auto space-y-20">
          {hostelData.livingSpaces.map((room, idx) => {
            const catStyle = categoryStyles[room.category] || categoryStyles.Premium;
            const isReversed = idx % 2 === 1;

            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Image Gallery */}
                <div className={isReversed ? "lg:col-start-2" : ""}>
                  {/* Room number label */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-4xl font-bold opacity-10 select-none"
                      style={{ color: COLORS.primary }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="h-px flex-grow"
                      style={{ backgroundColor: `${COLORS.primary}15` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {/* Main image */}
                    <div
                      className="col-span-2 row-span-2 relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(room.images, 0)}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url('${room.images[0]}'), linear-gradient(135deg, ${COLORS.primaryTint}, ${COLORS.background})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-semibold bg-black/55 px-3 py-1.5 rounded-full backdrop-blur-sm">
                          View Gallery
                        </span>
                      </div>
                      {/* Category badge overlay */}
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
                        >
                          {room.category}
                        </span>
                      </div>
                    </div>

                    {/* Thumbnails */}
                    {room.images.slice(1, 3).map((img, i) => (
                      <div
                        key={i}
                        className="relative h-28 rounded-xl overflow-hidden cursor-pointer group"
                        onClick={() => openLightbox(room.images, i + 1)}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{
                            backgroundImage: `url('${img}'), linear-gradient(135deg, ${COLORS.background}, ${COLORS.primaryTint})`,
                          }}
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {i === 1 && room.images.length > 3 && (
                          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              +{room.images.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className={isReversed ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="flex items-center gap-3 mb-5">
                    {room.tour360Available && (
                      <span
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border bg-white"
                        style={{ borderColor: COLORS.borderGold }}
                      >
                        <View className="w-3 h-3" style={{ color: COLORS.primary }} />
                        360° Tour
                      </span>
                    )}
                  </div>

                  <h2 className="text-4xl font-bold mb-1.5" style={{ color: COLORS.textPrimary }}>
                    {room.title}
                  </h2>
                  <p className="italic text-base mb-2" style={{ color: COLORS.primary }}>
                    {room.tagline}
                  </p>

                  {/* Thin accent divider */}
                  <div className="w-10 h-0.5 rounded-full mb-5" style={{ backgroundColor: COLORS.primary }} />

                  <p className="leading-relaxed mb-8 text-sm sm:text-base" style={{ color: COLORS.textSecondary }}>
                    {room.description}
                  </p>

                  {/* Features grid */}
                  <div className="grid grid-cols-2 gap-2.5 mb-8">
                    {room.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 border rounded-xl px-4 py-3 transition-all duration-200 hover:border-amber-300 hover:shadow-sm"
                        style={{
                          backgroundColor: COLORS.surface,
                          borderColor: COLORS.borderGold,
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: COLORS.primary }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`mailto:harisaurabh.hostel@gmail.com?subject=Room Enquiry: ${room.title}`}
                    className="group glass-shine inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-sm bg-premium-gradient"
                  >
                    Enquire About This Room
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.img
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={lightbox.images[lightbox.index]}
              alt="Room"
              className="max-h-[80vh] max-w-[85vw] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 text-white/60 text-sm font-medium">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </>
  );
}
