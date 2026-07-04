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
} from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors";
import { SectionHeader } from "../ui/SectionHeader";

const categoryColors: Record<string, string> = {
  Premium: "bg-amber-500 text-white",
  Standard: "bg-blue-500 text-white",
  Economy: "bg-green-500 text-white",
  Juniors: "bg-purple-500 text-white",
};

const featureIconMap: Record<string, React.ReactNode> = {
  "Smart AC": (
    <Snowflake className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
  "Split AC": (
    <Snowflake className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
  "2 Sharing": (
    <Users className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
  "3 Sharing": (
    <Users className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
  "6 Sharing": (
    <Users className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
  "Attached Bathroom": (
    <DoorOpen className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
  "Attached Bath": (
    <DoorOpen className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
  "Study Table": (
    <svg
      className="w-4 h-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      style={{ color: COLORS.primary }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10h18M5 10v8m14-8v8M4 6h16a1 1 0 011 1v3H3V7a1 1 0 011-1z"
      />
    </svg>
  ),
  "Personal Wardrobe": (
    <Box className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
  "Laundry Bag": (
    <Shirt className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
  Ventilated: (
    <Wind className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
  Spacious: (
    <Maximize className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
  ),
};

export function FeaturedRoomsSection() {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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

  // Scroll Progress Tracking for sticky vertical section
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
    
    // Calculate vertical scroll offset corresponding to index
    const targetScroll =
      sectionStart +
      (index / hostelData.livingSpaces.length) * (sectionHeight - window.innerHeight);
    
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // Helper to calculate deterministic final target scroll position for centering
  const getTargetScrollLeft = (
    expandedId: number,
    isMobileSize: boolean,
    containerWidth: number
  ) => {
    const W_col = isMobileSize ? 290 : 350;
    const W_exp = isMobileSize ? 290 : 700;
    const G = 24; // gap-6 is 24px
    const P = isMobileSize ? 16 : 32; // px-4 is 16px, sm:px-8 is 32px

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

  // Smooth scroll to active card when expandedCardId changes
  useEffect(() => {
    if (expandedCardId === null) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const targetScrollLeft = getTargetScrollLeft(
      expandedCardId,
      isMobile,
      container.clientWidth
    );

    if (isFirstRender.current) {
      container.scrollLeft = targetScrollLeft;
      isFirstRender.current = false;
    } else {
      isProgrammaticScroll.current = true;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600); // Wait for smooth scroll animation to finish
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [expandedCardId, isMobile]);

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ images, index });
  };

  const closeLightbox = () => setLightbox(null);

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return;
    const next =
      (lightbox.index + dir + lightbox.images.length) % lightbox.images.length;
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
    <section
      ref={sectionRef}
      id="rooms"
      className="relative h-[250vh] w-full"
      style={{ backgroundColor: COLORS.background }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />

      <div className="sticky top-0 h-screen w-full flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* <h2
            className="text-4xl sm:text-5xl font-bold mb-4 text-center"
            style={{ color: COLORS.textPrimary }}
          >
            Explore Our <span className="italic" style={{ color: COLORS.primary }}>Rooms</span>
          </h2>
          <p className="text-center text-gray-500 max-w-xl mx-auto text-sm">
            Four thoughtfully designed room categories to match every need and budget. Click any card image to view the room gallery.
          </p> */}

          <SectionHeader
            title="Explore Our Rooms"
            titleHighlight="Rooms"
            subtitle="  Four thoughtfully designed room categories to match every need and budget. Click any card image to view the room gallery.
                    "
          />
        </motion.div>

        {/* Horizontal Slider Layout */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex items-stretch overflow-x-hidden gap-6 pb-8 snap-x snap-mandatory scrollbar-none px-4 sm:px-8"
          >
            {hostelData.livingSpaces.map((room, i) => {
              const isExpanded = expandedCardId === room.id;
              return (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="snap-start shrink-0 rounded-3xl overflow-hidden shadow-sm transition-all duration-500 border"
                  style={{
                    backgroundColor: COLORS.surface,
                    borderColor: COLORS.borderGold,
                    width: isExpanded
                      ? isMobile
                        ? "290px"
                        : "700px"
                      : isMobile
                        ? "290px"
                        : "350px",
                  }}
                >
                  <div
                    className={`${isExpanded ? "flex flex-col sm:flex-row items-stretch" : "flex flex-col justify-between"} h-full`}
                  >
                    {/* Image Column */}
                    <div
                      className="relative overflow-hidden cursor-pointer shrink-0"
                      onClick={() => {
                        if (!isExpanded) {
                          scrollToSlide(i);
                        } else {
                          openLightbox(room.images, 0);
                        }
                      }}
                      style={{
                        width: !isExpanded
                          ? "100%"
                          : isMobile
                            ? "100%"
                            : "350px",
                        height: !isExpanded
                          ? "208px"
                          : isMobile
                            ? "208px"
                            : "100%",
                        minHeight: !isExpanded
                          ? "208px"
                          : isMobile
                            ? "208px"
                            : "450px",
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${room.images[0]}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

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

                    {/* Content Column */}
                    <div
                      className="p-5 flex flex-col justify-between flex-grow"
                      style={{
                        width: !isExpanded
                          ? "100%"
                          : isMobile
                            ? "100%"
                            : "350px",
                      }}
                    >
                      <div>
                        <h3
                          className="text-xl font-bold mb-1"
                          style={{ color: COLORS.textPrimary }}
                        >
                          {room.title}
                        </h3>
                        <p
                          className="text-xs italic mb-3"
                          style={{ color: COLORS.primary }}
                        >
                          {room.tagline}
                        </p>

                        {/* Features Grid (All Amenities shown here) */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {room.features.map((f) => (
                            <div
                              key={f}
                              className="flex items-center gap-1.5 text-[11px]"
                              style={{ color: COLORS.textPrimary }}
                            >
                              {featureIconMap[f] || (
                                <Check
                                  className="w-3.5 h-3.5 shrink-0"
                                  style={{ color: COLORS.primary }}
                                />
                              )}
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons (when collapsed) */}
                      {!isExpanded && (
                        <div className="flex gap-2 mt-2">
                          <a
                            href="#contact"
                            onClick={handleEnquireClick}
                            className="group/btn flex items-center justify-center gap-1 flex-1 px-3 py-2.5 text-white text-xs font-semibold rounded-xl hover:-translate-y-0.5 hover:shadow transition-all duration-300 cursor-pointer"
                            style={{ backgroundColor: COLORS.primary }}
                          >
                            <span>Enquire Now</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                          <button
                            onClick={() => scrollToSlide(i)}
                            className="group/btn flex items-center justify-center gap-1 flex-1 px-3 py-2.5 text-xs font-semibold rounded-xl border hover:-translate-y-0.5 hover:shadow transition-all duration-300 cursor-pointer bg-white"
                            style={{
                              borderColor: COLORS.primary,
                              color: COLORS.primary,
                            }}
                          >
                            <span>View Details</span>
                            <ArrowRight
                              className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform"
                              style={{ color: COLORS.primary }}
                            />
                          </button>
                        </div>
                      )}

                      {/* Expanded Section */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-4 pt-4 border-t"
                            style={{ borderColor: `${COLORS.border}50` }}
                          >
                            <p className="text-[10px] uppercase font-bold tracking-wider mb-2 text-stone-400">
                              Description
                            </p>
                            <p
                              className="text-xs leading-relaxed mb-5"
                              style={{ color: COLORS.textSecondary }}
                            >
                              {room.description}
                            </p>

                            {/* Room Gallery Thumbnails */}
                            {room.images.length > 1 && (
                              <div className="mb-4">
                                <p className="text-[10px] uppercase font-bold tracking-wider mb-2 text-stone-400">
                                  Room Gallery
                                </p>
                                <div className="flex gap-2">
                                  {room.images.map((img, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() =>
                                        openLightbox(room.images, idx)
                                      }
                                      className="w-10 h-10 rounded-lg overflow-hidden border border-stone-200 hover:border-primary transition-colors focus:outline-none cursor-pointer"
                                    >
                                      <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Expanded state actions: Enquire Now + Close Details */}
                            <div className="flex gap-2 mt-4">
                              <a
                                href="#contact"
                                onClick={handleEnquireClick}
                                className="group/btn flex items-center justify-center gap-1 flex-1 px-3 py-2.5 text-white text-xs font-semibold rounded-xl hover:-translate-y-0.5 hover:shadow transition-all duration-300"
                                style={{ backgroundColor: COLORS.primary }}
                              >
                                <span>Enquire Now</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                              </a>
                              <button
                                onClick={() => setExpandedCardId(null)}
                                className="group/btn flex items-center justify-center gap-1 flex-1 px-3 py-2.5 text-xs font-semibold rounded-xl border hover:-translate-y-0.5 hover:shadow transition-all duration-300 cursor-pointer bg-white"
                                style={{
                                  borderColor: COLORS.primary,
                                  color: COLORS.primary,
                                }}
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

          {/* Right fade overlay to match background color */}
          <div
            className="absolute top-0 right-0 bottom-8 w-28 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to right, transparent, ${COLORS.background})`,
            }}
          />
        </div>

        {/* Navigation Controls (Dots & Arrows) */}
        <div className="flex flex-col items-center mt-6 w-full">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => {
                const prevIndex =
                  (currentSlideIndex - 1 + hostelData.livingSpaces.length) %
                  hostelData.livingSpaces.length;
                scrollToSlide(prevIndex);
              }}
              className="p-2.5 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm flex items-center justify-center bg-white cursor-pointer z-20"
              style={{
                borderColor: COLORS.borderGold,
                color: COLORS.primary,
              }}
              aria-label="Previous room"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2">
              {hostelData.livingSpaces.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className="h-1.5 rounded-full transition-all duration-300 cursor-pointer z-20"
                  style={{
                    width: currentSlideIndex === i ? "20px" : "6px",
                    backgroundColor:
                      currentSlideIndex === i ? COLORS.primary : COLORS.border,
                  }}
                  aria-label={`Go to room ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                const nextIndex =
                  (currentSlideIndex + 1) % hostelData.livingSpaces.length;
                scrollToSlide(nextIndex);
              }}
              className="p-2.5 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm flex items-center justify-center bg-white cursor-pointer z-20"
              style={{
                borderColor: COLORS.borderGold,
                color: COLORS.primary,
              }}
              aria-label="Next room"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

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
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
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
