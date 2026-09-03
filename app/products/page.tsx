"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Headphones, 
  Dumbbell, 
  HeartPulse, 
  Fuel, 
  ArrowRight,
  Sparkles,
  Check
} from "lucide-react";
import CTA from "@/components/sections/CTA";
import Aurora from "@/components/Aurora";

const PRODUCTS = [
  {
    id: "leysupport",
    name: "LeySupport",
    category: "Voice AI & Receptionist",
    tagline: "Autonomous Phone Receptionist & Call Assistant",
    description: "An intelligent voice assistant that answers customer calls, schedules appointments, answers queries, and handles support around the clock with zero hold times.",
    icon: Headphones,
    color: "from-red-600/20 to-orange-900/20",
    highlights: [
      "Natural conversational voice calls with zero hold times",
      "Automated appointment booking & calendar sync",
      "Customer inquiry handling & database lookups",
      "24/7 front-desk phone coverage"
    ]
  },
  {
    id: "gymley",
    name: "GymLey",
    category: "Fitness & Gym Management",
    tagline: "Smart Gym Platform + Member & Trainer Apps",
    description: "A complete gym management ecosystem with dedicated mobile apps for members and trainers, automated turnstile door access, and membership billing.",
    icon: Dumbbell,
    color: "from-amber-500/20 to-orange-900/20",
    highlights: [
      "Dedicated Member app for QR check-ins & workout tracking",
      "Dedicated Trainer app for client scheduling & plans",
      "Automated turnstile & magnetic gate access",
      "Recurring membership billing & member retention"
    ]
  },
  {
    id: "medley",
    name: "MedLey",
    category: "Healthcare & Clinic Queuing",
    tagline: "Smart Clinic & Hospital Patient Queuing",
    description: "An intelligent patient queuing and scheduling platform designed to eliminate crowded waiting rooms and streamline doctor consultation flow.",
    icon: HeartPulse,
    color: "from-cyan-500/20 to-blue-900/20",
    highlights: [
      "Live SMS & WhatsApp virtual queue passes",
      "Smart symptom triage & priority routing",
      "Doctor consultation room workload balancing",
      "Drastically reduces waiting room congestion"
    ]
  },
  {
    id: "fueley",
    name: "FuelEy",
    category: "Fuel Station & Accounting",
    tagline: "Automated Fuel Dispenser Telemetry & Shift Accounting",
    description: "A specialized platform for petrol stations that captures pump dispenser meter readings, monitors underground tank levels, and balances daily shift accounts in 1 click.",
    icon: Fuel,
    color: "from-emerald-500/20 to-teal-900/20",
    highlights: [
      "Real-time pump dispenser meter tracking",
      "Underground fuel tank level & dipstick monitoring",
      "1-click shift ledger reconciliation",
      "Automated fuel discrepancy & leakage detection"
    ]
  }
];

export default function ProductsPage() {
  return (
    <main className="relative bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* Background Aurora */}
      <div className="absolute top-0 left-0 w-full h-[80vh] opacity-30 pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,white_10%,transparent)]">
        <Aurora colorStops={["#DC2626", "#ea580c", "#7c2d12"]} amplitude={1.1} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-44 pb-16">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-[0_0_25px_rgba(220,38,38,0.4)]">
              <Sparkles className="w-3.5 h-3.5" />
              In Active Development
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              4 Products In Pipeline
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl 3xl:text-[10rem] font-black text-white leading-[0.92] tracking-tighter uppercase mb-8"
          >
            What We&apos;re <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-white">
              Building
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl 3xl:text-2xl text-white/70 max-w-3xl font-light leading-relaxed mb-8"
          >
            We are currently developing a proprietary suite of software and AI products engineered to automate mission-critical workflows across telephony, fitness, healthcare, and retail energy.
          </motion.p>

        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 pb-24 w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PRODUCTS.map((product, index) => {
            const Icon = product.icon;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-3xl bg-[#0A0A0A] border border-white/10 hover:border-white/25 transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 sm:p-10 lg:p-12 shadow-2xl"
              >
                {/* Ambient glow on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} 
                />

                <div className="relative z-10">
                  {/* Top Row: Category + Status */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      In Development
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                        {product.name}
                      </h2>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm sm:text-base font-medium text-red-400/90 mb-4">
                    {product.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2.5 mb-8">
                    {product.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                        <div className="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action / Status */}
                <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-end">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-white transition-colors group/link"
                  >
                    <span>Early Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Website Signature CTA */}
      <CTA 
        title="Interested in our upcoming software products?" 
        href="/contact" 
      />

    </main>
  );
}
