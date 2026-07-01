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

        {/* Compact Grid Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-colors duration-500 flex flex-col h-full"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${service.color}`} />
              
              <div className="p-8 flex flex-col h-full relative z-10">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase mb-4 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-sm text-white/60 font-light leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                <Link href={service.link} className="inline-flex items-center justify-between w-full text-white/50 group-hover:text-white transition-colors font-semibold uppercase text-xs tracking-widest mt-auto">
                  <span>Explore</span>
                  <div className={`w-8 h-8 rounded-full border border-white/20 group-hover:border-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
