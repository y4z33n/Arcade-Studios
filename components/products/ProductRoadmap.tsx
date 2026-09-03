"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Milestone, 
  Sparkles, 
  ThumbsUp, 
  Clock, 
  Lightbulb, 
  Headphones, 
  Dumbbell, 
  HeartPulse, 
  Fuel, 
  ArrowRight,
  Send,
  CheckCircle2,
  Cpu,
  Layers,
  Code
} from "lucide-react";

interface ActiveEngine {
  id: string;
  name: string;
  category: string;
  phase: string;
  phaseColor: string;
  progressPercent: number;
  icon: any;
  nextMilestone: string;
  targetRelease: string;
  featuresInFlight: string[];
}

interface IdeaConcept {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  initialVotes: number;
}

const ACTIVE_ENGINES: ActiveEngine[] = [
  {
    id: "auracall",
    name: "AuraCall AI (Voice Telephony)",
    category: "Voice AI & Call Center",
    phase: "Alpha • Private Testing",
    phaseColor: "bg-red-500/10 border-red-500/30 text-red-400",
    progressPercent: 88,
    icon: Headphones,
    nextMilestone: "Multi-Language 50+ Accent Neural Synthesizer & Salesforce Bi-Directional Sync",
    targetRelease: "Private Pilot Cohort Q2",
    featuresInFlight: ["Full-Duplex WS Streaming", "Instant Ticket SQL Refunds", "Warm Human PSTN Handoff"]
  },
  {
    id: "gym-ecosystem",
    name: "PulseFit AI (Gym & Dual Apps)",
    category: "Fitness SaaS & IoT",
    phase: "Beta • Facility Pilot Ready",
    phaseColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    progressPercent: 92,
    icon: Dumbbell,
    nextMilestone: "Apple Wallet / Google Wallet Dynamic NFC Tap Passes & Auto-Split Trainer Commissions",
    targetRelease: "Commercial Studio Sandbox Q3",
    featuresInFlight: ["Dedicated Member iOS/Android App", "Trainer Routine Builder", "IoT Turnstile Wiegand Relays"]
  },
  {
    id: "hospital-queuing",
    name: "MedQueue AI (Hospital Triage)",
    category: "Healthcare & Clinic Queuing",
    phase: "Beta • Clinical Sandbox",
    phaseColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    progressPercent: 85,
    icon: HeartPulse,
    nextMilestone: "HL7 / FHIR Clinical Health Records Gateway & Smart Waiting Room Display Mesh",
    targetRelease: "Multi-Specialty Pilot Q3",
    featuresInFlight: ["Predictive Doctor Balancing", "Live SMS/WhatsApp Queue Passes", "Smart Triage Priority Engine"]
  },
  {
    id: "fuel-accounting",
    name: "PetroLedger AI (Fuel Telemetry)",
    category: "Oil & Gas Accounting",
    phase: "Alpha • Integration Phase",
    phaseColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    progressPercent: 80,
    icon: Fuel,
    nextMilestone: "Veeder-Root ATG RS-485 Hardware Bridge & Auto QuickBooks/SAP Journal Exporter",
    targetRelease: "Franchise Network Integration Q3",
    featuresInFlight: ["Pump Flow Meter Telemetry", "Underground ATG Dipstick Levels", "1-Click Auto Ledger Reconciliation"]
  }
];

const IDEA_CONCEPTS: IdeaConcept[] = [
  {
    id: "legal-triage",
    category: "LegalTech AI",
    title: "Autonomous Legal Intake & Case Pre-Triage",
    description: "Ingests client legal inquiries, analyzes jurisdiction statutes, cross-references precedent case law, and compiles attorney briefing memos.",
    tags: ["Legal RAG", "Statute Matcher", "Document OCR", "Court Briefs"],
    initialVotes: 214
  },
  {
    id: "retail-vision",
    category: "Computer Vision",
    title: "Real-Time Retail Shelf & Stockout Detection",
    description: "Automated CCTV video feed analysis detecting empty grocery/retail shelves, misplaced inventory, and dispatching restocking teams.",
    tags: ["Edge Computer Vision", "CCTV Stream", "Stockout Alert", "Restock Dispatch"],
    initialVotes: 178
  },
  {
    id: "fleet-dispatch",
    category: "Logistics & Supply Chain",
    title: "Dynamic Freight Route & Fuel Optimization Engine",
    description: "Autonomous dispatch system coordinating heavy vehicle fleets, live traffic telemetry, and optimal refuel waypoint scheduling.",
    tags: ["Telematics", "Route Dispatch", "Fleet Fuel Optimizer", "Waybill OCR"],
    initialVotes: 142
  }
];

