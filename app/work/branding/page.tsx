"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

const GRAPHICS_SERVICES = [
  {
    title: "Logo Design",
    description: "Distinctive, versatile logos built to work everywhere — from a business card to a billboard. We design marks that carry meaning and outlast trends.",
    icon: "◈",
  },
  {
    title: "Visual Identity System",
    description: "Colour palettes, typography, iconography, and pattern systems — everything packaged into a cohesive visual language your team can apply consistently.",
    icon: "◉",
  },
  {
    title: "Brand Guidelines",
    description: "A clear, detailed brand book covering usage rules, do's and don'ts, colour codes, font specs, and examples — so your brand looks right everywhere.",
    icon: "▦",
  },
  {
    title: "Print & Marketing Collateral",
    description: "Business cards, letterheads, brochures, flyers, posters, and packaging designed to make a strong first impression in the physical world.",
    icon: "◻",
  },
  {
    title: "Social Media Design",
    description: "Post templates, story formats, highlight covers, and ad creatives designed to look native on every platform while staying on brand.",
    icon: "⊞",
  },
  {
    title: "Pitch Decks & Presentations",
    description: "Investor decks, client proposals, and corporate presentations designed to communicate clearly and leave a lasting impression.",
    icon: "▣",
  },
];

const BRANDING_SERVICES = [
  {
    title: "Brand Strategy & Positioning",
    description: "Who are you, who are you for, and why should they choose you? We build the strategic foundation — purpose, positioning, personality, and messaging — before touching a single design file.",
  },
  {
    title: "Brand Naming",
    description: "If you need a name, we help you find one that's memorable, meaningful, available, and built for longevity — not just what sounds good today.",
  },
  {
    title: "Brand Voice & Messaging",
    description: "Your tone of voice, taglines, key messages, and copy frameworks — so every word your brand speaks sounds like you, whether it's a tweet or a proposal.",
  },
  {
    title: "Rebranding",
    description: "Growing out of your old look? We help established businesses evolve their brand without losing what made them recognisable in the first place.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description: "Deep dive into your business, competitors, audience, and goals. We ask uncomfortable questions — because the best brands are built on honest answers.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Define positioning, personality, and messaging architecture. The creative work follows the strategy — not the other way around.",
  },
  {
    step: "03",
    title: "Design",
    description: "Concepts, refinements, and final delivery. We present work with rationale — every design decision is intentional and explained.",
  },
  {
    step: "04",
    title: "Delivery",
    description: "Final brand files in every format you need, plus a brand guidelines document so your team knows exactly how to use everything.",
  },
];

export default function BrandingPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div className="relative min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(239,68,68,0.1),transparent_60%)]" />
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
            Graphics Design & Branding
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Design that
            <br />
            <span className="text-red-500">means something.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-10"
          >
            Great design is not decoration — it's communication. We build brand identities and 
            graphic systems that say the right thing to the right people, at exactly the right moment. 
            From logo to guidelines, print to social — every pixel has a purpose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {["Logo Design", "Visual Identity", "Brand Strategy", "Print Design", "Social Media Design", "Rebranding"].map((tag) => (
              <span key={tag} className="px-4 py-2 border border-white/20 text-white/70 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Graphics Design Services */}
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
              Graphics Design
            </h2>
            <p className="text-lg text-white/60 max-w-2xl">
              Every visual touchpoint your brand has is a chance to make an impression. 
              We make sure that impression is the right one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GRAPHICS_SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="group p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/8 transition-all duration-500"
              >
                <span className="text-3xl text-red-500 mb-5 block leading-none">{service.icon}</span>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Services */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(239,68,68,0.07),transparent_55%)]" />
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4">
              Branding
            </h2>
            <p className="text-lg text-white/60 max-w-2xl">
              A logo is not a brand. A brand is the sum of every impression your business makes. 
              We build the strategy and story that makes those impressions count.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRANDING_SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/10 hover:border-red-500/50 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-full min-h-[1.5rem] rounded-full bg-red-600 mt-1.5" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
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
              Our Process
            </h2>
            <p className="text-lg text-white/60">
              From blank canvas to brand in production — here's how we get there.
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

      {/* Bottom callout */}
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
              Your brand is the first thing
              <br />
              <span className="text-red-400">people judge you by.</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Make sure what they see reflects how good you actually are. 
              Let's build a brand identity worth being proud of.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all text-base"
            >
              Start your brand project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <CTA title="Ready to build your brand?" href="/contact" />
    </div>
  );
}
