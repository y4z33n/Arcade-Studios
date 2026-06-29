"use client";

import { useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";

const PRODUCTS = [
  {
    id: "ai-call-assistant",
    title: "AI Call Assistant",
    description: "An intelligent, voice-activated AI assistant designed to handle inbound and outbound calls. It uses advanced natural language processing to converse naturally, answer queries, schedule appointments, and route complex issues to human agents.",
    status: "In Development",
    features: ["Natural Voice Synthesis", "Real-time Processing", "CRM Integration", "Multi-language Support"],
    icon: "🎙️",
  },
  {
    id: "ai-queuing-system",
    title: "AI Queuing System",
    description: "A smart queuing and resource allocation system that uses machine learning to predict wait times, optimize routing, and manage customer flow efficiently. Perfect for high-volume customer service operations.",
    status: "In Development",
    features: ["Predictive Analytics", "Dynamic Routing", "Automated Triage", "Real-time Dashboards"],
    icon: "⏱️",
  }
];

export default function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <main className="bg-[#050505] min-h-screen text-white pt-32 pb-24" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Active Research & Development
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Products in Development</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Beyond our custom software services, we are building proprietary AI tools designed to automate and scale operations.
          </p>
        </motion.div>

        {/* Products List */}
        <div className="space-y-12">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
      </div>
    </main>
  );
}

function ProductCard({ product, index }: { product: any, index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm hover:bg-white/10 transition-colors"
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        
        {/* Icon & Title */}
        <div className="md:w-1/3 shrink-0">
          <div className="text-6xl mb-6">{product.icon}</div>
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider">
            {product.status}
          </div>
        </div>

        {/* Details */}
        <div className="md:w-2/3 space-y-6">
          <p className="text-lg text-white/70 leading-relaxed">
            {product.description}
          </p>
          
          <div>
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Key Features</h3>
            <div className="flex flex-wrap gap-3">
              {product.features.map((feature: string, i: number) => (
                <span 
                  key={i}
                  className="px-4 py-2 rounded-lg bg-black/40 border border-white/5 text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}
