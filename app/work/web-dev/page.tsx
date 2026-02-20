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
    subtitle: "Premier platform for models, casting professionals, and talent management",
    client: "ModelManagement.mu",
    description: "A comprehensive platform connecting models, photographers, casting directors, and agencies. Features include portfolio management, booking systems, and talent discovery tools.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop&q=80",
    link: "https://modelmanagement.mu",
    features: [
      "Advanced portfolio management system",
      "Real-time booking and scheduling",
      "Integrated messaging platform",
      "Search and discovery algorithms"
    ]
  },
  {
    slug: "flash-communication",
    title: "Flash Communications",
    subtitle: "Integrated marketing agency - Creative, Digital, OOH, Video & Events",
    client: "theflashgroups.com",
    description: "A dynamic website for a full-service marketing agency showcasing their creative work, services, and portfolio across multiple channels including digital, outdoor, and event marketing.",
    tags: ["React", "Next.js", "Framer Motion", "CMS", "SEO"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=900&fit=crop&q=80",
    link: "https://theflashgroups.com",
    features: [
      "Interactive portfolio showcase",
      "Service-based navigation",
      "Client testimonials system",
      "Blog and news integration"
    ]
  },
  {
    slug: "tdultee",
    title: "TD Ultee",
    subtitle: "Digital presence for business solutions",
    client: "tdultee.com",
    description: "Professional business website focused on delivering clear communication of services and establishing credibility in the business solutions sector.",
    tags: ["WordPress", "PHP", "JavaScript", "Responsive Design"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=80",
    link: "https://tdultee.com",
    features: [
      "Clean, professional design",
      "Service overview pages",
      "Contact and inquiry forms",
      "Mobile-first approach"
    ]
  },
  {
    slug: "my-experience-shop",
    title: "My Experience Shop",
    subtitle: "E-commerce platform for unique experiences",
    client: "myexperienceshop.com",
    description: "An innovative e-commerce platform specializing in selling experiences rather than physical products. Features booking systems, calendar integration, and payment processing.",
    tags: ["Shopify", "React", "API Integration", "Payment Gateway"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&h=900&fit=crop&q=80",
    link: "https://myexperienceshop.com",
    features: [
      "Experience booking system",
      "Calendar availability management",
      "Secure payment processing",
      "Review and rating system"
    ]
  },
];

export default function WebDevPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

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
            Modern Web
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-8"
          >
            From responsive websites to complex web applications, we create digital experiences 
            that perform. Our portfolio showcases real projects built for real clients, delivering 
            measurable results and exceptional user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-6 text-white/60"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>4 Live Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>E-commerce to Platforms</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Modern Tech Stack</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
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
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${index % 2 === 1 ? "" : ""}`}>
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
                      
                      {/* Year Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="inline-block px-4 py-2 bg-red-600 rounded-full text-sm font-medium text-white">
                          {project.year}
                        </span>
                      </div>

                      {/* Visit Site Button */}
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
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
                          {project.title}
                        </h2>
                        <p className="text-xl text-white/80 mb-4">
                          {project.subtitle}
                        </p>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div>
                        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                          Key Features
                        </h3>
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

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-4">
                        {project.tags.map((tag, i) => (
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

      {/* Tech Stack Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
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
              className="text-lg md:text-xl text-white/70"
            >
              We use modern, proven technologies to build fast, scalable, and maintainable web applications.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: "React", desc: "UI Library" },
              { name: "Next.js", desc: "Framework" },
              { name: "TypeScript", desc: "Language" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "Node.js", desc: "Backend" },
              { name: "PostgreSQL", desc: "Database" },
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
                <p className="text-sm text-white/60">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Ready to build your web project?" href="/contact" />
    </div>
  );
}
