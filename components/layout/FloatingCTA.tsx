"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <Link href="/contact" className="block group">
        <motion.div
          className="bg-lilac-600 text-white px-6 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm md:text-base font-bold tracking-tight uppercase">
              {SITE_CONFIG.name}
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

