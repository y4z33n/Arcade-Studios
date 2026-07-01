"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Ethos() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to a clip-path or opacity to reveal the text
  const fillProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center bg-black py-24 md:py-32 overflow-hidden"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24">
        
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12"
        >
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium uppercase tracking-widest rounded-full border border-white/20">
            Our Ethos
          </span>
        </motion.div>

        {/* Massive Typography Manifesto */}
        <div ref={textRef} className="relative max-w-7xl">
          <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-white/10">
            We believe in crafting digital experiences that feel human, connect deeply, and leave a lasting impression.
          </p>

          <motion.p
            className="absolute top-0 left-0 text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50"
            style={{
              clipPath: useTransform(fillProgress, (val) => `inset(0 ${100 - val}% 0 0)`),
            }}
          >
            We believe in crafting digital experiences that feel human, connect deeply, and leave a lasting impression.
          </motion.p>
        </div>

        {/* Secondary supportive text */}
        <div className="mt-16 md:mt-24 max-w-3xl ml-auto">
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl lg:text-3xl font-light text-white/70 leading-relaxed"
          >
            In a sea of templates and average execution, we build bespoke platforms designed for speed, scale, and uncompromising aesthetic brilliance.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
