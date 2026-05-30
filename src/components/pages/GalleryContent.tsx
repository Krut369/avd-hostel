"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ChevronLeft, ChevronRight,
  Dumbbell, Utensils, Trophy, Church, Calendar, BedDouble, LayoutGrid,
} from "lucide-react";
import { COLORS } from "@/constants/colors";

const BASE = "https://www.avdvvn.org/assets/images";

// ─── Gallery items — all from avdvvn.org (no local files needed) ──────────────
const galleryItems = [
  // Rooms ✅ local files
  { src: "/ac-room/1.jpg",       cat: "Rooms",  label: "AC Room" },
  { src: "/ac-room/2.jpg",       cat: "Rooms",  label: "AC Room" },
  { src: "/ac-room/3.jpg",       cat: "Rooms",  label: "AC Room" },
  { src: "/ac-room/4.jpg",       cat: "Rooms",  label: "AC Room" },
  { src: "/non-ac-room/1.jpg",   cat: "Rooms",  label: "Non-AC Room" },
  { src: "/non-ac-room/2.jpg",   cat: "Rooms",  label: "Non-AC Room" },
  { src: "/dormitory/1.jpg",     cat: "Rooms",  label: "Dormitory" },
  { src: "/dormitory/2.jpg",     cat: "Rooms",  label: "Dormitory" },
  { src: "/junior-room/1.jpg",   cat: "Rooms",  label: "Junior Room" },
  { src: "/junior-room/2.jpg",   cat: "Rooms",  label: "Junior Room" },
  // Rooms — from AVD website
  { src: `${BASE}/r1.png`,       cat: "Rooms",  label: "Student Room" },
  { src: `${BASE}/r2.png`,       cat: "Rooms",  label: "Student Room" },
  { src: `${BASE}/r3.jpg`,       cat: "Rooms",  label: "Student Room" },
  { src: `${BASE}/r4.jpg`,       cat: "Rooms",  label: "Student Room" },

  // Gym — from AVD website
  { src: `${BASE}/gym.jpg`,      cat: "Gym",    label: "Gymnasium" },

  // Dining — from AVD website
  { src: `${BASE}/dh1.jpg`,      cat: "Dining", label: "Dining Hall" },
  { src: `${BASE}/dh2.jpg`,      cat: "Dining", label: "Dining Hall" },
  { src: `${BASE}/dh3.jpg`,      cat: "Dining", label: "Food Service" },
  { src: `${BASE}/dh4.jpg`,      cat: "Dining", label: "Mess Hall" },

  // Sports — from AVD website
  { src: `${BASE}/s1.jpg`,       cat: "Sports", label: "Sports Ground" },
  { src: `${BASE}/s2.jpg`,       cat: "Sports", label: "Cricket Match" },
  { src: `${BASE}/s3.jpg`,       cat: "Sports", label: "Cricket Match" },
  { src: `${BASE}/s4.jpg`,       cat: "Sports", label: "Cricket Match" },
  { src: `${BASE}/s5.jpg`,       cat: "Sports", label: "Sports Activity" },
  { src: `${BASE}/s6.jpg`,       cat: "Sports", label: "Sports Activity" },
  { src: `${BASE}/s7.jpg`,       cat: "Sports", label: "Sports Activity" },
  { src: `${BASE}/s8.jpg`,       cat: "Sports", label: "Sports Activity" },
  { src: `${BASE}/s9.jpg`,       cat: "Sports", label: "Cricket Team" },
  { src: `${BASE}/s10.jpg`,      cat: "Sports", label: "Cricket Team" },

  // Temple — from AVD website
  { src: `${BASE}/t1.jpeg`,      cat: "Temple", label: "Shree Swaminarayan Mandir" },
  { src: `${BASE}/t2.jpeg`,      cat: "Temple", label: "Mandir View" },
  { src: `${BASE}/t3.jpeg`,      cat: "Temple", label: "Mandir Grounds" },
  { src: `${BASE}/t4.jpeg`,      cat: "Temple", label: "Temple Entrance" },
  { src: `${BASE}/t5.jpeg`,      cat: "Temple", label: "Temple Interior" },
  { src: `${BASE}/t6.jpeg`,      cat: "Temple", label: "Mandir Panorama" },

  // Events — from AVD website
  { src: `${BASE}/e1.jpg`,       cat: "Events", label: "Cultural Event" },
  { src: `${BASE}/e2.jpg`,       cat: "Events", label: "Cultural Event" },
  { src: `${BASE}/e3.jpg`,       cat: "Events", label: "Cultural Event" },
  { src: `${BASE}/e4.jpg`,       cat: "Events", label: "Cultural Event" },
  { src: `${BASE}/e13.jpg`,      cat: "Events", label: "Satsang Sabha" },
  { src: `${BASE}/e14.jpg`,      cat: "Events", label: "Satsang Sabha" },
  { src: `${BASE}/e15.jpg`,      cat: "Events", label: "Cultural Program" },
  { src: `${BASE}/e16.jpg`,      cat: "Events", label: "Cultural Program" },
  { src: `${BASE}/e18.jpg`,      cat: "Events", label: "Campus Event" },
  { src: `${BASE}/e19.jpg`,      cat: "Events", label: "Campus Event" },
];

