"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Server, 
  Layers,
  Radio,
  Lock,
  Sparkles,
  Headphones,
  Dumbbell,
  HeartPulse,
  Fuel,
  ArrowRight
} from "lucide-react";

interface SpecRow {
  category: "architecture" | "hardware" | "security" | "deployment";
  feature: string;
  description: string;
  auracall: string;
  gym: string;
  hospital: string;
  fuel: string;
}

const SPEC_ROWS: SpecRow[] = [
  {
    category: "architecture",
    feature: "Core Architecture / Engine",
    description: "Foundational AI models, transport layers, and runtime pipelines.",
    auracall: "Gemini 2.0 Live WebSockets + Twilio SIP Trunks",
    gym: "Cloud Hub + Flutter / React Native Dual Apps",
    hospital: "Predictive ML Triage + WhatsApp/SMS Twilio Gateway",
    fuel: "Pump Controller IoT Protocol + Auto-Reconciliation Ledger"
  },
  {
    category: "architecture",
    feature: "Primary Interfaces & Nodes",
    description: "Client touchpoints, webhooks, and backend synchronization.",
    auracall: "Telephony Voice Stream, REST Webhooks, SQL CRM",
    gym: "Trainer Mobile App, Member App, Web Admin, IoT Gates",
    hospital: "Doctor Consultation Board, Patient Mobile Pass, Reception POS",
    fuel: "Nozzle Flow Meters, ATG Dipstick Probes, POS Register"
  },
  {
    category: "architecture",
    feature: "Latency & Processing Benchmark",
    description: "Median end-to-end response and processing time.",
    auracall: "< 180 ms (Full-Duplex Speech-to-Speech)",
    gym: "< 0.4s (Offline Dynamic QR/NFC Pass)",
    hospital: "< 15 ms (Triage Priority Engine)",
    fuel: "< 1.0s (Full Shift Double-Entry Close)"
  },
  {
    category: "hardware",
    feature: "Hardware & IoT Integrations",
    description: "Physical hardware controllers and edge device protocols.",
    auracall: "Cloud SIP, Asterisk, Genesys, Cisco / Avaya PBX",
    gym: "ZKTeco, Paxton, HID NFC/QR Turnstiles & Magnetic Relays",
    hospital: "Hospital Smart Displays, Triage Kiosks, EMR / EHR",
    fuel: "Gilbarco, Wayne, Tatsuno Dispensers, Veeder-Root ATGs"
  },
  {
    category: "hardware",
    feature: "Offline & Edge Resilience",
    description: "Behavior during network outages and local caching.",
    auracall: "Automated PSTN Failover to Human Dispatch",
    gym: "Local Gate Token Caching (30-day offline validity)",
    hospital: "Local Clinic Queue Buffer with Auto-Sync",
    fuel: "Edge Dispenser Buffer (Stores 10k transactions offline)"
  },
  {
    category: "security",
    feature: "Enterprise Compliance & Privacy",
    description: "Regulatory certifications and data protection guarantees.",
    auracall: "SOC2 Type II, HIPAA Voice BAA, Zero-Retention Mode",
    gym: "PCI-DSS Level 1 (Stripe), GDPR Member Data Vault",
    hospital: "HIPAA PHI Encrypted, HL7 / FHIR Standard Ready",
    fuel: "Fiscal Tax Authority Encrypted, Immutable Shift Audit"
  },
  {
    category: "deployment",
    feature: "Current Development Milestone",
    description: "Engineering roadmap status and onboarding phase.",
    auracall: "In Active Dev (Private Alpha Live)",
    gym: "In Active Dev (Pilot Gym Sandbox Ready)",
    hospital: "In Active Dev (Clinic Beta Q3)",
    fuel: "In Active Dev (Station Integration Q3)"
  }
];

export default function TechSpecMatrix() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredRows = SPEC_ROWS.filter((row) => {
    if (activeFilter === "all") return true;
    return row.category === activeFilter;
  });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Cpu className="w-3.5 h-3.5" />
            Engineering &amp; Architecture Specs
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            Multi-Industry <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-white">
              System Matrix
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed">
            Side-by-side technical architecture, hardware protocols, latency benchmarks, and compliance standards for all 4 software systems.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === "all" ? "bg-white text-black" : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              All Specifications ({SPEC_ROWS.length})
            </button>
            <button
              onClick={() => setActiveFilter("architecture")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === "architecture" ? "bg-red-600 text-white shadow-md" : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              Core Architecture &amp; Latency
            </button>
            <button
              onClick={() => setActiveFilter("hardware")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === "hardware" ? "bg-amber-500 text-black shadow-md" : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              Hardware &amp; IoT Protocols
            </button>
            <button
              onClick={() => setActiveFilter("security")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === "security" ? "bg-cyan-500 text-black shadow-md" : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              Security &amp; HIPAA/SOC2
            </button>
          </div>
        </div>

        {/* Matrix Table with Glassmorphism */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.04] via-[#090909] to-black border border-white/10 p-4 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-5 px-4 text-xs font-bold uppercase tracking-widest text-white/40 w-1/4">
                  Engineering Dimension
                </th>
                <th className="py-5 px-4 w-[18.75%]">
                  <div className="flex items-center gap-2 text-sm font-bold text-red-400">
                    <Headphones className="w-4 h-4" />
                    <span>AuraCall AI</span>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono block">Voice Telephony</span>
                </th>
                <th className="py-5 px-4 w-[18.75%]">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                    <Dumbbell className="w-4 h-4" />
                    <span>PulseFit AI</span>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono block">Dual Gym Apps</span>
                </th>
                <th className="py-5 px-4 w-[18.75%]">
                  <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
                    <HeartPulse className="w-4 h-4" />
                    <span>MedQueue AI</span>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono block">Clinic Queuing</span>
                </th>
                <th className="py-5 px-4 w-[18.75%]">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                    <Fuel className="w-4 h-4" />
                    <span>PetroLedger AI</span>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono block">Pump &amp; Ledger</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRows.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-5 px-4 align-top">
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                      {row.feature}
                    </div>
                    <div className="text-[11px] text-white/40 font-light mt-0.5 max-w-xs">
                      {row.description}
                    </div>
                  </td>
                  <td className="py-5 px-4 text-xs text-white/80 font-mono align-top leading-relaxed">
                    <span className="p-1 rounded bg-red-500/10 text-red-300 border border-red-500/20 block">
                      {row.auracall}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-xs text-white/80 font-mono align-top leading-relaxed">
                    <span className="p-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 block">
                      {row.gym}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-xs text-white/80 font-mono align-top leading-relaxed">
                    <span className="p-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 block">
                      {row.hospital}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-xs text-white/80 font-mono align-top leading-relaxed">
                    <span className="p-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 block">
                      {row.fuel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Security Guarantee Strip */}
          <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Enterprise Customizations &amp; On-Premise Bridges</span>
                <span className="text-white/50 text-[11px]">All 4 platforms support custom on-premise edge containers, custom IoT pinouts, and dedicated HIPAA/SOC2 instances.</span>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-[11px] text-white/80 shrink-0">
              99.99% Enterprise Uptime SLA
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
