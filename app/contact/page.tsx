import { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact Us | Leylak | Digital Solutions Studio",
  description:
    "Got a digital challenge? Leylak is ready to solve it. Reach out to discuss your project — web, branding, motion, 3D, e-commerce, or anything in between.",
  keywords: [
    "contact leylak",
    "digital solutions studio",
    "hire digital agency",
    "solve digital problems",
    "creative studio contact",
    "web and branding studio",
    "digital project inquiry",
  ],
  openGraph: {
    title: "Contact Us | Leylak",
    description: "Got a digital challenge? Let's solve it together.",
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