export default function ProductRoadmap() {
  const [activeTab, setActiveTab] = useState<"active" | "incubator">("active");
  const [votes, setVotes] = useState<Record<string, number>>({
    "legal-triage": 214,
    "retail-vision": 178,
    "fleet-dispatch": 142
  });
  const [votedItems, setVotedItems] = useState<Record<string, boolean>>({});
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [customIdea, setCustomIdea] = useState<string>("");

  const handleVote = (id: string) => {
    if (votedItems[id]) return;
    setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setVotedItems(prev => ({ ...prev, [id]: true }));
  };

  const handleProposeIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customIdea.trim()) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setCustomIdea("");
      setFeedbackSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Milestone className="w-3.5 h-3.5" />
            Engineering Roadmap &amp; R&amp;D Lab
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            Product Pipeline &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-white">
              Innovation Lab
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed">
            Monitor real-time progress for our 4 active flagship software systems and upvote incubating concepts in our Research &amp; Idea Lab.
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "active"
                  ? "bg-red-600 text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] scale-105"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Active Engineering (4 Engines)</span>
            </button>
            <button
              onClick={() => setActiveTab("incubator")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "incubator"
                  ? "bg-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] scale-105"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>R&amp;D Incubator &amp; Voting Lab (3 Concepts)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ACTIVE SYSTEMS WITH PROGRESS METRICS */}
        {activeTab === "active" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACTIVE_ENGINES.map((engine, index) => {
              const Icon = engine.icon;
              return (
                <motion.div
                  key={engine.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] via-[#090909] to-black border border-white/10 shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block">
                            {engine.category}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                            {engine.name}
                          </h3>
                        </div>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${engine.phaseColor}`}>
                        {engine.phase}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="my-6">
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-white/60">Development Completion</span>
                        <span className="text-white font-bold">{engine.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-1000"
                          style={{ width: `${engine.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Next Milestone */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 block mb-1">
                        Upcoming Milestone
                      </span>
                      <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                        {engine.nextMilestone}
                      </p>
                    </div>

                    {/* Features in flight */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {engine.featuresInFlight.map((feat, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono text-white/70">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/50">
                    <span>Target Deployment</span>
                    <span className="text-white/80 font-bold">{engine.targetRelease}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* TAB 2: INCUBATOR & UPVOTING LAB */}
        {activeTab === "incubator" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {IDEA_CONCEPTS.map((concept, index) => {
                const hasVoted = votedItems[concept.id];
                const voteCount = votes[concept.id];

                return (
                  <motion.div
                    key={concept.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 sm:p-8 rounded-3xl bg-purple-950/10 border border-purple-500/20 hover:border-purple-500/40 transition-all flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/30 text-purple-300">
                          {concept.category}
                        </span>
                        <span className="text-purple-400 flex items-center gap-1 text-[10px] font-mono">
                          <Lightbulb className="w-3 h-3" /> Incubating
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                        {concept.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-6">
                        {concept.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {concept.tags.map((tag, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] font-mono text-purple-200/70 border border-purple-500/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => handleVote(concept.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          hasVoted
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 active:scale-95"
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? "fill-current" : ""}`} />
                        <span>{hasVoted ? "Upvoted!" : "Vote Interest"}</span>
                      </button>

                      <span className="font-mono text-xs text-white/50">
                        {voteCount} Votes
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Propose Idea Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/30 to-black/60 border border-purple-500/20 max-w-3xl mx-auto text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Have a proprietary software need for your industry?
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light mb-6">
                Our engineering team builds bespoke autonomous neural systems. Propose your workflow and we may incubate it into our product roadmap.
              </p>

              <form onSubmit={handleProposeIdea} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={customIdea}
                  onChange={(e) => setCustomIdea(e.target.value)}
                  placeholder="e.g., Autonomous dental radiography diagnosis or hotel concierge IoT..."
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Concept
                </button>
              </form>

              {feedbackSubmitted && (
                <div className="mt-4 text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Concept received by Leylak Tech Engineering Core!</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
