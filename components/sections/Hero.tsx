"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import Aurora from "@/components/Aurora";

export default function Hero() {

  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax bindings
  const nextY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const pBaseX = prefersReducedMotion ? 0 : 2;
  const pBaseY = prefersReducedMotion ? 0 : 2;
  
  const textX1 = useTransform(smoothMouseX, [-1, 1], [-pBaseX, pBaseX]);
  const textY1 = useTransform(smoothMouseY, [-1, 1], [-pBaseY, pBaseY]);
  const textX2 = useTransform(smoothMouseX, [-1, 1], [-pBaseX*2, pBaseX*2]);
  const textY2 = useTransform(smoothMouseY, [-1, 1], [-pBaseY*2, pBaseY*2]);
  const textX3 = useTransform(smoothMouseX, [-1, 1], [-pBaseX*4, pBaseX*4]);
  const textY3 = useTransform(smoothMouseY, [-1, 1], [-pBaseY*4, pBaseY*4]);





  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col pt-24"
    >
      {/* Aurora Background Layer (z-0) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: prefersReducedMotion ? 0.3 : 0.6 }}
        transition={{ duration: 3 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Aurora 
          colorStops={['#100305', '#D91F2A', '#050505']}
          amplitude={1.2}
          blend={0.7}
          speed={0.5}
        />
      </motion.div>

      {/* Very subtle gradient overlay to ensure text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505] pointer-events-none" />

      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16 3xl:px-24 flex-grow flex flex-col justify-center pb-32 pt-12 md:pt-20">
        
        {/* Main Headline Wrapper */}
        <motion.div style={{ opacity: textOpacity }} className="relative font-display font-bold uppercase leading-[0.85] tracking-tighter">
          
          {/* IMAGINING (Outlined) */}
          <motion.div 
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[14vw] xl:text-[150px] text-transparent relative z-0 opacity-60 ml-[2vw] sm:ml-[5vw]"
            style={{ WebkitTextStroke: "1px rgba(244, 241, 237, 0.6)" }}
          >
            <motion.div style={{ x: textX1, y: textY1 }}>IMAGINING</motion.div>
          </motion.div>

          {/* WHAT'S (Crimson) */}
          <motion.div 
            initial={{ x: 30, filter: "blur(15px)", opacity: 0 }}
            animate={{ x: 0, filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[16vw] xl:text-[170px] text-[#D91F2A] relative z-20 -mt-[4vw] sm:-mt-[2vw] ml-[15vw] sm:ml-[22vw] drop-shadow-2xl"
          >
            <motion.div style={{ x: textX2, y: textY2 }}>WHAT&apos;S</motion.div>
          </motion.div>

          {/* NEXT. (Warm White) */}
          <motion.div 
            style={{ y: nextY }}
            className="text-[20vw] xl:text-[220px] text-[#F4F1ED] relative z-40 -mt-[6vw] sm:-mt-[3vw] ml-[-4vw] sm:ml-[2vw] drop-shadow-2xl"
          >
            <motion.div style={{ x: textX3, y: textY3 }} className="flex">
              {["N","E","X","T","."].map((letter, i) => (
                <motion.span 
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Complimentary Text on Right - Moved Up */}
        <div className="mt-0 sm:mt-2 relative z-40 pr-[5vw] sm:pr-[8vw] flex justify-end">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
             className="max-w-[280px] text-right"
           >
              <div className="w-12 h-[1px] bg-[#D91F2A] ml-auto mb-4" />
              <p className="text-[#F4F1ED]/60 text-xs sm:text-sm font-light leading-relaxed tracking-wide">
                Leylak Tech is an independent digital product studio crafting premium websites, mobile platforms, and AI experiences that define the future.
              </p>
           </motion.div>
        </div>
      </div>

      {/* Right Side Floating Label */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="hidden lg:flex absolute top-[40%] right-12 z-40 flex-col items-end gap-2"
      >
        <div className="flex flex-col items-end gap-2 text-[#F4F1ED]/40 text-[10px] tracking-[0.3em] font-sans font-medium">
          <p>IDEAS</p>
          <p>DESIGN</p>
          <p>BUILD</p>
          <p>GROW</p>
        </div>
        <div className="w-[1px] h-12 bg-[#F4F1ED]/10 mr-1 mt-4" />
      </motion.div>

      {/* Bottom Right Scroll Instruction */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="hidden md:flex absolute bottom-12 right-12 z-40 flex-col items-center gap-6"
      >
        <span className="font-sans text-[10px] text-[#F4F1ED]/40 rotate-180 [writing-mode:vertical-rl] tracking-[0.3em] uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-20 bg-[#F4F1ED]/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: [-40, 80] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-[1px] h-[40px] bg-[#D91F2A] absolute top-0"
          />
        </div>
      </motion.div>


      
    </section>
  );
}
