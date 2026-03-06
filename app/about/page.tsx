import { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import StorySection from "@/components/sections/about/StorySection";
import ValuesSection from "@/components/sections/about/ValuesSection";
import CTA from "@/components/sections/CTA";


export const metadata: Metadata = {
  title: "About | Leylak | Full-Spectrum Digital Studio",
  description:
    "Leylak is a full-spectrum digital studio covering web development, e-commerce, branding, 3D, video production, app development, and SEO — one team, every discipline.",
  keywords: [
    "about leylak",
    "digital studio mauritius",
    "full-spectrum digital studio",
    "web development branding seo",
    "leylak studio",
    "multi-discipline digital studio",
    "digital solutions mauritius",
  ],
  openGraph: {
    title: "About | Leylak",
    description: "One studio. Every discipline. Leylak handles every digital challenge your business faces.",
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