// ─── Category cards — all thumbnails use real URLs (no nulls, no 404s) ────────
const categoryData = [
  {
    id: "All",    label: "All Photos",           count: galleryItems.length,
    img: "/ac-room/1.jpg",
    icon: <LayoutGrid className="w-7 h-7" />,
    gradient: `linear-gradient(135deg, ${COLORS.primary}22 0%, ${COLORS.secondary}22 100%)`,
    gridClass: "col-span-1", h: "h-[180px] md:h-[260px]",
  },
  {
    id: "Rooms",  label: "Living Rooms",         count: 14,
    img: "/ac-room/2.jpg",
    icon: <BedDouble className="w-7 h-7" />,
    gradient: `linear-gradient(135deg, ${COLORS.primary}22 0%, ${COLORS.primaryLight}22 100%)`,
    gridClass: "col-span-1", h: "h-[180px] md:h-[260px]",
  },
  {
    id: "Gym",    label: "Gymnasium",            count: 1,
    img: `${BASE}/gym.jpg`,
    icon: <Dumbbell className="w-7 h-7" />,
    gradient: "linear-gradient(135deg, #6366f122 0%, #8b5cf622 100%)",
    gridClass: "col-span-1", h: "h-[180px] md:h-[260px]",
  },
  {
    id: "Dining", label: "Dining Hall",          count: 4,
    img: `${BASE}/dh1.jpg`,
    icon: <Utensils className="w-7 h-7" />,
    gradient: `linear-gradient(135deg, ${COLORS.primary}15 0%, ${COLORS.secondary}15 100%)`,
    gridClass: "col-span-1", h: "h-[180px] md:h-[260px]",
  },
  {
    id: "Sports", label: "Sports & Cricket",    count: 10,
    img: `${BASE}/s9.jpg`,
    icon: <Trophy className="w-7 h-7" />,
    gradient: "linear-gradient(135deg, #10b98122 0%, #065f4622 100%)",
    gridClass: "col-span-1", h: "h-[180px] md:h-[260px]",
  },
  {
    id: "Temple", label: "Swaminarayan Mandir", count: 6,
    img: `${BASE}/t1.jpeg`,
    icon: <Church className="w-7 h-7" />,
    gradient: `linear-gradient(135deg, ${COLORS.primary}22 0%, ${COLORS.primaryDark}22 100%)`,
    gridClass: "col-span-1", h: "h-[180px] md:h-[260px]",
  },
  {
    id: "Events", label: "Cultural Events",     count: 10,
    img: `${BASE}/e1.jpg`,
    icon: <Calendar className="w-7 h-7" />,
    gradient: "linear-gradient(135deg, #ec489922 0%, #be185d22 100%)",
    gridClass: "col-span-2 md:col-span-3", h: "h-[180px] md:h-[260px]",
  },
];

const filterTabs = ["All", "Rooms", "Gym", "Dining", "Sports", "Temple", "Events"];

