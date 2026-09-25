"use client";

import React from "react";
import {
  Home, Car, Shield, ShirtIcon, Dumbbell, Utensils, BookOpen,
  Heart, Users, ArrowUpDown, Trophy, Cross, Droplets,
  GraduationCap, Star, ArrowRight,
} from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors";

// ─── Icon Map ────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  "Temple":            <Home className="w-5 h-5" />,
  "Parking":           <Car className="w-5 h-5" />,
  "CCTV Surveillance": <Shield className="w-5 h-5" />,
  "Laundry Service":   <ShirtIcon className="w-5 h-5" />,
  "Gymnasium":         <Dumbbell className="w-5 h-5" />,
  "Dining Hall":       <Utensils className="w-5 h-5" />,
  "Reading Room":      <BookOpen className="w-5 h-5" />,
  "Hospitality":       <Heart className="w-5 h-5" />,
  "Weekly Sabha":      <Users className="w-5 h-5" />,
  "Lift Access":       <ArrowUpDown className="w-5 h-5" />,
  "Sports Ground":     <Trophy className="w-5 h-5" />,
  "First-Aid":         <Cross className="w-5 h-5" />,
  "Water Cooler":      <Droplets className="w-5 h-5" />,
};

// Main campus building image matching reference UI
const CAMPUS_IMG = "https://www.avdvvn.org/assets/images/r3.jpg";

export function AmenitiesSection() {
  const amenities = hostelData.amenities;
  const looped = [...amenities, ...amenities, ...amenities];

  return (
    <section className="w-full py-12 lg:py-16 overflow-hidden" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ─── 1. TOP HERO CONTAINER WITH ASYMMETRIC CURVED CUTOUT ───────────── */}
        <div className="relative rounded-[36px] overflow-hidden bg-white border border-[#EFEBE6] shadow-sm min-h-[460px] lg:min-h-[500px] flex flex-col lg:flex-row">
          
          {/* Background Photo (Fills Right Side) */}
          <div className="relative lg:absolute inset-0 w-full h-[260px] lg:h-full lg:left-[42%] lg:w-[58%]">
            <img
              src={CAMPUS_IMG}
              alt="AVD Campus Building"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* White Left Panel with Custom Curved SVG Right Edge (Desktop) */}
          <div className="relative z-10 lg:w-[48%] bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            
            {/* SVG Swooping Curved Overlay (visible on desktop) */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-full -ml-px w-32 pointer-events-none h-full z-20">
              <svg
                viewBox="0 0 100 400"
                preserveAspectRatio="none"
                className="w-full h-full text-white fill-current"
              >
                <path d="M 0,0 L 75,0 Q 95,0 80,40 C 60,90 20,160 25,240 C 30,310 70,360 60,400 L 0,400 Z" />
              </svg>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${COLORS.primary}15`, color: COLORS.primary }}
              >
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <span
                className="text-[11px] font-bold tracking-[0.18em] uppercase font-sans"
                style={{ color: COLORS.primary }}
              >
                CAMPUS LIFE
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#0F172A] tracking-tight leading-[1.1]">
              World-Class
            </h2>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-normal leading-[1.15] mt-1 mb-6"
              style={{ color: COLORS.primary }}
            >
              Amenities
            </h2>

            {/* Accent Line */}
            <div className="h-0.5 w-14 rounded-full bg-gradient-to-r from-[#C44D28] to-[#D86642] mb-6" />

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-md font-sans">
              Everything you need for a comfortable,<br className="hidden sm:inline" />
              fulfilling student life — all within the campus.
            </p>
          </div>

        </div>


        {/* ─── 2. MIDDLE SECTION: INFINITE MARQUEE CAROUSEL ─────────────────── */}
        <div className="relative overflow-hidden py-4 group/marquee">
          {/* Side Fades */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${COLORS.background}, transparent)` }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to left, ${COLORS.background}, transparent)` }}
          />

          {/* Track */}
          <div
            className="flex gap-5 w-max"
            style={{
              animation: "amenitiesInfiniteScroll 45s linear infinite",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
            }}
          >
            {looped.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="w-[190px] sm:w-[210px] shrink-0 bg-white rounded-[28px] p-6 flex flex-col justify-between border border-[#EFEBE6] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div>
                  {/* Icon Badge */}
                  <div
                    className="mb-4 transition-transform duration-300 group-hover:scale-110 inline-flex items-center origin-left"
                    style={{
                      color: COLORS.primary,
                    }}
                  >
                    {iconMap[item.title] || <Home className="w-6 h-6" />}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold font-serif text-[#0F172A] mb-2 leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-slate-500 font-sans">
                    {item.description}
                  </p>
                </div>


              </div>
            ))}
          </div>
        </div>




      </div>

      <style>{`
        @keyframes amenitiesInfiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}
