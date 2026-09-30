"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Smartphone, 
  ArrowUpRight, 
  CheckCircle2
} from "lucide-react";

function AppleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function GooglePlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none" aria-hidden="true">
      <path
        d="M48.7 15.8C45.3 19.5 43.3 25.1 43.3 32.5v447c0 7.4 2 13 5.4 16.7l1.7 1.5 250.7-250.7v-5.9L50.4 14.3l-1.7 1.5z"
        fill="#00D3FF"
      />
      <path
        d="M386.7 172.7L92.7 6.4C75.2-3.5 59.8-2.3 50.4 7.6l250.7 250.7 85.6-85.6z"
        fill="#00E676"
      />
      <path
        d="M384.8 340.2l-83.7-83.7v-5.9l83.7-83.7 1.9 1.1 99.2 56.4c28.3 16.1 28.3 42.4 0 58.5l-99.2 56.4-1.9 0.9z"
        fill="#FFD400"
      />
      <path
        d="M386.7 339.3L301.1 253.7 50.4 504.4c9.4 9.9 24.8 11.1 42.3 1.2l294-166.3z"
        fill="#FF3333"
      />
    </svg>
  );
}

export default function MobileAppsShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-24 md:py-32 bg-black text-white overflow-hidden border-t border-white/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-pink-600/10 via-red-600/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-red-600/5 blur-[120px] pointer-events-none" />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-red-600/15 border border-red-500/25 text-red-400 text-[11px] sm:text-xs font-mono uppercase tracking-widest mb-4 sm:mb-6"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Engineering & Deployments</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              Mobile Apps Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-orange-400">
                Scale & Adoption
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:max-w-md"
          >
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              We design, build, and publish high-performance iOS and Android experiences shipped directly to global app stores.
            </p>
            <Link
              href="/work/app-dev"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-red-400 transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <span>Explore Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* FLAGSHIP HERO SPOTLIGHT: CHILI ORDER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-12 p-5 sm:p-10 md:p-12 lg:p-14 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-black/60 border border-white/15 hover:border-red-500/50 transition-all duration-700 shadow-2xl group"
        >
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,20,147,0.18),transparent_60%)] pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/20 transition-all duration-700" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-5 sm:mb-6">
                  <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                    B2B Telecom & Resellers
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] sm:text-xs font-medium uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Latest Release
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
                    <AppleIcon className="w-3.5 h-3.5 fill-current" />
                    <span className="text-white/20">|</span>
                    <GooglePlayIcon className="w-3.5 h-3.5" />
                    <span className="ml-1 text-[11px] text-white/50">iOS & Android</span>
                  </div>
                </div>

                {/* App Brand Header */}
                <div className="flex items-center gap-3.5 sm:gap-4 mb-4 sm:mb-5">
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white shadow-xl shadow-pink-500/20 flex-shrink-0 border border-white/20 group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/Logos Web/logo_chili.png"
                      alt="Chili Order App Logo"
                      fill
                      className="object-contain p-1"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight group-hover:text-red-400 transition-colors">
                      Chili Order
                    </h3>
                    <p className="text-[11px] sm:text-sm text-pink-400/90 font-mono tracking-wide uppercase mt-0.5 sm:mt-1">
                      CHiLi Mauritius • SIM Cards, E-Topup & Reseller Ordering
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mb-5 sm:mb-6 font-light">
                  A dedicated B2B mobile ordering and distribution platform empowering retail shop owners and authorized resellers across Mauritius to purchase physical SIM cards, scratch recharge cards, and digital E-Topup directly for their stores or resell airtime to customers in real time.
                </p>

                {/* Highlights Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-6 sm:mb-8">
                  {[
                    "E-Topup Reselling",
                    "SIM Card Wholesale",
                    "Recharge Cards",
                    "Merchant Ledger"
                  ].map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs text-white/70"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Action Buttons */}
              <div className="pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="https://apps.apple.com/us/app/chili-order/id6798525541"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/40 text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg"
                  aria-label="Download Chili Order on Apple App Store"
                >
                  <AppleIcon className="w-6 h-6 fill-current text-white transition-transform duration-300 group-hover/btn:scale-110" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-semibold text-white/50 tracking-wider leading-none">
                      Download on
                    </span>
                    <span className="text-sm font-bold text-white tracking-tight leading-tight">
                      App Store
                    </span>
                  </div>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=mu.chillisim.flash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/40 text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg"
                  aria-label="Get Chili Order on Google Play"
                >
                  <GooglePlayIcon className="w-6 h-6 flex-shrink-0 transition-transform duration-300 group-hover/btn:scale-110" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-semibold text-white/50 tracking-wider leading-none">
                      Get it on
                    </span>
                    <span className="text-sm font-bold text-white tracking-tight leading-tight">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Showcase Card / Device Preview with Real Login Page Screenshot */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-4 lg:py-0">
              {/* Ambient Glow */}
              <div className="absolute w-72 h-96 bg-gradient-to-tr from-pink-600/30 via-red-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Realistic Mobile Device Frame */}
              <div className="relative w-full max-w-[240px] sm:max-w-[310px] aspect-[720/1469] rounded-[36px] sm:rounded-[48px] p-2 sm:p-2.5 bg-gradient-to-b from-white/20 via-white/5 to-[#121212] border-2 border-white/20 shadow-2xl shadow-pink-950/50 ring-1 ring-black transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1">
                
                {/* Simulated Speaker / Camera Notch */}
                <div className="absolute top-3 sm:top-3.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-3.5 sm:h-4 bg-black/90 rounded-full border border-white/15 z-30 flex items-center justify-center">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-900/80" />
                  </div>
                </div>

                {/* Inner Screen Container */}
                <div className="relative w-full h-full rounded-[28px] sm:rounded-[38px] overflow-hidden bg-white shadow-inner">
                  <Image
                    src="/chili/login page.jpeg"
                    alt="Chili Order Reseller Mobile App - Login Screen"
                    fill
                    className="object-cover object-top select-none"
                    priority
                    sizes="(max-width: 768px) 280px, 320px"
                  />

                  {/* Subtle Screen Reflection Glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/15 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center mt-6"
        >
          <Link
            href="/work/app-dev"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-red-500/50 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-red-500/10"
          >
            <span>View More Mobile Apps</span>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:bg-red-600">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
