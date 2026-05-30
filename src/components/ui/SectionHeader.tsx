"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 ${centered ? "text-center" : ""}`}
    >

      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${
          light ? "text-white" : "text-slate-900"
        }`}
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg max-w-2xl ${centered ? "mx-auto" : ""} leading-relaxed ${
            light ? "text-white/60" : "text-slate-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
