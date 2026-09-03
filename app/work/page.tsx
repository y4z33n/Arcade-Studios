"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
// Core Studio Services
const SERVICES = [
  {
    link: "/work/web-dev",
    text: "Web Design & Dev",
    badge: "Web Architecture",
    description: "Ultra-fast, visually stunning websites, high-converting e-commerce storefronts, and full-stack web applications built with modern technologies.",
    tags: ["Next.js", "React", "TypeScript", "E-Commerce", "UI/UX Figma"],
  },
  {
    link: "/work/app-dev",
    text: "App Development",
    badge: "Mobile Engineering",
    description: "Native iOS, Android, and cross-platform mobile applications engineered for high performance, uncompromising responsiveness, and scale.",
    tags: ["iOS & Swift", "Android", "React Native", "Expo", "Real-Time APIs"],
  },
  {
    link: "/work/software-dev",
    text: "Software Development",
    badge: "Custom Software",
    description: "Bespoke enterprise software, scalable cloud architectures, high-throughput microservices, and custom CRM/ERP management systems.",
    tags: ["Custom SaaS", "Cloud Systems", "Backend APIs", "PostgreSQL", "System Design"],
  },
  {
    link: "/products",
    text: "AI & Automation",
    badge: "Intelligent Systems",
    description: "Intelligent voice agents, autonomous queue management, LLM pipelines, and automated workflow orchestrations that eliminate manual bottlenecks.",
    tags: ["Voice AI", "LLM Pipelines", "Workflow Automation", "Autonomous Agents"],
  },
];
import CTA from "@/components/sections/CTA";
import BorderGlow from "@/components/ui/BorderGlow";

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
                We craft digital experiences and software systems that combine strategic thinking with engineering excellence. Explore our core services and see how we bring ideas to life.
              </motion.p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="h-full"
                >
                  <Link href={service.link} className="block h-full group">
                    <BorderGlow
                      edgeSensitivity={60}
                      glowColor="0 100 50"
                      backgroundColor="#050505"
                      borderRadius={24}
                      className="h-full w-full"
                      colors={['#ff1a1a', '#ff4d4d', '#ff0000']}
                      fillOpacity={0.2}
                    >
                      <div className="p-8 md:p-10 h-full flex flex-col justify-between relative z-10 transition-colors duration-500 hover:bg-white/5">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold">
                              {service.badge}
                            </span>
                            <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight group-hover:text-red-400 transition-colors">
                            {service.text}
                          </h2>
                          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                            {service.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs text-white/60 bg-white/5 border border-white/10 rounded-full group-hover:border-white/20 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </BorderGlow>
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