// ─── Category card ────────────────────────────────────────────────────────────
function CategoryCard({
  cat,
  isActive,
  onClick,
}: {
  cat: (typeof categoryData)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className={`group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${cat.gridClass} ${cat.h}`}
      style={{
        borderColor: isActive ? COLORS.primary : COLORS.borderGold,
        boxShadow: isActive ? `0 12px 32px -5px ${COLORS.primary}40` : "none",
        background: cat.gradient,
      }}
      onClick={onClick}
    >
      {/* Thumbnail */}
      {imgOk && cat.img && (
        <img
          src={cat.img}
          alt={cat.label}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgOk(false)}
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: imgOk && cat.img
            ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 100%)",
        }}
      />

      {/* Icon fallback */}
      {(!imgOk || !cat.img) && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: COLORS.primary, opacity: 0.35 }}
        >
          <div className="scale-150">{cat.icon}</div>
        </div>
      )}

      {/* Active ring */}
      {isActive && (
        <div className="absolute inset-0 border border-white/30 rounded-2xl md:rounded-3xl z-10 pointer-events-none" />
      )}

      {/* Badge */}
      <div
        className="absolute top-2.5 right-2.5 z-20 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow"
        style={{
          backgroundColor: isActive ? COLORS.primary : "rgba(0,0,0,0.45)",
          color: "#fff",
        }}
      >
        {isActive ? "✓ Viewing" : `${cat.count} photo${cat.count !== 1 ? "s" : ""}`}
      </div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 z-10">
        <p
          className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5"
          style={{ color: imgOk && cat.img ? COLORS.accent : COLORS.primary }}
        >
          {cat.id === "All" ? "Collection" : "Category"}
        </p>
        <h3
          className="text-xs sm:text-sm md:text-xl font-bold leading-tight drop-shadow"
          style={{
            color: imgOk && cat.img ? "#fff" : COLORS.textPrimary,
          }}
        >
          {cat.label}
        </h3>
      </div>
    </motion.div>
  );
}

// ─── Lightbox image ───────────────────────────────────────────────────────────
function LightboxImage({ src, label }: { src: string; label: string }) {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return (
      <div className="flex flex-col items-center gap-4 text-white/50 p-10 rounded-2xl border border-white/10 bg-white/5 max-w-xs text-center">
        <LayoutGrid className="w-10 h-10 opacity-25" />
        <p className="text-sm font-semibold text-white/60">Image unavailable</p>
      </div>
    );
  }

  return (
    <motion.img
      key={src}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      src={src}
      alt={label}
      loading="lazy"
      className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
      onError={() => setOk(false)}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function GalleryContent() {
  const [active, setActive] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; index: number; cat: string } | null>(null);

  const getFiltered = (cat: string | null) =>
    !cat || cat === "All" ? galleryItems : galleryItems.filter((g) => g.cat === cat);

  const filtered = getFiltered(lightbox?.cat ?? active);

  const handleCategoryClick = (cat: string) => {
    const key = cat === "All" ? null : cat;
    setActive(key);
    const items = getFiltered(cat);
    if (items.length > 0) setLightbox({ src: items[0].src, index: 0, cat });
  };

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return;
    const next = (lightbox.index + dir + filtered.length) % filtered.length;
    setLightbox({ src: filtered[next].src, index: next, cat: lightbox.cat });
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6"
              style={{ color: COLORS.textPrimary }}
            >
              Our <span className="gradient-text italic">Gallery</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto font-medium" style={{ color: COLORS.textSecondary }}>
              Rooms · Gym · Dining · Sports · Temple · Events — click any card to explore.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Grid ─────────────────────────────────────────── */}
      <section
        className="py-14 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {categoryData.map((cat, i) => {
              const isActive = active === cat.id || (active === null && cat.id === "All");
              return (
                <CategoryCard
                  key={`${cat.id}-${i}`}
                  cat={cat}
                  isActive={isActive}
                  onClick={() => handleCategoryClick(cat.id)}
                />
              );
            })}
          </div>

          {/* Count hint */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8 text-sm"
            style={{ color: COLORS.textMuted }}
          >
            {getFiltered(active).length} photo{getFiltered(active).length !== 1 ? "s" : ""} in{" "}
            <span style={{ color: COLORS.primary }}>{active ?? "All"}</span> — click a card to browse
          </motion.p>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <LightboxImage
                src={lightbox.src}
                label={filtered[lightbox.index]?.label ?? "Gallery"}
              />
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <p className="text-white/80 text-sm font-semibold">{filtered[lightbox.index]?.label}</p>
              <p className="text-white/40 text-xs">{lightbox.index + 1} / {filtered.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
