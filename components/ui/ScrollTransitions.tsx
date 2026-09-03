"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track this element's scroll progress relative to viewport
  // "0 1" means when the TOP of the element hits the BOTTOM of the viewport
  // "0.4 1" means when the TOP of the element reaches 40% down from the top of the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.4 1"] 
  });

  // Clean, lightweight GPU-accelerated reveal without expensive 3D matrix churn
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <div ref={ref} className="w-full relative">
      <motion.div
        style={{ 
          opacity, 
          y
        }}
        className="w-full transform-gpu will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function HeroParallax({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  
  // Parallax on scroll down: move down slightly, fade out, scale down
  const y = useTransform(scrollY, [0, 800], [0, 250]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="w-full transform-gpu origin-center will-change-transform"
    >
      {children}
    </motion.div>
  );
}
