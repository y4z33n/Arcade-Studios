"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Aurora from "@/components/Aurora";

interface ProductHeroProps {
  onOpenPilotModal: (product?: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "All 4 Systems" },
  { id: "voice", label: "Voice AI & Receptionist" },
  { id: "gym", label: "Gym Apps & IoT Gates" },
  { id: "hospital", label: "Hospital Queuing" },
  { id: "fuel", label: "Fuel Telemetry & Ledger" },
];

export default function ProductHero({
  onOpenPilotModal,
  selectedCategory,
  onSelectCategory,
}: ProductHeroProps) {
  const scrollToProducts = () => {
    const el = document.getElementById("products-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 md:pt-44 pb-16 overflow-hidden">
      {/* Ambient Aurora Effect */}
      <div className="absolute top-0 left-0 w-full h-[100vh] opacity-35 pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,white_20%,transparent)]">
        <Aurora colorStops={["#DC2626", "#ea580c", "#7c2d12"]} amplitude={1.2} />
      </div>

      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
        
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-[0_0_25px_rgba(220,38,38,0.4)]">
            <Sparkles className="w-3.5 h-3.5" />
            Proprietary Software Suite
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            4 Engines in Active Development
          </span>
        </motion.div>

        {/* Master Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl 3xl:text-[10rem] font-black text-white leading-[0.92] tracking-tighter uppercase mb-8"
        >
          Digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-white">
            Products
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl 3xl:text-2xl text-white/70 max-w-3xl font-light leading-relaxed mb-10"
        >
          Purpose-built vertical software systems and autonomous AI engines engineered to automate mission-critical workflows across telephony, fitness facilities, clinical healthcare, and energy retail.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <button
            onClick={scrollToProducts}
            className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all active:scale-95 flex items-center gap-2 group"
          >
            <span>Explore Software Engines</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onOpenPilotModal()}
            className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm tracking-wide backdrop-blur-md transition-all active:scale-95 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>Request Early Access Pilot</span>
          </button>
        </motion.div>

        {/* Category Filters */}
        <div id="products-grid" className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-white text-black font-bold shadow-lg scale-105"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
