"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    id: 1,
    title: "Model Management dot Mu",
    category: "Web Application",
    image: "/pro/model.jpg",
    color: "bg-blue-100",
    link: "https://modelmanagement.mu"
  },
  {
    id: 2,
    title: "Flash Communications",
    category: "Digital Agency",
    image: "/pro/flash.jpg",
    color: "bg-orange-100",
    link: "https://theflashgroups.com"
  },
  {
    id: 3,
    title: "My Experience Shop",
    category: "E-Commerce",
    image: "/pro/mes.jpg",
    color: "bg-purple-100",
    link: "https://myexperienceshop.com"
  },
  {
    id: 4,
    title: "Breathing Soul",
    category: "E-Commerce",
    image: "/pro/bs.jpg",
    color: "bg-emerald-100",
    link: "https://breathing-soul.com"
  }
];

export default function FeaturedWork() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-black text-white border-t border-white/10"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24 z-10">
        
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-6"
          >
            Selected <span className="text-red-600">Works</span>
          </motion.h2>
        </div>

        {/* Split Screen Layout (Desktop) */}
        <div className="hidden md:flex gap-12 lg:gap-24 min-h-[600px] lg:min-h-[700px]">
          
          {/* Left: Project List */}
          <div className="w-1/2 flex flex-col justify-center">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="py-6 lg:py-8 border-b border-white/10 last:border-0 group cursor-pointer"
              >
                <Link href={project.link} className="flex flex-col">
                  <span className="text-sm text-white/50 mb-2 font-mono tracking-widest uppercase transition-colors group-hover:text-red-500">
                    {project.category}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-4xl lg:text-6xl font-black tracking-tighter uppercase transition-colors duration-300 ${
                      hoveredIndex === idx ? "text-white" : "text-white/30 group-hover:text-white/70"
                    }`}>
                      {project.title}
                    </h3>
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      hoveredIndex === idx ? "bg-white text-black border-white rotate-0" : "border-white/20 text-white/20 -rotate-45"
                    }`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right: Sticky Image Reveal */}
          <div className="w-1/2 relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={PROJECTS[hoveredIndex].image}
                  alt={PROJECTS[hoveredIndex].title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Mobile View (Stack) */}
        <div className="md:hidden flex flex-col gap-12">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col gap-4 group"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs text-red-500 mb-1 block font-mono tracking-widest uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-black tracking-tighter uppercase text-white">
                    {project.title}
                  </h3>
                </div>
                <Link href={project.link} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
