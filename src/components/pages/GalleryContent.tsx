"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "@/constants/colors";

const categories = ["All", "Rooms", "Campus", "Temple", "Community"];

const galleryItems = [
  { src: "/ac-room/1.jpg", cat: "Rooms", label: "AC Room" },
  { src: "/ac-room/2.jpg", cat: "Rooms", label: "AC Room" },
  { src: "/ac-room/3.jpg", cat: "Rooms", label: "AC Room" },
  { src: "/ac-room/4.jpg", cat: "Rooms", label: "AC Room" },
  { src: "/non-ac-room/1.jpg", cat: "Rooms", label: "Non-AC Room" },
  { src: "/non-ac-room/2.jpg", cat: "Rooms", label: "Non-AC Room" },
  { src: "/dormitory/1.jpg", cat: "Rooms", label: "Dormitory" },
  { src: "/dormitory/2.jpg", cat: "Rooms", label: "Dormitory" },
  { src: "https://www.avdvvn.org/assets/images/d1.jpg", cat: "Rooms", label: "Dormitory" },
  { src: "/junior-room/1.jpg", cat: "Rooms", label: "Junior Room" },
  { src: "https://www.avdvvn.org/assets/images/jr1.jpg", cat: "Rooms", label: "Junior Room" },
  { src: "/hostel-building.jpg", cat: "Campus", label: "Hostel Building" },
  { src: "/temple.jpg", cat: "Temple", label: "Campus Temple" },
  { src: "/prayer-hall.jpg", cat: "Community", label: "Prayer Hall" },
];

const categoryData = [
  { id: "All", label: "All Photos", img: "/hostel-building.jpg", gridClass: "col-span-2 h-[160px] md:col-span-2 md:h-[300px]" },
  { id: "Temple", label: "Campus Temple", img: "/temple.jpg", gridClass: "col-span-1 row-span-2 h-[330px] md:col-span-1 md:row-span-2 md:h-[674px]" },
  { id: "Campus", label: "Campus Building", img: "/hostel-building.jpg", gridClass: "col-span-1 h-[160px] md:col-span-1 md:h-[350px]" },
  { id: "Rooms", label: "Living Rooms", img: "/ac-room/1.jpg", gridClass: "col-span-1 h-[160px] md:col-span-1 md:h-[350px]" },
  { id: "Community", label: "Community & Prayers", img: "/prayer-hall.jpg", gridClass: "col-span-2 h-[150px] md:col-span-2 md:h-[260px]" },
];

export function GalleryContent() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<{ src: string; index: number } | null>(null);

  const filtered = active === "All" ? galleryItems : galleryItems.filter((g) => g.cat === active);

  const handleCategoryClick = (cat: string) => {
    setActive(cat);
    const categoryFiltered = cat === "All" ? galleryItems : galleryItems.filter((g) => g.cat === cat);
    if (categoryFiltered.length > 0) {
      setLightbox({ src: categoryFiltered[0].src, index: 0 });
    }
  };

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return;
    const next = (lightbox.index + dir + filtered.length) % filtered.length;
    setLightbox({ src: filtered[next].src, index: next });
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-5/40 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="ornament-divider justify-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: COLORS.primary }}>Visual Tour</span>
            </div>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6"
              style={{ fontFamily: "Playfair Display, serif", color: COLORS.textPrimary }}
            >
              Our <span className="gradient-text italic">Gallery</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto font-medium" style={{ color: COLORS.textPrimary }}>
              Explore the campus spaces. Click any category card below to open the interactive viewer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Showcase Card Layout */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8 border-t"
        style={{ backgroundColor: COLORS.background, borderColor: `${COLORS.primary}15` }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Sexy Masonry-Style Category Grid - Active on Mobile and Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {categoryData.map((cat, i) => {
              const isActive = active === cat.id;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-md cursor-pointer border-2 transition-all duration-300 ${cat.gridClass}`}
                  style={{
                    borderColor: isActive ? COLORS.primary : COLORS.borderGold,
                    boxShadow: isActive ? `0 15px 35px -5px ${COLORS.primary}25` : "none"
                  }}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {/* Background Zoom Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${cat.img}')`,
                    }}
                  />
                  {/* Elegant Gradient Overlay Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:via-black/25 transition-all duration-300" />
                  
                  {/* Active Highlight Layer */}
                  {isActive && (
                    <div className="absolute inset-0 border border-white/40 rounded-2xl md:rounded-3xl z-10" />
                  )}

                  {/* Text Details */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 z-10">
                    <p className="text-amber-400 text-[9px] md:text-xs font-bold uppercase tracking-widest mb-0.5 md:mb-1">
                      {cat.id === "All" ? "Collection" : "Category"}
                    </p>
                    <h3
                      className="text-white text-xs sm:text-sm md:text-2xl font-bold leading-tight"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {cat.label}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.img
              key={lightbox.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={lightbox.src}
              alt="Gallery"
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 text-white/40 text-sm">
              {lightbox.index + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
