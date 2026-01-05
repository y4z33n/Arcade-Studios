"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ProjectInsightsProps {
  insights: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export default function ProjectInsights({ insights, stats }: ProjectInsightsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const defaultStats = [
    { value: "3x", label: "User engagement increase" },
    { value: "50%", label: "Faster load times" },
    { value: "95%", label: "Customer satisfaction" },
  ];

  const displayStats = stats || defaultStats;

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="relative z-10 w-full mx-auto px-6 lg:px-12 3xl:px-24">
        {/* Glass Container */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 3xl:p-16 border border-white/10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-6"
            >
              Key Insights
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl font-bold text-white leading-[1.05] tracking-tight"
            >
              What we learned
            </motion.h2>
          </div>

          {/* Insights Content */}
          <div className="space-y-8 mb-20">
            {insights.map((insight, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="text-xl md:text-2xl 3xl:text-3xl text-white/80 leading-relaxed"
              >
                {insight}
              </motion.p>
            ))}
          </div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-white/20"
          >
            {displayStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="text-center md:text-left group"
              >
                <div className="text-5xl md:text-6xl 3xl:text-7xl font-bold text-red-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-base md:text-lg 3xl:text-xl text-white/70 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

