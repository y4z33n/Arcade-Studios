"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  ArrowRight, 
  Zap, 
  Sparkles,
  ShieldCheck,
  Headphones,
  Dumbbell,
  HeartPulse,
  Fuel,
  CheckCircle2
} from "lucide-react";

interface RoiCalculatorProps {
  onOpenPilotModal: (product?: string) => void;
}

type IndustryMode = "voice" | "gym" | "hospital" | "fuel";

export default function RoiCalculator({ onOpenPilotModal }: RoiCalculatorProps) {
  const [industry, setIndustry] = useState<IndustryMode>("voice");

  // Mode 1: Voice AI State
  const [monthlyCalls, setMonthlyCalls] = useState<number>(10000);
  const [handlingTime, setHandlingTime] = useState<number>(6); // minutes
  const [teamSize, setTeamSize] = useState<number>(8); // agents

  // Mode 2: Gym State
  const [gymMembers, setGymMembers] = useState<number>(650);
  const [monthlyDues, setMonthlyDues] = useState<number>(80); // $/mo
  const [monthlyChurn, setMonthlyChurn] = useState<number>(8); // %

  // Mode 3: Hospital State
  const [dailyPatients, setDailyPatients] = useState<number>(350);
  const [avgWaitMinutes, setAvgWaitMinutes] = useState<number>(65); // minutes
  const [doctorRooms, setDoctorRooms] = useState<number>(12); // rooms

  // Mode 4: Fuel State
  const [stationCount, setStationCount] = useState<number>(4);
  const [monthlyFuelLiters, setMonthlyFuelLiters] = useState<number>(400000); // L
  const [fuelPricePerLiter, setFuelPricePerLiter] = useState<number>(1.25); // $

  // Calculations: Voice
  const avgHourlyCost = 28;
  const aiAutomationRatio = 0.78;
  const humanAssistedTimeReduction = 0.60;
  const voiceTotalMonthlyHours = (monthlyCalls * handlingTime) / 60;
  const voiceHoursSavedMonth = Math.round(voiceTotalMonthlyHours * aiAutomationRatio + (voiceTotalMonthlyHours * (1 - aiAutomationRatio) * humanAssistedTimeReduction));
  const voiceTraditionalCost = (voiceTotalMonthlyHours * avgHourlyCost) + (teamSize * 450);
  const voiceAiCost = (monthlyCalls * 0.08) + (teamSize * 0.3 * avgHourlyCost * 160 * 0.4);
  const voiceAnnualSavings = Math.max(15000, Math.round((voiceTraditionalCost - voiceAiCost) * 12));
  const voiceCsatBoost = Math.min(48, Math.round(20 + (monthlyCalls / 5000) * 2));

  // Calculations: Gym
  const churnedMembersMonthly = (gymMembers * (monthlyChurn / 100));
  const churnReduced = churnedMembersMonthly * 0.34; // 34% reduction in churn
  const annualRetainedRevenue = Math.round(churnReduced * monthlyDues * 12);
  const unstaffedGateHoursSavedYear = 365 * 6; // 6 hours/day unstaffed front desk = 2,190 hrs
  const laborSavingsGym = Math.round(unstaffedGateHoursSavedYear * 18);
  const gymTotalAnnualGain = annualRetainedRevenue + laborSavingsGym;

  // Calculations: Hospital
  const annualPatients = dailyPatients * 365;
  const waitMinutesSavedPerPatient = Math.round(avgWaitMinutes * 0.85); // 85% wait drop
  const totalPatientWaitHoursSavedYear = Math.round((annualPatients * waitMinutesSavedPerPatient) / 60);
  const throughputIncreasePct = 28; // 28% more patient consultations accommodated per room
  const noShowRecoveryAnnual = Math.round(annualPatients * 0.06 * 45); // $45 clinic consult fee

  // Calculations: Fuel
  const annualLiters = monthlyFuelLiters * 12;
  const shrinkagePreventedLiters = Math.round(annualLiters * 0.004); // 0.4% shrinkage / theft eliminated
  const annualFuelSavedDollars = Math.round(shrinkagePreventedLiters * fuelPricePerLiter);
  const bookkeepingHoursSavedYear = stationCount * 365 * 1.5; // 1.5 hrs/day per station
  const bookkeepingDollarSavings = Math.round(bookkeepingHoursSavedYear * 22);
  const fuelTotalAnnualGain = annualFuelSavedDollars + bookkeepingDollarSavings;

  return (
    <section id="roi-calculator" className="py-20 md:py-28 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-red-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Calculator className="w-3.5 h-3.5" />
            Enterprise Value &amp; ROI Simulator
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            Model Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-white">
              Autonomous ROI
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed">
            Select your industry vertical to simulate cost deflection, labor optimization, and bottom-line revenue gains.
          </p>

          {/* Industry Mode Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setIndustry("voice")}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                industry === "voice"
                  ? "bg-red-600 text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] scale-105"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Voice AI &amp; Call Center</span>
            </button>
            <button
              onClick={() => setIndustry("gym")}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                industry === "gym"
                  ? "bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Gym &amp; Fitness Hub</span>
            </button>
            <button
              onClick={() => setIndustry("hospital")}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                industry === "hospital"
                  ? "bg-cyan-500 text-black shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Hospital &amp; Clinic Queuing</span>
            </button>
            <button
              onClick={() => setIndustry("fuel")}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                industry === "fuel"
                  ? "bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-105"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              <Fuel className="w-3.5 h-3.5" />
              <span>Fuel Station &amp; Accounting</span>
            </button>
          </div>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gradient-to-b from-white/[0.05] via-[#090909] to-black rounded-[2.5rem] border border-white/10 p-6 sm:p-10 lg:p-14 backdrop-blur-2xl shadow-2xl">
          
          {/* Sliders Area (Left) */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {/* 1. VOICE AI CALCULATOR */}
              {industry === "voice" && (
                <motion.div
                  key="voice-calc"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-red-500" />
                    Telephony &amp; Support Parameters
                  </h3>

                  {/* Slider 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Monthly Inbound Calls / Inquiries
                      </label>
                      <span className="text-base font-bold text-red-400 font-mono">
                        {monthlyCalls.toLocaleString()} / mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={monthlyCalls}
                      onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>1,000</span>
                      <span>50,000</span>
                      <span>100,000+</span>
                    </div>
                  </div>

                  {/* Slider 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Average Handling Duration
                      </label>
                      <span className="text-base font-bold text-orange-400 font-mono">
                        {handlingTime} Minutes
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={handlingTime}
                      onChange={(e) => setHandlingTime(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>1 Min (Quick)</span>
                      <span>10 Min</span>
                      <span>20 Min (Complex)</span>
                    </div>
                  </div>

                  {/* Slider 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Reception / Support Team Size
                      </label>
                      <span className="text-base font-bold text-white font-mono">
                        {teamSize} Staff
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>1 Staff</span>
                      <span>25 Staff</span>
                      <span>50+ Staff</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. GYM CALCULATOR */}
              {industry === "gym" && (
                <motion.div
                  key="gym-calc"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-amber-500" />
                    Facility &amp; Membership Parameters
                  </h3>

                  {/* Slider 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Active Gym Members
                      </label>
                      <span className="text-base font-bold text-amber-400 font-mono">
                        {gymMembers.toLocaleString()} Members
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="5000"
                      step="50"
                      value={gymMembers}
                      onChange={(e) => setGymMembers(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>100</span>
                      <span>2,500</span>
                      <span>5,000+</span>
                    </div>
                  </div>

                  {/* Slider 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Average Monthly Membership Dues
                      </label>
                      <span className="text-base font-bold text-orange-400 font-mono">
                        ${monthlyDues} / month
                      </span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="250"
                      step="5"
                      value={monthlyDues}
                      onChange={(e) => setMonthlyDues(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>$30 (Budget)</span>
                      <span>$120</span>
                      <span>$250 (Luxury)</span>
                    </div>
                  </div>

                  {/* Slider 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Current Monthly Member Churn
                      </label>
                      <span className="text-base font-bold text-white font-mono">
                        {monthlyChurn}% / month
                      </span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="20"
                      step="1"
                      value={monthlyChurn}
                      onChange={(e) => setMonthlyChurn(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>3% (Low)</span>
                      <span>10% (Avg)</span>
                      <span>20% (High)</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. HOSPITAL QUEUE CALCULATOR */}
              {industry === "hospital" && (
                <motion.div
                  key="hospital-calc"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-cyan-500" />
                    Clinical Outpatient &amp; Triage Volume
                  </h3>

                  {/* Slider 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Daily Outpatient Consultations
                      </label>
                      <span className="text-base font-bold text-cyan-400 font-mono">
                        {dailyPatients.toLocaleString()} Patients / day
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="1500"
                      step="25"
                      value={dailyPatients}
                      onChange={(e) => setDailyPatients(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>50</span>
                      <span>750</span>
                      <span>1,500+</span>
                    </div>
                  </div>

                  {/* Slider 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Current Avg Waiting Room Delay
                      </label>
                      <span className="text-base font-bold text-blue-400 font-mono">
                        {avgWaitMinutes} Minutes
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="120"
                      step="5"
                      value={avgWaitMinutes}
                      onChange={(e) => setAvgWaitMinutes(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>15 Min</span>
                      <span>60 Min</span>
                      <span>120 Min (Severe)</span>
                    </div>
                  </div>

                  {/* Slider 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Active Doctor Consultation Rooms
                      </label>
                      <span className="text-base font-bold text-white font-mono">
                        {doctorRooms} Doctor Rooms
                      </span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="60"
                      step="1"
                      value={doctorRooms}
                      onChange={(e) => setDoctorRooms(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>3 Rooms</span>
                      <span>30 Rooms</span>
                      <span>60+ Rooms</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 4. FUEL CALCULATOR */}
              {industry === "fuel" && (
                <motion.div
                  key="fuel-calc"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-emerald-500" />
                    Station Network &amp; Fuel Throughput
                  </h3>

                  {/* Slider 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Number of Service Stations
                      </label>
                      <span className="text-base font-bold text-emerald-400 font-mono">
                        {stationCount} Stations
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      value={stationCount}
                      onChange={(e) => setStationCount(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>1 Station</span>
                      <span>25</span>
                      <span>50 Stations</span>
                    </div>
                  </div>

                  {/* Slider 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Monthly Liters Pumped (Network Total)
                      </label>
                      <span className="text-base font-bold text-teal-400 font-mono">
                        {monthlyFuelLiters.toLocaleString()} Liters
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50000"
                      max="2000000"
                      step="50000"
                      value={monthlyFuelLiters}
                      onChange={(e) => setMonthlyFuelLiters(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>50,000 L</span>
                      <span>1,000,000 L</span>
                      <span>2,000,000 L</span>
                    </div>
                  </div>

                  {/* Slider 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        Average Price per Liter ($)
                      </label>
                      <span className="text-base font-bold text-white font-mono">
                        ${fuelPricePerLiter.toFixed(2)} / L
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.80"
                      max="2.50"
                      step="0.05"
                      value={fuelPricePerLiter}
                      onChange={(e) => setFuelPricePerLiter(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>$0.80</span>
                      <span>$1.60</span>
                      <span>$2.50</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-white/50 flex items-center gap-2 mt-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {industry === "voice" && "Based on 78% autonomous voice resolution, $28/hr median wage, and zero hold time."}
                {industry === "gym" && "Based on 34% reduction in member churn and 6 hrs/day unstaffed dynamic QR turnstiles."}
                {industry === "hospital" && "Based on 85% wait time reduction, dynamic doctor room pacing, and SMS queue passes."}
                {industry === "fuel" && "Based on 0.4% pump discrepancy recovery and automated 1-click accounting ledgers."}
              </span>
            </div>
          </div>

          {/* Computed Results (Right) */}
          <div className="lg:col-span-6 bg-black/80 rounded-3xl border border-red-500/20 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_40px_rgba(220,38,38,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Projected Annual Enterprise Impact
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                  HIGH CONFIDENCE MODEL
                </span>
              </div>

              {/* Huge Annual Hero Metric */}
              <div className="mb-8">
                <div className="text-xs uppercase font-bold tracking-widest text-red-400 mb-1">
                  {industry === "voice" && "Estimated Annual Cost Savings"}
                  {industry === "gym" && "Retained Revenue & Labor Gains"}
                  {industry === "hospital" && "Annual Patient Hours Restored"}
                  {industry === "fuel" && "Annual Fuel Shrinkage & Labor Saved"}
                </div>
                <div className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-400 font-mono">
                  {industry === "voice" && `$${voiceAnnualSavings.toLocaleString()}`}
                  {industry === "gym" && `$${gymTotalAnnualGain.toLocaleString()}`}
                  {industry === "hospital" && `${totalPatientWaitHoursSavedYear.toLocaleString()} hrs`}
                  {industry === "fuel" && `$${fuelTotalAnnualGain.toLocaleString()}`}
                  <span className="text-sm font-sans font-normal text-white/40 block sm:inline sm:ml-2">/ year</span>
                </div>
              </div>

              {/* Sub-Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {industry === "voice" && (
                  <>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">
                        <Clock className="w-3.5 h-3.5" /> Hours Saved
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        {voiceHoursSavedMonth.toLocaleString()} <span className="text-xs font-normal text-white/50">hrs/mo</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">
                        <TrendingUp className="w-3.5 h-3.5" /> CSAT Boost
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        +{voiceCsatBoost}% <span className="text-xs font-normal text-white/50">Lift</span>
                      </div>
                    </div>
                  </>
                )}

                {industry === "gym" && (
                  <>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
                        <Users className="w-3.5 h-3.5" /> Churn Drop
                      </div>
                      <div className="text-2xl font-black text-amber-400 font-mono">
                        -34% <span className="text-xs font-normal text-white/50">Attrition</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">
                        <Clock className="w-3.5 h-3.5" /> Gate Access
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        2,190 <span className="text-xs font-normal text-white/50">hrs/yr unstaffed</span>
                      </div>
                    </div>
                  </>
                )}

                {industry === "hospital" && (
                  <>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">
                        <Clock className="w-3.5 h-3.5" /> Wait Reduction
                      </div>
                      <div className="text-2xl font-black text-cyan-400 font-mono">
                        -85% <span className="text-xs font-normal text-white/50">Delay</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">
                        <TrendingUp className="w-3.5 h-3.5" /> Extra Capacity
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        +{throughputIncreasePct}% <span className="text-xs font-normal text-white/50">Patients</span>
                      </div>
                    </div>
                  </>
                )}

                {industry === "fuel" && (
                  <>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">
                        <Fuel className="w-3.5 h-3.5" /> Fuel Protected
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        {shrinkagePreventedLiters.toLocaleString()} <span className="text-xs font-normal text-white/50">L/yr</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-teal-400 font-bold uppercase tracking-wider mb-1">
                        <Clock className="w-3.5 h-3.5" /> Shift Close
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        &lt; 10s <span className="text-xs font-normal text-white/50">Instant Ledger</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => onOpenPilotModal(industry === "voice" ? "auracall" : industry === "gym" ? "gym" : industry === "hospital" ? "hospital" : "fuel")}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-orange-600 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4" />
                Claim Your Custom Enterprise Pilot Plan
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
