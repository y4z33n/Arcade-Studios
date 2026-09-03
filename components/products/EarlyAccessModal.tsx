"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  Send,
  Building,
  Mail,
  User,
  Phone,
  Headphones,
  Dumbbell,
  HeartPulse,
  Fuel,
  FileText
} from "lucide-react";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

const PRODUCT_OPTIONS = [
  { id: "auracall", label: "AuraCall AI (Voice Receptionist & Call Center)", icon: Headphones },
  { id: "gym", label: "PulseFit AI (Dual Gym Apps & IoT Turnstiles)", icon: Dumbbell },
  { id: "hospital", label: "MedQueue AI (Hospital & Clinic Patient Queuing)", icon: HeartPulse },
  { id: "fuel", label: "PetroLedger AI (Fuel Pump Telemetry & Accounting)", icon: Fuel },
  { id: "full-suite", label: "Custom Multi-Engine Enterprise Architecture", icon: Sparkles },
];

export default function EarlyAccessModal({ isOpen, onClose, defaultProduct = "auracall" }: EarlyAccessModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>(defaultProduct);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    useCase: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate rapid transmission to Leylak Tech lead intake pipeline
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-xl rounded-3xl bg-[#090909] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSuccess ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                    Private Pilot Program
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  Request Early Pilot Access
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-light mb-6">
                  Join our exclusive private pilot cohort to deploy our in-development software engines with dedicated engineering support.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Product Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Target Software Engine
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                    >
                      {PRODUCT_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-neutral-950 text-white">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">
                        Your Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Dr. Jordan Hayes"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jordan@enterprise.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">
                        Organization / Facility
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Company, Clinic, or Station"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Specific Integration Needs (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.useCase}
                      onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                      placeholder="e.g., We operate 4 clinic branches and need EMR calendar sync + SMS queue passes..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-orange-600 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Transmitting Pilot Request...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Pilot Onboarding Request
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 pt-2">
                    <Lock className="w-3 h-3" />
                    <span>Your technical requirements are protected under enterprise NDA.</span>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Pilot Request Received!</h3>
                <p className="text-sm text-white/70 max-w-sm mx-auto mb-6 leading-relaxed">
                  Thank you, <strong>{formData.name || "partner"}</strong>. Our technical solutions director will contact you within 24 hours with dedicated demo credentials.
                </p>
                <button
                  onClick={handleResetAndClose}
                  className="px-8 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-white/90 transition-all"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
