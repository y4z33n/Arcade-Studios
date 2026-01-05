"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import Image from "next/image";

export default function FooterImage() {
  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      className="w-full relative"
    >
      <div className="relative aspect-video md:aspect-[21/9] bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
        {/* Desktop Image */}
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2560&h=800&fit=crop"
          alt="Mountain landscape at sunset"
          fill
          className="object-cover hidden md:block"
          priority
        />
        {/* Mobile Image */}
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop"
          alt="Mountain landscape at sunset"
          fill
          className="object-cover md:hidden"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
    </motion.section>
  );
}

