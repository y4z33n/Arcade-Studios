"use client";

import { motion } from "framer-motion";
import { Zap, Radio, ShieldCheck, Database, ArrowRight } from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    icon: Zap,
    title: "Sub-180ms Latency",
    description: "Full-duplex WebSocket neural streaming that eliminates conversational pauses and enables natural human interruptions.",
    badge: "Real-Time AI"
  },
  {
    icon: Radio,
    title: "IoT & Hardware Bridges",
    description: "Built-in controller drivers for physical turnstile relays, dynamic offline NFC/QR gates, and fuel dispenser meters.",
    badge: "Edge Hardware"
  },
  {
    icon: ShieldCheck,
    title: "HIPAA & SOC2 Ready",
    description: "Zero-retention ephemeral voice streams, end-to-end PHI encryption, and strict enterprise compliance guarantees.",
    badge: "Enterprise Security"
  },
  {
    icon: Database,
    title: "1-Click Cloud & ERP Sync",
    description: "Automatic double-entry journal export to QuickBooks/SAP, real-time Stripe billing, and two-way CRM integration.",
    badge: "Autonomous Ops"
  }
];

export default function ProductArchitecture() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-t border-white/5 bg-[#050505]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-red-900/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <span className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
            Engineering Principles
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-6">
            Autonomous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              Architecture
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
            Every software system we build is designed for mission-critical reliability, native hardware communication, and zero human friction.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group h-full backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-red-500 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-red-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
