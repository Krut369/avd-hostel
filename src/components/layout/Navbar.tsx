"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { COLORS } from "@/constants/colors";

const navLinks = [
  { href: "/#home", label: "Home", id: "home" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#rooms", label: "Rooms", id: "rooms" },
  { href: "/#arrival", label: "Directions", id: "arrival" },
  { href: "/#gallery", label: "Gallery", id: "gallery" },
  { href: "/#reviews", label: "Reviews", id: "reviews" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [pathname, setPathname] = useState("/");
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      
      if (currentScrollY <= 50) {
        setNavVisible(true);
      } else {
        // Hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY) {
          setNavVisible(false);
        } else {
          setNavVisible(true);
        }
      }
      
      lastScrollYRef.current = currentScrollY;
      setScrolled(currentScrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Close mobile menu on page navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Update active section based on intersection observer (on homepage)
  useEffect(() => {
    if (pathname !== "/") return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const handleScroll = () => {
      if (window.scrollY < 200) setActiveSection("home");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sectionIds = ["home", "about", "rooms", "arrival", "gallery", "reviews", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

  // Handle smooth scroll on load if URL has hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const id = hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [pathname]);

  const isHome = pathname === "/";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.split("#")[1];
    if (targetId && isHome) {
      e.preventDefault();
      setActiveSection(targetId);
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      {/* Fixed Header Layout with Independent Elements */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-none"
      >
        {/* 1. FAR LEFT: Independent Logo / Icon */}
        <div className="pointer-events-auto shrink-0">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center group bg-white/80 backdrop-blur-xl p-2 rounded-full border border-white/60 shadow-md transition-all hover:scale-105 w-11 h-11 sm:w-12 sm:h-12"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <img
              src="/logo.png"
              alt="AVD Logo"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </a>
        </div>

        {/* 2. CENTER: Dedicated Floating Translucent Glass Pill for Navigation Links ONLY */}
        <AnimatePresence>
          {navVisible && (
            <motion.nav
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onMouseLeave={() => setHoveredLink(null)}
              className="pointer-events-auto hidden lg:flex items-center gap-1 relative bg-white/80 backdrop-blur-xl border border-white/60 px-3 py-1.5 rounded-full shadow-lg"
              style={{
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
              }}
            >
              {navLinks.map((link) => {
                const active = isHome
                  ? activeSection === link.id
                  : pathname === link.href.split("#")[0];
                const isHovered = hoveredLink === link.href;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-1.5 text-xs sm:text-sm font-semibold transition-colors duration-200 rounded-full z-10 flex items-center ${
                      active ? "text-white" : "text-[#475569] hover:text-[#0F172A]"
                    }`}
                  >
                    {/* Sliding Hover Pill Background */}
                    {isHovered && !active && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 rounded-full bg-[#C44D28]/12 -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Active Terracotta Pill Background */}
                    {active && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full -z-10 shadow-sm"
                        style={{ backgroundColor: COLORS.primary }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span>{link.label}</span>
                  </a>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* 3. FAR RIGHT: Independent Contact Us Action Button & Mobile Toggle */}
        <div className="pointer-events-auto flex items-center gap-3 shrink-0">
          {/* Desktop Contact Us Button */}
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact")}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md group shrink-0"
            style={{
              backgroundColor: COLORS.primary,
              boxShadow: `0 6px 18px -3px ${COLORS.primary}50`,
            }}
          >
            <span>Contact Us</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <motion.button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/90 border border-white/60 text-[#0F172A] hover:bg-[#C44D28]/10 transition-colors shadow-md"
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle Navigation Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-[#0F172A]" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-[#0F172A]" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto pt-24 pb-10 px-6"
            style={{
              background: "rgba(255, 244, 236, 0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="flex flex-col min-h-[calc(100vh-8rem)] justify-between max-w-md mx-auto">
              <div className="flex flex-col gap-2 pt-4">
                {navLinks.map((link, i) => {
                  const isActive = isHome && activeSection === link.id;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center justify-between py-3.5 px-5 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                          isActive
                            ? "bg-[#C44D28] text-white shadow-md"
                            : "text-[#0F172A] hover:bg-[#C44D28]/10"
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8 space-y-4"
              >
                <a
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact")}
                  className="flex items-center justify-center gap-2 w-full py-4 text-white text-base font-bold rounded-2xl shadow-lg active:scale-95 transition-all duration-300"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="text-center text-xs text-[#8A5B36] font-medium pt-4">
                  Atmiya Vidya Dham · Vallabh Vidyanagar
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
