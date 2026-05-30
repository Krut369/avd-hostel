import type { Metadata } from "next";
import { RoomsContent } from "@/components/pages/RoomsContent";

export const metadata: Metadata = {
  title: "Rooms | Atmiya Vidya Dham",
  description: "Explore our premium AC rooms, non-AC rooms, dormitories, and junior rooms at Harisaurabh Hostel.",
};

export default function RoomsPage() {
  return <RoomsContent />;
}
