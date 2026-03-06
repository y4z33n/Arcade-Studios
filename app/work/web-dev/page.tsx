"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

const WEB_PROJECTS = [
  {
    slug: "model-management",
    title: "Model Management dot Mu",
    subtitle: "Premier platform for models, casting professionals & talent management",
    client: "ModelManagement.mu",
    description: "A comprehensive platform connecting models, photographers, casting directors, and agencies. Features include portfolio management, booking systems, and talent discovery tools built for the Mauritian and regional market.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    year: "2024",
    image: "/pro/model.jpg",
    link: "https://modelmanagement.mu",
    features: [
      "Advanced portfolio management system",
      "Real-time booking and scheduling",
      "Integrated messaging platform",
      "Search and discovery algorithms",
    ],
  },
  {
    slug: "flash-communication",
    title: "Flash Communications",
    subtitle: "Integrated marketing agency — Creative, Digital, OOH, Video & Events",
    client: "theflashgroups.com",
    description: "A dynamic website for a full-service marketing agency showcasing their creative work, services, and portfolio across multiple channels including digital, outdoor, and event marketing.",
    tags: ["React", "Next.js", "Framer Motion", "CMS", "SEO"],
    year: "2024",
    image: "/pro/flash.jpg",
    link: "https://theflashgroups.com",
    features: [
      "Interactive portfolio showcase",
      "Service-based navigation",
      "Client testimonials system",
      "Blog and news integration",
    ],
  },
  {
    slug: "tdultee",
    title: "Trait d'Union Ltée",
    subtitle: "Clean digital presence for a trusted business solutions firm",
    client: "Trait d'Union Ltée",
    description: "Professional business website focused on delivering clear communication of services and establishing credibility in the business solutions sector across Mauritius.",
    tags: ["WordPress", "PHP", "JavaScript", "Responsive Design"],
    year: "2023",
    image: "/pro/tdu.jpg",
    link: "#",
    features: [
      "Clean, professional design",
      "Service overview pages",
      "Contact and inquiry forms",
      "Mobile-first approach",
    ],
  },
];

const ECOMMERCE_PROJECTS = [
  {
    title: "My Experience Shop",
    client: "myexperienceshop.com",
    link: "https://myexperienceshop.com",
    description: "An innovative e-commerce platform selling curated experiences rather than physical products. Built with seamless booking flows, calendar availability, and secure payment processing.",
    tags: ["Shopify", "React", "API Integration", "Payment Gateway"],
    image: "/pro/mes.jpg",
    features: [
      "Experience booking & calendar system",
      "Secure multi-gateway payment processing",
      "Dynamic inventory & availability management",
      "Customer review and rating system",
    ],
  },
  {
    title: "Super Distribution",
    client: "superdistribution.mu",
    link: "https://superdistribution.mu",
    description: "A B2B and retail e-commerce solution for a major Mauritian distribution company. Enables bulk ordering, product catalogue management, and streamlined checkout for wholesale and retail buyers.",
    tags: ["WooCommerce", "WordPress", "B2B", "Custom Checkout"],
    image: "/pro/sd.jpg",
    features: [
      "Dual B2B & retail product catalogues",
      "Bulk ordering with tiered pricing",
      "Custom checkout and invoicing flow",
      "Real-time stock management",
    ],
  },
  {
    title: "Breathing Soul",
    client: "breathing-soul.com",
    link: "https://breathing-soul.com",
    description: "A mindful lifestyle and wellness e-commerce brand. Designed to feel calm, premium, and trustworthy — with a smooth product discovery experience and clean purchase flow.",
    tags: ["Shopify", "Custom Theme", "UX Design", "SEO"],
    image: "/pro/bs.jpg",
    features: [
      "Premium custom Shopify theme",
      "Wellness-focused UX & copywriting",
      "Product bundles and upsell flows",
      "Mobile-first shopping experience",
    ],
  },
];

const UI_CAPABILITIES = [
  {
    title: "Wireframing & Prototyping",
    description: "From low-fidelity wireframes to high-fidelity interactive prototypes — we map every screen and user flow before a single line of code is written.",
    icon: "✦",
  },
  {
    title: "UI Design Systems",
    description: "We build scalable component libraries and design systems in Figma that developers can hand off seamlessly — consistent colours, spacing, typography, and states.",
    icon: "◈",
  },
  {
    title: "User Experience Research",
    description: "User journeys, sitemap architecture, and conversion-focused flows. We design for how real people think and behave, not just how things look.",
    icon: "◎",
  },
  {
    title: "Responsive & Mobile-First Design",
    description: "Every design we produce is built mobile-first and tested across breakpoints — desktop, tablet, and mobile — with pixel-perfect handoff specs.",
    icon: "⊞",
  },
  {
    title: "Figma to Code Handoff",
    description: "Our designers and developers work in the same language. Clean Figma files with auto-layout, variables, and developer mode annotations mean zero guesswork.",
    icon: "⇄",
  },
  {
    title: "Landing Page Design",
    description: "High-converting landing pages built with clear hierarchy, compelling CTAs, and performance in mind — from hero to footer.",
    icon: "▣",
  },
];

