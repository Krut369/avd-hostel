import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About Us | Atmiya Vidya Dham",
  description: "Learn about the mission, values and campus life at Harisaurabh Hostel, Vallabh Vidyanagar.",
};

export default function AboutPage() {
  return <AboutContent />;
}
