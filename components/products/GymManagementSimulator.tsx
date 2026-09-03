"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dumbbell, 
  Smartphone, 
  Users, 
  Calendar, 
  QrCode, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ShieldAlert, 
  DollarSign, 
  Flame, 
  Activity, 
  Play,
  RotateCcw,
  Sparkles
} from "lucide-react";

type ViewMode = "trainer_app" | "client_app" | "admin_hub";

export default function GymManagementSimulator() {
  const [viewMode, setViewMode] = useState<ViewMode>("client_app");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 1000);
    setTimeout(() => setSimStep(3), 2000);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 3000);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setSimStep(0);
  };

  return (
    <div className="w-full rounded-3xl bg-[#080808]/90 border border-white/10 p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">AI Gym Ecosystem &amp; Dual Mobile Apps</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-semibold uppercase tracking-wider">
                In Active Development
              </span>
            </div>
            <p className="text-xs text-white/50">Multi-platform cloud engine connecting Member App, Trainer App, and Turnstile Access.</p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs self-stretch sm:self-auto">
          <button
            onClick={() => setViewMode("client_app")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              viewMode === "client_app" ? "bg-amber-500 text-black font-bold shadow-md" : "text-white/60 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Client Mobile App
          </button>
          <button
            onClick={() => setViewMode("trainer_app")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              viewMode === "trainer_app" ? "bg-amber-500 text-black font-bold shadow-md" : "text-white/60 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Trainer Mobile App
          </button>
          <button
            onClick={() => setViewMode("admin_hub")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              viewMode === "admin_hub" ? "bg-amber-500 text-black font-bold shadow-md" : "text-white/60 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Gym Admin Hub
          </button>
        </div>
      </div>

      {/* Simulator Interactive Banner */}
      <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Interactive Automation Test: Check-in &rarr; AI Workout Sync &rarr; Trainer Commission</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              isSimulating
                ? "bg-amber-500/50 text-black cursor-not-allowed"
                : "bg-amber-500 text-black hover:bg-amber-400 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isSimulating ? "Automating Actions..." : "Simulate End-to-End Flow"}
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

      {/* Simulation Progress Stepper */}
      {simStep > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="my-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs"
        >
          <div className={`p-2 rounded-xl ${simStep >= 1 ? "bg-amber-500/20 text-amber-300 font-bold" : "text-white/40"}`}>
            1. QR Gate Check-In ({simStep >= 1 ? "✓ Turnstile Unlocked" : "Pending"})
          </div>
          <div className={`p-2 rounded-xl ${simStep >= 2 ? "bg-amber-500/20 text-amber-300 font-bold" : "text-white/40"}`}>
            2. AI Workout Routine Loaded ({simStep >= 2 ? "✓ Hypertrophy Day 3" : "Pending"})
          </div>
          <div className={`p-2 rounded-xl ${simStep >= 3 ? "bg-amber-500/20 text-amber-300 font-bold" : "text-white/40"}`}>
            3. Trainer Notified ({simStep >= 3 ? "✓ Coach Liam Alerted" : "Pending"})
          </div>
          <div className={`p-2 rounded-xl ${simStep >= 4 ? "bg-amber-500/20 text-amber-300 font-bold" : "text-white/40"}`}>
            4. Auto-Billing &amp; Commission ({simStep >= 4 ? "✓ Reconciled $45" : "Pending"})
          </div>
        </motion.div>
      )}

      {/* Dynamic Tab View Mode Container */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {viewMode === "client_app" && (
            <motion.div
              key="client"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Phone Frame for Member App */}
              <div className="lg:col-span-5 bg-black/80 rounded-3xl border border-white/15 p-5 shadow-2xl relative">
                <div className="w-20 h-4 bg-white/10 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <div className="text-[10px] text-white/40 uppercase">Active Member</div>
                    <div className="text-sm font-bold text-white">Alex Mercer (VIP Tier)</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                    ACTIVE PASS
                  </span>
                </div>

                {/* Digital Turnstile QR */}
                <div className="my-4 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/10 text-amber-400">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">NFC &amp; QR Turnstile Key</div>
                      <div className="text-[10px] text-white/50 font-mono">Dynamic Auto-Refresh (14s)</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase bg-amber-500/10 px-2 py-1 rounded">
                    Tap to Scan
                  </span>
                </div>

                {/* AI Workout Planner */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" /> AI Recommended Workout
                    </span>
                    <span className="text-[10px] font-mono text-white/40">Chest &amp; Triceps</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-white/80">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>Incline Dumbbell Press</span>
                      <span className="font-mono text-amber-300">4 sets x 10 reps (32kg)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>Cable Chest Flyes</span>
                      <span className="font-mono text-amber-300">3 sets x 12 reps</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Dips (Bodyweight + 15kg)</span>
                      <span className="font-mono text-amber-300">3 sets to failure</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client App Features List */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    Frictionless Gym Access &amp; Booking
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Members unlock doors and turnstiles via dynamic offline-capable QR/NFC, book classes, reserve 1-on-1 personal trainer slots, and manage subscriptions with Apple Pay &amp; Google Pay.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    AI Personal Coaching &amp; Macro Tracker
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Built-in computer vision form feedback, progressive overload tracker, and automated macro/nutrition plans adjusted dynamically based on member workout frequency.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/5 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white/5">
                    <div className="text-[10px] text-white/40">Check-In Speed</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">0.4s (Instant)</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5">
                    <div className="text-[10px] text-white/40">Member Retention</div>
                    <div className="text-sm font-bold text-amber-400 font-mono">+42% Boost</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5">
                    <div className="text-[10px] text-white/40">Platforms</div>
                    <div className="text-sm font-bold text-white font-mono">iOS &amp; Android</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === "trainer_app" && (
            <motion.div
              key="trainer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Trainer App View */}
              <div className="lg:col-span-5 bg-black/80 rounded-3xl border border-white/15 p-5 shadow-2xl relative">
                <div className="w-20 h-4 bg-white/10 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <div className="text-[10px] text-white/40 uppercase">Certified Coach</div>
                    <div className="text-sm font-bold text-white">Coach Marcus Reed</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-mono font-bold">
                    6 SESSIONS TODAY
                  </span>
                </div>

                {/* Trainer Schedule & Client List */}
                <div className="my-4 space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">09:00 AM — Liam K. (Hypertrophy)</div>
                      <div className="text-[10px] text-white/40 font-mono">Status: Completed • $45 Commission</div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">DONE</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-amber-300">11:30 AM — Sarah V. (Strength)</div>
                      <div className="text-[10px] text-white/50 font-mono">Member checked-in at front gate</div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold animate-pulse">UP NEXT</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/60">Today&apos;s Estimated Earnings:</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">$270.00</span>
                </div>
              </div>

              {/* Trainer App Capabilities */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    Automated Scheduling &amp; Session Tracking
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Trainers set availability, receive instant push notifications when clients book or arrive at the turnstile, and log client PRs and body composition progress with 1 click.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    Automated Commission Splits &amp; Payouts
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Eliminates manual timesheets. The system automatically reconciles completed PT sessions with gym revenue splits and triggers Stripe / bank transfers.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === "admin_hub" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-white/40 mb-1">Active Gym Members</div>
                  <div className="text-2xl font-black text-white font-mono">1,428</div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-semibold">+84 this month</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-white/40 mb-1">Monthly Recurring Revenue</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">$84,500</div>
                  <div className="text-[10px] text-white/40 mt-1">Automated Stripe billing</div>
                </div>

                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30">
                  <div className="text-[10px] uppercase font-bold text-red-400 mb-1 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> AI Churn Prevention Alert
                  </div>
                  <div className="text-2xl font-black text-red-300 font-mono">12 At Risk</div>
                  <div className="text-[10px] text-white/60 mt-1">Auto SMS &amp; free PT session sent</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 text-xs text-white/70 leading-relaxed">
                <div className="font-bold text-white mb-1">Multi-Platform Cloud Architecture:</div>
                Integrates seamlessly with IoT Turnstiles (ZKTeco, Paxton, HID), POS card readers, and Stripe billing. Supports single-location studios up to multi-branch nationwide gym franchises.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
