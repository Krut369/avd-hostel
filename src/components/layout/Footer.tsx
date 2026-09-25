"use client";

import { Phone, Mail, MapPin, ChevronRight, ShieldCheck } from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors";

export function Footer() {
  const { hostelInfo } = hostelData;
  const { contact } = hostelInfo;

  return (
    <footer style={{ backgroundColor: COLORS.background }}>
      {/* Top ornament divider */}
      <div className="w-full h-px" style={{
        background: `linear-gradient(to right, transparent, ${COLORS.border}, ${COLORS.primary}50, ${COLORS.border}, transparent)`
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="flex flex-col items-start pr-0 lg:pr-8">
            <div className="h-10 overflow-hidden flex items-center justify-start mb-4">
              <img src="/logo.png" alt="AVD Logo" className="h-full object-contain object-left" />
            </div>
            <h3 className="font-serif text-[22px] font-bold text-[#0F172A] mb-2">Atmiya Vidya Dham</h3>
            <div className="w-10 h-[2px] mb-5" style={{ backgroundColor: COLORS.primary }} />
            <p className="text-sm leading-relaxed font-sans mb-1" style={{ color: COLORS.textSecondary }}>
              Offering comfortable rooms, community living, and a focused environment for academic excellence and personal growth.
            </p>
            
            <h4 className="font-bold text-xs uppercase tracking-widest mt-5 mb-4 font-sans" style={{ color: COLORS.primary }}>
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                  label: "Instagram",
                  href: "https://www.instagram.com/harisaurabhhostel?igsh=Y2t3dmcxaWs4a3E4",
                },
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96C5.12 19.08 12 19.08 12 19.08s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z" />
                      <polygon points="9.75 15.02 15.5 11.54 9.75 8.06 9.75 15.02" />
                    </svg>
                  ),
                  label: "YouTube",
                  href: "https://www.youtube.com/@AtmiyaVidyaDham",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center text-sm cursor-pointer transition-all duration-300 bg-white border group shadow-sm"
                  style={{ color: COLORS.primary, borderColor: COLORS.border }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = COLORS.primary;
                    el.style.color = "#fff";
                    el.style.transform = "translateY(-2px) scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "#fff";
                    el.style.color = COLORS.primary;
                    el.style.transform = "";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:flex md:flex-col md:items-center">
            <div className="w-full max-w-[200px]">
              <h4 className="font-bold text-xs uppercase tracking-widest mb-2 font-sans" style={{ color: COLORS.primary }}>
                Quick Links
              </h4>
              <div className="w-8 h-[2px] mb-6" style={{ backgroundColor: COLORS.primary }} />
              <ul className="flex flex-col">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#about", label: "About Us" },
                  { href: "#rooms", label: "Rooms" },
                  { href: "#gallery", label: "Gallery" },
                  { href: "#reviews", label: "Reviews" },
                ].map((link, idx, arr) => (
                  <li key={link.href} className={`py-3.5 ${idx !== arr.length - 1 ? "border-b border-black/5" : ""}`}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.location.pathname !== "/") {
                          window.location.href = "/" + link.href;
                          return;
                        }
                        const target = document.querySelector(link.href);
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-sm transition-all duration-300 flex items-center gap-3 group font-sans"
                      style={{ color: COLORS.textSecondary }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = COLORS.primary;
                        (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "6px";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary;
                        (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0px";
                      }}
                    >
                      <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" style={{ color: COLORS.primary }} />
                      <span className="font-medium">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:flex md:flex-col md:items-start pl-0 lg:pl-10">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-2 font-sans" style={{ color: COLORS.primary }}>
                Contact Info
              </h4>
              <div className="w-8 h-[2px] mb-6" style={{ backgroundColor: COLORS.primary }} />
              <ul className="space-y-6">
                <li className="flex gap-4 items-start focus-within:outline-none">
                  <div className="w-10 h-10 rounded-[12px] shadow-sm flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS.primary}12` }}>
                    <Phone className="w-4 h-4" style={{ color: COLORS.primary }} />
                  </div>
                  <div className="flex flex-row items-center gap-x-6 gap-y-2 flex-wrap pt-0.5 font-sans">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>{contact.phoneName}</span>
                      <a
                        href={`tel:${contact.phone}`}
                        className="hover:underline mt-1 font-semibold text-[13px] transition-colors duration-200"
                        style={{ color: COLORS.textPrimary }}
                        onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.primary)}
                        onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.textPrimary)}
                      >
                        {contact.phone}
                      </a>
                    </div>
                    {contact.phone2 && (
                      <>
                        <div className="w-px h-8 bg-black/10 self-center hidden lg:block" />
                        <div className="flex flex-col">
                          <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>{contact.phone2Name}</span>
                          <a
                            href={`tel:${contact.phone2}`}
                            className="hover:underline mt-1 font-semibold text-[13px] transition-colors duration-200"
                            style={{ color: COLORS.textPrimary }}
                            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.primary)}
                            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.textPrimary)}
                          >
                            {contact.phone2}
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </li>

                <li className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-[12px] shadow-sm flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS.primary}12` }}>
                    <Mail className="w-4 h-4" style={{ color: COLORS.primary }} />
                  </div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[13px] font-medium hover:underline break-all transition-colors duration-200 font-sans"
                    style={{ color: COLORS.textSecondary }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.primary)}
                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.textSecondary)}
                  >
                    {contact.email}
                  </a>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-[12px] shadow-sm flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS.primary}12` }}>
                    <MapPin className="w-4 h-4" style={{ color: COLORS.primary }} />
                  </div>
                  <span className="text-[13px] font-medium leading-relaxed mt-0.5 font-sans" style={{ color: COLORS.textSecondary }}>
                    Atmiya Marg, Bakrol Road,<br />
                    Vallabh Vidyanagar,<br />
                    Anand - 388120
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 py-6 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-3">
            <p className="text-xs font-medium font-sans leading-tight" style={{ color: COLORS.textMuted }}>
              © {new Date().getFullYear()} Atmiya Vidya Dham.<br className="hidden sm:block md:hidden" /> All rights reserved.
            </p>
          </div>
          
          <div className="hidden md:block w-px h-6" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} />

          <a
            href="https://maps.app.goo.gl/gfcDqDZsdvgEcfex7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 transition-colors duration-200 cursor-pointer group"
            onMouseEnter={(e) => {
              const span = e.currentTarget.querySelector('span');
              if (span) span.style.color = COLORS.primary;
            }}
            onMouseLeave={(e) => {
              const span = e.currentTarget.querySelector('span');
              if (span) span.style.color = COLORS.textSecondary;
            }}
          >
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS.primary}12` }}>
              <MapPin className="w-4 h-4" style={{ color: COLORS.primary }} />
            </div>
            <span className="text-xs font-medium font-sans transition-colors" style={{ color: COLORS.textSecondary }}>
              Vallabh Vidyanagar, Anand, Gujarat — 388120
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
