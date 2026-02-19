"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ProjectStoryProps {
  story: string[];
}

export default function ProjectStory({ story }: ProjectStoryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-6"
            >
              The Story
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl font-bold text-white leading-[1.05] tracking-tight"
            >
              How we brought this to life
            </motion.h2>
          </div>

          {/* Story Paragraphs */}
          <div className="space-y-8">
            {story.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="text-xl md:text-2xl 3xl:text-3xl text-white/80 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


