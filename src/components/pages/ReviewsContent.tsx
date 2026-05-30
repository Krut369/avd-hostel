"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
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
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Quote className="w-96 h-96" style={{ color: COLORS.primary }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6"
              style={{ color: COLORS.textPrimary }}
            >
              Student <span className="gradient-text italic">Stories</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: COLORS.textPrimary }}>
              Real voices from students and alumni who found their home, family, and purpose at AVD.
            </p>
          </motion.div>

          {/* Overall rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 inline-flex items-center gap-6 rounded-2xl px-10 py-5 border shadow-sm"
            style={{ backgroundColor: COLORS.surface, borderColor: COLORS.borderGold }}
          >
            <div className="text-center">
              <div className="text-5xl font-bold" style={{ color: COLORS.primary }}>5.0</div>
              <StarRating rating={5} />
              <div className="text-xs mt-1" style={{ color: COLORS.textPrimary }}>Overall Rating</div>
            </div>
            <div className="w-px h-16" style={{ backgroundColor: COLORS.borderGold }} />
            <div className="text-left">
              <div className="text-sm leading-relaxed" style={{ color: COLORS.textPrimary }}>
                Based on student<br />testimonials &amp; reviews
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Masonry */}
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
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-3xl p-8 shadow-sm border hover:shadow-xl hover:border-amber-200 transition-all duration-500 relative group"
                style={{ backgroundColor: COLORS.surface, borderColor: COLORS.borderGold }}
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-amber-100 group-hover:text-amber-200 transition-colors" />

                {/* Stars */}
                <div className="mb-5">
                  <StarRating rating={review.rating} />
                </div>

                {/* Review text */}
                <p className="text-base leading-relaxed mb-8 italic" style={{ color: COLORS.textPrimary }}>
                  &ldquo;{review.review}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-5 border-t border-amber-50">
                  <div
                    className="relative w-14 h-14 rounded-full overflow-hidden border-2 flex items-center justify-center font-bold text-xl shrink-0"
                    style={{ backgroundColor: COLORS.primaryTint, borderColor: COLORS.borderGold, color: COLORS.primary }}
                  >
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="absolute text-2xl">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div
                      className="font-bold text-base"
                      style={{ color: COLORS.textPrimary }}
                    >
                      {review.name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: COLORS.primary }}>{review.tag}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add your review card */}
            <motion.a
              href="mailto:harisaurabh.hostel@gmail.com?subject=Review"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl p-8 border-2 border-dashed hover:border-amber-400 hover:bg-amber-50/20 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-64 group"
              style={{ backgroundColor: COLORS.surface, borderColor: COLORS.borderGold }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300"
                style={{ backgroundColor: COLORS.primaryTint, color: COLORS.primary }}
              >
                <Quote className="w-6 h-6" />
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: COLORS.textPrimary }}
              >
                Share Your Story
              </h3>
              <p className="text-sm" style={{ color: COLORS.textPrimary }}>
                Were you a student at AVD? We&apos;d love to hear from you.
              </p>
            </motion.a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
