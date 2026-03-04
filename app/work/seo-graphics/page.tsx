"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

const SEO_SERVICES = [
  {
    title: "SEO Audit & Strategy",
    description: "We start with a deep technical and content audit of your site — identifying what's holding you back and building a clear roadmap to fix it.",
  },
  {
    title: "Keyword Research & Mapping",
    description: "Find the exact search terms your customers use. We map high-intent keywords to every page on your site so nothing is left to chance.",
  },
  {
    title: "On-Page Optimisation",
    description: "Title tags, meta descriptions, header structure, internal linking, content optimisation — every on-page signal tuned for maximum ranking potential.",
  },
  {
    title: "Technical SEO",
    description: "Site speed, Core Web Vitals, crawlability, structured data, XML sitemaps, and mobile performance — the foundations that search engines reward.",
  },
  {
    title: "Link Building & Authority",
    description: "Earn high-quality backlinks from relevant, trusted sources to build your domain authority and outrank competitors.",
  },
  {
    title: "Local SEO",
    description: "Dominate local searches in Mauritius and beyond. Google Business optimisation, local citations, and geo-targeted content strategies.",
  },
];

const DIGITAL_MARKETING_SERVICES = [
  {
    title: "Social Media Marketing",
    description: "Strategic content creation and community management across Instagram, Facebook, LinkedIn, and TikTok — tailored to your audience and goals.",
  },
  {
    title: "Paid Advertising (Meta & Google)",
    description: "Performance-driven ad campaigns on Meta and Google. We handle targeting, creative, copy, and continuous optimisation to maximise your ROI.",
  },
  {
    title: "Email Marketing",
    description: "Automated email sequences, newsletters, and re-engagement campaigns that nurture leads and drive repeat business.",
  },
  {
    title: "Content Marketing",
    description: "Blog posts, landing pages, case studies, and long-form content that ranks on Google and positions your brand as the authority in your space.",
  },
  {
    title: "Analytics & Reporting",
    description: "Clear, honest reporting on what's working and what isn't. Monthly dashboards covering traffic, rankings, leads, and campaign performance.",
  },
  {
    title: "Conversion Rate Optimisation",
    description: "Getting traffic is only half the battle. We analyse user behaviour and optimise your site to turn more visitors into actual customers.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description: "We audit your current digital presence, analyse your competitors, and understand your business goals and target audience.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "We build a tailored SEO and digital marketing strategy with clear KPIs, timelines, and priorities — no generic playbooks.",
  },
  {
    step: "03",
    title: "Execution",
    description: "Our team executes across all agreed channels — technical fixes, content, campaigns, and link building — consistently and on time.",
  },
  {
    step: "04",
    title: "Measure & Optimise",
    description: "Every month we review results, report transparently, and double down on what's working. Digital marketing is a moving target — we move with it.",
  },
];

export default function SEOGraphicsPage() {
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
              className="inline-flex items-center text-white/60 hover:text-white transition-colors duration-300"
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
            SEO & Digital Marketing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Be Found.
            <br />
            <span className="text-red-500">Be Chosen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-10"
          >
            Most businesses have great products but invisible online presence. We fix that.
            From SEO that ranks to paid campaigns that convert — we build the digital engine 
            that consistently brings your ideal customers to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {["Search Engine Optimisation", "Paid Advertising", "Social Media", "Content Strategy", "Analytics"].map((tag) => (
              <span key={tag} className="px-4 py-2 border border-white/20 text-white/70 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEO Services */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-black/50 to-black/80">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4">
              Search Engine
              <br />Optimisation
            </h2>
            <p className="text-lg text-white/60 max-w-2xl">
              Rank higher. Stay there. SEO is a long game — and we play it properly, 
              with strategies that compound over time and don't disappear with the next algorithm update.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEO_SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="group p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/8 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/20 group-hover:bg-red-600 flex items-center justify-center mb-5 transition-all duration-300">
                  <svg className="w-5 h-5 text-red-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Marketing Services */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(239,68,68,0.07),transparent_55%)]" />
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4">
              Digital Marketing
            </h2>
            <p className="text-lg text-white/60 max-w-2xl">
              Traffic without strategy is just noise. We build digital marketing systems 
              that attract the right people, at the right moment, and move them to action.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DIGITAL_MARKETING_SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="group flex gap-5 p-7 rounded-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/10 hover:border-red-500/50 transition-all duration-500"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600/20 group-hover:bg-red-600 flex items-center justify-center transition-all duration-300 mt-0.5">
                  <svg className="w-5 h-5 text-red-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-black/60 to-black/90">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4">
              How We Work
            </h2>
            <p className="text-lg text-white/60">
              No retainers that go nowhere. A clear, results-focused process from day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {PROCESS_STEPS.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-all duration-500 group"
              >
                <span className="text-5xl font-bold text-red-600/20 group-hover:text-red-600/40 transition-all duration-500 block mb-4 leading-none">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters callout */}
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
              Your competitors are investing in SEO.<br />
              <span className="text-red-400">Are you?</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Every day without a proper digital marketing strategy is a day your competitors 
              capture customers that should have been yours. Let's change that.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all text-base"
            >
              Get a free digital audit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <CTA title="Ready to grow your online presence?" href="/contact" />
    </div>
  );
}
