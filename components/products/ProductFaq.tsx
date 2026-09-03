"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What development stage are these 4 proprietary software products in?",
    answer: "All 4 software engines (AuraCall AI, PulseFit AI, MedQueue AI, and PetroLedger AI) are actively in development by Leylak Tech. We are currently onboarding forward-thinking businesses and facilities into our private pilot cohort for dedicated sandbox testing and custom integrations."
  },
  {
    question: "How does AuraCall AI connect to our existing phone numbers and PBX?",
    answer: "AuraCall AI integrates directly over Twilio SIP trunks, WebSockets, or existing PBX switches (Asterisk, Cisco, Avaya). Inbound calls forward seamlessly to the AI agent with sub-180ms voice latency, and warm transfers can be routed back to human specialists anytime."
  },
  {
    question: "How do PulseFit AI's mobile apps interface with physical gym turnstiles?",
    answer: "The Member Mobile App generates dynamic offline-capable QR codes and NFC tokens that communicate with turnstiles and magnetic door hardware (ZKTeco, Paxton, HID, and Wiegand relays) in under 0.4 seconds, alerting personal trainers upon arrival."
  },
  {
    question: "Is MedQueue AI compliant with HIPAA and healthcare EMR standards?",
    answer: "Yes. MedQueue AI is engineered for strict HIPAA compliance with zero-retention PHI encryption. It easily connects to hospital and clinic management systems via HL7 and FHIR protocols to sync patient records and appointments."
  },
  {
    question: "How does PetroLedger AI detect fuel leakage and balance shift ledgers?",
    answer: "PetroLedger connects directly to pump dispenser flow meters (Gilbarco, Wayne) and underground ATG tank probes (Veeder-Root). It reconciles liters dispensed against POS revenue to catch variances above 0.01% and auto-generates balanced double-entry journal entries for accounting software."
  }
];

export default function ProductFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#0A0A0A] border-t border-white/5">
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10 max-w-5xl">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center">
          <span className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            Frequently Asked <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              Questions
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our proprietary AI software engines, hardware bridges, and private pilot onboarding.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-white/[0.04] border-red-500/40 shadow-xl"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/60 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-red-500" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-white/70 leading-relaxed font-light border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
