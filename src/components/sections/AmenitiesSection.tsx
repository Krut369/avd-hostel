"use client";

import {
  Flame, Car, Shield, ShirtIcon, Dumbbell, Utensils, BookOpen,
  Heart, Users, ArrowUpDown, Trophy, Tv, Cross, Droplets
} from "lucide-react";
import { hostelData } from "@/data/hostel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COLORS } from "@/constants/colors";

const iconMap: Record<string, React.ReactNode> = {
  "Temple": <Flame className="w-6 h-6" />,
  "Free Parking": <Car className="w-6 h-6" />,
  "CCTV Surveillance": <Shield className="w-6 h-6" />,
  "Laundry Service": <ShirtIcon className="w-6 h-6" />,
  "Gymnasium": <Dumbbell className="w-6 h-6" />,
  "Dining Hall": <Utensils className="w-6 h-6" />,
  "Reading Room": <BookOpen className="w-6 h-6" />,
  "Hospitality": <Heart className="w-6 h-6" />,
  "Weekly Sabha": <Users className="w-6 h-6" />,
  "Lift Access": <ArrowUpDown className="w-6 h-6" />,
  "Sports Ground": <Trophy className="w-6 h-6" />,
  "TV Room": <Tv className="w-6 h-6" />,
  "First-Aid": <Cross className="w-6 h-6" />,
  "Water Cooler": <Droplets className="w-6 h-6" />,
};


export function AmenitiesSection() {
  // Duplicate the list to ensure seamless infinite looping
  const duplicatedAmenities = [...hostelData.amenities, ...hostelData.amenities, ...hostelData.amenities];

  return (
    <section
      className="py-24 overflow-hidden"
      style={{ backgroundColor: COLORS.background }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-scroll {
          animation: marquee 35s linear infinite;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionHeader
          title="World-Class"
          titleHighlight="Amenities"
          subtitle="Everything you need for a comfortable, fulfilling student life — all within the campus."
        />
      </div>

      {/* Infinite Scroll Container with Faded Edges */}
      <div className="relative w-full overflow-hidden marquee-container py-4">
        {/* Left Fade Overlay */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none hidden sm:block" 
          style={{
            background: `linear-gradient(to right, ${COLORS.background}, transparent)`
          }}
        />
        {/* Right Fade Overlay */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none hidden sm:block" 
          style={{
            background: `linear-gradient(to left, ${COLORS.background}, transparent)`
          }}
        />

        {/* Scrolling Flexbox Wrapper */}
        <div className="flex gap-4 w-max animate-marquee-scroll px-4">
          {duplicatedAmenities.map((amenity, i) => (
            <div
              key={`${amenity.title}-${i}`}
              className="group relative w-[160px] sm:w-[220px] shrink-0 rounded-2xl p-5 flex flex-col items-center text-center justify-center cursor-pointer hover:border-[var(--primary)]/40 transition-all duration-300 border shadow-sm glass-warm glass-shine"
              style={{ borderColor: COLORS.borderGold }}
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-transparent group-hover:from-[var(--primary)]/5 group-hover:to-[var(--accent)]/5 transition-all duration-500 pointer-events-none" />

              {/* Icon Container */}
              <div
                className="w-12 h-12 rounded-xl border flex items-center justify-center mb-3 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.primary}08`,
                  borderColor: COLORS.borderGold,
                  color: COLORS.primary
                }}
              >
                {iconMap[amenity.title] || <Flame className="w-6 h-6" />}
              </div>

              <h3 className="text-xs sm:text-sm font-bold leading-tight mb-2" style={{ color: COLORS.textPrimary }}>
                {amenity.title}
              </h3>
              <p className="text-[10px] sm:text-xs leading-relaxed text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
