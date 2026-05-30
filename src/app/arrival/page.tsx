import type { Metadata } from "next";
import { ArrivalContent } from "@/components/pages/ArrivalContent";

export const metadata: Metadata = {
  title: "Arrival & Directions | Atmiya Vidya Dham",
  description: "Find your way to Harisaurabh Hostel in Vallabh Vidyanagar, Anand, Gujarat.",
};

export default function ArrivalPage() {
  return <ArrivalContent />;
}
