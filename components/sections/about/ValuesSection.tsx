"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VALUES = [
  {
    number: "01",
    title: "Excellence",
    description:
      "We strive for excellence in every line of code, every design decision, and every interaction. Quality is never compromised.",
  },
  {
    number: "02",
    title: "Innovation",
    description:
      "We stay at the forefront of web technologies, constantly exploring new tools and methodologies to deliver cutting-edge solutions.",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "We work closely with our clients as partners, ensuring transparency, communication, and alignment throughout the entire process.",
  },
  {
    number: "04",
    title: "Impact",
    description:
      "We focus on building solutions that create real value—for users, for businesses, and for the communities we serve.",
  },
];

export default function ValuesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="relative z-10 w-full mx-auto px-6 lg:px-12 3xl:px-24">
        {/* Glass Container */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 3xl:p-16 border border-white/10">
          {/* Section Header */}
          <div className="mb-16 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-6"
            >
              Our Values
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[10rem] font-bold text-white leading-[0.95] tracking-tighter mb-8"
            >
              What drives us
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl 3xl:text-2xl text-white/70 max-w-3xl"
            >
              The principles that guide our work and shape our culture
            </motion.p>
          </div>

          {/* Values List - Similar to Services */}
          <div className="space-y-0">
            {VALUES.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative border-t border-white/10 hover:border-white/30 transition-all duration-500"
              >
                {/* Hover background effect - White highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative py-10 md:py-12 3xl:py-16">
                  {/* Number and Title */}
                  <div className="flex items-start gap-6 md:gap-8 3xl:gap-12 mb-4 md:mb-6">
                    <span className="text-5xl md:text-6xl 3xl:text-7xl font-bold text-white/20 group-hover:text-red-400/40 transition-colors duration-500 flex-shrink-0">
                      {value.number}
                    </span>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-bold text-white tracking-tight group-hover:translate-x-4 transition-transform duration-500 pt-2">
                      {value.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="pl-0 md:pl-[calc(4rem+2rem)] 3xl:pl-[calc(5rem+3rem)]">
                    <p className="text-base md:text-lg 3xl:text-xl text-white/70 leading-relaxed max-w-3xl">
                      {value.description}
                    </p>
                  </div>

                  {/* Arrow icon */}
                  <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500">
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 3xl:w-12 3xl:h-12 text-white"
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
                </div>
              </motion.div>
            ))}

            {/* Bottom border */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 + VALUES.length * 0.1, duration: 0.6 }}
              className="border-t border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