export default function WebDevPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div className="relative min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(239,68,68,0.1),transparent_60%)]" />
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
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
            Web Design & Development
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Building the
            <br />
            <span className="text-red-500">Modern Web</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-8"
          >
            From UI/UX design in Figma to fully deployed web applications and e-commerce stores — 
            we handle every step. Our work is built for real clients, with measurable results and 
            experiences people actually enjoy using.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-6 text-white/60"
          >
            {[
              "Websites & Web Apps",
              "E-commerce Stores",
              "UI/UX Design in Figma",
              "Modern Tech Stack",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Web Projects */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <span className="inline-block px-4 py-2 bg-white/10 text-white/70 text-xs font-medium uppercase tracking-wider rounded-full mb-4">
              Some of our featured works
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter">
              Web Projects
            </h2>
          </motion.div>

          <div className="space-y-20 md:space-y-28">
            {WEB_PROJECTS.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Image */}
                  <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-3xl border border-white/10 group-hover:border-red-500/50 transition-all duration-500">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-6 left-6">
                        <span className="inline-block px-4 py-2 bg-red-600 rounded-full text-sm font-medium text-white">
                          {project.year}
                        </span>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-6 right-6 px-6 py-3 bg-white text-black font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:text-white flex items-center gap-2"
                      >
                        Visit Site
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  {/* Content */}
                  <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="space-y-6">
                      <div>
                        <span className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-2 block">
                          {project.client}
                        </span>
                        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                          {project.title}
                        </h3>
                        <p className="text-xl text-white/80 mb-4">{project.subtitle}</p>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed">{project.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/70">
                              <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-4 py-2 text-sm text-white/80 bg-white/5 border border-white/10 rounded-full">
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

      {/* E-commerce Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-black/60 to-black/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.07),transparent_60%)]" />
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <span className="inline-block px-4 py-2 bg-white/10 text-white/70 text-xs font-medium uppercase tracking-wider rounded-full mb-4">
              Some of our featured works
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4">
              E-commerce Stores
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl">
              End-to-end e-commerce solutions — from store design to payment integration, 
              inventory management, and conversion optimisation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ECOMMERCE_PROJECTS.map((project, index) => (
              <motion.div
                key={project.client}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: index * 0.15, duration: 0.7 }}
                className="group flex flex-col rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-500 bg-white/5 backdrop-blur-sm"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-4 h-4 text-black group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 p-6 md:p-8 space-y-4">
                  <div>
                    <span className="text-red-500 text-xs font-semibold uppercase tracking-wider">{project.client}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-1 mb-2 group-hover:text-red-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">{project.description}</p>
                  </div>
                  <ul className="space-y-1.5 flex-1">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                        <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 text-xs text-white/70 bg-white/5 border border-white/10 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UI/UX Design in Figma Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(239,68,68,0.08),transparent_60%)]" />
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <span className="inline-block px-4 py-2 bg-white/10 text-white/70 text-xs font-medium uppercase tracking-wider rounded-full mb-4">
              Design First
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4">
              UI/UX Design
              <br />
              <span className="text-red-500">in Figma</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl">
              Great products start with great design. Before writing a single line of code, 
              we design every screen, state, and interaction — so development is fast, 
              precise, and exactly what you envisioned.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UI_CAPABILITIES.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/8 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 group-hover:from-red-600/8 to-transparent rounded-2xl transition-all duration-500" />
                <div className="relative">
                  <span className="text-3xl text-red-500 mb-4 block leading-none">{item.icon}</span>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Figma callout banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-12 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-red-600/30">
              Fig
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Figma is our design home</h3>
              <p className="text-white/60 leading-relaxed">
                Every project gets a dedicated Figma workspace — complete with component libraries, 
                style tokens, responsive frames, and developer handoff annotations. 
                You own the files. Always.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all"
            >
              Start a design project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-black/40 to-black/80">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
            >
              Our Tech Stack
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-lg md:text-xl text-white/60"
            >
              Modern, proven technologies — chosen for performance, scalability, and developer experience.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: "React", desc: "UI Library" },
              { name: "Next.js", desc: "Framework" },
              { name: "TypeScript", desc: "Language" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "Figma", desc: "Design" },
              { name: "Node.js", desc: "Backend" },
              { name: "Shopify", desc: "E-commerce" },
              { name: "WordPress", desc: "CMS" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-300 text-center"
              >
                <h3 className="text-lg font-bold text-white mb-1">{tech.name}</h3>
                <p className="text-sm text-white/50">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Callout */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-500/20 p-10 md:p-14 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              Have a web project in mind?<br />
              <span className="text-red-400">Let's build it right.</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              From a simple site to a complex web app — we design and develop 
              experiences that are fast, beautiful, and built to last.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all text-base"
            >
              Start your web project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <CTA title="Ready to build your web project?" href="/contact" />
    </div>
  );
}
