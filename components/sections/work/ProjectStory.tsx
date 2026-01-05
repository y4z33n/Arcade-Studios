"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

interface ProjectStoryProps {
  story: string[];
  images?: {
    hero?: string;
    secondary?: string;
  };
}

export default function ProjectStory({ story, images }: ProjectStoryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  const imageY2 = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const imageScale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
        <div className="max-w-6xl mx-auto">
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
          <div className="space-y-8 mb-20">
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

          {/* Hero Image with Parallax */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-elegant-xl mb-12"
          >
            <motion.div
              style={{ y: imageY1, scale: imageScale1 }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={images?.hero || "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&h=900&fit=crop"}
                alt="Project showcase"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          {/* Two Column Images with Parallax */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant-xl"
            >
              <motion.div
                style={{ y: imageY2, scale: imageScale2 }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={images?.secondary || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop"}
                  alt="Project detail 1"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant-xl"
            >
              <motion.div
                style={{ y: imageY1, scale: imageScale1 }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=1000&fit=crop"
                  alt="Project detail 2"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

