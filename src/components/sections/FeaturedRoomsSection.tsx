"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  View,
  X,
  ChevronLeft,
  ChevronRight,
  Snowflake,
  Users,
  DoorOpen,
  Wind,
  Shirt,
  Box,
  Maximize,
  Bed,
} from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors";

const categoryBadge: Record<string, { bg: string; text: string; label: string }> = {
  Premium:  { bg: "#C44D28", text: "#ffffff", label: "Premium AC" },
  Standard: { bg: "#8A5B36", text: "#ffffff", label: "Standard Non-AC" },
  Economy:  { bg: "#4E4E52", text: "#ffffff", label: "Economy Dormitory" },
  Juniors:  { bg: "#7A3723", text: "#ffffff", label: "Juniors" },
};

const featureIconMap: Record<string, React.ReactNode> = {
  "Smart AC":         <Snowflake className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "Split AC":         <Snowflake className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "2 Sharing":        <Users className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "3 Sharing":        <Users className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "4 Sharing":        <Users className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "6 Sharing":        <Users className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "Attached Bathroom":<DoorOpen className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "Attached Bath":    <DoorOpen className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "Common Bathroom":  <DoorOpen className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "Study Table": (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: COLORS.primary }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M5 10v8m14-8v8M4 6h16a1 1 0 011 1v3H3V7a1 1 0 011-1z" />
    </svg>
  ),
  "Personal Wardrobe": <Box className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "Laundry Bag":       <Shirt className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "Ventilated":        <Wind className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
  "Spacious":          <Maximize className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />,
};

