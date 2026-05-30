"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { hostelData } from "@/data/hostel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarRating } from "@/components/ui/StarRating";
import { COLORS } from "@/constants/colors";

export function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${COLORS.primary}05` }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${COLORS.primary}05` }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Student Reviews"
          title="What Our Students"
          titleHighlight="Say"
          subtitle="Real stories from the people who call Harisaurabh Hostel their second home."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {hostelData.reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-3xl p-7 relative border hover:border-amber-500/30 hover:shadow-xl transition-all duration-500"
              style={{ backgroundColor: COLORS.surface, borderColor: COLORS.borderGold }}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 opacity-10" style={{ color: COLORS.primary }} />

              <div className="flex items-center gap-4 mb-5">
                <div
                  className="relative w-12 h-12 rounded-full overflow-hidden border-2 flex items-center justify-center font-bold text-lg"
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
                  <span className="absolute text-sm">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: COLORS.textPrimary }}>{review.name}</div>
                  <div className="text-xs" style={{ color: COLORS.primary }}>{review.tag}</div>
                </div>
              </div>

              <StarRating rating={review.rating} />

              <p className="text-sm leading-relaxed mt-4 line-clamp-5" style={{ color: COLORS.textPrimary }}>
                "{review.review}"
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 border text-sm font-semibold rounded-xl hover:opacity-85 transition-all duration-300"
            style={{ color: COLORS.primary, borderColor: COLORS.primary }}
          >
            Read All Reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
