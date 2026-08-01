"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-16 h-16 overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="AVD Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
              {hostelInfo.description}
            </p>
            <div className="mt-6 flex gap-3">
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
                  className="w-9 h-9 rounded-xl border flex items-center justify-center text-sm cursor-pointer transition-all duration-300 bg-white group"
                  style={{ borderColor: COLORS.border, color: COLORS.primary }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = COLORS.primary;
                    el.style.borderColor = COLORS.primary;
                    el.style.color = "#fff";
                    el.style.transform = "translateY(-2px) scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "#fff";
                    el.style.borderColor = COLORS.border;
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
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest mb-6" style={{ color: COLORS.primary }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About Us" },
                  { href: "/rooms", label: "Rooms" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/reviews", label: "Reviews" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-all duration-300 flex items-center gap-2.5 group"
                      style={{ color: COLORS.textSecondary }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = COLORS.primary;
                        (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "4px";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary;
                        (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0px";
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
                        style={{ backgroundColor: `${COLORS.primary}40` }}
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="md:flex md:flex-col md:items-center">
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest mb-6" style={{ color: COLORS.primary }}>
                Contact Info
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${COLORS.primary}12` }}>
                    <Phone className="w-3.5 h-3.5" style={{ color: COLORS.primary }} />
                  </div>
                  <div className="flex flex-row gap-x-8 gap-y-2 text-sm flex-wrap">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>{contact.phoneName}</span>
                      <a
                        href={`tel:${contact.phone}`}
                        className="hover:underline mt-0.5 font-medium transition-colors duration-200"
                        style={{ color: COLORS.textPrimary }}
                        onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.primary)}
                        onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.textPrimary)}
                      >
                        {contact.phone}
                      </a>
                    </div>
                    {contact.phone2 && (
                      <div className="flex flex-col">
                        <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>{contact.phone2Name}</span>
                        <a
                          href={`tel:${contact.phone2}`}
                          className="hover:underline mt-0.5 font-medium transition-colors duration-200"
                          style={{ color: COLORS.textPrimary }}
                          onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.primary)}
                          onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.textPrimary)}
                        >
                          {contact.phone2}
                        </a>
                      </div>
                    )}
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${COLORS.primary}12` }}>
                    <Mail className="w-3.5 h-3.5" style={{ color: COLORS.primary }} />
                  </div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm hover:underline break-all transition-colors duration-200 mt-1.5"
                    style={{ color: COLORS.textSecondary }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.primary)}
                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = COLORS.textSecondary)}
                  >
                    {contact.email}
                  </a>
                </li>

                <li className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${COLORS.primary}12` }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: COLORS.primary }} />
                  </div>
                  <span className="text-sm leading-relaxed mt-1" style={{ color: COLORS.textSecondary }}>
                    {contact.address.streetAddress},<br />
                    {contact.address.locality},<br />
                    {contact.address.city} - {contact.address.postalCode}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTopColor: COLORS.border }}>
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            © {new Date().getFullYear()} Atmiya Vidya Dham. All rights reserved.
          </p>
          <a
            href="https://maps.app.goo.gl/gfcDqDZsdvgEcfex7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
            style={{ color: COLORS.textSecondary }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.primary)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />
            <span>Vallabh Vidyanagar, Anand, Gujarat — 388120</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
