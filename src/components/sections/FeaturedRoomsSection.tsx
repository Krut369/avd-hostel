"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
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
  Sparkles,
  Bed,
} from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors";
import { SectionHeader } from "../ui/SectionHeader";

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
  const [expandedCardId, setExpandedCardId] = useState<number | null>(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isFirstRender = useRef(true);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.floor(latest * hostelData.livingSpaces.length);
    if (index >= hostelData.livingSpaces.length) index = hostelData.livingSpaces.length - 1;
    if (index < 0) index = 0;
    setCurrentSlideIndex(index);
    const activeRoom = hostelData.livingSpaces[index];
    if (activeRoom && activeRoom.id !== expandedCardId) {
      setExpandedCardId(activeRoom.id);
    }
  });

  const scrollToSlide = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionStart = rect.top + scrollTop;
    const sectionHeight = rect.height;
    const targetScroll =
      sectionStart + (index / hostelData.livingSpaces.length) * (sectionHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const getTargetScrollLeft = (expandedId: number, isMobileSize: boolean, containerWidth: number) => {
    const W_col = isMobileSize ? 300 : 360;
    const W_exp = isMobileSize ? 300 : 720;
    const G = 24;
    const P = isMobileSize ? 16 : 32;

    let currentOffset = P;
    let targetOffset = P;
    let targetWidth = W_col;

    for (let i = 0; i < hostelData.livingSpaces.length; i++) {
      const room = hostelData.livingSpaces[i];
      const width = room.id === expandedId ? W_exp : W_col;
      if (room.id === expandedId) {
        targetOffset = currentOffset;
        targetWidth = width;
      }
      currentOffset += width + G;
    }

    return targetOffset - (containerWidth - targetWidth) / 2;
  };

  useEffect(() => {
    if (expandedCardId === null) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const targetScrollLeft = getTargetScrollLeft(expandedCardId, isMobile, container.clientWidth);

    if (isFirstRender.current) {
      container.scrollLeft = targetScrollLeft;
      isFirstRender.current = false;
    } else {
      isProgrammaticScroll.current = true;
      container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    }

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [expandedCardId, isMobile]);

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
      ref={sectionRef}
      id="rooms"
      className="relative min-h-screen lg:h-[260vh] w-full"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Background Ambient Radial Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.07]"
          style={{ backgroundColor: COLORS.primary }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.07]"
          style={{ backgroundColor: COLORS.secondary }}
        />
      </div>

      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center py-8 lg:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">

          {/* Section Header */}
          <motion.div
            className="mb-6 lg:mb-8 text-center"
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
              Four thoughtfully designed room categories to match every need and budget. Click any card image to view the room gallery.
            </p>

            {/* Quick Category Filter Tabs */}
            <div className="flex items-center justify-center gap-2 flex-wrap mt-6">
              {["All", ...hostelData.livingSpaces.map(r => r.category)].map((cat, idx) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (cat !== "All") {
                        const targetIdx = hostelData.livingSpaces.findIndex(r => r.category === cat);
                        if (targetIdx !== -1) scrollToSlide(targetIdx);
                      }
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer font-sans ${
                      isActive
                        ? "text-white shadow-md shadow-[#C44D28]/20 scale-105"
                        : "bg-white/80 text-slate-600 border border-[#EDE8E3] hover:bg-white hover:text-[#C44D28]"
                    }`}
                    style={{
                      backgroundColor: isActive ? COLORS.primary : undefined,
                    }}
                  >
                    {cat === "All" ? "All Categories" : cat}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Horizontal Slider Layout */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex items-stretch overflow-x-hidden gap-6 pb-6 snap-x snap-mandatory scrollbar-none px-4 sm:px-8"
            >
              {hostelData.livingSpaces.map((room, i) => {
                const isExpanded = expandedCardId === room.id;
                const badge = categoryBadge[room.category] || categoryBadge.Premium;

                return (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="snap-start shrink-0 rounded-[32px] overflow-hidden transition-all duration-500 border border-[#EDE8E3]"
                    style={{
                      backgroundColor: COLORS.surface,
                      boxShadow: isExpanded
                        ? "0 24px 50px -12px rgba(196,77,40,0.22), 0 8px 24px -4px rgba(0,0,0,0.06)"
                        : "0 10px 30px -8px rgba(196,77,40,0.10), 0 4px 12px -2px rgba(0,0,0,0.04)",
                      width: isExpanded
                        ? isMobile ? "300px" : "720px"
                        : isMobile ? "300px" : "360px",
                    }}
                  >
                    <div className={`${isExpanded ? "flex flex-col sm:flex-row items-stretch" : "flex flex-col justify-between"} h-full`}>

                      {/* Image Column */}
                      <div
                        className="relative overflow-hidden cursor-pointer shrink-0 group"
                        onClick={() => {
                          if (!isExpanded) scrollToSlide(i);
                          else openLightbox(room.images, 0);
                        }}
                        style={{
                          width: !isExpanded ? "100%" : isMobile ? "100%" : "360px",
                          height: !isExpanded ? "220px" : isMobile ? "220px" : "100%",
                          minHeight: !isExpanded ? "220px" : isMobile ? "220px" : "450px",
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

                        {/* Bottom Overlay Image Counter */}
                        <div className="absolute bottom-3 right-4 z-10">
                          <span className="text-[10px] font-bold text-white/90 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full tracking-widest font-sans border border-white/10">
                            {String(i + 1).padStart(2, "0")} / {String(hostelData.livingSpaces.length).padStart(2, "0")}
                          </span>
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
                        className="p-6 flex flex-col justify-between flex-grow"
                        style={{
                          width: !isExpanded ? "100%" : isMobile ? "100%" : "360px",
                        }}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-2xl font-bold font-serif text-[#0F172A]">
                              {room.title}
                            </h3>
                          </div>

                          <p className="text-xs italic mb-5 font-sans font-medium" style={{ color: COLORS.primary }}>
                            {room.tagline}
                          </p>

                          {/* Features Grid styled as clean badges */}
                          <div className="grid grid-cols-2 gap-2.5 mb-5">
                            {room.features.map((f) => (
                              <div
                                key={f}
                                className="flex items-center gap-2 p-2.5 rounded-2xl border text-xs font-semibold font-sans transition-colors duration-200"
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
                        </div>

                        {/* Collapsed Actions */}
                        {!isExpanded && (
                          <div className="flex gap-2.5 mt-3">
                            <a
                              href="#contact"
                              onClick={handleEnquireClick}
                              className="group/btn glass-shine flex items-center justify-center gap-1.5 flex-1 px-4 py-3 text-white text-xs font-semibold rounded-2xl transition-all duration-300 cursor-pointer font-sans shadow-md shadow-[#C44D28]/25 hover:-translate-y-0.5 hover:shadow-lg"
                              style={{ backgroundColor: COLORS.primary }}
                            >
                              <span>Enquire Now</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                            <button
                              onClick={() => scrollToSlide(i)}
                              className="group/btn flex items-center justify-center gap-1.5 flex-1 px-4 py-3 text-xs font-semibold rounded-2xl border transition-all duration-300 cursor-pointer bg-white font-sans hover:-translate-y-0.5 hover:bg-[#C44D28]/05 shadow-sm"
                              style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                            >
                              <span>View Details</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" style={{ color: COLORS.primary }} />
                            </button>
                          </div>
                        )}

                        {/* Expanded Content */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="overflow-hidden mt-4 pt-4 border-t"
                              style={{ borderColor: `${COLORS.border}50` }}
                            >
                              <p className="text-[10px] uppercase font-bold tracking-widest mb-1.5 text-slate-400 font-sans">
                                Room Description
                              </p>
                              <p className="text-xs leading-relaxed mb-5 font-sans text-slate-600">
                                {room.description}
                              </p>

                              {/* Room Gallery Thumbnails */}
                              {room.images.length > 1 && (
                                <div className="mb-5">
                                  <p className="text-[10px] uppercase font-bold tracking-widest mb-2 text-slate-400 font-sans">
                                    Room Gallery
                                  </p>
                                  <div className="flex gap-2.5 flex-wrap">
                                    {room.images.map((img, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => openLightbox(room.images, idx)}
                                        className="w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-200 hover:border-[#C44D28] hover:scale-105 focus:outline-none cursor-pointer shadow-sm"
                                        style={{ borderColor: COLORS.border }}
                                      >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Expanded Actions */}
                              <div className="flex gap-2.5 mt-4">
                                <a
                                  href="#contact"
                                  onClick={handleEnquireClick}
                                  className="group/btn glass-shine flex items-center justify-center gap-1.5 flex-1 px-4 py-3 text-white text-xs font-semibold rounded-2xl transition-all duration-300 font-sans shadow-md shadow-[#C44D28]/25 hover:-translate-y-0.5"
                                  style={{ backgroundColor: COLORS.primary }}
                                >
                                  <span>Enquire Now</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                                <button
                                  onClick={() => setExpandedCardId(null)}
                                  className="group/btn flex items-center justify-center gap-1.5 flex-1 px-4 py-3 text-xs font-semibold rounded-2xl border transition-all duration-300 cursor-pointer bg-white font-sans hover:-translate-y-0.5 hover:bg-[#C44D28]/05"
                                  style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                                >
                                  <span>Close Details</span>
                                  <ArrowRight
                                    className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform rotate-180"
                                    style={{ color: COLORS.primary }}
                                  />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Edge Fade Overlay */}
            <div
              className="absolute top-0 right-0 bottom-6 w-12 pointer-events-none z-10"
              style={{
                background: `linear-gradient(to right, transparent, ${COLORS.background})`,
              }}
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col items-center mt-4 w-full">
            <div className="flex items-center space-x-5">
              <motion.button
                onClick={() => {
                  const prevIndex = (currentSlideIndex - 1 + hostelData.livingSpaces.length) % hostelData.livingSpaces.length;
                  scrollToSlide(prevIndex);
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="p-3 rounded-full border transition-all duration-300 shadow-sm flex items-center justify-center bg-white cursor-pointer z-20 hover:border-[#C44D28]"
                style={{ borderColor: COLORS.borderGold, color: COLORS.primary }}
                aria-label="Previous room"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              <div className="flex items-center space-x-2">
                {hostelData.livingSpaces.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => scrollToSlide(i)}
                    animate={{
                      width: currentSlideIndex === i ? 24 : 8,
                      backgroundColor: currentSlideIndex === i ? COLORS.primary : COLORS.border,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="h-2 rounded-full cursor-pointer z-20"
                    style={{ minWidth: 8 }}
                    aria-label={`Go to room ${i + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => {
                  const nextIndex = (currentSlideIndex + 1) % hostelData.livingSpaces.length;
                  scrollToSlide(nextIndex);
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="p-3 rounded-full border transition-all duration-300 shadow-sm flex items-center justify-center bg-white cursor-pointer z-20 hover:border-[#C44D28]"
                style={{ borderColor: COLORS.borderGold, color: COLORS.primary }}
                aria-label="Next room"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

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
