import { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import StorySection from "@/components/sections/about/StorySection";
import TeamSection from "@/components/sections/about/TeamSection";
import ValuesSection from "@/components/sections/about/ValuesSection";
import CTA from "@/components/sections/CTA";


export const metadata: Metadata = {
  title: "About Us | Leylak | Digital Solutions Studio",
  description:
    "Meet the people behind Leylak — a digital solutions studio obsessed with solving every challenge your brand faces online. Web, branding, motion, 3D, and more.",
  keywords: [
    "about leylak",
    "digital solutions studio",
    "creative studio team",
    "branding and design agency",
    "full-service digital studio",
    "web and motion design",
    "digital problem solvers",
  ],
  openGraph: {
    title: "About Us | Leylak",
    description: "The people behind your digital solutions. We handle every problem — you focus on growth.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="relative min-h-screen">
        <AboutHero />
        <StorySection />
        <TeamSection />
        <ValuesSection />
        <CTA title="Ready to work with us?" href="/contact" />
      </div>
    </>
  );
}
