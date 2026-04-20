"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-12 md:pb-16"
    >
      <motion.div
        style={{ y }}
        className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24"
      >
        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative max-w-6xl 3xl:max-w-7xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 3xl:text-9xl font-bold text-white leading-[1.1] tracking-tight text-left drop-shadow-2xl">
              We build <span className="text-red-500">digital products</span> that move businesses forward
            </h1>
          </motion.div>

          {/* Subtext row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-end">
            {/* Empty space on left for alignment */}
            <div className="hidden lg:block lg:col-span-5"></div>

            {/* Right: Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-7 space-y-4 md:space-y-6"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl 3xl:text-3xl text-white/90 leading-relaxed">
                Web apps, e-commerce, branding, 3D, video production, SEO, and app development. One studio, every discipline, zero compromise.
              </p>
            </motion.div>
          </div>

          {/* Video - Full Width Below */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
          >

            {/* Gallery image instead of video */}
            <img
              src="/pro/bs.jpg"
              alt="Arcade Studio Project Gallery"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectFit: "cover" }}
            />

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
