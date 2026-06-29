import { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import StorySection from "@/components/sections/about/StorySection";
import ValuesSection from "@/components/sections/about/ValuesSection";
import CTA from "@/components/sections/CTA";


export const metadata: Metadata = {
  title: "About | Leylak Tech | Custom Software & AI Studio",
  description:
    "Leylak Tech is a digital solutions studio focusing on web and app development, custom software, AI integration, and automation.",
  keywords: [
    "about leylak",
    "digital agency",
    "web development studio",
    "app development",
    "custom software",
    "ai integration",
    "automation",
  ],
  openGraph: {
    title: "About | Leylak Tech",
    description: "Leylak Tech is a digital solutions studio focusing on web and app development, custom software, AI integration, and automation.",
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
        <CTA title="Ready to work with us?" href="/contact" />
      </div>
    </>
  );
}
