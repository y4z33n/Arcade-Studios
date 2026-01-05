import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import BrandShowcase from "@/components/sections/BrandShowcase";
import FeaturedWork from "@/components/sections/FeaturedWork";
import CTA from "@/components/sections/CTA";
import HyperspeedBackground from "@/components/HyperspeedBackground";

export const metadata: Metadata = {
  title: "Arcade Studios | Web Development Agency",
  description:
    "Award-winning web development agency building modern applications, digital products, and innovative solutions. Transforming ideas into exceptional digital experiences.",
  keywords: [
    "web development agency",
    "React development",
    "Next.js development",
    "full-stack development",
    "web applications",
    "digital products",
    "creative agency",
    "award-winning",
  ],
  openGraph: {
    title: "Arcade Studios | Web Development Agency",
    description:
      "Award-winning web development agency transforming ideas into exceptional digital experiences.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Arcade Studios - Web Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcade Studios | Web Development Agency",
    description: "Award-winning web development agency building exceptional digital experiences.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hyperspeed Background - Full Page */}
      <HyperspeedBackground />
      
      <div className="relative min-h-screen">
        <Hero />
        <FeaturedWork />
        <BrandShowcase />
        <Services />
        
        <CTA title="Let's build something extraordinary" href="/contact" />
      </div>
    </>
  );
}
