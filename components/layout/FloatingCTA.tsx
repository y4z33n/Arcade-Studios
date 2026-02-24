"use client";

import { motion } from "framer-motion";
import Link from "next/link";


export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Link href="/contact" className="block group">
        <motion.div
          className="relative bg-red-600 text-white px-6 md:px-8 py-4 md:py-5 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative flex items-center justify-center">
            <span className="text-sm md:text-base font-bold tracking-tight">
              Start Your Project
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

