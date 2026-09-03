"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GitBranch, 
  Play, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Database, 
  ShieldAlert, 
  Send, 
  Cpu, 
  FileCode, 
  Terminal,
  Zap,
  RotateCcw
} from "lucide-react";

interface WorkflowTemplate {
  id: string;
  name: string;
  category: string;
  icon: string;
  nodes: {
    title: string;
    description: string;
    icon: any;
    duration: string;
  }[];
  sampleLogs: string[];
}

const TEMPLATES: WorkflowTemplate[] = [
  {
    id: "lead-to-contract",
    name: "Autonomous Lead & Calendar Sync",
    category: "CRM & Sales Automation",
    icon: "⚡",
    nodes: [
      { title: "Inbound Lead Webhook", description: "Payload ingested from Next.js Form / Voice AI", icon: Zap, duration: "12ms" },
      { title: "Neural Schema Extraction", description: "Gemini models parse budget, timeline, and intents", icon: Cpu, duration: "48ms" },
      { title: "Risk & ICP Scoring", description: "Calculates ICP score (98/100) & validates email domain", icon: ShieldAlert, duration: "18ms" },
      { title: "Supabase DB & CRM Sync", description: "Writes record to leads table and updates Salesforce", icon: Database, duration: "32ms" },
      { title: "Calendar & WhatsApp Dispatch", description: "Locks Google Meet slot & sends SMS confirmation", icon: Send, duration: "30ms" }
    ],
    sampleLogs: [
      "[00:00.012] [TRIGGER] Webhook received from client IP 194.26.29.11",
      "[00:00.060] [AI_PARSE] Extracted budget: '$75,000+', timeline: 'Immediate Q3'",
      "[00:00.078] [ICP_CHECK] Lead matches Tier-1 Enterprise Criteria (Score: 98.4%)",
      "[00:00.110] [DB_MUTATION] Supabase INSERT INTO leads (id: '9b1deb4d') -> HTTP 201 Created",
      "[00:00.140] [DISPATCH] Resend API confirmation + Calendar invite dispatched.",
      "[00:00.140] [STATUS] Pipeline successfully finished in 140ms with ZERO human intervention."
    ]
  },
  {
    id: "invoice-reconciliation",
    name: "Autonomous Invoice Triage & Payout",
    category: "FinTech & Operations",
    icon: "💳",
    nodes: [
      { title: "Vendor PDF Upload", description: "Multi-page invoice document received via email", icon: FileCode, duration: "15ms" },
      { title: "Multimodal Vision OCR", description: "Extracts line items, tax IDs, and payment banking info", icon: Cpu, duration: "65ms" },
      { title: "Purchase Order Matching", description: "Verifies items against ERP purchase orders", icon: ShieldAlert, duration: "25ms" },
      { title: "Ledger State Update", description: "Updates accounting journal & marks accounts payable", icon: Database, duration: "35ms" },
      { title: "Stripe / Banking Trigger", description: "Initiates ACH batch payout & emails remittance slip", icon: Send, duration: "28ms" }
    ],
    sampleLogs: [
      "[00:00.015] [DOCUMENT] Ingested 'Vendor_Invoice_INV-88392.pdf' (2.4 MB)",
      "[00:00.080] [VISION_AI] Identified 14 line items. Total payable: $14,850.00 USD",
      "[00:00.105] [PO_MATCH] PO-2026-993 confirmed with 100% item matching",
      "[00:00.140] [ERP_POST] Journal Entry #8849 posted to general ledger",
      "[00:00.168] [PAYMENT] ACH transfer queued. Approval token dispatched to CFO.",
      "[00:00.168] [STATUS] Pipeline finished in 168ms."
    ]
  }
];

export default function WorkflowSimulator() {
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate>(TEMPLATES[0]);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const runPipeline = () => {
    setIsRunning(true);
    setActiveStep(0);

    const totalSteps = selectedTemplate.nodes.length;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      if (current < totalSteps) {
        setActiveStep(current);
      } else {
        clearInterval(interval);
        setActiveStep(totalSteps); // all done
        setIsRunning(false);
      }
    }, 600);
  };

  const handleReset = () => {
    setActiveStep(-1);
    setIsRunning(false);
  };

  return (
    <div className="w-full rounded-3xl bg-[#080808]/90 border border-white/10 p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Synthetix Automations Pipeline Runner</h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-semibold uppercase tracking-wider">
                Self-Healing Engine
              </span>
            </div>
            <p className="text-xs text-white/50">Run multi-agent deterministic pipelines connecting AI models, databases, and enterprise APIs.</p>
          </div>
        </div>

        {/* Template Selector */}
        <div className="flex items-center gap-2">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => {
                setSelectedTemplate(tmpl);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedTemplate.id === tmpl.id
                  ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10"
              }`}
            >
              <span>{tmpl.icon}</span>
              <span>{tmpl.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Pipeline Node Graph */}
      <div className="my-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
            Autonomous Pipeline Flowchart
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={runPipeline}
              disabled={isRunning}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isRunning
                  ? "bg-purple-600/50 text-white/70 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:brightness-110 active:scale-95"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isRunning ? "Executing Pipeline..." : "Execute Test Pipeline"}
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
          {selectedTemplate.nodes.map((node, index) => {
            const Icon = node.icon;
            const isCompleted = activeStep > index;
            const isCurrent = activeStep === index;
            const isPending = activeStep < index;

            return (
              <motion.div
                key={index}
                className={`relative p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? "bg-purple-950/40 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.3)] scale-[1.02]"
                    : isCompleted
                    ? "bg-emerald-950/20 border-emerald-500/40 text-white"
                    : "bg-white/[0.02] border-white/10 opacity-60"
                }`}
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-white/40">
                    NODE 0{index + 1}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[9px]">
                    {isCompleted ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> {node.duration}
                      </span>
                    ) : isCurrent ? (
                      <span className="text-purple-400 flex items-center gap-1 font-bold animate-pulse">
                        <Cpu className="w-3 h-3 animate-spin" /> RUNNING
                      </span>
                    ) : (
                      <span className="text-white/30">{node.duration}</span>
                    )}
                  </div>
                </div>

                <div className="my-2">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-2">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 tracking-tight">{node.title}</h4>
                  <p className="text-[10px] text-white/50 leading-relaxed">{node.description}</p>
                </div>

                {/* Progress bar on card */}
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-3">
                  <motion.div
                    className={`h-full ${isCompleted ? "bg-emerald-400" : isCurrent ? "bg-purple-400" : "bg-transparent"}`}
                    animate={{ width: isCompleted || isCurrent ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Execution Logs Console */}
      <div className="bg-black/80 rounded-2xl border border-white/10 p-4 font-mono text-[11px] overflow-hidden">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-white/50 text-[10px]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>Autonomous Execution Trace Logs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400">Total Latency: ~140ms</span>
          </div>
        </div>

        <div className="space-y-1 text-white/80 max-h-36 overflow-y-auto scrollbar-thin">
          {activeStep === -1 ? (
            <div className="text-white/40 italic py-2">
              Ready to execute. Click &quot;Execute Test Pipeline&quot; above to watch microservice orchestration in real-time.
            </div>
          ) : (
            selectedTemplate.sampleLogs.slice(0, Math.min(activeStep + 1, selectedTemplate.sampleLogs.length)).map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={i === selectedTemplate.sampleLogs.length - 1 ? "text-emerald-400 font-bold" : "text-white/70"}
              >
                {log}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
