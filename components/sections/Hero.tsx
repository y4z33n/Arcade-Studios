"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-30 pb-16"
    >
      <motion.div
        style={{ y }}
        className="relative z-10 w-full mx-auto px-6 lg:px-12 3xl:px-24"
      >
        <div className="space-y-16">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative max-w-6xl 3xl:max-w-7xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 3xl:text-9xl font-bold text-white leading-[1.05] tracking-tight text-left drop-shadow-2xl">
              Development Agency for <span className="text-red-400">Modern</span> Applications
            </h1>
          </motion.div>

          {/* Video Section with Subtext */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Empty space on left for alignment */}
            <div className="hidden lg:block lg:col-span-5"></div>
            
            {/* Right: Subtext above video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-7 space-y-6"
            >
              <p className="text-lg md:text-xl lg:text-2xl 3xl:text-3xl text-white/80 leading-relaxed">
                Web development agency building modern applications
                that drive real business results and transform ideas into exceptional digital experiences.
              </p>
            </motion.div>
          </div>

          {/* Video - Full Width Below */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-elegant-xl"
          >
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop&q=80"
              alt="Video showcase"
              fill
              className="object-cover"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-500" />

            {/* Play button */}
            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 md:w-24 md:h-24 3xl:w-28 3xl:h-28 bg-white rounded-full flex items-center justify-center shadow-elegant-xl hover:scale-110 transition-transform duration-300">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="text-red-600 ml-1"
              >
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
