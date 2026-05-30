"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { COLORS } from "@/constants/colors";

const navLinks = [
  { href: "/#home", label: "Home", id: "home" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#rooms", label: "Rooms", id: "rooms" },
  { href: "/#arrival", label: "Arrival", id: "arrival" },
  { href: "/#gallery", label: "Gallery", id: "gallery" },
  { href: "/#reviews", label: "Reviews", id: "reviews" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
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
      rootMargin: "-30% 0px -50% 0px", // Trigger when the section occupies center viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sectionIds = ["home", "about", "rooms", "arrival", "gallery", "reviews", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
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
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [pathname]);

  const isHome = pathname === "/";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.split("#")[1];
    if (targetId && isHome) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
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
            ? "bg-[#FAF7F2] shadow-sm border-b border-black/5"
            : "bg-[#FAF7F2] lg:bg-transparent border-b border-black/5 lg:border-none lg:shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 bg-white border" style={{ borderColor: `${COLORS.primary}30` }}>
                <img src="/logo.png" alt="AVD Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="block">
                <div
                  className="font-bold text-sm leading-none"
                  style={{ fontFamily: "Playfair Display, serif", color: COLORS.textPrimary }}
                >
                  Atmiya Vidya Dham
                </div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: COLORS.accent }}>Harisaurabh Hostel</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isHome ? (activeSection === link.id) : (pathname === link.href.split("#")[0]);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative group"
                    style={{
                      color: active
                        ? COLORS.primary
                        : COLORS.textPrimary
                    }}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                        style={{ backgroundColor: COLORS.primary }}
                      />
                    )}
                  </Link>
                );
              })}
              <Link
                href="/#contact"
                onClick={(e) => handleNavClick(e, "/#contact")}
                className="ml-4 px-5 py-2.5 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                style={{ backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.primaryLight})` }}
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
              style={{ color: COLORS.textPrimary }}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto"
            style={{ background: "rgba(250, 247, 242, 0.98)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col min-h-screen pt-24 pb-12 px-8">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center justify-between py-3 text-2xl font-semibold border-b transition-all duration-300 hover:pl-2"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        color: (isHome && activeSection === link.id) ? COLORS.primary : COLORS.textPrimary,
                        borderBottomColor: `${COLORS.primary}15`
                      }}
                    >
                      <span>{link.label}</span>
                      {(isHome && activeSection === link.id) && (
                        <motion.span
                          layoutId="mobile-nav-indicator"
                          className="w-2.5 h-2.5 rounded-full mr-2"
                          style={{ backgroundColor: COLORS.primary }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6"
              >
                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact")}
                  className="block w-full text-center py-3.5 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-300"
                  style={{ backgroundImage: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.primaryLight})` }}
                >
                  Apply Now
                </Link>
              </motion.div>
              <div className="mt-auto pt-12 text-sm" style={{ color: COLORS.textMuted }}>
                Atmiya Vidya Dham · Vallabh Vidyanagar
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
