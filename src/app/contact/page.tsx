import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Atmiya Vidya Dham",
  description: "Get in touch with Harisaurabh Hostel for admissions, inquiries, and more.",
};

export default function ContactPage() {
  return <ContactContent />;
}
