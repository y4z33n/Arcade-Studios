"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { 
  Database, 
  Server, 
  Cpu, 
  ShieldCheck, 
  GitBranch, 
  Zap,
  ArrowRight
} from "lucide-react";
import CTA from "@/components/sections/CTA";

const SOFTWARE_CAPABILITIES = [
  {
    icon: Server,
    title: "Custom Enterprise SaaS & Platforms",
    description: "Multi-tenant architectures, subscription engines, customer portals, and bespoke management systems tailored to your distinct business model.",
    tags: ["Multi-Tenancy", "SaaS Architecture", "Bespoke Portals"]
  },
  {
    icon: Cpu,
    title: "High-Throughput APIs & Microservices",
    description: "Ultra-fast RESTful and GraphQL APIs engineered in Node.js, Go, and Python to handle high concurrency with sub-millisecond latencies.",
    tags: ["GraphQL & REST", "Microservices", "High Concurrency"]
  },
  {
    icon: Database,
    title: "Database Engineering & Data Modeling",
    description: "Robust relational (PostgreSQL) and in-memory (Redis) architectures designed with strict indexing, ACID compliance, and zero-loss redundancy.",
    tags: ["PostgreSQL", "Redis Caching", "Data Pipelines"]
  },
  {
    icon: Zap,
    title: "Real-Time Telemetry & Hardware Systems",
    description: "Custom telemetry integrations linking physical hardware (fuel pumps, gym turnstiles, biometric scanners) directly to live cloud databases.",
    tags: ["IoT Telemetry", "Hardware Access", "WebSockets"]
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security & RBAC",
    description: "Bank-grade authentication, granular Role-Based Access Control, end-to-end data encryption, and automated audit logging.",
    tags: ["RBAC", "JWT & OAuth2", "Audit Logging"]
  },
  {
    icon: GitBranch,
    title: "Cloud Infrastructure & DevOps",
    description: "Containerized deployments using Docker and Kubernetes, continuous integration pipelines, and automated zero-downtime rollouts on AWS.",
    tags: ["Docker", "AWS / Cloud", "CI/CD Pipelines"]
  }
];

const ARCHITECTURE_PILLARS = [
  {
    step: "01",
    title: "Domain-Driven System Design",
    description: "We map out every entity, relation, boundary, and data flow prior to execution, ensuring clean separation of concerns and zero technical debt."
  },
  {
    step: "02",
    title: "Modular & Scalable Codebase",
    description: "Layered architecture with decoupled controllers, business logic services, and repository layers for effortless testability and extension."
  },
  {
    step: "03",
    title: "Resilient Data Layer",
    description: "Connection pooling, automated read replicas, scheduled backups, and database migrations that execute without downtime."
  },
  {
    step: "04",
    title: "Observability & Monitoring",
    description: "Structured telemetry, centralized logging, APM performance tracking, and automated error reporting for 99.99% system uptime."
  }
];

const TECH_STACK = [
  { name: "Node.js", desc: "Runtime Engine", icon: "🟢" },
  { name: "Go / Golang", desc: "High-Performance Services", icon: "🔵" },
  { name: "Python", desc: "Data & ML Pipelines", icon: "🐍" },
  { name: "PostgreSQL", desc: "Primary Relational DB", icon: "🐘" },
  { name: "Redis", desc: "In-Memory Caching", icon: "🔴" },
  { name: "Next.js / React", desc: "Frontend Interfaces", icon: "⚛️" },
  { name: "Docker", desc: "Containerization", icon: "🐳" },
  { name: "AWS / GCP", desc: "Cloud Infrastructure", icon: "☁️" },
];

export default function SoftwareDevPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div className="relative min-h-screen pt-20 bg-[#050505] text-white">
      {/* Hero Section */}
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(239,68,68,0.12),transparent_60%)]" />
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
            className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-6 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            Custom Software Engineering
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Custom Software
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-white">
              Engineered to Scale
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-10 leading-relaxed font-light"
          >
            We engineer bespoke enterprise platforms, high-throughput microservices, telemetry hardware bridges, and mission-critical SaaS architectures. Built with precision, rigorous security, and zero compromise on reliability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-6 text-white/60"
          >
            {[
              "Enterprise SaaS Systems",
              "High-Throughput APIs",
              "IoT & Telemetry Bridges",
              "Cloud & DevOps Architecture",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm md:text-base">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Software Capabilities Grid */}
      <section className="relative py-16 md:py-24 overflow-hidden border-t border-white/10">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <span className="inline-block px-4 py-2 bg-white/10 text-white/70 text-xs font-medium uppercase tracking-wider rounded-full mb-4">
              Core Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
              What We Engineer
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light">
              End-to-end custom software built to handle high transactional loads, secure workflows, and complex domain requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOFTWARE_CAPABILITIES.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/8 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
                      <Icon className="w-6 h-6 text-red-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                      {cap.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs text-white/60 bg-white/5 border border-white/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineering Architecture Pillars */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-black/40 to-black/90 border-t border-white/10">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-16"
          >
            <span className="inline-block px-4 py-2 bg-red-600/20 text-red-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Architecture Standards
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
              Architected for Performance & Maintainability
            </h2>
            <p className="text-lg text-white/60 font-light">
              We design every software system with industrial rigor — clean patterns, comprehensive type-safety, and battle-tested infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARCHITECTURE_PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-all duration-300"
              >
                <span className="text-4xl font-mono font-black text-red-500/40 mb-4 block">
                  {pillar.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
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
              Enterprise Engineering Stack
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-lg md:text-xl text-white/60 font-light"
            >
              Proven frameworks and languages chosen for throughput, concurrency, and rock-solid developer experience.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {TECH_STACK.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 hover:bg-white/8 transition-all duration-300 text-center"
              >
                <span className="text-2xl mb-3 block">{tech.icon}</span>
                <h3 className="text-lg font-bold text-white mb-1">{tech.name}</h3>
                <p className="text-xs text-white/50">{tech.desc}</p>
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
            className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-500/20 p-10 md:p-14 text-center shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              Have a custom software requirement?<br />
              <span className="text-red-400">Let's build the architecture.</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-light">
              From enterprise SaaS and custom ERPs to high-volume API gateways — we design and develop software that powers your business without technical compromises.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all text-base shadow-[0_0_25px_rgba(220,38,38,0.5)]"
            >
              <span>Consult Our Engineering Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTA title="Ready to build custom software for your company?" href="/contact" />
    </div>
  );
}
