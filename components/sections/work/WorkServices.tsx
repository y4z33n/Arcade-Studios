"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SERVICE_CATEGORIES } from "@/lib/constants";

interface WorkServicesProps {
  onServiceSelect: (serviceId: string | null) => void;
  selectedService: string | null;
}

export default function WorkServices({ onServiceSelect, selectedService }: WorkServicesProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-6"
          >
            Our Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[10rem] font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            What We Create
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl 3xl:text-2xl text-white/70 max-w-3xl"
          >
            Select a service to explore our featured work in that category
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* All Works Card */}
          <motion.button
            onClick={() => onServiceSelect(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-2xl p-8 md:p-10 text-left transition-all duration-500 ${
              selectedService === null
                ? "bg-red-600 shadow-2xl scale-105"
                : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            {/* Content */}
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              All Works
            </h3>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              View all our projects across all categories
            </p>

            {/* Hover Arrow */}
            <div className={`absolute bottom-8 right-8 opacity-0 transform translate-x-[-20px] transition-all duration-500 ${
              selectedService === null ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"
            }`}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </motion.button>

          {/* Service Cards */}
          {SERVICE_CATEGORIES.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => onServiceSelect(service.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + (index + 1) * 0.1, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-2xl p-8 md:p-10 text-left transition-all duration-500 ${
                selectedService === service.id
                  ? "bg-red-600 shadow-2xl scale-105"
                  : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              {/* Content */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Work Count */}
              <div className="text-sm text-white/50 font-medium">
                {service.works.length} {service.works.length === 1 ? 'Project' : 'Projects'}
              </div>

              {/* Hover Arrow */}
              <div className={`absolute bottom-8 right-8 opacity-0 transform translate-x-[-20px] transition-all duration-500 ${
                selectedService === service.id ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"
              }`}>
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
