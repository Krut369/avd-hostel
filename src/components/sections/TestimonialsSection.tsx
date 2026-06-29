"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, Variants } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
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

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reviews = hostelData.reviews;

  // Monitor scroll progress of the testimonials scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth background color shifting during scroll progression
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

  // Stagger index values as scroll progresses
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.floor(latest * reviews.length), reviews.length - 1);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Calculate local scroll progress within the active story block for soft parallax zoom
  const localProgress = useTransform(scrollYProgress, (latest) => {
    const index = Math.min(Math.floor(latest * reviews.length), reviews.length - 1);
    const start = index * (1 / reviews.length);
    const fraction = (latest - start) / (1 / reviews.length);
    return Math.max(0, Math.min(fraction, 1));
  });

  const imageScale = useTransform(localProgress, [0, 1], [1.02, 1.1]);

  // Controls scroll fade/displacement for the header
  const headerOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [1, 0, 0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, -30, -30, 0]);

  // Handle clicking progress rail dots to jump directly to a story section
  const handleRailClick = (idx: number) => {
    const container = containerRef.current;
    if (container) {
      const sectionHeight = container.clientHeight / reviews.length;
      // Scroll to center of the specific section
      const targetScroll = container.offsetTop + idx * sectionHeight + 50;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.section
      ref={containerRef}
      id="reviews"
      style={{
        background: bgGradient,
      }}
      className="relative w-full transition-colors duration-500 overflow-visible z-10 h-[300vh]"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        {Array.from({ length: 12 }).map((_, i) => {
          const size = 6 + (i % 3) * 6;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-amber-500/15 blur-[2px]"
              style={{
                left: `${(i * 9) % 100}%`,
                top: `${(i * 13) % 100}%`,
                width: size,
                height: size,
              }}
              animate={{
                y: [0, -120, 0],
                opacity: [0.1, 0.6, 0.1],
              }}
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

      {/* Background radial soft glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: `${COLORS.primary}12` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: `${COLORS.secondary}12` }}
        />
      </div>

      {/* STICKY VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-visible py-4 sm:py-8 lg:py-12">
        
        {/* Section Header (Fades away as scroll begins to focus entirely on the stories) */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="relative text-center max-w-3xl mx-auto z-20 px-6 sm:px-8 select-none mt-6 sm:mt-10 lg:mt-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#C44D28]/10 text-[#C44D28] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Voices of Atmiya</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 font-serif leading-tight">
            Real Stories. <span className="gradient-text italic">Real Experiences.</span> Real Memories.
          </h2>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-neutral-600 font-light max-w-xl mx-auto leading-relaxed hidden sm:block">
            Discover how Atmiya Vidya Dham became a second home for students from different backgrounds and batches.
          </p>
        </motion.div>

        {/* Content Container */}
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 flex-1 flex flex-col justify-center items-center relative z-10 mt-6 sm:mt-8 lg:mt-10">
          
          {/* Cards Stack (Dynamic layering, scale and translation offsets) */}
          <div className="flex-1 relative h-[460px] lg:h-[390px] w-full overflow-visible">
            {reviews.map((review, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;
              const diff = idx - activeIndex;

              let animateState = {};
              if (isActive) {
                animateState = {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                  zIndex: 30,
                };
              } else if (isPast) {
                // Flips / flies out card to the left side
                animateState = {
                  x: -320,
                  y: -30,
                  scale: 0.94,
                  rotate: -8,
                  opacity: 0,
                  zIndex: 10,
                };
              } else {
                // Stacks future cards underneath with subtle tilting offsets
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
                  style={{
                    transformOrigin: "bottom center",
                  }}
                >
                  {/* Left part: Photo */}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />
                  </div>

                  {/* Right part: Quote & Details */}
                  <div className="col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-[270px] sm:h-[250px] lg:h-full bg-white">
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      className="flex flex-col justify-between h-full"
                    >
                      {/* Quote section */}
                      <div>
                        <motion.div variants={itemVariants}>
                          <Quote
                            className="w-6 h-6 lg:w-9 lg:h-9 opacity-25 rotate-180 mb-2 lg:mb-4"
                            style={{ color: COLORS.primary }}
                          />
                        </motion.div>
                        <motion.p
                          variants={itemVariants}
                          className="text-xs sm:text-sm lg:text-[16px] leading-relaxed text-stone-600 font-serif italic text-justify line-clamp-4 sm:line-clamp-5 lg:line-clamp-6"
                        >
                          "{review.review}"
                        </motion.p>
                      </div>

                      {/* Author Details section */}
                      <div>
                        <motion.div variants={itemVariants} className="w-10 lg:w-12 h-[1px] bg-neutral-200 my-2 sm:my-3 lg:my-4" />

                        <motion.div variants={itemVariants} className="flex flex-col">
                          <span className="text-sm sm:text-base lg:text-lg font-bold text-neutral-800 font-serif tracking-wide leading-snug">
                            {review.name}
                          </span>
                          <span className="text-[10px] sm:text-xs text-neutral-500 font-medium mt-0.5 leading-none">
                            {review.tag}
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Simple dot page indicator for all screens */}
          <div className="flex gap-2 justify-center mt-6 select-none relative z-20">
            {reviews.map((_, idx) => (
              <button
                key={`indicator-${idx}`}
                onClick={() => handleRailClick(idx)}
                className="h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none border-none p-0"
                style={{
                  width: activeIndex === idx ? "16px" : "6px",
                  backgroundColor:
                    activeIndex === idx ? COLORS.primary : `${COLORS.primary}25`,
                }}
              />
            ))}
          </div>

        </div>

      </div>
    </motion.section>
  );
}
