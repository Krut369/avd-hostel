import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CampusHighlightsSection } from "@/components/sections/CampusHighlightsSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { FeaturedRoomsSection } from "@/components/sections/FeaturedRoomsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ArrivalContent } from "@/components/pages/ArrivalContent";
import { GalleryContent } from "@/components/pages/GalleryContent";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      
      {/* About Section */}
      <CampusHighlightsSection />
      <AmenitiesSection />
      
      {/* Rooms Section */}
      <FeaturedRoomsSection />
      
      {/* Arrival Section */}
      <div id="arrival">
        <ArrivalContent />
      </div>
      
      {/* Gallery Section */}
      <div id="gallery">
        <GalleryContent />
      </div>
      
      {/* Reviews Section */}
      <TestimonialsSection />
      
      {/* Contact Section */}
      <CTASection />
    </>
  );
}
