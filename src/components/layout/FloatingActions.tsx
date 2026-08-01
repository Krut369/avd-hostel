"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, MessageCircle } from "lucide-react";
import { COLORS } from "@/constants/colors";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [showContactTooltip, setShowContactTooltip] = useState(false);
  const [showTopTooltip, setShowTopTooltip] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <div className="relative flex items-center">
            {/* Tooltip */}
            <AnimatePresence>
              {showTopTooltip && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-14 whitespace-nowrap text-xs font-semibold px-2.5 py-1.5 rounded-lg pointer-events-none"
                  style={{
                    backgroundColor: COLORS.textPrimary,
                    color: "#fff",
                  }}
                >
                  Back to top
                </motion.span>
              )}
            </AnimatePresence>
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              onClick={scrollToTop}
              onMouseEnter={() => setShowTopTooltip(true)}
              onMouseLeave={() => setShowTopTooltip(false)}
              aria-label="Back to top"
              className="w-11 h-11 rounded-full bg-white border flex items-center justify-center transition-all duration-300 cursor-pointer"
              style={{ borderColor: `${COLORS.primary}25` }}
              whileHover={{
                backgroundColor: COLORS.primary,
                borderColor: COLORS.primary,
                scale: 1.08,
              }}
              whileTap={{ scale: 0.92 }}
            >
              <ChevronUp className="w-5 h-5 text-stone-700 group-hover:text-white" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Contact FAB */}
      <div className="relative flex items-center">
        {/* Tooltip */}
        <AnimatePresence>
          {showContactTooltip && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-14 whitespace-nowrap text-xs font-semibold px-2.5 py-1.5 rounded-lg pointer-events-none"
              style={{
                backgroundColor: COLORS.textPrimary,
                color: "#fff",
              }}
            >
              Apply Now
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-pulse-ring pointer-events-none"
          style={{ backgroundColor: `${COLORS.primary}35` }}
        />

        <a
          href="/#contact"
          aria-label="Apply Now"
          onMouseEnter={() => setShowContactTooltip(true)}
          onMouseLeave={() => setShowContactTooltip(false)}
          className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ backgroundColor: COLORS.primary }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </motion.div>
        </a>
      </div>
    </div>
  );
}
