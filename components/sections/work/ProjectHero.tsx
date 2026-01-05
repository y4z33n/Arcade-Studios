"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ProjectHeroProps {
  title: string;
  client: string;
  year?: string;
  services?: string[];
}

export default function ProjectHero({ 
  title, 
  client, 
  year = "2023",
  services = ["Strategy", "Design", "Development"] 
}: ProjectHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-30 pb-16"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 w-full mx-auto px-6 lg:px-12 3xl:px-24"
      >
        <div className="space-y-12 max-w-6xl 3xl:max-w-7xl">
          {/* Client Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <span className="text-sm md:text-base font-bold tracking-wider text-white uppercase">{client}</span>
            </div>
          </motion.div>

          {/* Project Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 3xl:text-9xl font-bold text-white leading-[1.05] tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Project Meta */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-white/20"
          >
            {/* Year */}
            <div>
              <p className="text-sm text-white/50 uppercase tracking-wider mb-3">Year</p>
              <p className="text-xl md:text-2xl 3xl:text-3xl font-medium text-white">{year}</p>
            </div>

            {/* Services */}
            <div className="md:col-span-2">
              <p className="text-sm text-white/50 uppercase tracking-wider mb-3">Services</p>
              <div className="flex flex-wrap gap-3">
                {services.map((service, index) => (
                  <motion.span
                    key={service}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-sm md:text-base font-medium border border-white/10 hover:border-white/30 hover:bg-white/15 transition-all text-white"
                  >
                    {service}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white/70">
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white/70"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

