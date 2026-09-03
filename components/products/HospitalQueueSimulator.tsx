"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HeartPulse, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Stethoscope, 
  Zap, 
  TrendingDown, 
  Smartphone,
  ShieldCheck,
  RotateCcw,
  Sparkles
} from "lucide-react";

interface PatientQueueItem {
  id: string;
  patient: string;
  department: string;
  severity: "Emergency" | "Urgent" | "Standard" | "Lab/Vitals";
  allocatedDoctor: string;
  room: string;
  estWait: string;
  status: "Called" | "In Consultation" | "Waiting";
}

const INITIAL_PATIENTS: PatientQueueItem[] = [
  { id: "MED-104", patient: "Eleanor Vance", department: "Cardiology", severity: "Urgent", allocatedDoctor: "Dr. Rachel Sterling", room: "Room 102", estWait: "4 min", status: "In Consultation" },
  { id: "MED-105", patient: "Marcus Brody", department: "General Medicine", severity: "Standard", allocatedDoctor: "Dr. David Chen", room: "Room 104", estWait: "8 min", status: "Called" },
  { id: "MED-106", patient: "Sophia Martinez", department: "Pediatrics", severity: "Urgent", allocatedDoctor: "Dr. Amanda Ross", room: "Room 108", estWait: "12 min", status: "Waiting" },
  { id: "MED-107", patient: "James Thornton", department: "Pathology / Bloodwork", severity: "Lab/Vitals", allocatedDoctor: "Lab Technician Alex", room: "Lab Station 2", estWait: "2 min", status: "Waiting" }
];

export default function HospitalQueueSimulator() {
  const [patients, setPatients] = useState<PatientQueueItem[]>(INITIAL_PATIENTS);
  const [activeTab, setActiveTab] = useState<"live_queue" | "patient_sms">("live_queue");

  const handleSimulateNext = () => {
    const names = ["Claire Dupont", "Tariq Al-Mansoor", "Elena Rostova", "Kwame Mensah", "Arthur Pendelton"];
    const depts = ["General Medicine", "Cardiology", "Orthopedics", "Pediatrics"];
    const docs = ["Dr. Rachel Sterling", "Dr. David Chen", "Dr. Amanda Ross", "Dr. Sanjay Gupta"];
    const rooms = ["Room 102", "Room 104", "Room 106", "Room 108"];
    const severities: ("Emergency" | "Urgent" | "Standard" | "Lab/Vitals")[] = ["Urgent", "Standard", "Emergency", "Standard"];

    const newPatient: PatientQueueItem = {
      id: `MED-${Math.floor(100 + Math.random() * 900)}`,
      patient: names[Math.floor(Math.random() * names.length)],
      department: depts[Math.floor(Math.random() * depts.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      allocatedDoctor: docs[Math.floor(Math.random() * docs.length)],
      room: rooms[Math.floor(Math.random() * rooms.length)],
      estWait: `${Math.floor(Math.random() * 12 + 2)} min`,
      status: "Waiting"
    };

    setPatients(prev => [newPatient, ...prev.slice(0, 3)]);
  };

  return (
    <div className="w-full rounded-3xl bg-[#080808]/90 border border-white/10 p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">AI Hospital &amp; Clinic Queuing System</h3>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-semibold uppercase tracking-wider">
                In Active Development
              </span>
            </div>
            <p className="text-xs text-white/50">Predictive patient scheduling, doctor room balancing, and live mobile queue updates.</p>
          </div>
        </div>

        {/* Action button & Switcher */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab(activeTab === "live_queue" ? "patient_sms" : "live_queue")}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            {activeTab === "live_queue" ? "View Patient Mobile SMS Pass" : "View Clinic Dispatch Desk"}
          </button>
          <button
            onClick={handleSimulateNext}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 active:scale-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Simulate New Patient Triage
          </button>
        </div>
      </div>

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
          <div className="text-[10px] uppercase font-bold text-red-400/80 mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Traditional Hospital Wait Time
          </div>
          <div className="text-2xl font-black text-red-400 font-mono line-through opacity-80">
            85 Minutes
          </div>
          <div className="text-[10px] text-white/40 mt-1">Crowded waiting rooms &amp; delayed doctors</div>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
          <div className="text-[10px] uppercase font-bold text-cyan-400 mb-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> AI Clinic Target Wait Time
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono">
            12 Minutes
          </div>
          <div className="text-[10px] text-cyan-300/80 mt-1 font-semibold flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> -85.8% Reduced Patient Anxiety
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="text-[10px] uppercase font-bold text-white/50 mb-1 flex items-center gap-1">
            <Stethoscope className="w-3.5 h-3.5 text-cyan-400" /> Doctor Time Utilization
          </div>
          <div className="text-2xl font-black text-white font-mono flex items-center justify-between">
            <span>96.4%</span>
            <span className="text-xs font-normal text-emerald-400">Zero Idle Slots</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full w-[96.4%]" />
          </div>
        </div>
      </div>

      {/* Main View Container */}
      {activeTab === "live_queue" ? (
        <div className="bg-black/60 rounded-2xl border border-white/10 p-5 overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 font-semibold text-white/80">
              <Users className="w-4 h-4 text-cyan-400" />
              Live Clinic Appointment &amp; Consultation Board
            </div>
            <div className="font-mono text-[11px] text-cyan-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Dynamic ML Room Allocation Active
            </div>
          </div>

          <div className="space-y-2.5">
            <AnimatePresence>
              {patients.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {item.id}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        {item.patient}
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-white/70">
                          {item.department}
                        </span>
                      </div>
                      <div className="text-[10px] text-white/50 flex items-center gap-1.5 mt-0.5 font-mono">
                        <ArrowRight className="w-2.5 h-2.5 text-cyan-400" />
                        Assigned: <strong className="text-white/80">{item.allocatedDoctor}</strong> ({item.room})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      item.severity === "Emergency"
                        ? "bg-red-500/10 border-red-500/30 text-red-300"
                        : item.severity === "Urgent"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                        : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                    }`}>
                      {item.severity}
                    </span>

                    <div className="text-right font-mono">
                      <div className="text-[11px] font-bold text-cyan-400">{item.estWait} wait</div>
                      <div className="text-[9px] text-white/40">{item.status}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* Patient Mobile SMS Live Tracker Screen */
        <div className="p-6 rounded-2xl bg-black/80 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-full sm:w-64 bg-black rounded-3xl border border-white/20 p-4 shadow-2xl relative shrink-0">
            <div className="w-16 h-3.5 bg-white/10 rounded-full mx-auto mb-3" />
            <div className="text-[10px] text-white/40 uppercase mb-1">Live SMS Notification</div>
            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-white leading-relaxed">
              <div className="font-bold text-cyan-400 mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> St. Jude Medical Center
              </div>
              &quot;Hi Eleanor, Dr. Rachel Sterling is ready to see you in <strong>Room 102</strong>. You are #1 in queue. Estimated consultation: 15 mins.&quot;
            </div>
            <div className="mt-3 text-center text-[10px] text-emerald-400 font-mono font-bold">
              ✓ Arrived &amp; Verified
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-bold text-white">No Congested Waiting Rooms. Total Patient Freedom.</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Patients receive dynamic WhatsApp / SMS queue links with real-time countdowns. They can wait in the cafeteria, parking lot, or nearby without fear of missing their slot.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white/70">EMR / EHR Sync</span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white/70">HIPAA Compliant</span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white/70">Zero Hardware Installation</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
