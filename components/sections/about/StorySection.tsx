"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const SERVICES_LIST = [
  { num: "01", title: "Web Development", desc: "Custom websites and web apps built with Next.js, React, and modern stacks — fast, scalable, and production-ready." },
  { num: "02", title: "E-commerce", desc: "Shopify, WooCommerce, and custom storefronts with seamless checkout, inventory, and conversion-optimised UX." },
  { num: "03", title: "Branding & Identity", desc: "Logo design, visual systems, brand guidelines — everything a business needs to look credible and memorable." },
  { num: "04", title: "3D & Animation", desc: "3D modelling, product visualisation, and motion graphics that make your brand impossible to ignore." },
  { num: "05", title: "Video Production", desc: "From concept to final cut — brand films, product videos, social reels, and event coverage." },
  { num: "06", title: "App Development", desc: "Mobile and cross-platform apps built for iOS and Android, with clean UX and robust backends." },
  { num: "07", title: "SEO & Digital Marketing", desc: "On-page SEO, content strategy, and digital campaigns that grow your visibility and drive qualified traffic." },
];

export default function StorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section ref={containerRef} className="relative overflow-hidden">

      {/* ── MANIFESTO BAND ── */}
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: label + big quote */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-6"
          >
            <span className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-8">
              Our Story
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 3xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter">
              Built different,
              <br />
              <span className="text-white/30">by design</span>
            </h2>
          </motion.div>

          {/* Right: paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-6 flex flex-col justify-end space-y-6 lg:pt-24"
          >
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              Leylak was built on a simple idea: your business shouldn't need five vendors to go digital.
            </p>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
              We're a multi-discipline studio — web, e-commerce, branding, 3D, video, apps, and SEO —
              all under one roof. One team, one point of contact, and a consistent standard of quality
              across every deliverable.
            </p>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
              We've delivered for talent platforms, marketing groups, distribution companies, retail brands,
              and experience-based businesses. Whatever the challenge, we adapt our stack and approach
              to what the project actually needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── FULL-WIDTH IMAGE ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: 0.3, duration: 0.9 }}
        className="w-full px-6 lg:px-12 3xl:px-24 pb-24 md:pb-32"
      >
        <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden">
          <Image
            src="/pro/bs.jpg"
            alt="Leylak studio work"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          {/* Overlay quote */}
          <div className="absolute inset-0 flex items-end p-10 md:p-16">
            <div className="max-w-xl">
              <p className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
                "Whatever the problem, we find the solution."
              </p>
              <p className="text-white/50 text-sm uppercase tracking-widest">— Leylak</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── SERVICES GRID ── */}
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-2 bg-white/10 text-white/60 text-xs font-medium uppercase tracking-wider rounded-full mb-6">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Every service. <span className="text-red-400">One studio.</span>
          </h2>
        </motion.div>

        <div className="space-y-0 border-t border-white/10">
          {SERVICES_LIST.map((svc, i) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 + i * 0.07, duration: 0.6 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start py-8 md:py-10 border-b border-white/10 hover:border-white/30 transition-colors duration-300"
            >
              <span className="md:col-span-1 text-sm font-bold text-white/20 group-hover:text-red-500/60 transition-colors duration-300 pt-1">
                {svc.num}
              </span>
              <h3 className="md:col-span-4 text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 tracking-tight">
                {svc.title}
              </h3>
              <p className="md:col-span-7 text-base md:text-lg text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
