"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const pathname = usePathname();

  if (pathname.startsWith('/mail')) {
    return null;
  }

  return (
    <footer ref={containerRef} className="pb-28 sm:pb-16 md:pb-6 px-4 lg:px-6 3xl:px-12">
      {/* Footer Content */}
      <div className="w-full mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-elegant py-10 sm:py-16 md:py-20 px-5 sm:px-6 lg:px-12 3xl:px-20">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 md:gap-16"
          >
            {/* Brand Section */}
            <div className="md:col-span-5">
              <Link href="/" className="inline-flex items-center gap-3 mb-4 sm:mb-6 group" aria-label={`${SITE_CONFIG.name} Home`}>
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/logo/logo_white.png" 
                    alt={`${SITE_CONFIG.name} Logo`} 
                    fill 
                    className="object-contain drop-shadow-md"
                  />
                </div>
                <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors duration-200">
                  Leylak
                </span>
              </Link>
              <p className="text-white/70 text-sm sm:text-base 3xl:text-lg leading-relaxed mb-6 sm:mb-8 max-w-sm">
                {SITE_CONFIG.tagline}
              </p>

              {/* Social Media Links — hidden for now */}
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <h4 className="text-xs sm:text-sm 3xl:text-base font-semibold text-white mb-4 sm:mb-6 uppercase tracking-wider font-mono">Navigation</h4>
              <nav className="flex flex-col space-y-2.5 sm:space-y-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm sm:text-base 3xl:text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h4 className="text-xs sm:text-sm 3xl:text-base font-semibold text-white mb-4 sm:mb-6 uppercase tracking-wider font-mono">Contact</h4>
              <div className="flex flex-col space-y-2.5 sm:space-y-3">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-white/70 hover:text-white transition-colors text-sm sm:text-base 3xl:text-lg underline-reveal"
                >
                  {SITE_CONFIG.email}
                </a>
                <a href="tel:+23057904684" className="text-white/50 hover:text-white/80 transition-colors text-sm sm:text-base 3xl:text-lg">
                  +230 57904684
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-center sm:text-left">
              <p className="text-white/50 text-xs sm:text-sm 3xl:text-base">
                © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
              </p>
              <div>
                <Link href="/privacy" className="text-white/50 hover:text-white transition-colors text-xs sm:text-sm 3xl:text-base">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
