import { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact Us | Arcade Studios | Web Development Agency",
  description:
    "Ready to build your next web application? Get in touch with Arcade Studios for web development, React, Next.js, and full-stack solutions. Available for projects with startups, agencies, and next-gen brands.",
  keywords: [
    "hire web developers",
    "contact web agency",
    "web development services",
    "react development consultation",
    "next.js development",
    "full-stack development",
  ],
  openGraph: {
    title: "Contact Us | Arcade Studios",
    description: "Let's build your next digital product. Available for web development projects.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <div className="relative min-h-screen">
        <ContactHero />
        <ContactFormSection />
      </div>
    </>
  );
}

