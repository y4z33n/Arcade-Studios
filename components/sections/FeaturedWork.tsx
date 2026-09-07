"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Sparkles
} from "lucide-react";

const PROJECTS = [
  {
    id: "model-management",
    title: "Model Management",
    subtitle: "dot Mu",
    category: "Talent & Casting Platform",
    client: "ModelManagement.mu",
    description: "Regional gateway into the global ModelManagement network, connecting models with agencies, photographers, and high-fashion brands worldwide.",
    tags: ["Next.js", "React", "TypeScript", "Firebase", "Casting Engine"],
    image: "/pro/model.jpg",
    link: "https://modelmanagement.mu",
    accent: "from-red-600/20 via-orange-600/10 to-transparent",
    color: "#ff2a2a",
    year: "2024"
  },
  {
    id: "flash-communications",
    title: "Flash Communications",
    subtitle: "Creative Agency",
    category: "Digital Agency & OOH Studio",
    client: "theflashgroups.com",
    description: "Modern interactive web presence for an integrated communications agency in Mauritius showcasing 360-degree campaigns, video, and outdoor activations.",
    tags: ["Digital Campaigns", "OOH Network", "Video Production", "CMS"],
    image: "/pro/flash.jpg",
    link: "https://theflashgroups.com",
    accent: "from-orange-600/20 via-amber-600/10 to-transparent",
    color: "#ff6a00",
    year: "2024"
  },
  {
    id: "super-distribution",
    title: "Super Distribution",
    subtitle: "B2B Hardware",
    category: "B2B E-Commerce & Ordering",
    client: "superdistribution.mu",
    description: "Enterprise B2B ordering and catalog platform for a premier IT hardware distributor, featuring tiered pricing and seamless inventory repeats.",
    tags: ["WooCommerce", "B2B Architecture", "Custom Checkout", "Logistics"],
    image: "/pro/sd.jpg",
    link: "https://superdistribution.mu",
    accent: "from-cyan-600/20 via-blue-600/10 to-transparent",
    color: "#00d4ff",
    year: "2024"
  },
  {
    id: "my-experience-shop",
    title: "My Experience Shop",
    subtitle: "Beauty & Cosmetics",
    category: "Cosmetics E-Commerce",
    client: "myexperienceshop.com",
    description: "High-conversion luxury storefront for professional cosmetics, featuring cruelty-free beauty collections and multi-gateway checkout.",
    tags: ["Shopify", "Custom UX", "Payment Gateways", "Conversion"],
    image: "/pro/mes.jpg",
    link: "https://myexperienceshop.com",
    accent: "from-purple-600/20 via-pink-600/10 to-transparent",
    color: "#bf00ff",
    year: "2024"
  },
  {
    id: "shield-fire-safety",
    title: "Shield Fire & Safety",
    subtitle: "Equipments & Services",
    category: "Safety & Industrial Equipment",
    client: "shieldfireprotection.info",
    description: "Certified fire protection equipment and industrial safety supplier in Mauritius since 2004, providing certified equipment, hardware, and island-wide maintenance services.",
    tags: ["Safety Systems", "Fire Protection", "Industrial Hardware", "Maintenance"],
    image: "/Clients/shield.jpg",
    link: "https://www.shieldfireprotection.info/",
    accent: "from-red-600/20 via-orange-600/10 to-transparent",
    color: "#ff2a2a",
    year: "2024"
  },
  {
    id: "trait-dunion",
    title: "Trait d'Union Ltée",
    subtitle: "OOH Advertising",
    category: "Nationwide Media Network",
    client: "tdultee.com",
    description: "Corporate digital showcase for Mauritius' premier outdoor advertising powerhouse, presenting island-wide billboards and transit media.",
    tags: ["Billboard Network", "Media Buying", "Supermarket Media", "Responsive"],
    image: "/pro/tdu.jpg",
    link: "https://tdultee.com",
    accent: "from-red-600/20 via-rose-600/10 to-transparent",
    color: "#ff1744",
    year: "2023"
  }
];

