import { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import StorySection from "@/components/sections/about/StorySection";
import ValuesSection from "@/components/sections/about/ValuesSection";
import CTA from "@/components/sections/CTA";


export const metadata: Metadata = {
  title: "About | Arcade | Full-Spectrum Digital Studio",
  description:
    "Arcade is a full-spectrum digital studio covering web development, e-commerce, branding, 3D, video production, app development, and SEO. One team, every discipline.",
  keywords: [
    "about arcade",
    "digital studio mauritius",
    "full-spectrum digital studio",
    "web development branding seo",
    "arcade studio",
    "multi-discipline digital studio",
    "digital solutions mauritius",
  ],
  openGraph: {
    title: "About | Arcade",
    description: "One studio. Every discipline. Arcade handles every digital challenge your business faces.",
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
