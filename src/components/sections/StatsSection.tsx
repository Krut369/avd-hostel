"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, Sparkles, Heart } from "lucide-react";
import { COLORS } from "@/constants/colors";

const stats = [
  { icon: <GraduationCap className="w-7 h-7" />, num: "500", suffix: "+", label: "Comfortable Accommodation", desc: "Students housed every year" },
  { icon: <Sparkles className="w-7 h-7" />, num: "15", suffix: "+", label: "Academic Excellence", desc: "Years of nurturing scholars" },
  { icon: <Users className="w-7 h-7" />, num: "1000", suffix: "+", label: "Community Living", desc: "Alumni thriving across India" },
  { icon: <Heart className="w-7 h-7" />, num: "100", suffix: "%", label: "Spiritual Growth", desc: "Commitment to holistic dev." },
];

export function StatsSection() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 border-b"
      style={{ backgroundColor: COLORS.background, borderColor: COLORS.borderGold }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div
                className="w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all duration-300"
                style={{
                  backgroundColor: `${COLORS.primary}08`,
                  borderColor: COLORS.borderGold,
                  color: COLORS.primary
                }}
              >
                {stat.icon}
              </div>
              <div
                className="text-4xl font-bold mb-1"
                style={{ color: COLORS.textPrimary }}
              >
                {stat.num}{stat.suffix}
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: COLORS.primary }}>{stat.label}</div>
              <div className="text-xs" style={{ color: COLORS.textPrimary }}>{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
