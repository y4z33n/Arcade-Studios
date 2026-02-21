"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export default function SEOGraphicsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const seoServices = [
    {
      title: "Keyword Research & Strategy",
      description: "Comprehensive keyword analysis to identify high-value search terms and optimize your content for maximum visibility."
    },
    {
      title: "On-Page Optimization",
      description: "Optimize meta tags, headers, content structure, and internal linking to improve search engine rankings."
    },
    {
      title: "Link Building",
      description: "Build high-quality backlinks to increase domain authority and drive organic traffic to your site."
    },
    {
      title: "Analytics & Reporting",
      description: "Track performance, monitor rankings, and provide detailed reports on SEO progress and ROI."
    },
    {
      title: "Local & International SEO",
      description: "Optimize for local searches and expand your reach globally with multilingual and geo-targeted strategies."
    },
    {
      title: "Technical SEO",
      description: "Improve site speed, mobile responsiveness, crawlability, and fix technical issues that affect rankings."
    }
  ];

  const graphicsServices = [
    {
      title: "Brand Identity Design",
      description: "Create cohesive brand identities including logos, color palettes, typography, and brand guidelines."
    },
    {
      title: "Packaging Design",
      description: "Eye-catching product packaging that stands out on shelves and communicates your brand values."
    },
    {
      title: "Marketing Collateral",
      description: "Brochures, flyers, business cards, posters, and other print materials that make an impact."
    },
    {
      title: "Digital Graphics",
      description: "Social media graphics, web banners, email templates, and digital ads optimized for engagement."
    },
    {
      title: "Product Photography & Editing",
      description: "Professional product photography and post-production editing for e-commerce and marketing."
    },
    {
      title: "Illustration & Iconography",
      description: "Custom illustrations, icons, and visual elements that bring your brand to life."
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
            SEO & Graphics Design
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Grow Your
            <br />
            Digital Presence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-12"
          >
            We combine powerful SEO strategies with stunning graphic design to elevate your brand, 
            drive organic traffic, and create visual experiences that convert visitors into customers.
          </motion.p>
        </div>
      </section>

      {/* SEO Services Section */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-black/60 to-black/80">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            SEO Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-lg text-white/70 max-w-3xl mb-12"
          >
            Boost your search rankings and drive organic traffic with our comprehensive SEO strategies. 
            We help you dominate search results and reach your target audience.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seoServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-red-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:scale-[1.02]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-500"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center group-hover:bg-red-600 transition-all duration-300">
                      <svg className="w-4 h-4 text-red-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-white/70 text-base leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Graphics Design Services Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            Graphics Design Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-lg text-white/70 max-w-3xl mb-12"
          >
            Create stunning visual experiences that capture attention and communicate your brand message. 
            From digital to print, we design graphics that make an impact.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {graphicsServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:to-transparent transition-all duration-500"></div>
                <div className="relative">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-600/20 group-hover:bg-red-600 transition-all duration-300">
                    <div className="w-6 h-6 rounded-md bg-red-500 group-hover:bg-white transition-all duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-black/40 to-black/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4 text-center">
              Why Choose Us
            </h2>
            <p className="text-lg text-white/60 text-center mb-12 max-w-2xl mx-auto">
              We combine data-driven strategies with creative excellence to deliver results that matter.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Data-Driven SEO",
                  description: "We use advanced analytics and proven strategies to boost your search rankings and drive qualified traffic to your site.",
                  number: "01"
                },
                {
                  title: "Creative Excellence",
                  description: "Our design team creates visually stunning graphics that capture your brand essence and resonate with your audience.",
                  number: "02"
                },
                {
                  title: "E-commerce Expertise",
                  description: "We specialize in optimizing online stores for conversions, from product photography to SEO-friendly content.",
                  number: "03"
                },
                {
                  title: "Full-Service Solution",
                  description: "From branding and design to SEO and digital marketing, we offer comprehensive services to grow your business.",
                  number: "04"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ delay: 1.7 + index * 0.1, duration: 0.6 }}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-red-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]"
                >
                  <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 group-hover:text-red-500/10 transition-all duration-500">
                    {item.number}
                  </div>
                  <div className="relative">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTA title="Ready to boost your online presence?" href="/contact" />
    </div>
  );
}