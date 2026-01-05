"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import type { WorkProject } from "@/types";

interface WorkShowcaseProps {
  selectedService: string | null;
}

export default function WorkShowcase({ selectedService }: WorkShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Get all works or filtered works based on selected service
  const works: WorkProject[] = selectedService
    ? SERVICE_CATEGORIES.find((cat) => cat.id === selectedService)?.works || []
    : SERVICE_CATEGORIES.flatMap((cat) => cat.works);

  const selectedCategory = selectedService
    ? SERVICE_CATEGORIES.find((cat) => cat.id === selectedService)
    : null;

  if (works.length === 0) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tighter mb-6"
          >
            {selectedCategory ? selectedCategory.title : "All Projects"}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg md:text-xl text-white/60"
          >
            {works.length} {works.length === 1 ? 'project' : 'projects'}
            {selectedCategory && ` in ${selectedCategory.title.toLowerCase()}`}
          </motion.p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                delay: 0.2 + index * 0.1,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl">
                {/* Image */}
                <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Year Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-black">
                      {work.year}
                    </span>
                  </div>

                  {/* View Arrow */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -45 }}
                    className="absolute top-6 right-6 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Client */}
                  <div className="mb-3">
                    <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
                      {work.client}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
                    {work.title}
                  </h4>

                  {/* Description */}
                  <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                    {work.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs md:text-sm text-white/60 border border-white/20 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
