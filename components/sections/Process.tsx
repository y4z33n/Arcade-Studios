"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Strategy & Discovery",
    description: "We don't guess. We analyze your market, dissect your competitors, and blueprint a digital architecture designed specifically to achieve your business objectives and maximize ROI."
  },
  {
    number: "02",
    title: "Design & Architecture",
    description: "Our design team crafts bespoke, high-converting interfaces while our engineers architect scalable, secure backends. Every pixel and API endpoint is built for uncompromising performance."
  },
  {
    number: "03",
    title: "Build & Scale",
    description: "We bring the architecture to life using cutting-edge technologies. Post-launch, we implement continuous automation and AI integrations to scale your operations effortlessly."
  }
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-black text-white border-t border-white/10 overflow-hidden"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 lg:mb-32 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6"
          >
            How We <span className="text-red-600">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto"
          >
            A relentless, precision-driven process to turn your vision into a dominant digital product.
          </motion.p>
        </div>

        {/* Process Interactive Timeline */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 max-w-7xl mx-auto">
          
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                onMouseEnter={() => setActiveStep(idx)}
                className={`relative flex-1 group cursor-pointer border-t-2 pt-8 lg:pt-12 transition-all duration-500 ${
                  isActive ? "border-red-600" : "border-white/20 hover:border-white/50"
                }`}
              >
                {/* Step Number */}
                <div className={`text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter transition-colors duration-500 mb-6 ${
                  isActive ? "text-white" : "text-white/10 group-hover:text-white/30"
                }`}>
                  {step.number}
                </div>
                
                {/* Step Title */}
                <h3 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 transition-colors duration-500 ${
                  isActive ? "text-white" : "text-white/50"
                }`}>
                  {step.title}
                </h3>
                
                {/* Expanding Description */}
                <div className="overflow-hidden">
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="text-base md:text-lg text-white/70 font-light leading-relaxed pr-8"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
}
