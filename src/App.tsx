import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { HeroSection } from "@/components/sections/HeroSection";
import { CampusHighlightsSection } from "@/components/sections/CampusHighlightsSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { FeaturedRoomsSection } from "@/components/sections/FeaturedRoomsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ArrivalContent } from "@/components/pages/ArrivalContent";
import { ReviewsContent } from "@/components/pages/ReviewsContent";
import { RoomsContent } from "@/components/pages/RoomsContent";
import { GalleryContent } from "@/components/pages/GalleryContent";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Simple router based on current path
  const renderView = () => {
    switch (currentPath) {
      case "/rooms":
        return <RoomsContent />;
      case "/reviews":
        return <ReviewsContent />;
      case "/arrival":
        return <ArrivalContent />;
      case "/gallery":
        return <GalleryContent />;
      default:
        return (
          <main>
            <HeroSection />
            <CampusHighlightsSection />
            <AmenitiesSection />
            <FeaturedRoomsSection />
            <ArrivalContent />
            <div id="gallery">
              <GalleryContent />
            </div>
            <TestimonialsSection />
            <CTASection />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4EC] text-[#111827] font-sans antialiased">
      <Navbar />
      {renderView()}
      <Footer />
      <FloatingActions />
    </div>
  );
}
