"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowUpRight, 
  ChevronRight,
  Mic,
  Dumbbell,
  HeartPulse,
  Fuel,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface Product {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  icon: any;
  color: string;
  glowColor: string;
  tags: string[];
  link: string;
}

const PRODUCTS: Product[] = [
  {
    id: "leysupport",
    num: "01",
    name: "LeySupport",
    subtitle: "Voice AI Assistant",
    category: "Customer Support & Booking",
    description: "An intelligent voice assistant that answers phone calls, resolves customer inquiries, and books appointments 24/7 with zero hold times.",
    icon: Mic,
    color: "#ff2a2a",
    glowColor: "rgba(255, 42, 42, 0.25)",
    tags: ["24/7 Receptionist", "Calendar Booking", "Zero Hold Time"],
    link: "/products#leysupport"
  },
  {
    id: "gymley",
    num: "02",
    name: "GymLey",
    subtitle: "Gym OS",
    category: "Fitness & Access Control",
    description: "All-in-one software for gym owners, complete with dedicated member mobile apps, automated turnstile access, and recurring billing.",
    icon: Dumbbell,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.25)",
    tags: ["Member Mobile App", "Turnstile Check-In", "Auto-Billing"],
    link: "/products#gymley"
  },
  {
    id: "medley",
    num: "03",
    name: "MedLey",
    subtitle: "Clinic Queues",
    category: "Healthcare & Patient Flow",
    description: "A smart queue and booking platform for clinics and hospitals that eliminates waiting room congestion and sends live WhatsApp updates.",
    icon: HeartPulse,
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.25)",
    tags: ["WhatsApp Virtual Passes", "Smart Triage", "-85% Wait Time"],
    link: "/products#medley"
  },
  {
    id: "fueley",
    num: "04",
    name: "FuelEy",
    subtitle: "Station Software",
    category: "Petrol Stations & Inventory",
    description: "Daily accounting and stock tracking software for petrol stations to easily record pump meter sales and underground tank levels in one click.",
    icon: Fuel,
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.25)",
    tags: ["Pump Meter Sales", "Tank Level Sync", "1-Click Balancing"],
    link: "/products#fueley"
  }
];

export default function ProductsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const activeProduct = hoveredIndex !== null ? PRODUCTS[hoveredIndex] : PRODUCTS[0];

  // Mouse position tracking for floating magnetic preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-16 sm:py-28 md:py-40 bg-black text-white border-t border-white/10 overflow-hidden select-none"
    >
      {/* Dynamic Ambient Background Aura */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[180px] pointer-events-none transition-all duration-700 opacity-20 transform-gpu"
        style={{ background: activeProduct.color }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.03),transparent)] pointer-events-none" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24 z-10">
        
        {/* Section Header with Awwwards Editorial Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 md:mb-24 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-mono uppercase tracking-widest font-semibold">
                <Sparkles className="w-3 h-3" />
                Products &amp; Labs
              </span>
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white/40">
                [ 04 In Development ]
              </span>
            </div>

            <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-white">Products</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2.5 sm:gap-3 shrink-0">
            <p className="text-xs sm:text-base text-white/50 font-light max-w-sm text-left md:text-right">
              Software solutions crafted in-house to solve everyday industry bottlenecks.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase font-mono tracking-widest text-white/70 hover:text-white transition-colors group"
            >
              <span>View Product Archive</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Awwwards Kinetic Editorial List */}
        <div className="relative divide-y divide-white/10 border-y border-white/10">
          {PRODUCTS.map((prod, index) => {
            const isHovered = hoveredIndex === index;
            const Icon = prod.icon;

            return (
              <Link
                key={prod.id}
                href={prod.link}
                onMouseEnter={() => setHoveredIndex(index)}
                className="group relative block py-6 sm:py-14 md:py-16 transition-all duration-300 -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-hidden"
              >
                {/* Background Hover Flash */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: `linear-gradient(90deg, ${prod.glowColor} 0%, transparent 80%)`
                  }}
                />

                <div className="relative z-10 flex items-center justify-between gap-4">
                  
                  {/* Left: Index & Giant Typographic Title */}
                  <div className="flex items-baseline gap-3 sm:gap-6 md:gap-10 min-w-0">
                    <span className="text-xs sm:text-sm font-mono text-white/40 group-hover:text-white transition-colors font-semibold shrink-0">
                      {prod.num}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap sm:flex-nowrap">
                        <h3 className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase transition-all duration-300 truncate ${
                          isHovered 
                            ? "text-white sm:translate-x-2" 
                            : "text-white/80 sm:text-white/40 group-hover:text-white"
                        }`}>
                          {prod.name}
                        </h3>
                        
                        <div 
                          className={`w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                            isHovered 
                              ? "opacity-100 scale-100 bg-white/10 border border-white/20" 
                              : "opacity-80 sm:opacity-0 scale-90 sm:scale-75 bg-white/5 sm:bg-transparent"
                          }`}
                          style={{ color: prod.color }}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-3">
                        <span className="text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-wider text-white/60 truncate">
                          {prod.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-red-400 shrink-0">
                          In Dev
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Description & Action Arrow */}
                  <div className="flex items-center justify-end gap-6 lg:max-w-md shrink-0">
                    <p className="text-sm text-white/50 font-light leading-relaxed hidden lg:block">
                      {prod.description}
                    </p>

                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-300 shrink-0 transform group-hover:scale-110">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
