"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

export default function StorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
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
            Our Story
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[10rem] font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Passion meets expertise
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl 3xl:text-2xl text-white/70 max-w-3xl"
          >
            From a small team of passionate developers to a full-service agency
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          {/* Left: Story Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-6">
              <p className="text-xl md:text-2xl 3xl:text-3xl text-white leading-relaxed font-medium">
                Arcade Studios was founded with a simple mission: to build
                exceptional web applications that drive business growth.
              </p>
              <p className="text-lg md:text-xl 3xl:text-2xl text-white/70 leading-relaxed">
                We started as a small team of passionate developers and designers,
                united by our belief that great code and thoughtful design can
                transform businesses.
              </p>
              <p className="text-lg md:text-xl 3xl:text-2xl text-white/70 leading-relaxed">
                Over the years, we've had the privilege of working with ambitious
                startups, established agencies, and forward-thinking brands across
                various industries. From e-commerce platforms to SaaS applications,
                we've helped our clients bring their digital visions to life.
              </p>
              <p className="text-lg md:text-xl 3xl:text-2xl text-white/70 leading-relaxed">
                We believe in the power of modern web technologies, clean code, and
                meaningful user experiences. Every project is an opportunity to push
                boundaries and create something remarkable that solves real problems.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 md:gap-8 pt-8 border-t border-white/10"
            >
              <div>
                <p className="text-4xl md:text-5xl 3xl:text-6xl font-bold text-red-400 mb-2">50+</p>
                <p className="text-sm md:text-base 3xl:text-lg text-white/60 uppercase tracking-wider">Projects</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl 3xl:text-6xl font-bold text-red-400 mb-2">5+</p>
                <p className="text-sm md:text-base 3xl:text-lg text-white/60 uppercase tracking-wider">Years</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl 3xl:text-6xl font-bold text-red-400 mb-2">100%</p>
                <p className="text-sm md:text-base 3xl:text-lg text-white/60 uppercase tracking-wider">Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Parallax Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-6 relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant-xl"
          >
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=1500&fit=crop&q=80"
                alt="Arcade Studios workspace"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Glassmorphism overlay badge */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-white font-medium text-lg 3xl:text-xl">
                "Every project is a chance to create something extraordinary"
              </p>
              <p className="text-white/60 text-sm 3xl:text-base mt-2">— Arcade Studios Team</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
