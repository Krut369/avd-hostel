"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  title,
  titleHighlight,
  subtitle,
  badge,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 ${centered ? "text-center" : ""}`}
    >
      {/* Optional badge pill */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className={`mb-4 ${centered ? "flex justify-center" : ""}`}
        >
          <span className={`section-badge ${light ? "!bg-white/15 !text-white !border-white/25" : ""}`}>
            <Sparkles className="w-3 h-3 shrink-0" />
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {titleHighlight
          ? title.replace(titleHighlight, "").trim() + " "
          : title}{" "}
        {titleHighlight && (
          <span className={light ? "gradient-text-white italic" : "italic gradient-text"}>
            {titleHighlight}
          </span>
        )}
      </motion.h2>

      {/* Decorative underline */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`h-0.5 w-12 rounded-full mb-5 ${centered ? "mx-auto" : ""}`}
        style={{
          background: light
            ? "linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.2))"
            : "linear-gradient(to right, var(--primary), var(--primary-light))",
          transformOrigin: centered ? "center" : "left",
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className={`text-base sm:text-lg max-w-2xl ${centered ? "mx-auto" : ""} leading-relaxed ${
            light ? "text-white/65" : "text-slate-500"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
