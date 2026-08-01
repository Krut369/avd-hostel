"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, Variants } from "framer-motion";
import { Quote, Sparkles, Star } from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 16,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-stone-200"}`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reviews = hostelData.reviews;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [
      "linear-gradient(to bottom, #FFF4EC, #FFF9F5)",
      "linear-gradient(to bottom, #FFF9F5, #FFF3EB)",
      "linear-gradient(to bottom, #FFF3EB, #FFEFE5)",
      "linear-gradient(to bottom, #FFEFE5, #FFF4EC)",
    ]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.floor(latest * reviews.length), reviews.length - 1);
    if (index !== activeIndex) setActiveIndex(index);
  });

  const localProgress = useTransform(scrollYProgress, (latest) => {
    const index = Math.min(Math.floor(latest * reviews.length), reviews.length - 1);
    const start = index * (1 / reviews.length);
    const fraction = (latest - start) / (1 / reviews.length);
    return Math.max(0, Math.min(fraction, 1));
  });

  const imageScale = useTransform(localProgress, [0, 1], [1.02, 1.1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [1, 0, 0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, -30, -30, 0]);

  const handleRailClick = (idx: number) => {
    const container = containerRef.current;
    if (container) {
      const sectionHeight = container.clientHeight / reviews.length;
      const targetScroll = container.offsetTop + idx * sectionHeight + 50;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <motion.section
      ref={containerRef}
      id="reviews"
      style={{ background: bgGradient }}
      className="relative w-full transition-colors duration-500 overflow-visible z-10 h-[300vh]"
    >
      {/* Floating ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-35">
        {Array.from({ length: 12 }).map((_, i) => {
          const size = 6 + (i % 3) * 6;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full blur-[2px]"
              style={{
                left: `${(i * 9) % 100}%`,
                top: `${(i * 13) % 100}%`,
                width: size,
                height: size,
                backgroundColor: `${COLORS.primary}22`,
              }}
              animate={{ y: [0, -120, 0], opacity: [0.1, 0.5, 0.1] }}
              transition={{
                duration: 16 + (i % 5) * 4,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Background radial glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: `${COLORS.primary}15` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: `${COLORS.secondary}15` }}
        />
      </div>

      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-visible py-4 sm:py-8 lg:py-12">

        {/* Section Header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="relative text-center max-w-3xl mx-auto z-20 px-6 sm:px-8 select-none mt-6 sm:mt-10 lg:mt-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4" style={{
            backgroundColor: `${COLORS.primary}12`,
            color: COLORS.primary,
            border: `1px solid ${COLORS.primary}25`,
          }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Voices of Atmiya</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 font-serif leading-tight">
            Real Stories.{" "}
            <span className="gradient-text italic">Real Experiences.</span>{" "}
            Real Memories.
          </h2>
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-neutral-500 font-light max-w-xl mx-auto leading-relaxed hidden sm:block">
            Discover how Atmiya Vidya Dham became a second home for students from different backgrounds and batches.
          </p>
        </motion.div>

        {/* Content */}
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 flex-1 flex flex-col justify-center items-center relative z-10 mt-6 sm:mt-8 lg:mt-10">

          {/* Cards Stack */}
          <div className="flex-1 relative h-[460px] lg:h-[390px] w-full overflow-visible">
            {reviews.map((review, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;
              const diff = idx - activeIndex;

              let animateState = {};
              if (isActive) {
                animateState = { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 };
              } else if (isPast) {
                animateState = { x: -320, y: -30, scale: 0.94, rotate: -8, opacity: 0, zIndex: 10 };
              } else {
                animateState = {
                  x: diff * 4,
                  y: diff * 14,
                  scale: 1 - diff * 0.03,
                  rotate: diff * -2,
                  opacity: Math.max(0, 0.9 - diff * 0.25),
                  zIndex: 30 - diff,
                };
              }

              return (
                <motion.div
                  key={review.id}
                  animate={animateState}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="absolute inset-x-0 top-0 bg-white/95 backdrop-blur-md rounded-[32px] shadow-xl border border-neutral-200/50 flex flex-col lg:grid lg:grid-cols-12 overflow-hidden h-[430px] lg:h-[360px]"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {/* Photo */}
                  <div className="relative col-span-5 h-[160px] sm:h-[180px] lg:h-full w-full bg-neutral-950 overflow-hidden">
                    <motion.img
                      src={review.image}
                      alt={review.name}
                      style={{
                        scale: isActive ? imageScale : 1.0,
                        objectPosition: (review as { bgPosition?: string }).bgPosition ?? "top center",
                      }}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />
                    {/* Stars on photo */}
                    {isActive && (
                      <div className="absolute bottom-4 left-4">
                        <StarRating rating={review.rating ?? 5} />
                      </div>
                    )}
                  </div>

                  {/* Quote & Details */}
                  <div className="col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-[270px] sm:h-[250px] lg:h-full bg-white">
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      className="flex flex-col justify-between h-full"
                    >
                      <div>
                        <motion.div variants={itemVariants}>
                          <Quote
                            className="w-6 h-6 lg:w-8 lg:h-8 opacity-20 rotate-180 mb-2 lg:mb-3"
                            style={{ color: COLORS.primary }}
                          />
                        </motion.div>
                        <motion.p
                          variants={itemVariants}
                          className="text-xs sm:text-sm lg:text-[15px] leading-relaxed text-stone-600 font-serif italic text-justify line-clamp-4 sm:line-clamp-5 lg:line-clamp-6"
                        >
                          &ldquo;{review.review}&rdquo;
                        </motion.p>
                      </div>

                      <div>
                        <motion.div variants={itemVariants} className="w-8 lg:w-10 h-[1px] bg-neutral-200 my-3 lg:my-4" />
                        <motion.div variants={itemVariants} className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-sm sm:text-base lg:text-lg font-bold text-neutral-800 font-serif tracking-wide leading-snug block">
                              {review.name}
                            </span>
                            <span className="text-[10px] sm:text-xs text-neutral-500 font-medium mt-0.5 leading-none block">
                              {review.tag}
                            </span>
                          </div>
                          <StarRating rating={review.rating ?? 5} />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Progress dots */}
          <div className="flex gap-2.5 justify-center mt-8 select-none relative z-20">
            {reviews.map((_, idx) => (
              <motion.button
                key={`indicator-${idx}`}
                onClick={() => handleRailClick(idx)}
                animate={{
                  width: activeIndex === idx ? 20 : 8,
                  height: 8,
                  backgroundColor: activeIndex === idx ? COLORS.primary : `${COLORS.primary}30`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="rounded-full cursor-pointer focus:outline-none border-none p-0"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
