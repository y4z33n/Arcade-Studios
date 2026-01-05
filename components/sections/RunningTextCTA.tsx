"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function RunningTextCTA() {
  const text = `${SITE_CONFIG.name.toUpperCase()} • `;
  const repeatedText = Array(20).fill(text).join("");

  return (
    <section className="bg-white py-12 md:py-16 pb-12 md:pb-16">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <Link href="/contact" className="block group cursor-pointer">
          <div className="relative overflow-hidden bg-black rounded-3xl p-8 md:p-12 lg:p-16">
            {/* Running Text Container */}
            <div className="flex whitespace-nowrap">
              <motion.div
                className="flex"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 100,
                    ease: "linear",
                  },
                }}
              >
                <div className="flex-shrink-0">
                  <span className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight">
                    {repeatedText}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight">
                    {repeatedText}
                  </span>
                </div>
              </motion.div>
            </div>
            
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
          </div>
        </Link>
      </div>
    </section>
  );
}

