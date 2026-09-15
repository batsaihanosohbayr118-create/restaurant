import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find VELORA's address, phone, email, and opening hours, or get directions to visit us in person.",
};

export default function ContactPage() {
  return <Contact />;
}
