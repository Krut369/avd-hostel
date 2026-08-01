"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { hostelData } from "@/data/hostel";
import { StarRating } from "@/components/ui/StarRating";
import { CTASection } from "@/components/sections/CTASection";
import { COLORS } from "@/constants/colors";

export function ReviewsContent() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: COLORS.background }}
      >
        {/* Decorative radial glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: COLORS.primary }} />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <Quote className="w-96 h-96" style={{ color: COLORS.primary }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="flex justify-center mb-5">
              <span className="section-badge">
                ⭐ &nbsp;Student Voices
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5"
              style={{ color: COLORS.textPrimary }}
            >
              Student{" "}
              <span className="gradient-text italic">Stories</span>
            </h1>
            <p
              className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: COLORS.textSecondary }}
            >
              Real voices from students and alumni who found their home, family, and purpose at AVD.
            </p>
          </motion.div>

          {/* Overall rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 inline-flex items-center gap-6 rounded-2xl px-10 py-6 border shadow-sm"
            style={{ backgroundColor: COLORS.surface, borderColor: COLORS.borderGold }}
          >
            <div className="text-center">
              <div className="text-5xl font-bold" style={{ color: COLORS.primary }}>5.0</div>
              <StarRating rating={5} />
              <div className="text-xs mt-1.5 font-medium" style={{ color: COLORS.textMuted }}>Overall Rating</div>
            </div>
            <div className="w-px h-16" style={{ backgroundColor: COLORS.borderGold }} />
            <div className="text-left">
              <div className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
                Based on student<br />testimonials &amp; reviews
              </div>
              <div className="flex gap-1 mt-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostelData.reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-3xl p-8 border relative group card-hover cursor-default"
                style={{
                  backgroundColor: COLORS.surface,
                  borderColor: COLORS.borderGold,
                  boxShadow: "0 2px 12px -4px rgba(196,77,40,0.08)",
                }}
              >
                {/* Decorative quote icon */}
                <Quote
                  className="absolute top-6 right-6 w-10 h-10 transition-colors duration-300"
                  style={{ color: `${COLORS.primary}15` }}
                />

                {/* Stars */}
                <div className="mb-5">
                  <StarRating rating={review.rating} />
                </div>

                {/* Review text */}
                <p
                  className="text-base leading-relaxed mb-8 italic"
                  style={{ color: COLORS.textPrimary }}
                >
                  &ldquo;{review.review}&rdquo;
                </p>

                {/* Author */}
                <div
                  className="flex items-center gap-4 pt-5 border-t"
                  style={{ borderTopColor: `${COLORS.primary}12` }}
                >
                  <div
                    className="relative w-14 h-14 rounded-full overflow-hidden border-2 flex items-center justify-center font-bold text-xl shrink-0"
                    style={{
                      backgroundColor: COLORS.primaryTint,
                      borderColor: COLORS.borderGold,
                      color: COLORS.primary,
                    }}
                  >
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="absolute text-2xl">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-bold text-base" style={{ color: COLORS.textPrimary }}>
                      {review.name}
                    </div>
                    <div className="text-xs mt-0.5 font-medium" style={{ color: COLORS.primary }}>
                      {review.tag}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Share Your Story card */}
            <motion.a
              href="mailto:harisaurabh.hostel@gmail.com?subject=Review"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl p-8 border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center min-h-64 group card-hover"
              style={{
                backgroundColor: COLORS.surface,
                borderColor: `${COLORS.primary}30`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${COLORS.primary}70`;
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${COLORS.primary}04`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${COLORS.primary}30`;
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = COLORS.surface;
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: COLORS.primaryTint,
                  color: COLORS.primary,
                }}
              >
                <Quote className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.textPrimary }}>
                Share Your Story
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
                Were you a student at AVD?<br />We&apos;d love to hear from you.
              </p>
              <div
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 group-hover:gap-2.5"
                style={{ color: COLORS.primary }}
              >
                Write a Review →
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
