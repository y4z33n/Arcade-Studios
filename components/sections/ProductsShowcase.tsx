"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const PRODUCTS = [
  {
    id: "nexus-ai",
    name: "Nexus AI",
    description: "Enterprise AI integration platform. Automate your workflows and unlock data-driven insights with our proprietary LLM orchestration engine.",
    tags: ["AI", "SaaS"],
    features: ["Custom Model Fine-tuning", "Secure Data Pipelines", "API First"],
    color: "from-blue-600 to-indigo-900",
    top: "top-32"
  },
  {
    id: "leylak-cms",
    name: "Leylak CMS",
    description: "An ultra-fast, entirely custom headless content management system built for marketing teams who demand absolute freedom.",
    tags: ["CMS", "Headless"],
    features: ["Real-time Collaboration", "Global Edge CDN", "Visual Builder"],
    color: "from-emerald-500 to-teal-900",
    top: "top-40"
  },
  {
    id: "vortex-commerce",
    name: "Vortex Engine",
    description: "High-conversion e-commerce engine packed into one powerful, ultra-fast core.",
    tags: ["E-commerce", "Retail"],
    features: ["Sub-second Loads", "Advanced Analytics", "Omnichannel"],
    color: "from-orange-500 to-red-900",
    top: "top-48"
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
              Proprietary tools and engines designed to accelerate your growth.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link href="/products" className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-colors group">
              Explore All
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Sticky Stacking Cards */}
        <div className="relative pb-32">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`sticky ${product.top} w-full shadow-2xl shadow-black max-w-5xl mx-auto rounded-[2rem] overflow-hidden p-[1px] mb-24`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-40`} />
              
              <div className="relative bg-black/80 backdrop-blur-2xl h-[400px] md:h-[450px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-8 lg:gap-16 border border-white/10 rounded-[31px]">
                
                {/* Left Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/70 uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6">
                    {product.name}
                  </h3>
                  
                  <p className="text-lg lg:text-xl text-white/70 font-light leading-relaxed max-w-md">
                    {product.description}
                  </p>
                </div>

                {/* Right Content / Features */}
                <div className="w-full md:w-1/3 flex flex-col justify-between">
                  <ul className="space-y-4 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/80">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red-500 shrink-0 mt-0.5">
                          <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-base font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact" className="inline-flex items-center justify-between w-full gap-4 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 px-6 py-4 rounded-full font-bold transition-all group/btn">
                    <span>Get Access</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover/btn:translate-x-1 transition-transform">
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
