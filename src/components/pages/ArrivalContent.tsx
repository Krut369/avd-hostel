"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Bus,
  Car,
  Navigation,
  ArrowRight,
  Clock,
  ExternalLink,
  Compass,
} from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors";

const modeIcons: Record<string, React.ReactNode> = {
  "Auto / Bus": <Bus className="w-5 h-5" />,
  "Public Bus": <Bus className="w-5 h-5" />,
  "Self Drive":  <Car className="w-5 h-5" />,
};
const tabLabels = ["AUTO / BUS", "PUBLIC BUS", "SELF DRIVE"];

export function ArrivalContent() {
  const [activeIdx, setActiveIdx] = useState(0); // Default to Route 01 (Anand Railway Station)

  const { contact } = hostelData.hostelInfo;
  const destination = `${contact.coordinates.latitude},${contact.coordinates.longitude}`;
  const selectedRoute = hostelData.transportation[activeIdx];

  const handleLiveDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/${selectedRoute.originQuery}/${destination}`,
      "_blank"
    );
  };

  return (
    <section
      id="arrival"
      className="relative min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-center items-center"
      style={{ backgroundColor: COLORS.background }}
    >


      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-6 sm:space-y-8">
        
        {/* ─── 1. HEADER SECTION ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center space-y-2"
        >
          {/* Badge */}
          <div className="flex justify-center mb-3">
            <span className="section-badge">
              <Compass className="w-3.5 h-3.5" />
              How to Find Us
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight text-[#0F172A] tracking-tight"
          >
            Arrival & <span className="gradient-text italic">Directions</span>
          </h1>

          <div className="h-0.5 w-14 rounded-full bg-gradient-to-r from-[#C44D28] to-[#D86642] mx-auto my-3" />

          <p
            className="text-sm sm:text-base max-w-xl mx-auto font-sans text-slate-500 leading-relaxed"
          >
            We&apos;re located in the heart of Vallabh Vidyanagar — easily accessible from Anand by multiple routes.
          </p>

          {/* Address Pill */}
          <div className="pt-2">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-semibold font-sans bg-white/90 backdrop-blur-md shadow-sm border-[#EDE8E3] text-slate-600"
            >
              <MapPin className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
              <span>Vallabh Vidyanagar, Anand, Gujarat — 388120</span>
            </span>
          </div>
        </motion.div>

        {/* ─── 2. SMART NAVIGATION MAP & ROUTES CARD ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto border border-[#EDE8E3] rounded-[36px] p-5 sm:p-7 lg:p-8 bg-white shadow-[0_16px_45px_-12px_rgba(196,77,40,0.12)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

            {/* LEFT COLUMN: Dynamic Google Map View with Overlay Badge */}
            <div
              className="lg:col-span-7 flex flex-col h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] relative overflow-hidden rounded-[24px] border border-slate-100 shadow-inner group"
            >
              {hostelData.transportation.map((t, idx) => {
                const isActive = activeIdx === idx;
                const routeMapUrl = `https://www.google.com/maps?saddr=${t.originQuery}&daddr=${destination}&output=embed`;
                return (
                  <motion.div
                    key={t.route}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.04,
                      zIndex: isActive ? 10 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  >
                    <iframe
                      src={routeMapUrl}
                      className="w-full h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] border-none"
                      loading="lazy"
                      title={`Hostel Location Map - ${t.from}`}
                      allowFullScreen
                    />
                  </motion.div>
                );
              })}

              {/* Map Destination Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md text-xs font-semibold font-sans text-slate-700">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: COLORS.primary }} />
                  <span>Destination: Atmiya Vidya Dham (AVD)</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Smart Navigation Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Active Route Indicator & Distance Pill */}
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-bold text-[11px] uppercase tracking-widest font-sans"
                    style={{ backgroundColor: `${COLORS.primary}12`, color: COLORS.primary }}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Route 0{activeIdx + 1} of 03
                  </span>
                  <span className="text-xs font-bold font-sans px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {selectedRoute.distance}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#0F172A] mb-1">
                  Smart <span className="italic gradient-text">Navigation</span>
                </h3>
                <p className="text-slate-400 text-xs mb-6 font-sans">
                  Select your arrival point below to preview the best route.
                </p>

                {/* Interactive Timeline Mode Tabs */}
                <div className="relative mb-6">
                  {/* Connecting Line */}
                  <div
                    className="absolute top-6 left-[16.67%] right-[16.67%] h-0.5 -translate-y-1/2 z-0 rounded-full"
                    style={{ backgroundColor: `${COLORS.primary}18` }}
                  />

                  <div className="grid grid-cols-3 relative z-10">
                    {hostelData.transportation.map((t, idx) => {
                      const isActive = activeIdx === idx;
                      return (
                        <div
                          key={t.route}
                          className="flex flex-col items-center cursor-pointer group"
                          onClick={() => setActiveIdx(idx)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2"
                            style={{
                              borderColor: isActive ? COLORS.primary : `${COLORS.primary}25`,
                              backgroundColor: isActive ? COLORS.primary : "#FFFFFF",
                              boxShadow: isActive ? "0 6px 18px -3px rgba(196,77,40,0.38)" : "0 2px 8px -2px rgba(0,0,0,0.05)",
                            }}
                          >
                            <span
                              className="relative z-10 transition-colors duration-300 flex items-center justify-center"
                              style={{ color: isActive ? "#FFFFFF" : COLORS.primary }}
                            >
                              {modeIcons[t.mode] || <Car className="w-4 h-4" />}
                            </span>
                          </motion.div>
                          <span
                            className="text-[9px] font-bold tracking-wider uppercase mt-2.5 transition-colors duration-300 font-sans"
                            style={{ color: isActive ? COLORS.primary : COLORS.textMuted }}
                          >
                            {tabLabels[idx]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Routes Card Selector List */}
                <div className="space-y-2.5">
                  {hostelData.transportation.map((t, idx) => {
                    const isActive = activeIdx === idx;
                    return (
                      <motion.div
                        key={t.route}
                        onClick={() => setActiveIdx(idx)}
                        whileHover={{ y: -1, scale: 1.005 }}
                        whileTap={{ scale: 0.99 }}
                        className="flex items-center gap-3.5 p-3.5 rounded-2xl border-2 transition-all duration-300 cursor-pointer"
                        style={{
                          borderColor: isActive ? COLORS.primary : "#F1EBE4",
                          backgroundColor: isActive ? `${COLORS.primary}06` : "#FFFFFF",
                          boxShadow: isActive ? "0 6px 18px -4px rgba(196,77,40,0.14)" : "none",
                        }}
                      >
                        {/* Circle Icon */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm"
                          style={{
                            backgroundColor: isActive ? COLORS.primary : `${COLORS.primary}12`,
                            color: isActive ? "#FFFFFF" : COLORS.primary,
                          }}
                        >
                          {modeIcons[t.mode] || <Car className="w-4 h-4" />}
                        </div>

                        {/* Route Details */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] truncate font-sans">
                              {t.from}
                            </h4>
                            <span
                              className="px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider shrink-0 font-sans"
                              style={{
                                backgroundColor: `${COLORS.primary}12`,
                                color: COLORS.primary,
                              }}
                            >
                              {t.mode}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-sans truncate mt-0.5">
                            {t.routePath}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Get Live Directions CTA Button */}
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLiveDirections}
                className="group/btn glass-shine flex items-center justify-between w-full px-5 py-3.5 mt-5 text-white text-xs sm:text-sm font-semibold rounded-2xl transition-all duration-300 cursor-pointer border-none font-sans shadow-md shadow-[#C44D28]/30"
                style={{ backgroundColor: COLORS.primary }}
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 fill-current rotate-45" />
                  <span>Get Live Directions</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
