import { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import StorySection from "@/components/sections/about/StorySection";
import ValuesSection from "@/components/sections/about/ValuesSection";
import CTA from "@/components/sections/CTA";


export const metadata: Metadata = {
  title: "About | Arcade Studios | Full-Stack Digital Engineering",
  description:
    "Arcade Studios is a full-stack digital engineering studio. We build scalable web systems, platforms, and interfaces — from architecture to deployment.",
  keywords: [
    "about arcade studios",
    "full-stack web development",
    "digital engineering studio",
    "web platform development",
    "next.js development studio",
    "scalable web systems",
    "software engineering mauritius",
  ],
  openGraph: {
    title: "About | Arcade Studios",
    description: "Engineering-first digital studio. We build systems that scale, interfaces that convert, and platforms that perform.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="relative min-h-screen">
        <AboutHero />
        <StorySection />
        <ValuesSection />
        <CTA title="Ready to build something?" href="/contact" />
      </div>
    </>
  );
}
