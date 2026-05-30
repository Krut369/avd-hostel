import Link from "next/link";
import { Flame, Phone, Mail, MapPin } from "lucide-react";
import { hostelData } from "@/data/hostel";
import { COLORS } from "@/constants/colors";

export function Footer() {
  const { hostelInfo } = hostelData;
  const { contact } = hostelInfo;

  return (
    <footer
      style={{ backgroundColor: COLORS.background }}
      className="border-t"
    >
      {/* Ornament top */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <div
                  className="font-bold text-base leading-tight"
                  style={{ fontFamily: "Playfair Display, serif", color: COLORS.textPrimary }}
                >
                  Atmiya Vidya Dham
                </div>
                <div className="text-amber-500 text-xs font-semibold">Harisaurabh Hostel</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
              {hostelInfo.description}
            </p>
            <div className="mt-6 flex gap-3">
              {["📘", "📸", "🐦"].map((icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-lg border flex items-center justify-center text-sm cursor-pointer hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-300 bg-white"
                  style={{ borderColor: COLORS.borderGold }}
                >
                  {icon}
                </div>
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
                    className="text-sm hover:text-amber-500 transition-colors duration-300 flex items-center gap-2 group"
                    style={{ color: COLORS.textSecondary }}
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors" />
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
                <Phone className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm hover:text-amber-500 transition-colors"
                  style={{ color: COLORS.textSecondary }}
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm hover:text-amber-500 transition-colors break-all"
                  style={{ color: COLORS.textSecondary }}
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
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
          className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTopColor: COLORS.borderLight }}
        >
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            © {new Date().getFullYear()} Atmiya Vidya Dham. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: COLORS.textLight }}>
            Vallabh Vidyanagar, Anand, Gujarat — 388120
          </p>
        </div>
      </div>
    </footer>
  );
}
