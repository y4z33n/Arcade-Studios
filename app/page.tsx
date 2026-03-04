import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import BrandShowcase from "@/components/sections/BrandShowcase";
import FeaturedWork from "@/components/sections/FeaturedWork";
import CTA from "@/components/sections/CTA";
import HyperspeedBackground from "@/components/HyperspeedBackground";
import FloatingCTA from "@/components/layout/FloatingCTA";

export const metadata: Metadata = {
  title: "Leylak | Digital Solutions Studio",
  description:
    "Leylak is a full-spectrum digital solutions studio. Every problem your brand faces online — we solve it. Web, branding, motion, 3D, e-commerce, and beyond.",
  keywords: [
    "digital solutions studio",
    "digital agency",
    "web design and development",
    "branding agency",
    "creative studio",
    "e-commerce solutions",
    "motion design",
    "3D design",
  ],
  openGraph: {
    title: "Leylak | Digital Solutions Studio",
    description:
      "Every digital problem your brand faces — we solve it. Web, branding, motion, 3D, and beyond.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Leylak - Digital Solutions Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leylak | Digital Solutions Studio",
    description: "Every digital problem your brand faces — we solve it. Web, branding, motion, 3D, and beyond.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hyperspeed Background - Full Page */}
      <HyperspeedBackground />
      
      {/* Floating Action Button */}
      <FloatingCTA />
      
      <div className="relative min-h-screen">
        <Hero />
        <div className="space-y-0">
          <FeaturedWork />
          <BrandShowcase />
          <Services />
        </div>
        
        <CTA title="Let's build something extraordinary" href="/contact" />
      </div>
    </>
  );
}
