"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  RotateCcw,
  Zap,
  Radio,
  Cpu,
  Code,
  Headphones,
  CalendarCheck,
  LifeBuoy
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  initialTranscript: {
    speaker: "user" | "agent";
    text: string;
    timestamp: string;
    sentiment?: string;
  }[];
  extractedData: Record<string, any>;
  telemetry: {
    latency: number;
    sentimentScore: number;
    tokensPerSec: number;
    role: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "receptionist-booking",
    name: "Front-Desk AI Receptionist",
    category: "Appointment Scheduling",
    icon: "📅",
    description: "Answers customer calls, checks live executive/team calendar availability, qualifies requirements, and confirms bookings with zero human reception overhead.",
    initialTranscript: [
      { speaker: "agent", text: "Hello, thank you for calling Leylak Tech. I'm your AI front-desk executive. How can I assist you today?", timestamp: "00:01", sentiment: "Welcoming" },
      { speaker: "user", text: "Hi! I'd like to schedule an in-person discovery consultation for our company next Tuesday afternoon.", timestamp: "00:06", sentiment: "Inquisitive" },
      { speaker: "agent", text: "I'd be glad to arrange that. I have openings with our solutions lead on Tuesday at 2:30 PM or 4:00 PM. Which works best for you?", timestamp: "00:11", sentiment: "Helpful" },
      { speaker: "user", text: "2:30 PM is great. The appointment is for Liam from Horizon Media.", timestamp: "00:16", sentiment: "Confirmed" },
      { speaker: "agent", text: "Perfect, Liam. I've locked in Tuesday at 2:30 PM for Horizon Media. Would you like a WhatsApp or SMS confirmation sent to this number?", timestamp: "00:21", sentiment: "Attentive" },
      { speaker: "user", text: "WhatsApp please!", timestamp: "00:25", sentiment: "Delighted" },
      { speaker: "agent", text: "Confirmation and location pin have been dispatched to your WhatsApp. We look forward to meeting you next Tuesday at 2:30 PM!", timestamp: "00:29", sentiment: "Affirmative" }
    ],
    extractedData: {
      call_role: "AI_RECEPTIONIST_SCHEDULER",
      caller_name: "Liam",
      organization: "Horizon Media",
      scheduled_slot: "Next Tuesday @ 2:30 PM",
      calendar_sync_status: "LOCKED_GOOGLE_CALENDAR",
      notification_dispatched: "WHATSAPP_CONFIRMATION_SENT",
      booking_id: "BK-2026-889"
    },
    telemetry: {
      latency: 142,
      sentimentScore: 99,
      tokensPerSec: 92,
      role: "Front-Desk Receptionist"
    }
  },
  {
    id: "virtual-call-center",
    name: "Virtual Call Center Support",
    category: "Multi-Product Support",
    icon: "🎧",
    description: "Acts as a full-tier customer support call center agent: looks up past orders/tickets, troubleshoots multi-product issues, and issues instant refunds/replacements.",
    initialTranscript: [
      { speaker: "agent", text: "Welcome to Customer Support. I'm your AI support specialist. Please tell me your order ID or what you need help with.", timestamp: "00:01", sentiment: "Attentive" },
      { speaker: "user", text: "Hi, I have an issue with my subscription invoice #INV-4921. I was billed twice for the enterprise addon.", timestamp: "00:07", sentiment: "Frustrated" },
      { speaker: "agent", text: "I understand how frustrating that is. Let me pull up invoice #INV-4921 in our billing database right now...", timestamp: "00:11", sentiment: "Empathetic" },
      { speaker: "agent", text: "I see the duplicate charge of $120 from yesterday's server sync. I've immediately processed a direct refund of $120 to your card on file and credited 500 bonus API calls to your account.", timestamp: "00:16", sentiment: "Decisive Action" },
      { speaker: "user", text: "Wow, that was fast! Thank you so much.", timestamp: "00:21", sentiment: "Very Satisfied" },
      { speaker: "agent", text: "You're very welcome! The refund receipt has been sent to your email. Is there anything else I can resolve for you today?", timestamp: "00:26", sentiment: "Supportive" }
    ],
    extractedData: {
      call_role: "VIRTUAL_CALL_CENTER_AGENT",
      ticket_id: "TICK-88402",
      issue_type: "BILLING_DUPLICATE_CHARGE",
      order_ref: "INV-4921",
      action_taken: "REFUND_PROCESSED_$120.00",
      bonus_credit_applied: "500_API_CALLS",
      customer_satisfaction: "RESOLVED_FIRST_CONTACT_100%"
    },
    telemetry: {
      latency: 148,
      sentimentScore: 98,
      tokensPerSec: 88,
      role: "Virtual Call Center Agent"
    }
  },
  {
    id: "after-hours-triage",
    name: "24/7 After-Hours Emergency Triage",
    category: "Intelligent Escalation",
    icon: "🚨",
    description: "Handles midnight inbound customer emergencies, evaluates urgency level, and triggers seamless warm-transfers to on-call human specialists.",
    initialTranscript: [
      { speaker: "agent", text: "You've reached our 24/7 emergency assistance line. Please describe your situation so I can assist or route you immediately.", timestamp: "00:01", sentiment: "Alert" },
      { speaker: "user", text: "Our main warehouse database is locked and 50 drivers can't dispatch their morning routes!", timestamp: "00:06", sentiment: "High Urgency" },
      { speaker: "agent", text: "Understood, this is categorized as a Tier-1 Emergency. I am performing a live database health ping and ringing our lead on-call SRE Liam right now. Please hold for 5 seconds.", timestamp: "00:11", sentiment: "Authoritative" },
      { speaker: "agent", text: "Liam is on the line with full context of your warehouse fleet. Connecting you now...", timestamp: "00:15", sentiment: "Warm Transfer" }
    ],
    extractedData: {
      call_role: "EMERGENCY_AFTER_HOURS_TRIAGE",
      urgency_level: "P1_CRITICAL",
      affected_system: "Warehouse Dispatch DB",
      escalation_target: "Lead SRE Liam",
      transfer_mode: "WARM_TRANSFER_WITH_TRANSCRIPT",
      call_dropped: false
    },
    telemetry: {
      latency: 135,
      sentimentScore: 96,
      tokensPerSec: 94,
      role: "Emergency Triage Agent"
    }
  }
];

