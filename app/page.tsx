import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Ethos from "@/components/sections/Ethos";
import Services from "@/components/sections/Services";
import BrandShowcase from "@/components/sections/BrandShowcase";
import FeaturedWork from "@/components/sections/FeaturedWork";
import ProductsShowcase from "@/components/sections/ProductsShowcase";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";
import HyperspeedBackground from "@/components/HyperspeedBackground";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { ScrollReveal, HeroParallax } from "@/components/ui/ScrollTransitions";

export const metadata: Metadata = {
  title: "Leylak Tech | Custom Software & AI Studio",
  description:
    "Leylak Tech is a full-spectrum digital solutions studio. From web and app development to custom software, AI integration, and automation.",
  keywords: [
    "digital solutions studio",
    "web development",
    "app development",
    "custom software",
    "ai integration",
    "automation",
  ],
  openGraph: {
    title: "Leylak Tech | Custom Software & AI Studio",
    description:
      "From web and app development to custom software, AI integration, and automation.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Leylak Tech - Custom Software & AI Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leylak Tech | Custom Software & AI Studio",
    description: "From web and app development to custom software, AI integration, and automation.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hyperspeed Background - Full Page */}
      <HyperspeedBackground />
      
      {/* Floating Action Button */}
      <FloatingCTA />
      
      <div className="relative min-h-screen z-10">
        <Hero />
        
        <Ethos />
        
        <div className="flex flex-col gap-12 md:gap-24 pb-20 mt-12 md:mt-24">
          <FeaturedWork />
          
          <ProductsShowcase />

          <ScrollReveal>
            <Services />
          </ScrollReveal>
          
          <Process />

          <ScrollReveal>
            <BrandShowcase />
          </ScrollReveal>
          
          <ScrollReveal>
            <CTA title="Let's build something extraordinary" href="/contact" />
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
