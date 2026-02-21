"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export default function BrandingPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const brandingServices = [
    {
      title: "Brand Strategy & Positioning",
      description: "Define your brand's unique value proposition, target audience, and market positioning to stand out in a competitive landscape."
    },
    {
      title: "Logo Design & Visual Identity",
      description: "Create memorable logos and comprehensive visual identity systems including color palettes, typography, and design guidelines."
    },
    {
      title: "Brand Guidelines & Standards",
      description: "Develop detailed brand guidelines to ensure consistency across all touchpoints and communications."
    },
    {
      title: "Brand Naming & Messaging",
      description: "Craft compelling brand names, taglines, and messaging frameworks that resonate with your audience."
    },
    {
      title: "Rebranding & Brand Evolution",
      description: "Refresh and modernize existing brands while maintaining equity and recognition."
    },
    {
      title: "Brand Collateral Design",
      description: "Design business cards, letterheads, presentations, and marketing materials that reflect your brand identity."
    }
  ];

  const brandingProcess = [
    {
      step: "1",
      title: "Discovery & Research",
      description: "We start by understanding your business, competitors, target audience, and market landscape through comprehensive research and stakeholder interviews."
    },
    {
      step: "2",
      title: "Strategy Development",
      description: "Define brand positioning, personality, values, and messaging architecture that differentiates you in the market."
    },
    {
      step: "3",
      title: "Creative Exploration",
      description: "Develop visual concepts, mood boards, and design directions that bring your brand strategy to life."
    },
    {
      step: "4",
      title: "Design & Refinement",
      description: "Create and refine logo designs, color systems, typography, and visual elements based on feedback and testing."
    },
    {
      step: "5",
      title: "Brand Guidelines",
      description: "Document comprehensive brand guidelines covering logo usage, color specifications, typography, imagery, and tone of voice."
    },
    {
      step: "6",
      title: "Launch & Implementation",
      description: "Support the rollout of your new brand across all touchpoints, from digital to print, ensuring consistency and impact."
    }
  ];

  const brandElements = [
    {
      title: "Logo Design",
      description: "Unique, memorable logos that capture your brand essence"
    },
    {
      title: "Color Palette",
      description: "Strategic color systems that evoke the right emotions"
    },
    {
      title: "Typography",
      description: "Custom font selections that enhance brand personality"
    },
    {
      title: "Visual Language",
      description: "Cohesive imagery, patterns, and graphic elements"
    },
    {
      title: "Brand Voice",
      description: "Consistent tone and messaging across all communications"
    },
    {
      title: "Iconography",
      description: "Custom icons and visual symbols for digital and print"
    }
  ];

  return (
    <div className="relative min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link
              href="/work"
              className="inline-flex items-center text-white/60 hover:text-white transition-colors duration-300 mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Services
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-6"
          >
            Branding & Identity
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Build Brands
            <br />
            That Matter
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-12"
          >
            We create powerful brand identities that connect with audiences, tell compelling stories, 
            and build lasting impressions. From strategy to visual design, we bring your brand to life.
          </motion.p>
        </div>
      </section>

      {/* Branding Services Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12"
          >
            Our Branding Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandingServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/60 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Process Section */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-black/60 to-black/80">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12 text-center"
          >
            Our Branding Process
          </motion.h2>
          <ol className="relative border-l-4 border-red-600 ml-4">
            {brandingProcess.map((item, index) => (
              <li key={item.step} className="mb-12 ml-6">
                <span className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-red-600 rounded-full ring-8 ring-black/80 text-white font-bold text-lg">
                  {item.step}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 mt-1">{item.title}</h3>
                <p className="text-white/80 text-lg">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Brand Elements Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12"
          >
            What Makes a Great Brand
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandElements.map((element, index) => (
              <motion.div
                key={element.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{element.title}</h3>
                <p className="text-white/70 leading-relaxed">{element.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12 text-center">
              Why Choose Our Branding Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Strategic Approach</h3>
                <p className="text-white/70 leading-relaxed">We don't just design logos—we build strategic brand foundations that drive business growth.</p>
              </div>
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Creative Excellence</h3>
                <p className="text-white/70 leading-relaxed">Award-winning designers who create visually stunning and memorable brand identities.</p>
              </div>
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Comprehensive Deliverables</h3>
                <p className="text-white/70 leading-relaxed">From brand strategy to detailed guidelines, we provide everything you need for consistent brand execution.</p>
              </div>
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Collaborative Process</h3>
                <p className="text-white/70 leading-relaxed">We work closely with you at every stage, ensuring your vision is brought to life authentically.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTA title="Ready to build your brand?" href="/contact" />
    </div>
  );
}
