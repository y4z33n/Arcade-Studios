"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Network, 
  Clock, 
  Zap, 
  TrendingDown, 
  Layers, 
  Server, 
  Users, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Cpu,
  BarChart3,
  Sliders
} from "lucide-react";

type TrafficLoad = "normal" | "peak" | "surge";

interface QueueItem {
  id: string;
  customer: string;
  channel: "Voice" | "WhatsApp" | "Web" | "SMS";
  tier: "VIP Executive" | "Urgent Escalation" | "Standard Support" | "Auto Triage";
  targetNode: string;
  predictedWait: string;
  status: "Optimizing" | "Dispatched" | "Resolved";
}

const INITIAL_QUEUE: QueueItem[] = [
  { id: "REQ-9014", customer: "Apex Global Financial", channel: "Voice", tier: "VIP Executive", targetNode: "Node Alpha (Sub-50ms Dedicated)", predictedWait: "4s", status: "Dispatched" },
  { id: "REQ-9015", customer: "HyperScale Logistics", channel: "WhatsApp", tier: "Urgent Escalation", targetNode: "Node Gamma (Automated Dispatch)", predictedWait: "12s", status: "Dispatched" },
  { id: "REQ-9016", customer: "Solstice Energy", channel: "Web", tier: "Auto Triage", targetNode: "Self-Healing AI Sandbox", predictedWait: "0s", status: "Resolved" },
  { id: "REQ-9017", customer: "CyberCloud Inc", channel: "SMS", tier: "Standard Support", targetNode: "Node Beta (Parallel Worker)", predictedWait: "18s", status: "Optimizing" }
];

