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

  // Modern 3D Fold + Scale + Parallax Translation
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);

  return (
    <div ref={ref} className="w-full relative" style={{ perspective: "1500px" }}>
      <motion.div
        style={{ 
          opacity, 
          y, 
          scale, 
          rotateX,
        }}
        className="w-full transform-gpu origin-bottom will-change-transform"
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
