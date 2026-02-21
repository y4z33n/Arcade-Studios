"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
// Service types from homepage
const SERVICES = [
  {
    link: "/work/web-dev",
    text: "Web Design / Development",
    description: "Custom websites and web applications built with modern technologies",
  },
  {
    link: "/work/app-dev",
    text: "App Design / Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
  },
  {
    link: "/work/video-production",
    text: "Video Production / Editing",
    description: "Professional video production, editing, and motion graphics",
  },
  {
    link: "/work/3d",
    text: "3D Modeling / Animation",
    description: "High-quality 3D modeling, animation, and rendering services",
  },
  {
    link: "/work/ecommerce",
    text: "E-commerce Solutions",
    description: "End-to-end e-commerce platforms that convert visitors into customers",
  },
  {
    link: "/work/seo-graphics",
    text: "SEO & Graphics Design",
    description: "SEO optimization, digital marketing, and stunning graphic design services",
  },
  {
    link: "/work/branding",
    text: "Branding & Identity",
    description: "Comprehensive brand strategies and visual identities that stand out",
  },
];
import CTA from "@/components/sections/CTA";

export default function WorkPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <>
      <div className="relative min-h-screen pt-20">
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

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[10rem] font-bold text-white leading-[0.95] tracking-tighter mb-8"
              >
                What We Do
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg md:text-xl 3xl:text-2xl text-white/70 max-w-3xl"
              >
                We craft digital experiences that combine strategic thinking with beautiful design and robust development. Explore our services and see how we bring ideas to life.
              </motion.p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <Link
                    href={service.link}
                    className="group relative overflow-hidden rounded-2xl p-8 md:p-10 text-left transition-all duration-500 bg-white/5 backdrop-blur-sm border border-white/10 block h-full"
                    style={{ transition: 'background 0.4s, border-color 0.4s' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#ff1a1a';
                      e.currentTarget.style.borderColor = '#ff1a1a';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                      {service.text}
                    </h2>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="opacity-0 transform translate-x-[-20px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
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
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <CTA title="Have a project in mind?" href="/contact" />
      </div>
    </>
  );
}