export default function QueueSimulator() {
  const [load, setLoad] = useState<TrafficLoad>("normal");
  const [queueItems, setQueueItems] = useState<QueueItem[]>(INITIAL_QUEUE);
  const [processedCount, setProcessedCount] = useState<number>(1420);

  // Dynamic values depending on load mode
  const metrics = {
    normal: {
      volume: "250 req/min",
      traditionalWait: "24.5 min",
      flowWait: "18 sec",
      reduction: "98.8%",
      activeNodes: 12,
      cpuLoad: 28,
      triageSpeed: "14ms"
    },
    peak: {
      volume: "2,500 req/min",
      traditionalWait: "48.2 min",
      flowWait: "32 sec",
      reduction: "98.9%",
      activeNodes: 28,
      cpuLoad: 54,
      triageSpeed: "18ms"
    },
    surge: {
      volume: "15,000 req/min",
      traditionalWait: "115.0 min",
      flowWait: "45 sec",
      reduction: "99.3%",
      activeNodes: 64,
      cpuLoad: 78,
      triageSpeed: "22ms"
    }
  }[load];

  // Periodically add/cycle requests
  useEffect(() => {
    const intervalTime = load === "surge" ? 1200 : load === "peak" ? 2200 : 3500;
    const timer = setInterval(() => {
      setProcessedCount(prev => prev + (load === "surge" ? 18 : load === "peak" ? 5 : 1));
      
      const channels: ("Voice" | "WhatsApp" | "Web" | "SMS")[] = ["Voice", "WhatsApp", "Web", "SMS"];
      const tiers: ("VIP Executive" | "Urgent Escalation" | "Standard Support" | "Auto Triage")[] = [
        "VIP Executive", "Urgent Escalation", "Standard Support", "Auto Triage"
      ];
      const companies = ["Vortex Holdings", "Quantum Telematics", "AeroDynamics Corp", "Atlas BioTech", "Zenith FinTech", "Nova Capital"];
      const nodes = ["Node Alpha (Dedicated)", "Node Beta (Parallel Cluster)", "Node Gamma (Edge Cache)", "Self-Healing AI Sandbox"];

      const newItem: QueueItem = {
        id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
        customer: companies[Math.floor(Math.random() * companies.length)],
        channel: channels[Math.floor(Math.random() * channels.length)],
        tier: tiers[Math.floor(Math.random() * tiers.length)],
        targetNode: nodes[Math.floor(Math.random() * nodes.length)],
        predictedWait: `${Math.floor(Math.random() * 30 + 5)}s`,
        status: Math.random() > 0.3 ? "Dispatched" : "Optimizing"
      };

      setQueueItems(prev => [newItem, ...prev.slice(0, 4)]);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [load]);

  return (
    <div className="w-full rounded-3xl bg-[#080808]/90 border border-white/10 p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Header bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Network className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">FlowQueue AI Real-Time Dispatch Simulator</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">
                Active ML Routing
              </span>
            </div>
            <p className="text-xs text-white/50">Simulate real-time multi-channel queuing, wait time reduction, and neural resource balancing.</p>
          </div>
        </div>

        {/* Load Level Selector */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs self-stretch sm:self-auto">
          {(["normal", "peak", "surge"] as TrafficLoad[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setLoad(mode)}
              className={`px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wider text-[10px] transition-all ${
                load === mode
                  ? "bg-emerald-500 text-black shadow-md font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {mode === "normal" && "Normal (250/m)"}
              {mode === "peak" && "Peak Rush (2.5k/m)"}
              {mode === "surge" && "10x Surge (15k/m)"}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Comparison Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
          <div className="text-[10px] uppercase font-bold tracking-wider text-red-400/80 mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Traditional Queuing Wait
          </div>
          <div className="text-2xl font-black text-red-400 font-mono line-through opacity-80">
            {metrics.traditionalWait}
          </div>
          <div className="text-[10px] text-white/40 mt-1">Linear FIFO bottleneck & call drops</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 animate-bounce" /> FlowQueue AI Wait Time
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {metrics.flowWait}
          </div>
          <div className="text-[10px] text-emerald-300/80 mt-1 font-semibold flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> {metrics.reduction} Faster Resolution
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-blue-400" /> Active Dispatched Nodes
          </div>
          <div className="text-2xl font-black text-white font-mono flex items-center justify-between">
            <span>{metrics.activeNodes} Pods</span>
            <span className="text-xs font-normal text-white/40">{metrics.cpuLoad}% Load</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
            <motion.div 
              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full rounded-full"
              animate={{ width: `${metrics.cpuLoad}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Main Dispatch Stream Table */}
      <div className="bg-black/60 rounded-2xl border border-white/10 p-5 overflow-hidden">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2 font-semibold text-white/80">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Live Omnichannel Intake Stream
          </div>
          <div className="font-mono text-[11px] text-white/40">
            Total Requests Processed: <span className="text-emerald-400 font-bold">{processedCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <AnimatePresence>
            {queueItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold text-white/40 px-2 py-1 rounded bg-white/5">
                    {item.id}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      {item.customer}
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-white/70">
                        {item.channel}
                      </span>
                    </div>
                    <div className="text-[10px] text-white/50 flex items-center gap-1.5 mt-0.5">
                      <ArrowRight className="w-2.5 h-2.5 text-emerald-400" />
                      Routed to: <span className="text-white/80 font-mono">{item.targetNode}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    item.tier === "VIP Executive"
                      ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                      : item.tier === "Urgent Escalation"
                      ? "bg-red-500/10 border-red-500/30 text-red-300"
                      : "bg-blue-500/10 border-blue-500/30 text-blue-300"
                  }`}>
                    {item.tier}
                  </span>

                  <div className="text-right font-mono">
                    <div className="text-[11px] font-bold text-emerald-400">{item.predictedWait} wait</div>
                    <div className="text-[9px] text-white/40 flex items-center justify-end gap-1">
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                      {item.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-2">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Dynamic Routing Engine Latency: <span className="text-emerald-400 font-bold">{metrics.triageSpeed}</span>
          </div>
          <div className="text-white/50">Supports Twilio, SIP, WhatsApp Cloud API, LiveChat & Webhooks</div>
        </div>
      </div>
    </div>
  );
}
