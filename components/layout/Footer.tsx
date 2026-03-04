"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <footer ref={containerRef} className="pb-4 px-4 lg:px-6 3xl:px-12">
      {/* Footer Content */}
      <div className="w-full mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-elegant py-16 md:py-20 px-6 lg:px-12 3xl:px-20">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16"
          >
            {/* Brand Section */}
            <div className="md:col-span-5">
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl 3xl:text-3xl font-bold text-white">
                  {SITE_CONFIG.name.split(' ')[0]}<span className="text-red-400">.</span>
                </span>
              </Link>
              <p className="text-white/70 text-base 3xl:text-lg leading-relaxed mb-8 max-w-sm">
                {SITE_CONFIG.tagline}
              </p>
              
              {/* Social Media Links — hidden for now */}
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <h4 className="text-sm 3xl:text-base font-semibold text-white mb-6 uppercase tracking-wider">Navigation</h4>
              <nav className="flex flex-col space-y-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-base 3xl:text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h4 className="text-sm 3xl:text-base font-semibold text-white mb-6 uppercase tracking-wider">Contact</h4>
              <div className="flex flex-col space-y-3">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-white/70 hover:text-white transition-colors text-base 3xl:text-lg underline-reveal"
                >
                  {SITE_CONFIG.email}
                </a>
                <a href="tel:+23057904684" className="text-white/50 hover:text-white/80 transition-colors text-base 3xl:text-lg">
                  +230 57904684
                </a>
                <a href="tel:+23055057910" className="text-white/50 hover:text-white/80 transition-colors text-base 3xl:text-lg">
                  +230 55057910
                </a>
                <p className="text-white/50 text-sm 3xl:text-base leading-relaxed pt-1">
                  2nd Floor, Unity House<br />
                  Rue du Savoir, Cybercity<br />
                  Ebene, Mauritius 72201
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/50 text-sm 3xl:text-base">
                © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm 3xl:text-base">
                <Link href="/privacy" className="text-white/50 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/50 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
