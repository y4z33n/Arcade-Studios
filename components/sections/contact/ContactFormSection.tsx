"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ContactForm from "@/components/ui/ContactForm";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactFormSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            {/* Section Header */}
            <div className="mb-12">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-6"
              >
                Send Message
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              >
                Tell us about your project
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg md:text-xl 3xl:text-2xl text-white/70"
              >
                Fill out the form and we'll be in touch soon
              </motion.p>
            </div>

            <ContactForm />
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-5 space-y-6 md:space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-all duration-300">
              <h3 className="text-xl md:text-2xl 3xl:text-3xl font-bold text-white mb-6">
                Contact Details
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-2">
                    Location
                  </p>
                  <p className="text-base md:text-lg 3xl:text-xl text-white/90">{SITE_CONFIG.location}</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-2">
                    Email
                  </p>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-base md:text-lg 3xl:text-xl text-red-400 hover:text-red-300 transition-colors inline-block"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-all duration-300">
              <h3 className="text-xl md:text-2xl 3xl:text-3xl font-bold text-white mb-6">
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {SITE_CONFIG.social.linkedin && (
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-white/20 rounded-full text-sm text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
                {SITE_CONFIG.social.github && (
                  <a
                    href={SITE_CONFIG.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-white/20 rounded-full text-sm text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {SITE_CONFIG.social.twitter && (
                  <a
                    href={SITE_CONFIG.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-white/20 rounded-full text-sm text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                    Twitter
                  </a>
                )}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-red-600/20 to-red-600/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-red-500/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg md:text-xl mb-2">Quick Response</h4>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    We typically respond within 24 hours. For urgent inquiries,
                    please email us directly.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
