import type { Metadata } from "next";
import { GalleryContent } from "@/components/pages/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery | Atmiya Vidya Dham",
  description: "Explore photos of Harisaurabh Hostel — rooms, campus, temple, and community life.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
