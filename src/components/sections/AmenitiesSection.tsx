"use client";

import React from "react";
import {
  Home, Car, Shield, ShirtIcon, Dumbbell, Utensils, BookOpen,
  Heart, Users, ArrowUpDown, Trophy, Cross, Droplets,
  GraduationCap, Star, ArrowRight, Leaf, Lock,
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
const CAMPUS_THUMB = "https://www.avdvvn.org/assets/images/r3.jpg";

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
            <div
              className="w-12 h-[3px] rounded-full mb-6"
              style={{ backgroundColor: COLORS.primary }}
            />

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-md font-sans">
              Everything you need for a comfortable,<br className="hidden sm:inline" />
              fulfilling student life — all within the campus.
            </p>
          </div>

          {/* Dark Floating Card Overlay (Bottom Right over photo) */}
          <div className="relative lg:absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-20 m-6 lg:m-0">
            <div
              className="rounded-3xl p-6 max-w-[300px] sm:max-w-[330px] shadow-2xl text-white backdrop-blur-md border border-white/10"
              style={{ backgroundColor: "#0F172A" }}
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase block font-sans">
                    BUILT FOR
                  </span>
                  <h4 className="text-base font-bold font-serif leading-tight text-white">
                    Your Success
                  </h4>
                </div>
              </div>

              <div className="w-full h-px bg-white/15 my-3" />

              <p className="text-xs leading-relaxed text-slate-300 font-sans">
                Thoughtfully designed amenities to support your academic and personal growth.
              </p>
            </div>
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
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${COLORS.primary}12`,
                      color: COLORS.primary,
                    }}
                  >
                    {iconMap[item.title] || <Home className="w-5 h-5" />}
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

                {/* Bottom Action Arrow Circle */}
                <div className="mt-6 flex items-center">
                  <div
                    className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#C44D28] group-hover:text-white text-slate-400"
                    style={{ backgroundColor: `${COLORS.primary}08` }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ─── 3. BOTTOM BANNER: FULL-WIDTH FEATURE CARD ─────────────────────── */}
        <div className="bg-white rounded-[32px] border border-[#EFEBE6] p-4 sm:p-6 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Block: Thumbnail & Well-Being Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full lg:w-auto">
            <div className="w-full sm:w-36 h-28 sm:h-24 rounded-2xl overflow-hidden shrink-0">
              <img
                src={CAMPUS_THUMB}
                alt="Building thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: COLORS.primary, color: "#FFFFFF" }}
              >
                <Heart className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-serif text-[#0F172A] leading-tight">
                  Designed for<br />Your Well-Being
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs font-sans">
                  Our amenities ensure you have everything you need to learn, grow, and thrive.
                </p>
              </div>
            </div>
          </div>

          {/* Middle Block: 3 Features with Separators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4 lg:py-0 border-y lg:border-y-0 lg:border-x border-slate-100 px-0 lg:px-8 w-full lg:w-auto">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${COLORS.primary}12`, color: COLORS.primary }}
              >
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0F172A] font-sans">Student First</h5>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-sans">
                  Every facility is crafted with students in mind.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${COLORS.primary}12`, color: COLORS.primary }}
              >
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0F172A] font-sans">Sustainable</h5>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-sans">
                  Eco-friendly practices for a better tomorrow.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${COLORS.primary}12`, color: COLORS.primary }}
              >
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0F172A] font-sans">Safe & Secure</h5>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-sans">
                  Your safety and comfort are our top priority.
                </p>
              </div>
            </div>

          </div>

          {/* Right Block: CTA Button */}
          <div className="w-full lg:w-auto shrink-0 flex justify-end">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:opacity-90 active:scale-95 shadow-md font-sans"
              style={{ backgroundColor: COLORS.primary }}
            >
              <span>Explore Campus</span>
              <ArrowRight className="w-4 h-4" />
            </a>
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
