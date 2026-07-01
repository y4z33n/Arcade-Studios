"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const PRODUCTS = [
  {
    id: "ai-call-assistant",
    name: "AI Call Assistant",
    description: "An intelligent, voice-activated AI assistant designed to handle inbound and outbound calls. It uses advanced natural language processing to converse naturally, answer queries, schedule appointments, and route complex issues to human agents.",
    features: ["Natural Voice Synthesis", "Real-time Processing", "CRM Integration", "Multi-language Support"],
    icon: "🎙️",
    color: "from-blue-600/20 to-indigo-900/20"
  },
  {
    id: "ai-queuing-system",
    name: "AI Queuing System",
    description: "A smart queuing and resource allocation system that uses machine learning to predict wait times, optimize routing, and manage customer flow efficiently. Perfect for high-volume customer service operations.",
    features: ["Predictive Analytics", "Dynamic Routing", "Automated Triage", "Real-time Dashboards"],
    icon: "⏱️",
    color: "from-emerald-500/20 to-teal-900/20"
  }
];

export default function ProductsShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-black text-white"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6"
            >
              Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Products</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-white/60 font-light max-w-xl"
            >
              Proprietary AI tools and engines designed to accelerate your operations and scale your growth.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link href="/products" className="inline-flex items-center gap-4 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 px-8 py-4 rounded-full font-bold transition-colors group">
              View Roadmap
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Lighter Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 h-full flex flex-col transition-transform duration-500 group-hover:-translate-y-2">
                
                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {product.icon}
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                  {product.name}
                </h3>
                
                <p className="text-white/60 font-light leading-relaxed mb-8 flex-grow">
                  {product.description}
                </p>

                <div className="mt-auto">
                  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Key Features</h4>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-red-500 shrink-0 mt-0.5">
                          <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact" className="inline-flex items-center gap-3 text-red-500 font-bold hover:text-white transition-colors group/link">
                    Get Early Access
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover/link:translate-x-1 transition-transform">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
