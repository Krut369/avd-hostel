"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, MessageCircle } from "lucide-react";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-white shadow-xl shadow-black/10 border border-amber-200 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 group transition-all duration-300"
          >
            <ChevronUp className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
      <Link
        href="/contact"
        className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-xl shadow-amber-500/30 flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </Link>
    </div>
  );
}
