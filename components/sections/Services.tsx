"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SERVICES = [
  {
    id: "web",
    title: "Web Design & Dev",
    description: "We architect ultra-fast, visually stunning websites that dominate your industry and convert visitors into loyal customers at scale.",
    link: "/work/web-dev",
    color: "bg-blue-600"
  },
  {
    id: "ai",
    title: "AI & Automation",
    description: "Integrate cutting-edge LLMs and custom AI pipelines to automate your operations and unlock unprecedented efficiency.",
    link: "/products",
    color: "bg-emerald-600"
  },
  {
    id: "app",
    title: "App Development",
    description: "Native iOS, Android, and cross-platform applications built for speed, scalability, and an uncompromising user experience.",
    link: "/work",
    color: "bg-purple-600"
  },
  {
    id: "branding",
    title: "Graphics & Branding",
    description: "From striking visual identities to comprehensive brand systems, we forge digital empires that command attention.",
    link: "/work/branding",
    color: "bg-red-600"
  }
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-black text-white border-t border-white/10"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6"
          >
            What <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">We Do</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-white/60 font-light max-w-2xl"
          >
            We don't do average. We offer a relentless, full-spectrum suite of digital services designed for total market dominance.
          </motion.p>
        </div>

        {/* Dynamic Accordion System */}
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          {SERVICES.map((service, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl overflow-hidden border border-white/10 transition-colors duration-500 ${
                  isExpanded ? "bg-white/5" : "bg-black hover:bg-white/[0.02]"
                }`}
              >
                {/* Accordion Header (Clickable) */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-10 text-left focus:outline-none group"
                >
                  <h3 className={`text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase transition-colors duration-300 ${
                    isExpanded ? "text-white" : "text-white/50 group-hover:text-white"
                  }`}>
                    {service.title}
                  </h3>
                  
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                    isExpanded ? "bg-white border-white text-black rotate-45" : "border-white/20 text-white/50 group-hover:border-white/50"
                  }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>

                {/* Expanded Content Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 md:p-10 pt-0 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
                        
                        {/* Text & Link */}
                        <div className="flex-1">
                          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8 max-w-2xl">
                            {service.description}
                          </p>
                          <Link href={service.link} className="inline-flex items-center gap-4 bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-500 transition-colors group">
                            Explore Service
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        </div>
                        
                        {/* Abstract Visual / Color Block */}
                        <div className="w-full lg:w-1/3 h-48 md:h-64 rounded-2xl overflow-hidden relative group shrink-0">
                          <div className={`absolute inset-0 ${service.color} opacity-80 group-hover:scale-110 transition-transform duration-1000 ease-out`} />
                          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                          <div className="absolute inset-0 border border-white/20 rounded-2xl" />
                        </div>
                        
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
