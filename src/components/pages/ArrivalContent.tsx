"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Train,
  Bus,
  Car,
  Navigation,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors";

const modeIcons: Record<string, React.ReactNode> = {
  "Auto / Bus": <Train className="w-5 h-5" />,
  "Public Bus": <Bus className="w-5 h-5" />,
  "Self Drive": <Car className="w-5 h-5" />,
};
const tabLabels = ["AUTO / BUS", "PUBLIC BUS", "SELF DRIVE"];

export function ArrivalContent() {
  const [activeIdx, setActiveIdx] = useState(2); // Default to Route 03 (Self Drive)
  const { contact } = hostelData.hostelInfo;
  const destination = `${contact.coordinates.latitude},${contact.coordinates.longitude}`;
  const selectedRoute = hostelData.transportation[activeIdx];

  // Dynamic Google Maps directions source showing the route from origin to destination
  const mapUrl = `https://www.google.com/maps?saddr=${selectedRoute.originQuery}&daddr=${destination}&output=embed`;

  const handleLiveDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/${selectedRoute.originQuery}/${destination}`,
      "_blank",
    );
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: COLORS.textPrimary }}
            >
              Arrival & <span className="gradient-text italic">Directions</span>
            </h1>
            <p
              className="text-lg max-w-xl mx-auto font-medium"
              style={{ color: COLORS.textPrimary }}
            >
              We&apos;re located in the heart of Vallabh Vidyanagar — easily
              accessible from Anand by multiple routes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map + Address */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Combined Smart Navigation Card */}
          <div
            className="max-w-6xl mx-auto border rounded-[32px] p-6 lg:p-8 bg-white"
            style={{ borderColor: COLORS.borderGold }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Dynamic Map */}
              <div className="lg:col-span-7 flex flex-col h-full min-h-[350px] lg:min-h-[500px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={activeIdx}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full flex-grow rounded-2xl overflow-hidden border"
                  style={{ borderColor: COLORS.borderGold }}
                >
                  <iframe
                    src={mapUrl}
                    className="w-full h-full min-h-[380px] lg:min-h-[500px] border-none"
                    loading="lazy"
                    title="Hostel Location Map"
                    allowFullScreen
                  />
                </motion.div>
              </div>

              {/* Right Column: Interactive Smart Navigation Details */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  {/* Active Route Indicator Pill */}
                  <div className="mb-4">
                    <span
                      className="inline-block px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest"
                      style={{
                        backgroundColor: `${COLORS.primary}10`,
                        color: COLORS.primary,
                      }}
                    >
                      Route 0{activeIdx + 1}
                    </span>
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl font-bold mb-2"
                    style={{ color: COLORS.textPrimary }}
                  >
                    Smart{" "}
                    <span className="italic" style={{ color: COLORS.primary }}>
                      Navigation
                    </span>
                  </h2>
                  <p className="text-stone-500 text-sm mb-8 font-medium">
                    Select your arrival point to preview the best route.
                  </p>

                  {/* Interactive Timeline Tabs */}
                  <div className="relative mb-10">
                    {/* Horizontal Line connecting tabs */}
                    <div
                      className="absolute top-7 left-[16.67%] right-[16.67%] h-0.5 -translate-y-1/2 z-0"
                      style={{ backgroundColor: "#FFF1ED" }}
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
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2"
                              style={{
                                backgroundColor: isActive
                                  ? COLORS.primary
                                  : "#FFF1ED",
                                borderColor: isActive
                                  ? COLORS.primary
                                  : "#FFF1ED",
                                color: isActive ? "#FFFFFF" : COLORS.primary,
                                boxShadow: "none",
                              }}
                            >
                              {modeIcons[t.mode] || <Car className="w-5 h-5" />}
                            </div>
                            <span
                              className="text-[9px] sm:text-xs font-bold tracking-widest uppercase mt-3 transition-colors duration-300"
                              style={{ color: COLORS.primary }}
                            >
                              {tabLabels[idx]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Routes Card List */}
                  <div className="space-y-4">
                    {hostelData.transportation.map((t, idx) => {
                      const isActive = activeIdx === idx;
                      return (
                        <div
                          key={t.route}
                          onClick={() => setActiveIdx(idx)}
                          className="flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                          style={{
                            borderColor: isActive ? COLORS.primary : "#F5F5F4",
                            backgroundColor: isActive
                              ? `${COLORS.primary}05`
                              : "#FFFFFF",
                            boxShadow: "none",
                          }}
                        >
                          {/* Circle icon */}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
                            style={{
                              backgroundColor: isActive
                                ? COLORS.primary
                                : "#FFF1ED",
                              color: isActive ? "#FFFFFF" : COLORS.primary,
                            }}
                          >
                            {modeIcons[t.mode] || <Car className="w-5 h-5" />}
                          </div>

                          {/* Details content */}
                          <div className="flex-grow">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <h4 className="font-bold text-xs sm:text-sm text-stone-800">
                                {t.from}
                              </h4>
                              <span
                                className="px-2 py-0.5 rounded-full font-bold text-[8px] uppercase tracking-wider"
                                style={{
                                  backgroundColor: `${COLORS.primary}12`,
                                  color: COLORS.primary,
                                }}
                              >
                                {t.mode}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Primary Trigger Button with Enquire Now Style */}
                <button
                  onClick={handleLiveDirections}
                  className="group/btn flex items-center justify-between w-full px-4 py-4 mt-8 text-white text-sm font-semibold rounded-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 fill-current rotate-45" />
                    <span>Get Live Directions</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
