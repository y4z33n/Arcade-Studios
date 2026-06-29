import { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact Us | Leylak Tech | Custom Software & AI Studio",
  description:
    "Got a digital challenge? Leylak Tech is ready to solve it. Reach out to discuss your project — web, app, custom software, AI, or automation.",
  keywords: [
    "contact leylak",
    "hire leylak tech",
    "web development",
    "app development",
    "custom software",
    "start a project",
  ],
  openGraph: {
    title: "Contact Us | Leylak Tech",
    description: "Got a digital challenge? Leylak Tech is ready to solve it.",
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