export function FeaturedRoomsSection() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null); // Default to no card expanded
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openLightbox = (images: string[], index: number) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return;
    const next = (lightbox.index + dir + lightbox.images.length) % lightbox.images.length;
    setLightbox({ ...lightbox, index: next });
  };

  const handleEnquireClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="rooms"
      className="relative w-full py-16 sm:py-24"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-8 lg:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-3">
            <span className="section-badge">
              <Bed className="w-3.5 h-3.5" />
              Accommodation Options
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0F172A] tracking-tight leading-tight">
            Explore Our <span className="italic gradient-text">Rooms</span>
          </h2>

          <div className="h-0.5 w-14 rounded-full bg-gradient-to-r from-[#C44D28] to-[#D86642] mx-auto my-4" />

          <p className="text-sm sm:text-base max-w-xl mx-auto text-slate-500 leading-relaxed font-sans">
            Three thoughtfully designed room categories to match every need and budget. Hover over any card on desktop (or tap on mobile) to reveal description and details.
          </p>
        </motion.div>

        {/* Dynamic Accordion Wrapper */}
        <div
          onMouseLeave={() => !isMobile && setHoveredCardId(null)}
          className="flex flex-col lg:flex-row items-stretch justify-center gap-6 w-full mt-6"
        >
          {hostelData.livingSpaces.map((room, i) => {
            const isExpanded = hoveredCardId === room.id;
            const isShrunk = hoveredCardId !== null && hoveredCardId !== room.id;
            const badge = categoryBadge[room.category] || categoryBadge.Premium;

            return (
              <motion.div
                key={room.id}
                onMouseEnter={() => !isMobile && setHoveredCardId(room.id)}
                onClick={() => isMobile && setHoveredCardId(room.id)}
                animate={{
                  flex: isMobile ? "none" : (isExpanded ? 2.2 : (hoveredCardId === null ? 1 : 0.9)),
                }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.55 }}
                className={`shrink-0 rounded-[32px] overflow-hidden border border-[#EDE8E3] h-auto lg:h-[510px]`}
                style={{
                  backgroundColor: COLORS.surface,
                  boxShadow: isExpanded
                    ? "0 24px 50px -12px rgba(196,77,40,0.22), 0 8px 24px -4px rgba(0,0,0,0.06)"
                    : "0 10px 30px -8px rgba(196,77,40,0.10), 0 4px 12px -2px rgba(0,0,0,0.04)",
                }}
              >
                <div className={`flex flex-col ${isExpanded ? "lg:flex-row h-full" : "h-full justify-between"}`}>

                  {/* Image Column */}
                  <div
                    className={`relative overflow-hidden cursor-pointer shrink-0 group transition-all duration-300 ${
                      isExpanded ? "w-full lg:w-[42%]" : "w-full"
                    }`}
                    style={{
                      height: isExpanded && !isMobile
                        ? "100%"
                        : isMobile
                          ? "220px"
                          : isShrunk
                            ? "180px"
                            : "220px",
                    }}
                    onClick={() => {
                      if (isExpanded) {
                        openLightbox(room.images, 0);
                      } else {
                        setHoveredCardId(room.id);
                      }
                    }}
                  >
                    {/* Photo with hover zoom */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${room.images[0]}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md font-sans"
                        style={{ backgroundColor: badge.bg, color: badge.text }}
                      >
                        {badge.label}
                      </span>

                      {room.tour360Available && (
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center gap-1.5 font-sans">
                          <View className="w-3 h-3 text-[#FF9E79]" />
                          360° Tour
                        </span>
                      )}
                    </div>

                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <span className="text-white text-xs font-bold bg-black/75 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 font-sans shadow-lg">
                        <View className="w-4 h-4 text-[#FF9E79]" /> View Photos
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`p-6 flex flex-col justify-between flex-grow transition-all duration-300 ${
                      isExpanded ? "lg:w-[58%] w-full" : "w-full"
                    }`}
                  >
                    <div>
                      <h3 className="text-2xl font-bold font-serif text-[#0F172A] mb-1">
                        {room.title}
                      </h3>

                      <p className="text-xs italic mb-4 font-sans font-medium" style={{ color: COLORS.primary }}>
                        {room.tagline}
                      </p>

                      {/* Features Grid styled as clean badges */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {room.features.map((f) => (
                          <div
                            key={f}
                            className="flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold font-sans transition-colors duration-200"
                            style={{
                              backgroundColor: `${COLORS.primary}06`,
                              borderColor: `${COLORS.primary}15`,
                              color: COLORS.textPrimary,
                            }}
                          >
                            {featureIconMap[f] || (
                              <Check className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />
                            )}
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expanded Details Section */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-100 space-y-3">
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans mb-1">
                              Room Description
                            </p>
                            <p className="text-xs leading-relaxed font-sans text-slate-600">
                              {room.description}
                            </p>
                          </div>

                          {room.images.length > 1 && (
                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans mb-2">
                                Room Gallery
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                {room.images.map((img, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => openLightbox(room.images, idx)}
                                    className="w-10 h-10 rounded-xl overflow-hidden border-2 transition-all duration-200 hover:border-[#C44D28] hover:scale-105 focus:outline-none cursor-pointer shadow-sm"
                                    style={{ borderColor: COLORS.border }}
                                  >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 mt-4">
                       {isExpanded ? (
                         <a
                           href="#contact"
                           onClick={handleEnquireClick}
                           className="group/btn glass-shine flex items-center justify-center gap-1.5 w-full px-4 py-3 text-white text-xs font-semibold rounded-2xl transition-all duration-300 cursor-pointer font-sans shadow-md shadow-[#C44D28]/25 hover:-translate-y-0.5"
                           style={{ backgroundColor: COLORS.primary }}
                         >
                           <span>Enquire Now</span>
                           <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                         </a>
                       ) : (
                         <div className="flex gap-2.5">
                           <a
                             href="#contact"
                             onClick={handleEnquireClick}
                             className="group/btn glass-shine flex items-center justify-center gap-1.5 flex-1 px-4 py-2.5 text-white text-xs font-semibold rounded-2xl transition-all duration-300 cursor-pointer font-sans shadow-md shadow-[#C44D28]/25 hover:-translate-y-0.5 hover:shadow-lg"
                             style={{ backgroundColor: COLORS.primary }}
                           >
                             <span>Enquire</span>
                           </a>
                           <button
                             onClick={() => setHoveredCardId(room.id)}
                             className="group/btn flex items-center justify-center gap-1.5 flex-1 px-4 py-2.5 text-xs font-semibold rounded-2xl border transition-all duration-300 cursor-pointer bg-white font-sans hover:-translate-y-0.5 hover:bg-[#C44D28]/05 shadow-sm"
                             style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                           >
                             <span>Details</span>
                           </button>
                         </div>
                       )}
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
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
              alt="Room view"
              className="max-h-[82vh] max-w-[88vw] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 text-white/70 text-sm font-semibold font-sans bg-black/40 px-4 py-1.5 rounded-full border border-white/10">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
