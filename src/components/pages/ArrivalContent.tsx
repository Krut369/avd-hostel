"use client";

import { motion } from "framer-motion";
import { MapPin, Train, Bus, Car, Navigation, ExternalLink } from "lucide-react";
import { hostelData } from "@/data/hostel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COLORS } from "@/constants/colors";

const modeIcons: Record<string, React.ReactNode> = {
  "Auto / Bus": <Bus className="w-6 h-6" />,
  "Public Bus": <Bus className="w-6 h-6" />,
  "Self Drive": <Car className="w-6 h-6" />,
};

const modeColors = ["from-amber-500 to-orange-500", "from-blue-500 to-cyan-500", "from-emerald-500 to-teal-500"];

export function ArrivalContent() {
  const { contact } = hostelData.hostelInfo;
  const destination = `${contact.coordinates.latitude},${contact.coordinates.longitude}`;

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-5/40 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="ornament-divider justify-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: COLORS.primary }}>Find Us</span>
            </div>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6"
              style={{ fontFamily: "Playfair Display, serif", color: COLORS.textPrimary }}
            >
              Arrival &<br /><span className="gradient-text italic">Directions</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: COLORS.textPrimary }}>
              We&apos;re located in the heart of Vallabh Vidyanagar — easily accessible from Anand by multiple routes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map + Address */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8 border-t"
        style={{ backgroundColor: COLORS.background, borderColor: `${COLORS.primary}15` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl p-8 shadow-sm border"
              style={{ backgroundColor: COLORS.surface, borderColor: COLORS.borderGold }}
            >
              <div
                className="w-12 h-12 rounded-2xl border flex items-center justify-center mb-5"
                style={{ backgroundColor: `${COLORS.primary}08`, borderColor: COLORS.borderGold, color: COLORS.primary }}
              >
                <MapPin className="w-6 h-6" />
              </div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "Playfair Display, serif", color: COLORS.textPrimary }}
              >
                Our Address
              </h3>
              <address className="text-sm leading-relaxed not-italic mb-6" style={{ color: COLORS.textPrimary }}>
                {contact.address.streetAddress}<br />
                {contact.address.locality}<br />
                {contact.address.city}, {contact.address.region}<br />
                PIN: {contact.address.postalCode}
              </address>
              <div className="text-xs mb-4" style={{ color: COLORS.textPrimary }}>
                📍 {contact.coordinates.latitude}°N, {contact.coordinates.longitude}°E
              </div>
              <a
                href={`https://maps.google.com/maps?q=${destination}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold hover:opacity-85 transition-opacity"
                style={{ color: COLORS.primary }}
              >
                Open in Google Maps <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-2 rounded-3xl overflow-hidden shadow-md border h-80 lg:h-auto"
              style={{ borderColor: COLORS.borderGold }}
            >
              <iframe
                src={`https://www.google.com/maps?q=${destination}&z=15&output=embed`}
                className="w-full h-full min-h-80 border-none"
                loading="lazy"
                title="Hostel Location Map"
                allowFullScreen
              />
            </motion.div>
          </div>

          {/* Transport cards */}
          <SectionHeader
            eyebrow="Getting Here"
            title="Transportation"
            titleHighlight="Routes"
            subtitle="Multiple convenient ways to reach Atmiya Vidya Dham from Anand and beyond."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {hostelData.transportation.map((t, i) => (
              <motion.div
                key={t.route}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border transition-all duration-500 group"
                style={{ backgroundColor: COLORS.surface, borderColor: COLORS.borderGold }}
              >
                <div className={`h-2 bg-gradient-to-r ${modeColors[i]}`} />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${modeColors[i]} flex items-center justify-center text-white`}>
                      {modeIcons[t.mode] || <Car className="w-6 h-6" />}
                    </div>
                    <span className="text-slate-300 font-bold text-4xl" style={{ fontFamily: "Playfair Display, serif" }}>
                      {t.route}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "Playfair Display, serif", color: COLORS.textPrimary }}
                  >
                    {t.from}
                  </h3>

                  <div className="space-y-2 my-4">
                    <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.textPrimary }}>
                      <Navigation className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
                      <span>{t.routePath}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: COLORS.primary }}>
                        {t.distance}
                      </span>
                      <span className="text-xs" style={{ color: COLORS.textPrimary }}>distance</span>
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      🚌 {t.mode}
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/${t.originQuery}/${destination}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold hover:opacity-85 transition-opacity pt-3 border-t border-slate-100"
                    style={{ color: COLORS.primary }}
                  >
                    Get Directions <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
