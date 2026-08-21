"use client";

import React from "react";
import { Quote, Sparkles, Star } from "lucide-react";
import { hostelData, Review } from "@/data/hostel";
import { COLORS } from "@/constants/colors";

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div 
      tabIndex={0}
      className="group relative w-60 h-60 shrink-0 rounded-2xl overflow-hidden shadow-lg bg-neutral-900 border border-neutral-200/20 cursor-pointer outline-none focus:ring-2 focus:ring-[#C44D28] touch-manipulation"
    >
      {/* Alumnus/Student Photo */}
      <img
        src={review.image}
        alt={review.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus:scale-105"
        onError={(e) => {
          // Fallback if image fails to load
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face";
        }}
      />
      
      {/* Gentle dark tint initially */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 group-focus:bg-black/40 transition-colors duration-300" />

      {/* Review details overlay on hover or focus (tap) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#C44D28] via-[#C44D28]/95 to-[#E0673D]/95 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 text-white">
        <div className="space-y-1.5">
          <Quote className="w-5 h-5 opacity-40 rotate-180 text-white shrink-0" />
          <p className="text-[11px] leading-relaxed text-slate-100 line-clamp-[5] overflow-y-auto pr-1 scrollbar-thin">
            "{review.review}"
          </p>
        </div>

        <div className="pt-2 border-t border-white/20">
          <div className="font-bold text-xs tracking-wide line-clamp-1">
            {review.name}
          </div>
          <div className="text-[9px] text-orange-200 font-medium line-clamp-1 mt-0.5">
            {review.tag}
          </div>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 ${
                  i < review.rating ? "fill-amber-300 text-amber-300" : "text-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const reviews = hostelData.reviews;

  // Row 1: First 5 reviews, duplicated for seamless loop
  const row1 = [...reviews.slice(0, 5), ...reviews.slice(0, 5)];

  // Row 2: Remaining reviews + first review, duplicated for seamless loop
  const row2 = [
    ...reviews.slice(5),
    reviews[0],
    ...reviews.slice(5),
    reviews[0],
  ];

  return (
    <section
      id="reviews"
      className="relative w-full py-16 sm:py-24 overflow-hidden z-10"
      style={{ backgroundColor: COLORS.background }}
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header (restored as it was) */}
        <div className="relative text-center max-w-3xl mx-auto z-20 px-6 sm:px-8 select-none mb-12 sm:mb-16">

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 font-serif leading-tight">
            Real Stories. <span className="gradient-text italic">Real Experiences.</span> Real Memories.
          </h2>
          <div className="h-0.5 w-14 rounded-full bg-gradient-to-r from-[#C44D28] to-[#D86642] mx-auto mt-4 mb-2" />
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-neutral-600 font-light max-w-xl mx-auto leading-relaxed hidden sm:block">
            Discover how Atmiya Vidya Dham became a second home for students from different backgrounds and batches.
          </p>
        </div>

        {/* Marquee Rows Container */}
        <div className="w-full space-y-6 relative z-10 overflow-hidden">
          <div className="w-full overflow-hidden relative">
          {/* Subtle fade overlays on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none bg-gradient-to-r from-[#FFF4EC] to-transparent opacity-70" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none bg-gradient-to-l from-[#FFF4EC] to-transparent opacity-70" />

          <div className="flex gap-5 w-max animate-marquee-left marquee-track">
              {row1.map((review, idx) => (
                <ReviewCard key={`row1-${review.id}-${idx}`} review={review} />
              ))}
            </div>
          </div>

          <div className="w-full overflow-hidden relative">
          {/* Subtle fade overlays on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none bg-gradient-to-r from-[#FFF9F5] to-transparent opacity-70" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none bg-gradient-to-l from-[#FFF9F5] to-transparent opacity-70" />

          <div className="flex gap-5 w-max animate-marquee-right marquee-track">
              {row2.map((review, idx) => (
                <ReviewCard key={`row2-${review.id}-${idx}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 42s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 42s linear infinite;
        }
        .marquee-track {
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}
