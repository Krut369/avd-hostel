"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Calendar,
  ZoomIn,
  ZoomOut,
  Smile,
  School,
  Building,
  Dumbbell,
  Music,
} from "lucide-react";
import { COLORS } from "@/constants/colors";

// ─── Interfaces ──────────────────────────────────────────────────────────────
interface Category {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  count: number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  gradient: string;
}

interface Memory {
  id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

// ─── Category Data ───────────────────────────────────────────────────────────
const categories: Category[] = [
  {
    id: "campus",
    title: "Campus Life",
    description:
      "Serene Swaminarayan temple, reading rooms, prayer halls, and gardens where friendships grow.",
    coverImage: "https://www.avdvvn.org/assets/images/t1.jpeg",
    count: 4,
    icon: School,
    gradient: "linear-gradient(135deg, #7A3723 0%, #C44D28 100%)",
  },
  {
    id: "rooms",
    title: "Rooms & Facilities",
    description:
      "Comfortable air-conditioned rooms, dormitories, a fitness gymnasium, and hygienic dining hall.",
    coverImage: "/ac-room/2.jpg",
    count: 4,
    icon: Building,
    gradient: "linear-gradient(135deg, #654126 0%, #8A5B36 100%)",
  },
  {
    id: "sports",
    title: "Sports & Fitness",
    description:
      "Energy meets camaraderie. Highlights from annual cricket matches, volleyball, and indoor sports.",
    coverImage: "https://www.avdvvn.org/assets/images/s9.jpg",
    count: 4,
    icon: Dumbbell,
    gradient: "linear-gradient(135deg, #0f5132 0%, #198754 100%)",
  },
  {
    id: "events",
    title: "Seminars & Events",
    description:
      "Character building Satsang Shibirs, placement orientations, and insightful guest lectures.",
    coverImage: "https://www.avdvvn.org/assets/images/e13.jpg",
    count: 4,
    icon: Calendar,
    gradient: "linear-gradient(135deg, #1d3557 0%, #457b9d 100%)",
  },
  {
    id: "festivals",
    title: "Festivals & Culture",
    description:
      "Vibrant colors of Holi, traditional diyas during Diwali, and cultural programs celebrated together.",
    coverImage:
      "https://images.unsplash.com/photo-1561489396-888724a1543d?auto=format&fit=crop&w=800&q=80",
    count: 4,
    icon: Music,
    gradient: "linear-gradient(135deg, #9e2a2b 0%, #e07a5f 100%)",
  },
  {
    id: "achievements",
    title: "Achievements",
    description:
      "Honoring Gold Medalists, placement milestones, hackathon wins, and championship trophies.",
    coverImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    count: 4,
    icon: Trophy,
    gradient: "linear-gradient(135deg, #3d348b 0%, #7678ed 100%)",
  },
];

// ─── Memory / Story Data ──────────────────────────────────────────────────────
const memoriesData: Memory[] = [
  // 1. Campus Life
  {
    id: "camp-1",
    category: "campus",
    title: "Quiet Study Nights",
    date: "October 12, 2025",
    description:
      "Late night studies at the reading hall. A quiet zone dedicated to academic focus and peer learning.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "camp-2",
    category: "campus",
    title: "Evening Prayer Assembly",
    date: "Daily assembly",
    description:
      "Coming together as one family in the prayer hall to find peace, seek blessings, and recharge spiritually.",
    image: "/prayer-hall.jpg",
  },
  {
    id: "camp-3",
    category: "campus",
    title: "Sunrise at Swaminarayan Mandir",
    date: "September 5, 2025",
    description:
      "The serene stone temple within the campus courtyard reflecting the golden early morning sunlight.",
    image: "https://www.avdvvn.org/assets/images/t1.jpeg",
  },
  {
    id: "camp-4",
    category: "campus",
    title: "Friendship Under the Trees",
    date: "August 24, 2025",
    description:
      "Lively discussions and shared stories under the shade of neem trees during afternoon breaks.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },

  // 2. Rooms & Facilities
  {
    id: "room-1",
    category: "rooms",
    title: "Home Away From Home",
    date: "Semester Start 2025",
    description:
      "Setting up sharing rooms with books and laptops. Safe, comfortable spaces for sleep and growth.",
    image: "/ac-room/s2.jpg",
  },
  {
    id: "room-2",
    category: "rooms",
    title: "Endless Hostel Talks",
    date: "July 18, 2025",
    description:
      "Late night brainstorming sessions and laughter in the dormitory, building bonds that last a lifetime.",
    image: "/dormitory/1.jpg",
  },
  {
    id: "room-3",
    category: "rooms",
    title: "Wholesome Dining",
    date: "Daily Meal",
    description:
      "Freshly prepared, hygienic pure-vegetarian meals served in the mess hall with pure hospitality.",
    image: "https://www.avdvvn.org/assets/images/dh1.jpg",
  },
  {
    id: "room-4",
    category: "rooms",
    title: "Morning Gym Workouts",
    date: "Daily Fitness",
    description:
      "Maintaining peak physical health at our fully equipped gym, promoting a balanced mind and active body.",
    image: "https://www.avdvvn.org/assets/images/gym.jpg",
  },

  // 3. Sports & Fitness
  {
    id: "sport-1",
    category: "sports",
    title: "Inter-Hostel Cricket Finals",
    date: "March 15, 2025",
    description:
      "Lifting the cricket trophy after a dramatic last-over victory. A celebration of teamwork and determination.",
    image: "https://www.avdvvn.org/assets/images/s9.jpg",
  },
  {
    id: "sport-2",
    category: "sports",
    title: "Volleyball Under the Floodlights",
    date: "February 28, 2025",
    description:
      "High-voltage action and teamwork during the annual evening floodlight volleyball championship.",
    image:
      "https://images.unsplash.com/photo-1592656094267-764a450201c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sport-3",
    category: "sports",
    title: "Campus Running & Drills",
    date: "Weekly Fitness",
    description:
      "Students building stamina and athletic skills on our open sports ground during early morning drills.",
    image: "https://www.avdvvn.org/assets/images/s1.jpg",
  },
  {
    id: "sport-4",
    category: "sports",
    title: "Badminton Doubles League",
    date: "January 10, 2025",
    description:
      "Fast-paced rallies and strategic communication in the final match of the doubles indoor championship.",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
  },

  // 4. Seminars & Events
  {
    id: "event-1",
    category: "events",
    title: "Satsang Shibir Assembly",
    date: "August 12, 2025",
    description:
      "Listening to spiritual discourses and moral guidance from revered Swamijis, focusing on inner values.",
    image: "https://www.avdvvn.org/assets/images/e13.jpg",
  },
  {
    id: "event-2",
    category: "events",
    title: "Annual Cultural Evening",
    date: "April 20, 2025",
    description:
      "Students staging dramas, executing speeches, and singing devotional hymns to honor culture and roots.",
    image: "https://www.avdvvn.org/assets/images/e1.jpg",
  },
  {
    id: "event-3",
    category: "events",
    title: "Interactive Guidance Talks",
    date: "September 15, 2025",
    description:
      "A close-knit conversation with industry alumni, answering questions about career pathways and core values.",
    image: "https://www.avdvvn.org/assets/images/e8.jpg",
  },
  {
    id: "event-4",
    category: "events",
    title: "Career Pathfinder Seminar",
    date: "July 5, 2025",
    description:
      "Academic mentors holding workshops for new students on mapping engineering and technology goals.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },

  // 5. Festivals & Culture
  {
    id: "fest-1",
    category: "festivals",
    title: "Holi: Festival of Joy",
    date: "March 21, 2025",
    description:
      "SPLASH of dry colors! Celebrating Holi in the open quadrangle with organic colors, music, and brotherhood.",
    image:
      "https://images.unsplash.com/photo-1561489396-888724a1543d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fest-2",
    category: "festivals",
    title: "Diwali: Festival of Lights",
    date: "November 1, 2025",
    description:
      "Symmetrical clay diyas light up all three wings of the hostel, celebrating good over evil in true community.",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fest-3",
    category: "festivals",
    title: "Janmashtami Dahi Handi",
    date: "August 18, 2025",
    description:
      "Students forming a multi-tier human pyramid to break the Dahi Handi, celebrating Krishna Janmashtami.",
    image:
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fest-4",
    category: "festivals",
    title: "Independence Flag Hoisting",
    date: "August 15, 2025",
    description:
      "Saluting the Tricolor on a crisp morning, singing the National Anthem, and committing to country service.",
    image:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80",
  },

  // 6. Achievements
  {
    id: "ach-1",
    category: "achievements",
    title: "National Hackathon Winners",
    date: "May 10, 2025",
    description:
      "Hostel coders winning the grand prize at a national developer competition, coding all through the night.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ach-2",
    category: "achievements",
    title: "Placement Celebration",
    date: "Placement Season 2025",
    description:
      "Happy students sharing high-package job offers from global software giants and consulting firms.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ach-3",
    category: "achievements",
    title: "Academic Gold Medalists",
    date: "SPU Convocation 2025",
    description:
      "Congratulating our brilliant toppers who received university gold medals for securing outstanding ranks.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ach-4",
    category: "achievements",
    title: "Lifting the Championship Shield",
    date: "CVM Sports Meet 2025",
    description:
      "AVD hostel team hoisting the overall inter-college sports shield, crowning a dominant athletic year.",
    image:
      "https://images.unsplash.com/photo-1578269174936-2709b5a8c040?auto=format&fit=crop&w=800&q=80",
  },
];

// ─── Main Gallery Component ───────────────────────────────────────────────────
export function GalleryContent() {
  const [selectedCat, setSelectedCat] = useState<string>("campus");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Horizontal Scroll Drag & Swipe references
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const walkRef = useRef(0);

  // Touch Swipe (for mobile boundary checks)
  const touchStartX = useRef(0);
  const touchWalk = useRef(0);

  // Scroll Wheel page change cooldown
  const lastScrollTime = useRef(0);

  // Selected Category Index & Neighbours
  const currentIdx = categories.findIndex((c) => c.id === selectedCat);
  const currentCategory = categories[currentIdx];
  const nextCategory =
    currentIdx < categories.length - 1 ? categories[currentIdx + 1] : null;
  const prevCategory = currentIdx > 0 ? categories[currentIdx - 1] : null;

  const filteredMemories = memoriesData.filter(
    (m) => m.category === selectedCat,
  );

  // Timeline category selection click handler (resets horizontal scroll)
  const selectTimelineCategory = (catId: string) => {
    setSelectedCat(catId);
    // Reset horizontal container scroll position
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 100);
  };

  // Wheel horizontal scroll support (non-blocking)
  useEffect(() => {
    const container = outerContainerRef.current;
    if (!container) return;

    const handleDOMWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
          scrollContainer.scrollLeft += e.deltaX;
        }
      }
    };

    container.addEventListener("wheel", handleDOMWheel, { passive: true });
    return () => {
      container.removeEventListener("wheel", handleDOMWheel);
    };
  }, []);

  // Mouse Drag scrolling logic
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    walkRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    walkRef.current = walk;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const container = scrollContainerRef.current;
    if (!container) return;

    const isAtRight =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 25;
    const isAtLeft = container.scrollLeft <= 25;
    const walk = walkRef.current;

    // Check overshoot to trigger page turn
    if (isAtRight && walk < -60) {
      if (nextCategory) {
        selectTimelineCategory(nextCategory.id);
      }
    } else if (isAtLeft && walk > 60) {
      if (prevCategory) {
        selectTimelineCategory(prevCategory.id);
      }
    }
    walkRef.current = 0;
  };

  // Mobile Touch Swipe triggers for chapter boundary turns
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchWalk.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchWalk.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isAtRight =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 30;
    const isAtLeft = container.scrollLeft <= 30;
    const walk = touchWalk.current;

    if (isAtRight && walk < -50) {
      if (nextCategory) {
        selectTimelineCategory(nextCategory.id);
      }
    } else if (isAtLeft && walk > 50) {
      if (prevCategory) {
        selectTimelineCategory(prevCategory.id);
      }
    }
  };

  // Lightbox keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setIsZoomed(false);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredMemories.length : null,
        );
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredMemories.length) % filteredMemories.length
            : null,
        );
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredMemories]);

  return (
    <div
      ref={outerContainerRef}
      className="min-h-screen relative overflow-hidden transition-colors py-24"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Background Ambience decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── SECTION HEADER ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-neutral-800">
            Explore{" "}
            <span className="gradient-text italic font-serif">
              Student Life
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-neutral-600 font-medium">
            Every memory tells a story. Explore life at Atmiya Vidya Dham
            through experiences, celebrations, achievements, and everyday
            moments.
          </p>
        </div>

        {/* ─── MOBILE CATEGORY PILLS FILTER BAR ───────────────────────────── */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none snap-x">
          {categories.map((cat) => {
            const isActive = cat.id === selectedCat;
            return (
              <button
                key={`mobile-timeline-${cat.id}`}
                onClick={() => selectTimelineCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap snap-center transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-white text-neutral-600 border border-neutral-200"
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* ─── TIMELINE + GALLERY ROW ─────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Vertical Timeline Navigation (Desktop only) */}
          <div className="w-[245px] shrink-0 hidden md:flex flex-col py-6 relative justify-center pr-4 border-r border-neutral-200/30">
            <div className="space-y-3 relative z-10 w-full">
              {categories.map((cat) => {
                const isActive = cat.id === selectedCat;
                const Icon = cat.icon;
                return (
                  <button
                    key={`timeline-${cat.id}`}
                    onClick={() => selectTimelineCategory(cat.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-l-4 transition-all duration-300 text-left cursor-pointer group focus:outline-none ${
                      isActive
                        ? "shadow-sm"
                        : "border-transparent text-neutral-500 hover:bg-neutral-100/55 hover:text-neutral-800"
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: COLORS.primary,
                            backgroundColor: `${COLORS.primary}0D`,
                          }
                        : {}
                    }
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? "" : "text-neutral-400 group-hover:text-neutral-600"
                      }`}
                      style={isActive ? { color: COLORS.primary } : {}}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        isActive ? "font-extrabold" : "text-neutral-500"
                      }`}
                      style={isActive ? { color: COLORS.primary } : {}}
                    >
                      {cat.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Chapter Container (Right side) */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Active Category Meta Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                <span>
                  Chapter {currentIdx + 1} of {categories.length}:{" "}
                  {currentCategory?.title}
                </span>
              </div>
              <p className="text-sm text-neutral-600 font-light max-w-2xl leading-relaxed">
                {currentCategory?.description}
              </p>
            </div>

            {/* Film-strip Scrapbook Slider */}
            <div className="overflow-hidden relative py-8">


              {/* Horizontal Scroll Area */}
              <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`flex gap-6 md:gap-8 overflow-x-auto py-10 px-4 scrollbar-none snap-x snap-mandatory ${
                  isDragging ? "cursor-grabbing select-none" : "cursor-grab"
                }`}
                style={{ scrollBehavior: "auto" }}
              >
                {/* Main Cards List */}
                {filteredMemories.map((memory, index) => {
                  // Alternate rotations for organic scrapbook aesthetic
                  const rotation =
                    index % 2 === 0
                      ? index % 4 === 0
                        ? -1.5
                        : 2
                      : index % 3 === 0
                        ? -2
                        : 1;
                  return (
                    <motion.div
                      key={memory.id}
                      initial={{ opacity: 0, x: 80, rotate: rotation }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.12 }}
                      whileHover={{
                        rotate: 0,
                        scale: 1.03,
                        y: -6,
                        transition: { duration: 0.3 },
                      }}
                      className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 bg-white border border-neutral-200/80 rounded-2xl p-4 shadow-md hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:border-amber-500/30 transition-shadow snap-start relative group"
                    >
                      {/* Polaroid-style photo mounting */}
                      <div
                        className="aspect-[4/3] rounded-xl overflow-hidden relative cursor-pointer mb-5 border border-neutral-100 bg-neutral-50"
                        onClick={() => setLightboxIndex(index)}
                      >
                        <img
                          src={memory.image}
                          alt={memory.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />

                        {/* Corner Tape Detail (Scrapbook feel) */}
                        <div className="absolute -top-1 -left-3 w-10 h-4 bg-amber-600/5 backdrop-blur-sm origin-top-left rotate-[-30deg] border border-amber-600/10 pointer-events-none" />
                        <div className="absolute -top-1 -right-3 w-10 h-4 bg-amber-600/5 backdrop-blur-sm origin-top-right rotate-[30deg] border border-amber-600/10 pointer-events-none" />
                      </div>

                      {/* Scrapbook content details */}
                      <div className="space-y-2 relative">
                        {/* Date Stamp */}
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{memory.date}</span>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-neutral-800 tracking-wide group-hover:text-amber-600 transition-colors">
                          {memory.title}
                        </h3>

                        {/* Description quote */}
                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-3 group-hover:text-neutral-700 transition-colors">
                          "{memory.description}"
                        </p>
                      </div>

                      {/* Film code bottom accent */}
                      <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between text-[8px] font-mono text-neutral-400 uppercase tracking-widest">
                        <span>AVD-MEM-00{index + 1}</span>
                        <span>KODAK PX 400</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>


            </div>

            {/* Bottom pagination & navigation */}
            <div className="mt-4 flex items-center justify-between text-neutral-500 text-xs">
              <div>
                <span>
                  Chapter {currentIdx + 1} of {categories.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (prevCategory) {
                      selectTimelineCategory(prevCategory.id);
                    }
                  }}
                  disabled={!prevCategory}
                  className={`p-1 rounded-md transition-all cursor-pointer ${
                    prevCategory
                      ? "hover:bg-neutral-200 hover:text-neutral-800"
                      : "opacity-35 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1">
                  {categories.map((c) => (
                    <div
                      key={`dot-${c.id}`}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        c.id === selectedCat
                          ? "w-4 bg-amber-600"
                          : "w-1.5 bg-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (nextCategory) {
                      selectTimelineCategory(nextCategory.id);
                    }
                  }}
                  disabled={!nextCategory}
                  className={`p-1 rounded-md transition-all cursor-pointer ${
                    nextCategory
                      ? "hover:bg-neutral-200 hover:text-neutral-800"
                      : "opacity-35 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FULLSCREEN CINEMATIC LIGHTBOX STORY VIEWER ──────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => {
              setLightboxIndex(null);
              setIsZoomed(false);
            }}
          >
            {/* Control Bar (Top) */}
            <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-55">
              <div className="text-white/40 text-xs font-mono tracking-widest uppercase">
                {currentCategory?.title} / Story {lightboxIndex + 1}
              </div>

              <div className="flex items-center gap-3">
                {/* Zoom Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/10 cursor-pointer"
                  title="Toggle Zoom"
                >
                  {isZoomed ? (
                    <ZoomOut className="w-5 h-5" />
                  ) : (
                    <ZoomIn className="w-5 h-5" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    setIsZoomed(false);
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev !== null
                    ? (prev - 1 + filteredMemories.length) %
                      filteredMemories.length
                    : null,
                );
                setIsZoomed(false);
              }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Center Story Box */}
            <div
              className="flex flex-col md:flex-row items-center gap-6 max-w-6xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame */}
              <div className="flex-1 flex justify-center items-center overflow-hidden h-[40vh] md:h-[60vh] rounded-2xl relative bg-neutral-950 border border-white/10">
                <motion.img
                  key={filteredMemories[lightboxIndex].image}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: isZoomed ? 1.4 : 1,
                    cursor: isZoomed ? "zoom-out" : "zoom-in",
                  }}
                  transition={{ duration: 0.3 }}
                  src={filteredMemories[lightboxIndex].image}
                  alt={filteredMemories[lightboxIndex].title}
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="max-w-full max-h-full object-contain rounded-xl select-none"
                />
              </div>

              {/* Memory Context Sidebar */}
              <div className="w-full md:w-[350px] space-y-4 text-left p-2 md:p-6 self-center">
                <div className="flex items-center gap-2 text-xs text-amber-500 font-bold uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  <span>{filteredMemories[lightboxIndex].date}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight font-serif tracking-wide">
                  {filteredMemories[lightboxIndex].title}
                </h2>

                <div className="w-12 h-0.5 bg-amber-500/50" />

                <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed italic">
                  "{filteredMemories[lightboxIndex].description}"
                </p>

                <div className="pt-4 flex items-center gap-2 text-[10px] text-neutral-500 font-mono uppercase tracking-widest border-t border-white/5">
                  <span>Hostel Memories</span>
                  <span>•</span>
                  <span>AVD Campus</span>
                </div>
              </div>
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % filteredMemories.length : null,
                );
                setIsZoomed(false);
              }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Keyboard Hint */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:block text-[10px] text-neutral-500 font-semibold uppercase tracking-widest pointer-events-none">
              Use Left / Right Arrows to navigate • ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