export default function VoiceCallSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [callActive, setCallActive] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"transcript" | "payload">("transcript");
  const transcriptScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callActive) {
      if (stepIndex < selectedScenario.initialTranscript.length) {
        timer = setTimeout(() => {
          setStepIndex(prev => prev + 1);
        }, 2200);
      }
    }
    return () => clearTimeout(timer);
  }, [callActive, stepIndex, selectedScenario]);

  useEffect(() => {
    if (transcriptScrollRef.current) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, [stepIndex, viewMode]);

  const handleStartCall = () => {
    setCallActive(true);
    setStepIndex(1);
  };

  const handleEndCall = () => {
    setCallActive(false);
  };

  const handleReset = () => {
    setCallActive(false);
    setStepIndex(0);
  };

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCallActive(false);
    setStepIndex(0);
  };

  const displayedTranscript = selectedScenario.initialTranscript.slice(0, Math.max(1, stepIndex));

  return (
    <div className="w-full rounded-3xl bg-[#080808]/90 border border-white/10 p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <Headphones className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">AI Receptionist & Virtual Call Center Testbench</h3>
              <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-semibold uppercase tracking-wider">
                In Active Development
              </span>
            </div>
            <p className="text-xs text-white/50">Simulate appointment booking, multi-item customer support, and instant database tool execution.</p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs self-stretch sm:self-auto">
          <button
            onClick={() => setViewMode("transcript")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium ${
              viewMode === "transcript" 
                ? "bg-red-600 text-white shadow-md" 
                : "text-white/60 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Live Voice Dialogue
          </button>
          <button
            onClick={() => setViewMode("payload")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium ${
              viewMode === "payload" 
                ? "bg-red-600 text-white shadow-md" 
                : "text-white/60 hover:text-white"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Calendar & CRM Payload
          </button>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="py-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2 block">
          Select AI Agent Role:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SCENARIOS.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario)}
                className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-red-600/20 to-orange-600/10 border-red-500/50 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                    : "bg-white/[0.02] border-white/5 text-white/70 hover:bg-white/[0.05] hover:border-white/15"
                }`}
              >
                <span className="text-xl p-2 rounded-xl bg-white/5 border border-white/10">{scenario.icon}</span>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">{scenario.name}</div>
                  <div className="text-[10px] text-white/50 truncate">{scenario.category}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Main Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        {/* Left: Orb and Waveform */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-black/60 rounded-2xl border border-white/10 p-6 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-white/60 mb-4">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${callActive ? "bg-emerald-400 animate-pulse" : "bg-white/20"}`} />
              <span className="font-mono">{callActive ? "CALL CONNECTED" : "AGENT IDLE"}</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] text-red-400">
              <Zap className="w-3 h-3" />
              {selectedScenario.telemetry.latency}ms RT
            </div>
          </div>

          <div className="my-auto py-6 flex flex-col items-center justify-center relative">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <motion.div
                animate={callActive ? { scale: [1, 1.35, 1], opacity: [0.3, 0.7, 0.3] } : { scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-orange-500 blur-2xl -z-10"
              />
              <motion.div
                animate={callActive ? { scale: [1, 1.15, 1], rotate: 360 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border border-red-500/40 bg-gradient-to-br from-red-950/80 to-black flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]"
              >
                <Sparkles className={`w-8 h-8 ${callActive ? "text-red-400 animate-pulse" : "text-white/30"}`} />
              </motion.div>
            </div>

            {/* Audio Waveform */}
            <div className="flex items-center justify-center gap-1.5 h-10 mt-6 w-full max-w-[220px]">
              {[15, 30, 55, 85, 40, 75, 95, 70, 90, 45, 80, 35, 18].map((height, i) => (
                <motion.div
                  key={i}
                  animate={
                    callActive
                      ? {
                          height: [`${Math.max(10, height * 0.3)}%`, `${height}%`, `${Math.max(15, height * 0.4)}%`],
                          opacity: [0.6, 1, 0.6]
                        }
                      : { height: "15%", opacity: 0.2 }
                  }
                  transition={{
                    duration: 0.6 + (i % 4) * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.05
                  }}
                  className="w-1.5 bg-gradient-to-t from-red-600 via-orange-500 to-white rounded-full"
                />
              ))}
            </div>

            <div className="mt-3 text-center">
              <span className="text-xs font-mono tracking-widest text-white/50 uppercase">
                {callActive ? (stepIndex % 2 === 1 ? "AI Agent Speaking" : "Customer Inquiring") : "Ready to simulate"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/10">
            {!callActive ? (
              <button
                onClick={handleStartCall}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:brightness-110 active:scale-95 transition-all w-full justify-center"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                Simulate Call &amp; Appointment
              </button>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <button
                  onClick={handleEndCall}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-xs hover:bg-red-500/30 transition-all"
                >
                  <PhoneOff className="w-4 h-4" />
                  End Call
                </button>
                <button
                  onClick={handleReset}
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all"
                  title="Reset Dialogue"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Transcript or Payload */}
        <div className="lg:col-span-7 bg-black/60 rounded-2xl border border-white/10 p-6 flex flex-col justify-between h-[420px] overflow-hidden">
          {viewMode === "transcript" ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="font-semibold text-white/80 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-500" />
                  Live Conversational Dialogue Stream
                </span>
                <span className="text-[11px] font-mono text-white/40">
                  Step {Math.min(stepIndex, selectedScenario.initialTranscript.length)} / {selectedScenario.initialTranscript.length}
                </span>
              </div>

              <div 
                ref={transcriptScrollRef}
                className="flex-1 overflow-y-auto space-y-3.5 my-3 pr-2 scrollbar-thin scrollbar-thumb-red-600/30"
              >
                <AnimatePresence>
                  {displayedTranscript.map((entry, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className={`flex flex-col ${entry.speaker === "agent" ? "items-start" : "items-end"}`}
                    >
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          entry.speaker === "agent" ? "text-red-400" : "text-blue-400"
                        }`}>
                          {entry.speaker === "agent" ? "AI Executive" : "Customer Caller"}
                        </span>
                        <span className="text-[9px] font-mono text-white/30">{entry.timestamp}</span>
                        {entry.sentiment && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-white/50 border border-white/5">
                            {entry.sentiment}
                          </span>
                        )}
                      </div>
                      <div
                        className={`max-w-[88%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                          entry.speaker === "agent"
                            ? "bg-red-950/30 border border-red-500/20 text-white/90 rounded-tl-sm shadow-sm"
                            : "bg-white/10 border border-white/15 text-white rounded-tr-sm shadow-sm"
                        }`}
                      >
                        {entry.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {callActive && stepIndex < selectedScenario.initialTranscript.length && (
                  <div className="flex items-center gap-2 text-xs text-red-400/80 p-2 font-mono">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                    Executing real-time tool calling &amp; voice synthesis...
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="font-semibold text-white/80 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-red-500" />
                  Calendar Appointment Lock &amp; CRM Sync Payload
                </span>
                <span className="text-[11px] font-mono text-emerald-400">DATABASE SYNCED</span>
              </div>
              <div className="flex-1 overflow-y-auto my-3 bg-black/90 p-4 rounded-xl border border-white/5 font-mono text-[11px] text-white/80 leading-relaxed scrollbar-thin">
                <pre className="text-emerald-400 font-mono">
                  {JSON.stringify(selectedScenario.extractedData, null, 2)}
                </pre>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-[9px] uppercase tracking-wider text-white/40">Latency</div>
              <div className="text-xs font-bold text-emerald-400 font-mono">{selectedScenario.telemetry.latency}ms</div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-[9px] uppercase tracking-wider text-white/40">CSAT Score</div>
              <div className="text-xs font-bold text-white font-mono">{selectedScenario.telemetry.sentimentScore}% Positive</div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-[9px] uppercase tracking-wider text-white/40">Speed</div>
              <div className="text-xs font-bold text-white font-mono">{selectedScenario.telemetry.tokensPerSec} tok/s</div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-[9px] uppercase tracking-wider text-white/40">Role</div>
              <div className="text-xs font-bold text-red-400 font-mono truncate">{selectedScenario.telemetry.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
