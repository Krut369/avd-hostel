import type { Metadata } from "next";
import { ReviewsContent } from "@/components/pages/ReviewsContent";

export const metadata: Metadata = {
  title: "Reviews | Atmiya Vidya Dham",
  description: "Read what students say about their experience at Harisaurabh Hostel.",
};

export default function ReviewsPage() {
  return <ReviewsContent />;
}
