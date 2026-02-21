"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export default function EcommercePage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const ecommerceProjects = [
    {
      name: "My Experience Shop",
      url: "https://myexperienceshop.com",
      description: "Online store for professional cosmetics, offering premium makeup and skincare products such as face, lip, eye, palette, and skincare lines. Cruelty-free, vegan-friendly, and dermatologist-tested positioning aimed at both professionals and enthusiasts.",
      category: "Beauty & Cosmetics",
      features: ["Curated Collections", "Best Sellers Showcase", "Customer Support", "Physical Store Integration"],
      location: "Ebene, Mauritius"
    },
    {
      name: "Breathing Soul",
      url: "https://breathing-soul.com",
      description: "Lifestyle clothing brand combining apparel with wellbeing. A world-first concept fusing fashion, function, and feeling for mindful, wellness-inspired living.",
      category: "Fashion & Lifestyle",
      features: ["Multilingual Support", "Wellness-Inspired Design", "Holistic Lifestyle", "Global Reach"],
      location: "International"
    },
    {
      name: "Super Distribution",
      url: "https://superdistribution.mu",
      description: "Producer of branded and eco-friendly high-quality food packaging. Delivering exceptional experiences to both partners and their customers.",
      category: "B2B & Packaging",
      features: ["Eco-Friendly Products", "Custom Branding", "Partner Portal", "Quality Assurance"],
      location: "Mauritius"
    }
  ];

  const ecommerceServices = [
    {
      title: "E-commerce Platform Development",
      description: "Build robust online stores with seamless shopping experiences, payment integration, and inventory management."
    },
    {
      title: "Mobile Commerce",
      description: "Responsive designs and mobile apps that drive sales across all devices."
    },
    {
      title: "Payment Gateway Integration",
      description: "Secure payment processing with support for multiple payment methods and currencies."
    },
    {
      title: "Product Management",
      description: "Intuitive product catalogs, variant management, and inventory tracking systems."
    },
    {
      title: "Shipping & Fulfillment",
      description: "Automated shipping calculations, order tracking, and fulfillment integration."
    },
    {
      title: "Security & Compliance",
      description: "PCI-DSS compliance, SSL certificates, and data protection for customer trust."
    }
  ];

  const platforms = [
    { name: "Shopify" },
    { name: "WooCommerce" },
    { name: "Magento" },
    { name: "Custom Solutions" }
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
            E-commerce Solutions
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            E-commerce
            <br />
            That Converts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-12"
          >
            We build powerful e-commerce platforms that drive sales, enhance customer experience, 
            and scale with your business. From concept to launch and beyond.
          </motion.p>
        </div>
      </section>

      {/* Featured E-commerce Projects Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 mb-16">
            {ecommerceProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-red-500/50 hover:shadow-2xl p-8 md:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 text-xs font-medium uppercase tracking-wider rounded-full">
                          {project.category}
                        </span>
                        <span className="text-white/50 text-sm">📍 {project.location}</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="text-white/70 text-base md:text-lg mb-6 leading-relaxed">{project.description}</p>
                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {project.features.map((feature) => (
                            <span key={feature} className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full text-center">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-red-500 font-medium mt-4 group-hover:gap-3 transition-all duration-300"
                      >
                        Visit Website
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* E-commerce Services Section */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-black/60 to-black/80">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            What We Offer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-lg text-white/70 max-w-3xl mb-12"
          >
            Comprehensive e-commerce solutions to help you sell more online and grow your business.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecommerceServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
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

      {/* Platforms Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6 text-center"
          >
            Platforms We Work With
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-lg text-white/70 text-center max-w-2xl mx-auto mb-12"
          >
            We specialize in building e-commerce solutions on leading platforms and custom architectures.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-red-500/50 transition-all duration-500 text-center hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all duration-500"></div>
                <div className="relative">
                  <div className="mb-3 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600/20 group-hover:bg-red-600 transition-all duration-300">
                    <div className="text-3xl font-bold text-red-400 group-hover:text-white transition-colors duration-300">
                      {platform.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    {platform.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our E-commerce Solutions */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-black/40 to-black/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4 text-center">
              Why Choose Us
            </h2>
            <p className="text-lg text-white/60 text-center mb-12 max-w-2xl mx-auto">
              We build e-commerce platforms that don't just look good—they drive sales and growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Conversion-Focused Design",
                  description: "Every element is crafted to guide visitors toward making a purchase, from product pages to checkout.",
                  number: "01"
                },
                {
                  title: "Scalable Architecture",
                  description: "Built to grow with your business, handling thousands of products and orders without compromising performance.",
                  number: "02"
                },
                {
                  title: "SEO & Marketing Ready",
                  description: "Optimized for search engines and integrated with marketing tools to drive traffic and sales.",
                  number: "03"
                },
                {
                  title: "Ongoing Support",
                  description: "We provide maintenance, updates, and optimization to keep your store running smoothly.",
                  number: "04"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ delay: 1.9 + index * 0.1, duration: 0.6 }}
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

      <CTA title="Ready to launch your online store?" href="/contact" />
    </div>
  );
}
