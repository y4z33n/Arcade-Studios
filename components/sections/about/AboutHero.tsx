"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

const PHOTOS = [
  { src: "/pro/model.jpg", label: "Model Management" },
  { src: "/pro/flash.jpg", label: "Flash Communications" },
  { src: "/pro/tdu.jpg", label: "TD Ultee" },
  { src: "/pro/mes.jpg", label: "My Experience Shop" },
];

export default function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 md:pt-32 pb-16"
    >
      <motion.div style={{ y }} className="relative z-10 w-full mx-auto px-6 lg:px-12 3xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[80vh]">

          {/* LEFT — Text column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-block w-fit px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full"
            >
              About Us
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl 3xl:text-9xl font-bold text-white leading-[1.0] tracking-tight"
            >
              One studio.
              <br />
              <span className="text-red-400">Every discipline.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl 3xl:text-3xl text-white/70 leading-relaxed max-w-2xl"
            >
              Leylak covers the full digital spectrum — web development, e-commerce, branding,
              3D visualisation, video production, app development, and SEO.
              One team. One contact. Zero compromise.
            </motion.p>

            {/* Discipline tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="flex flex-wrap gap-2"
            >
              {["Web Dev", "E-commerce", "Branding", "3D & Animation", "Video Production", "App Dev", "SEO"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm font-medium text-white/80 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="flex gap-10 pt-4 border-t border-white/10"
            >
              {[
                { value: "50+", label: "Projects" },
                { value: "5+", label: "Years" },
                { value: "100%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-bold text-red-400">{stat.value}</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — stacked project images */}
          <div className="lg:col-span-5 relative hidden lg:grid grid-cols-2 gap-3 3xl:gap-4">
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 30 + i * 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 + i * 10 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative overflow-hidden rounded-2xl ${i % 2 === 0 ? "aspect-[4/5]" : "aspect-square mt-6"}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 0px, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs text-white/70 font-medium uppercase tracking-wider">
                  {photo.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/50">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
