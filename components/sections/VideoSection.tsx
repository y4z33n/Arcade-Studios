"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import Image from "next/image";

export default function VideoSection() {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const centerX = useTransform(xSpring, (val) => `calc(-50% + ${val}px)`);
  const centerY = useTransform(ySpring, (val) => `calc(-50% + ${val}px)`);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!videoRef.current) return;

      const rect = videoRef.current.getBoundingClientRect();
      const relativeX = e.clientX - (rect.left + rect.width / 2);
      const relativeY = e.clientY - (rect.top + rect.height / 2);

      x.set(relativeX);
      y.set(relativeY);
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      x.set(0);
      y.set(0);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering, x, y]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden cursor-none group shadow-elegant-xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            x.set(0);
            y.set(0);
          }}
        >
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop&q=80"
            alt="Video showcase"
            fill
            className="object-cover"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

          {/* Static centered play button */}
          <motion.button
            className="absolute top-1/2 left-1/2 z-10 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-elegant-xl"
            style={{
              x: "-50%",
              y: "-50%",
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              scale: isHovering ? 0 : 1,
              opacity: isHovering ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-red-600 ml-1"
            >
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
          </motion.button>

          {/* Mouse-following play button */}
          <motion.button
            className="absolute top-1/2 left-1/2 z-20 w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-elegant-xl pointer-events-none"
            style={{
              x: centerX,
              y: centerY,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovering ? 1 : 0,
              opacity: isHovering ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white ml-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </motion.svg>
          </motion.button>

          {/* Light trail */}
          <motion.div
            className="absolute top-1/2 left-1/2 z-15 w-32 h-32 md:w-40 md:h-40 rounded-full pointer-events-none"
            style={{
              x: useTransform(xSpring, (val) => `calc(-50% + ${val * 0.7}px)`),
              y: useTransform(ySpring, (val) => `calc(-50% + ${val * 0.7}px)`),
              background: "radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovering ? 1.5 : 0,
              opacity: isHovering ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />

          {/* Label */}
          <div className="absolute bottom-6 left-6 z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
              className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-black text-sm font-medium rounded-full shadow-lg"
            >
              Watch Showreel
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
