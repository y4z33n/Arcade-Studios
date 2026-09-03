"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Fuel, 
  Calculator, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  FileSpreadsheet, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  Gauge,
  Layers
} from "lucide-react";

export default function FuelPumpSimulator() {
  const [isReconciling, setIsReconciling] = useState<boolean>(false);
  const [reconciled, setReconciled] = useState<boolean>(false);

  const handleReconcileShift = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setIsReconciling(false);
      setReconciled(true);
    }, 1200);
  };

  const handleReset = () => {
    setReconciled(false);
    setIsReconciling(false);
  };

  return (
    <div className="w-full rounded-3xl bg-[#080808]/90 border border-white/10 p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Fuel className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Fuel Station &amp; Automated Accounting Engine</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">
                In Active Development
              </span>
            </div>
            <p className="text-xs text-white/50">Real-time nozzle meters, underground tank dipstick telemetry, and automated shift accounting.</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReconcileShift}
            disabled={isReconciling}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isReconciling
                ? "bg-emerald-500/50 text-black cursor-not-allowed"
                : "bg-emerald-500 text-black hover:bg-emerald-400 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            {isReconciling ? "Reconciling Shift Ledgers..." : "Run Auto-Shift Reconciliation"}
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

      {/* Real-time Tank Levels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50 mb-2">
            <span className="font-bold text-white">Underground Tank 01 (Diesel)</span>
            <span className="font-mono text-emerald-400">85% Full</span>
          </div>
          <div className="text-xl font-black text-white font-mono mb-2">
            42,500 L <span className="text-xs font-normal text-white/40">/ 50,000 L</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[85%]" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50 mb-2">
            <span className="font-bold text-white">Underground Tank 02 (Unleaded 95)</span>
            <span className="font-mono text-emerald-400">76% Full</span>
          </div>
          <div className="text-xl font-black text-white font-mono mb-2">
            38,200 L <span className="text-xs font-normal text-white/40">/ 50,000 L</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[76%]" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50 mb-2">
            <span className="font-bold text-white">Underground Tank 03 (Super V-Power)</span>
            <span className="font-mono text-amber-400">42% (Refill Ordered)</span>
          </div>
          <div className="text-xl font-black text-white font-mono mb-2">
            10,500 L <span className="text-xs font-normal text-white/40">/ 25,000 L</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full w-[42%]" />
          </div>
        </div>
      </div>

      {/* Main Reconciliation Output & Ledger Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Dispenser Nozzles */}
        <div className="lg:col-span-6 bg-black/60 rounded-2xl border border-white/10 p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
            <span className="font-bold text-white/80 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-emerald-400" />
              Live Pump Dispenser Telemetry
            </span>
            <span className="font-mono text-[10px] text-emerald-400">8 NOZZLES ONLINE</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div>
                <div className="font-bold text-white font-sans">Pump 01 — Nozzle A (Diesel)</div>
                <div className="text-[10px] text-white/40">Attendant: Jean-Marc • Totalizer: 842,910 L</div>
              </div>
              <div className="text-right text-emerald-400 font-bold">$1,420.50 (920 L)</div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div>
                <div className="font-bold text-white font-sans">Pump 02 — Nozzle B (Unleaded 95)</div>
                <div className="text-[10px] text-white/40">Attendant: Priya R. • Totalizer: 614,280 L</div>
              </div>
              <div className="text-right text-emerald-400 font-bold">$2,840.00 (1,840 L)</div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div>
                <div className="font-bold text-white font-sans">Pump 03 — Nozzle C (V-Power)</div>
                <div className="text-[10px] text-white/40">Attendant: David T. • Totalizer: 312,190 L</div>
              </div>
              <div className="text-right text-emerald-400 font-bold">$980.20 (540 L)</div>
            </div>
          </div>
        </div>

        {/* Right: Automated Accounting Ledger Journal Entry */}
        <div className="lg:col-span-6 bg-black/80 rounded-2xl border border-emerald-500/30 p-5 flex flex-col justify-between shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                Shift End Ledger Reconciliation
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                reconciled ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
              }`}>
                {reconciled ? "✓ RECONCILED 100%" : "READY FOR SHIFT END"}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono text-white/80">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Total Fuel Dispensed (Liters):</span>
                <span className="font-bold text-white">14,280.00 L</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Total POS Revenue Reconciled:</span>
                <span className="font-bold text-emerald-400">$22,848.00 USD</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Card Payments vs Cash In Hand:</span>
                <span className="text-white">$14,500 (Card) / $8,348 (Cash)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/50">Fuel Loss / Variance Check:</span>
                <span className="text-emerald-400 font-bold">0.00 L (Zero Discrepancy)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Auto-syncs to QuickBooks, SAP &amp; Xero
            </span>
            <span className="font-mono text-emerald-400">Zero Theft Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
