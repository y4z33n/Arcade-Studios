"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

function RotatingCTA({ href }: { href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <Link 
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center group w-32 h-32 md:w-40 md:h-40 cursor-pointer"
    >
      {/* Rotating Text SVG */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full text-white/50 group-hover:text-white transition-colors duration-500"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <path
            id="textPath"
            d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
            fill="transparent"
          />
          <text className="text-[17.5px] font-bold uppercase tracking-[0.25em] fill-current">
            <textPath href="#textPath" startOffset="0%">
              START A PROJECT • START A PROJECT • 
            </textPath>
          </text>
        </svg>
      </motion.div>
      
      {/* Magnetic Inner Orb */}
      <motion.div 
        style={{ x: mouseXSpring, y: mouseYSpring }}
        className="absolute z-10 w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-shadow duration-500"
        animate={{ scale: isHovered ? 1.15 : 1, boxShadow: isHovered ? "0 0 60px rgba(220,38,38,0.8)" : "0 0 30px rgba(220,38,38,0.3)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white relative z-20 group-hover:rotate-45 transition-transform duration-500">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </Link>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Create intense parallax effects for the typography
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 md:pt-32 pb-12 md:pb-16"
    >
      <motion.div
        className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24 h-full flex flex-col justify-between pt-10"
      >
        <div className="relative w-full max-w-[1400px] mx-auto flex-1 flex flex-col justify-center mt-12 md:mt-0">
          {/* Layered, overlapping typography */}
          <div className="relative flex flex-col items-center justify-center text-center mix-blend-difference">
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="z-20 -mb-2 md:-mb-4 lg:-mb-6"
            >
              <h1 className="text-[min(12vw,150px)] leading-[0.8] font-bold text-white tracking-tighter uppercase whitespace-nowrap">
                Crafting
              </h1>
            </motion.div>
            
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="z-10 relative"
            >
              <h1 className="text-[min(16vw,190px)] leading-[0.8] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500 tracking-tighter uppercase italic pr-4">
                Digital
              </h1>
            </motion.div>

            <motion.div
              style={{ y: y3 }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="z-30 mt-0 md:-mt-2 lg:-mt-4"
            >
              <h1 className="text-[min(10vw,120px)] leading-[0.8] font-bold text-white tracking-tighter uppercase whitespace-nowrap">
                Experiences
              </h1>
            </motion.div>
          </div>

          {/* Subtext and CTA - Anchored to bottom, centered layout */}
          <div className="mt-8 md:mt-12 flex flex-col items-center justify-center gap-10 w-full max-w-4xl mx-auto px-4 relative z-50 pb-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed font-light max-w-2xl mx-auto">
                We blend design, technology, and strategy to build digital products that people actually want to use.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <RotatingCTA href="/contact" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
