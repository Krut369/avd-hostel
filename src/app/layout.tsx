import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";

export const metadata: Metadata = {
  title: "Atmiya Vidya Dham | Harisaurabh Hostel - Vallabh Vidyanagar",
  description: "A value-centered student residence in Vallabh Vidyanagar, Gujarat. Comfortable rooms, spiritual growth, academic excellence, and community living.",
  keywords: "hostel, Vallabh Vidyanagar, student accommodation, Anand Gujarat, Harisaurabh Hostel, AVD",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Atmiya Vidya Dham | Harisaurabh Hostel",
    description: "A value-centered student residence in Vallabh Vidyanagar, Gujarat",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
