import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors";

export function Footer() {
  const { hostelInfo } = hostelData;
  const { contact } = hostelInfo;

  return (
    <footer
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-md bg-white border" style={{ borderColor: `${COLORS.primary}30` }}>
                <img src="/logo.png" alt="AVD Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <div>
                <div
                  className="font-bold text-base leading-tight"
                  style={{ color: COLORS.textPrimary }}
                >
                  Atmiya Vidya Dham
                </div>
                <div className="text-xs font-semibold" style={{ color: COLORS.primary }}>Harisaurabh Hostel</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
              {hostelInfo.description}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                {
                  icon: (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
                  className="w-9 h-9 rounded-lg border flex items-center justify-center text-sm cursor-pointer hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all duration-300 bg-white"
                  style={{ borderColor: COLORS.borderGold, color: COLORS.textSecondary }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-6" style={{ color: COLORS.primary }}>
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
                    className="text-sm hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-2 group"
                    style={{ color: COLORS.textSecondary }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]/40 group-hover:bg-[var(--primary)] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-6" style={{ color: COLORS.primary }}>
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" style={{ color: COLORS.primary }} />
                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm hover:text-[var(--primary)] transition-colors"
                  style={{ color: COLORS.textSecondary }}
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: COLORS.primary }} />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm hover:text-[var(--primary)] transition-colors break-all"
                  style={{ color: COLORS.textSecondary }}
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: COLORS.primary }} />
                <span className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
                  {contact.address.streetAddress},<br />
                  {contact.address.locality},<br />
                  {contact.address.city} - {contact.address.postalCode}
                </span>
              </li>
            </ul>
          </div>

          {/* Map preview */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-6" style={{ color: COLORS.primary }}>
              Location
            </h4>
            <div className="rounded-xl overflow-hidden border h-40" style={{ borderColor: COLORS.borderGold }}>
              <iframe
                src={`https://www.google.com/maps?q=${contact.coordinates.latitude},${contact.coordinates.longitude}&z=15&output=embed`}
                className="w-full h-full border-none"
                loading="lazy"
                title="Hostel Location"
              />
            </div>
          </div>
        </div>

        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            © {new Date().getFullYear()} Atmiya Vidya Dham. All rights reserved.
          </p>
          <a
            href="https://maps.app.goo.gl/gfcDqDZsdvgEcfex7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-[var(--primary)] transition-colors flex items-center gap-1 cursor-pointer"
            style={{ color: COLORS.textSecondary }}
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.primary }} />
            <span>Vallabh Vidyanagar, Anand, Gujarat — 388120</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
