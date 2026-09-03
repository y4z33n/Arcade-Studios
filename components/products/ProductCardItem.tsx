"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Zap,
  CheckCircle2
} from "lucide-react";
import VoiceCallSimulator from "./VoiceCallSimulator";
import GymManagementSimulator from "./GymManagementSimulator";
import HospitalQueueSimulator from "./HospitalQueueSimulator";
import FuelPumpSimulator from "./FuelPumpSimulator";

export interface ProductData {
  id: string;
  category: "voice" | "gym" | "hospital" | "fuel";
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: any;
  accentColor: string;
  glowColor: string;
  features: string[];
  targetIndustries: string[];
  specs: { label: string; value: string }[];
}

interface ProductCardItemProps {
  product: ProductData;
  index: number;
  onOpenPilotModal: (productId: string) => void;
}

export default function ProductCardItem({ product, index, onOpenPilotModal }: ProductCardItemProps) {
  const [showDemo, setShowDemo] = useState<boolean>(false);
  const Icon = product.icon;

  const renderSimulator = () => {
    switch (product.category) {
      case "voice":
        return <VoiceCallSimulator />;
      case "gym":
        return <GymManagementSimulator />;
      case "hospital":
        return <HospitalQueueSimulator />;
      case "fuel":
        return <FuelPumpSimulator />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative rounded-3xl bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden group shadow-2xl"
    >
      {/* Subtle Glow Overlay on Hover */}
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[140px] opacity-15 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: product.glowColor }}
      />

      <div className="p-8 sm:p-10 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          
          {/* Left / Info Section */}
          <div className="flex-1 space-y-6">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 border border-red-500/30 text-red-400">
                In Active Development
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/70">
                {product.badge}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {product.title}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-red-400/90 font-medium">
                {product.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-3xl">
              {product.description}
            </p>

            {/* Key Features Grid */}
            <div>
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
                Core Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500 shrink-0 mt-0.5">
                      <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Industries */}
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
                Designed For
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.targetIndustries.map((ind, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Action / Specs Column */}
          <div className="lg:w-80 flex flex-col justify-between bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-6 shrink-0">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/40 block mb-3">
                System Highlights
              </span>
              <div className="space-y-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                    <span className="text-white/50">{spec.label}</span>
                    <span className="font-mono font-bold text-white text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => onOpenPilotModal(product.id)}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wide shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
              >
                <span>Request Early Access</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setShowDemo(!showDemo)}
                className={`w-full py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  showDemo 
                    ? "bg-white/15 border-white/30 text-white" 
                    : "bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current text-red-400" />
                <span>{showDemo ? "Hide Interactive Demo" : "Try Interactive Simulator"}</span>
                {showDemo ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
              </button>
            </div>
          </div>

        </div>

        {/* Expandable Live Interactive Simulator */}
        <AnimatePresence>
          {showDemo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-8 pt-8 border-t border-white/10"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Live Interactive Demonstration
                  </span>
                </div>
                <span className="text-xs font-mono text-white/50">
                  Simulated sandbox environment
                </span>
              </div>
              {renderSimulator()}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
