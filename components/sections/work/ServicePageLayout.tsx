"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ServiceCategory } from "@/types";
import CTA from "@/components/sections/CTA";

interface ServicePageLayoutProps {
  service: ServiceCategory;
}

// Different layout designs based on service type
export default function ServicePageLayout({ service }: ServicePageLayoutProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Choose layout based on service ID
  switch (service.id) {
    case "web-development":
      return <WebDevelopmentLayout service={service} />;
    case "mobile-apps":
      return <MobileAppsLayout service={service} />;
    case "digital-marketing":
      return <DigitalMarketingLayout service={service} />;
    case "branding":
      return <BrandingLayout service={service} />;
    case "ecommerce":
      return <EcommerceLayout service={service} />;
    default:
      return <DefaultLayout service={service} />;
  }
}

// Web Development - Grid Layout
function WebDevelopmentLayout({ service }: ServicePageLayoutProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div className="relative min-h-screen pt-20">
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          {/* Hero Section */}
          <div className="mb-20 md:mb-28">
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
              {service.icon} {service.title}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
            >
              Building the
              <br />
              Modern Web
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-3xl"
            >
              {service.description}. From responsive websites to complex web applications, we build digital experiences that perform.
            </motion.p>
          </div>

          {/* Projects Grid - Masonry Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {service.works.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                className={`group ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl h-full">
                  {/* Image */}
                  <div className={`relative overflow-hidden ${index === 0 ? "h-[500px] md:h-[600px]" : "h-[350px]"}`}>
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    
                    {/* Year Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-black">
                        {work.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-2 block">
                      {work.client}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                      {work.title}
                    </h3>
                    <p className="text-white/70 text-base leading-relaxed mb-4">
                      {work.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {work.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs text-white/60 border border-white/20 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTA title="Ready to build your web project?" href="/contact" />
    </div>
  );
}

// Mobile Apps - Card Carousel Layout
function MobileAppsLayout({ service }: ServicePageLayoutProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div className="relative min-h-screen pt-20">
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          {/* Hero Section */}
          <div className="mb-20 md:mb-28">
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
              {service.icon} {service.title}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
            >
              Mobile First
              <br />
              Always
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-3xl"
            >
              {service.description}. We create seamless mobile experiences that users love.
            </motion.p>
          </div>

          {/* Projects - Horizontal Scroll Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {service.works.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/20">
                  {/* Image */}
                  <div className="relative h-[400px] overflow-hidden">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
                        {work.client}
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/60">
                        {work.year}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                      {work.title}
                    </h3>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                      {work.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs text-white/60 border border-white/20 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTA title="Let's build your mobile app" href="/contact" />
    </div>
  );
}

// Digital Marketing - Stats Focused Layout
function DigitalMarketingLayout({ service }: ServicePageLayoutProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div className="relative min-h-screen pt-20">
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          {/* Hero Section */}
          <div className="mb-20 md:mb-28">
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
              {service.icon} {service.title}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
            >
              Growth Through
              <br />
              Data
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-3xl"
            >
              {service.description}. We turn insights into action and action into results.
            </motion.p>
          </div>

          {/* Projects - Full Width Cards with Stats */}
          <div className="space-y-12 md:space-y-16">
            {service.works.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ delay: 0.4 + index * 0.15, duration: 0.8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/8 hover:border-white/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-[350px] lg:h-[450px] overflow-hidden">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
                          {work.client}
                        </span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/60">
                          {work.year}
                        </span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        {work.title}
                      </h3>
                      <p className="text-white/70 text-lg leading-relaxed mb-6">
                        {work.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {work.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 text-sm text-white/60 bg-white/5 border border-white/10 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTA title="Let's grow your business" href="/contact" />
    </div>
  );
}

// Branding - Portfolio Style Layout
function BrandingLayout({ service }: ServicePageLayoutProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div className="relative min-h-screen pt-20">
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          {/* Hero Section */}
          <div className="mb-20 md:mb-28">
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
              {service.icon} {service.title}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
            >
              Brands That
              <br />
              Resonate
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-3xl"
            >
              {service.description}. We create identities that tell stories and build connections.
            </motion.p>
          </div>

          {/* Projects - Alternating Layout */}
          <div className="space-y-20 md:space-y-28">
            {service.works.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                className="group"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${index % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  {/* Image */}
                  <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-3xl">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-red-600 rounded-full text-sm text-white font-medium">
                          {work.year}
                        </span>
                        <span className="text-white/60 text-sm uppercase tracking-wider">
                          {work.client}
                        </span>
                      </div>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                        {work.title}
                      </h3>
                      <p className="text-white/70 text-lg leading-relaxed">
                        {work.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {work.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 text-sm text-white/80 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTA title="Let's craft your brand" href="/contact" />
    </div>
  );
}

// E-commerce - Product Grid Layout
function EcommerceLayout({ service }: ServicePageLayoutProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div className="relative min-h-screen pt-20">
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          {/* Hero Section */}
          <div className="mb-20 md:mb-28">
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
              {service.icon} {service.title}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
            >
              Sell More
              <br />
              Online
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-3xl"
            >
              {service.description}. We build online stores that convert browsers into buyers.
            </motion.p>
          </div>

          {/* Projects - Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {service.works.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/10">
                  {/* Image */}
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 bg-red-600 rounded-full text-xs font-medium text-white">
                        {work.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <span className="text-red-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
                      {work.client}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                      {work.title}
                    </h3>
                    <p className="text-white/70 text-base leading-relaxed mb-4">
                      {work.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {work.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs text-white/60 border border-white/20 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTA title="Launch your online store" href="/contact" />
    </div>
  );
}

// Default Layout (fallback)
function DefaultLayout({ service }: ServicePageLayoutProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div className="relative min-h-screen pt-20">
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <div className="mb-20">
            <Link
              href="/work"
              className="inline-flex items-center text-white/60 hover:text-white transition-colors duration-300 mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Services
            </Link>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-white/70 max-w-3xl">
              {service.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.works.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">{work.title}</h3>
                  <p className="text-white/70 mb-4">{work.description}</p>
                  <span className="text-sm text-white/50">{work.client} • {work.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTA title="Let's work together" href="/contact" />
    </div>
  );
}
