import { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import StorySection from "@/components/sections/about/StorySection";
import TeamSection from "@/components/sections/about/TeamSection";
import ValuesSection from "@/components/sections/about/ValuesSection";
import CTA from "@/components/sections/CTA";


export const metadata: Metadata = {
  title: "About Us | Arcade Studios | Web Development Agency",
  description:
    "Meet the Arcade Studios team—a web development agency building modern digital products for startups, agencies, and next-gen brands. Specializing in React, Next.js, and full-stack solutions.",
  keywords: [
    "about arcade studios",
    "web development team",
    "react developers",
    "next.js agency",
    "full-stack development",
    "web development company",
    "software development team",
  ],
  openGraph: {
    title: "About Us | Arcade Studios",
    description: "A web development agency building modern digital products for next-gen brands.",
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
