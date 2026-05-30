"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, View, X, ChevronLeft, ChevronRight, Snowflake, Users, DoorOpen, Wind, Shirt, Box, Maximize } from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors"; 

const categoryColors: Record<string, string> = {
  Premium: "bg-amber-500 text-white",
  Standard: "bg-blue-500 text-white",
  Economy: "bg-green-500 text-white",
  Juniors: "bg-purple-500 text-white",
};

const featureIconMap: Record<string, React.ReactNode> = {
  "Smart AC": <Snowflake className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
  "Split AC": <Snowflake className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
  "2 Sharing": <Users className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
  "3 Sharing": <Users className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
  "6 Sharing": <Users className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
  "Attached Bathroom": <DoorOpen className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
  "Attached Bath": <DoorOpen className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
  "Study Table": (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: COLORS.primary }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M5 10v8m14-8v8M4 6h16a1 1 0 011 1v3H3V7a1 1 0 011-1z" />
    </svg>
  ),
  "Personal Wardrobe": <Box className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
  "Laundry Bag": <Shirt className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
  "Ventilated": <Wind className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
  "Spacious": <Maximize className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />,
};

export function FeaturedRoomsSection() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ images, index });
  };

  const closeLightbox = () => setLightbox(null);

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return;
    const next = (lightbox.index + dir + lightbox.images.length) % lightbox.images.length;
    setLightbox({ ...lightbox, index: next });
  };

  const handleEnquireClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="rooms" className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: COLORS.background }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4 text-center"
            style={{ fontFamily: "Playfair Display, serif", color: COLORS.textPrimary }}
          >
            Explore Our <span className="gradient-text italic">Rooms</span>
          </h2>
          <p className="text-center text-gray-500 max-w-xl mx-auto text-sm">
            Four thoughtfully designed room categories to match every need and budget. Click any card image to view the room gallery.
          </p>
        </motion.div>

        {/* Horizontal Slider Layout */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-none px-4 sm:px-8">
          {hostelData.livingSpaces.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="snap-start shrink-0 w-[290px] sm:w-[350px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 border"
              style={{ backgroundColor: COLORS.surface, borderColor: COLORS.borderGold }}
            >
              {/* Image with Click to Open Lightbox */}
              <div 
                className="relative h-52 overflow-hidden cursor-pointer"
                onClick={() => openLightbox(room.images, 0)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${room.images[0]}'), linear-gradient(135deg, ${COLORS.primaryTint}, ${COLORS.background})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">

                  {room.tour360Available && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                      <View className="w-3 h-3" />
                      360°
                    </span>
                  )}
                </div>

                {/* Hover Indicator */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-bold bg-black/65 px-3 py-1.5 rounded-full flex items-center gap-1">
                    <View className="w-3.5 h-3.5" /> View Photos
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-xs italic mb-1" style={{ color: COLORS.primary }}>{room.tagline}</p>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "Playfair Display, serif", color: COLORS.textPrimary }}
                >
                  {room.title}
                </h3>
                <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: COLORS.textPrimary }}>
                  {room.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-1.5 mb-5">
                  {room.features.slice(0, 4).map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-[11px]" style={{ color: COLORS.textPrimary }}>
                      {featureIconMap[f] || <Check className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />}
                      {f}
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={handleEnquireClick}
                  style={{ backgroundColor: COLORS.primary }}
                  className="group/btn flex items-center justify-between w-full px-4 py-3 text-white text-sm font-semibold rounded-xl hover:opacity-90 hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox for Room Gallery */}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={lightbox.images[lightbox.index]}
              alt="Room view"
              className="max-h-[80vh] max-w-[85vw] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 text-white/60 text-sm">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
