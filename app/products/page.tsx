"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Aurora from "@/components/Aurora";
import { Mic, Network, ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    id: "ai-call-assistant",
    title: "AI Call Assistant",
    description: "An intelligent, voice-activated AI assistant designed to handle inbound and outbound calls. It uses advanced natural language processing to converse naturally, answer queries, schedule appointments, and route complex issues to human agents.",
    status: "In Development",
    features: ["Natural Voice Synthesis", "Real-time Processing", "CRM Integration", "Multi-language Support"],
    icon: Mic,
  },
  {
    id: "ai-queuing-system",
    title: "AI Queuing System",
    description: "A smart queuing and resource allocation system that uses machine learning to predict wait times, optimize routing, and manage customer flow efficiently. Perfect for high-volume customer service operations.",
    status: "In Development",
    features: ["Predictive Analytics", "Dynamic Routing", "Automated Triage", "Real-time Dashboards"],
    icon: Network,
  }
];

export default function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <main className="relative bg-[#050505] min-h-screen text-white pt-32 pb-64 overflow-hidden" ref={containerRef}>
      
      {/* Cinematic Aurora Background */}
      <div className="absolute top-0 left-0 w-full h-[80vh] opacity-40 pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,white_20%,transparent)]">
        <Aurora />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            Active Research & Development
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Products
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed">
            Beyond our bespoke agency services, we are building proprietary AI infrastructure designed to automate and scale modern enterprises.
          </p>
        </motion.div>

        {/* Sticky Scroll Products List */}
        <div className="space-y-12">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
      </div>
    </main>
  );
}

function ProductCard({ product, index }: { product: typeof PRODUCTS[0], index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.95]);

  const Icon = product.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className={`sticky top-32 flex flex-col md:flex-row gap-0 overflow-hidden bg-black/40 border border-white/10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-white/20 group z-${10 - index}`}
    >
      {/* Left Column (Visual/Icon) */}
      <div className="md:w-5/12 bg-gradient-to-br from-white/[0.03] to-transparent p-10 md:p-16 flex flex-col items-start justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
        {/* Glow effect behind icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ec4899]/20 blur-[120px] rounded-full group-hover:bg-[#ec4899]/30 transition-colors duration-700" />
        
        <div className="relative z-10 p-6 rounded-3xl bg-white/5 border border-white/10 text-white shadow-2xl backdrop-blur-md mb-12">
           <Icon size={48} strokeWidth={1.5} />
        </div>
        
        <div className="relative z-10 w-full mt-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">{product.title}</h2>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/20 text-[#ec4899] text-xs font-bold uppercase tracking-[0.2em]">
            {product.status}
          </div>
        </div>
      </div>

      {/* Right Column (Details) */}
      <div className="md:w-7/12 p-10 md:p-16 flex flex-col justify-center">
        <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light mb-12">
          {product.description}
        </p>
        
        <div>
          <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.3em] mb-6">Core Capabilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.features.map((feature, i) => (
              <div 
                key={i}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#ec4899]" />
                <span className="text-sm md:text-base font-medium text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <button className="flex items-center gap-3 text-white font-medium hover:text-[#ec4899] transition-colors group/btn">
            Join Early Access 
            <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
