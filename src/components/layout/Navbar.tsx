"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { COLORS } from "@/constants/colors";

const navLinks = [
  { href: "/#home", label: "Home", id: "home" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#rooms", label: "Rooms", id: "rooms" },
  { href: "/#arrival", label: "Directions", id: "arrival" },
  { href: "/#gallery", label: "Gallery", id: "gallery" },
  { href: "/#reviews", label: "Reviews", id: "reviews" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Calculate overall page scroll progress
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FFF4EC]/95 shadow-sm border-b border-[var(--border)]/60"
            : "bg-[#FFF4EC] lg:bg-transparent lg:shadow-none lg:border-b-0"
        }`}
        style={scrolled ? { backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" } : {}}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] z-10"
          style={{
            width: `${scrollProgress}%`,
            background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.primaryLight})`,
          }}
          transition={{ ease: "linear" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="w-22 h-22 overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="AVD Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = isHome
                  ? activeSection === link.id
                  : pathname === link.href.split("#")[0];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 rounded-lg text-sm transition-all duration-200 nav-link ${
                      active ? "font-semibold" : "font-medium hover:font-semibold"
                    }`}
                    data-text={link.label}
                    style={{ color: active ? COLORS.primary : COLORS.textPrimary }}
                  >
                    {link.label}
                    {/* Animated active underline */}
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                        style={{ backgroundColor: COLORS.primary }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
              <a
                href="/#contact"
                onClick={(e) => handleNavClick(e, "/#contact")}
                className="ml-4 px-5 py-2.5 text-white text-sm font-semibold rounded-lg glass-shine hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                style={{ backgroundColor: COLORS.primary }}
              >
                Apply Now
              </a>
            </div>

            {/* Mobile toggle */}
            <motion.button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 active:bg-black/10 transition-colors"
              style={{ color: COLORS.textPrimary }}
              whileTap={{ scale: 0.92 }}
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
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto"
            style={{
              background: "rgba(255, 244, 236, 0.98)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="flex flex-col min-h-screen pt-24 pb-12 px-8">
              <div className="flex flex-col gap-0.5">
                {navLinks.map((link, i) => {
                  const isActive = isHome && activeSection === link.id;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045, duration: 0.35 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center justify-between py-3.5 text-2xl font-semibold border-b transition-all duration-300 hover:pl-2 ${
                          isActive ? "pl-1" : ""
                        }`}
                        style={{
                          color: isActive ? COLORS.primary : COLORS.textPrimary,
                          borderBottomColor: `${COLORS.primary}18`,
                        }}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="mobile-nav-indicator"
                            className="w-2 h-2 rounded-full mr-1"
                            style={{ backgroundColor: COLORS.primary }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
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
                className="mt-8"
              >
                <a
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact")}
                  className="block w-full text-center py-4 text-white text-lg font-bold rounded-2xl shadow-lg active:scale-95 transition-all duration-300 glass-shine"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  Apply Now
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-auto pt-12 text-sm"
                style={{ color: COLORS.textMuted }}
              >
                Atmiya Vidya Dham · Vallabh Vidyanagar
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