const SLIDE_DURATION = 6000; // 6s per slide

export default function FeaturedWork() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = PROJECTS.length;
  const currentProject = PROJECTS[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Ultra-lightweight auto-advance timer: fires only once per slide (0 background re-renders)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex, total]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-36 bg-black text-white border-t border-white/10"
      style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
    >
      {/* Dynamic Ambient Background Glow (Hardware accelerated) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[400px] blur-[100px] rounded-full pointer-events-none transition-colors duration-700 opacity-20 transform-gpu"
        style={{
          background: `radial-gradient(circle, ${currentProject.color} 0%, rgba(220,38,38,0.15) 60%, transparent 80%)`
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.04),transparent)] pointer-events-none" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-widest font-semibold shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                <Sparkles className="w-3 h-3" />
                Featured Portfolio
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-white">Works</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            {/* Minimalist Segmented Indicator Pills with Pure CSS Progress */}
            <div className="flex items-center gap-2">
              {PROJECTS.map((proj, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={proj.id}
                    onClick={() => handleSelect(idx)}
                    aria-label={`Go to slide ${proj.title}`}
                    className="py-2 cursor-pointer focus:outline-none group"
                  >
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                        isActive 
                          ? "w-8 bg-white/20" 
                          : "w-2 bg-white/10 hover:bg-white/30"
                      }`}
                    >
                      {isActive && (
                        <div 
                          key={currentIndex}
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-progress"
                          style={{
                            animationDuration: `${SLIDE_DURATION}ms`,
                            animationTimingFunction: "linear",
                            animationFillMode: "forwards"
                          }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-red-500/50 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 group active:scale-95 transform-gpu"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-red-500/50 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 group active:scale-95 transform-gpu"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Slider Display */}
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] bg-[#0c0c0e] border border-white/10 overflow-hidden shadow-2xl transform-gpu">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 md:p-12 lg:p-14 items-center relative z-10">
            
            {/* Left: Project Information */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-6 will-change-transform"
                >
                  {/* Category Badge & Year */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30">
                      {currentProject.category}
                    </span>
                    <span className="text-xs font-mono text-white/50">
                      {currentProject.year}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tighter uppercase leading-[1.05]">
                      {currentProject.title}
                    </h3>
                    <p className="text-lg font-medium text-white/60 mt-1">
                      {currentProject.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {currentProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 text-xs text-white/80 bg-white/5 border border-white/10 rounded-full font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 flex items-center gap-4">
                    <a
                      href={currentProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-red-600 hover:text-white font-bold rounded-full transition-all duration-200 text-sm tracking-wide shadow-lg group/btn active:scale-95 transform-gpu"
                    >
                      <span>Visit Live Platform</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                    </a>

                    <Link
                      href="/work"
                      className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold transition-colors duration-200 px-4 py-2"
                    >
                      <span>View All Work</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Immersive Project Visual */}
            <div className="lg:col-span-7 relative">
              <div className="relative h-[360px] sm:h-[440px] md:h-[500px] lg:h-[520px] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group/card transform-gpu">
                
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentProject.id}
                    custom={direction}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 will-change-transform"
                  >
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />

                    {/* Gradient Overlay Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />

                    {/* Client URL Floating Pill */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
                      <a
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono transition-all duration-200 hover:border-red-500"
                      >
                        <span>{currentProject.client}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                      </a>
                    </div>

                    {/* Bottom Floating Title Bar */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
                      <div className="backdrop-blur-md bg-black/60 px-4 py-2 rounded-2xl border border-white/10">
                        <span className="text-xs font-mono text-white/50 block">PROJECT</span>
                        <span className="text-sm font-bold text-white uppercase tracking-wider">
                          {currentProject.title}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 backdrop-blur-md bg-black/60 px-4 py-2 rounded-2xl border border-white/10 font-mono text-xs text-white/60">
                        <span>EST. {currentProject.year}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
