"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number; // -1 to 1, negative = opposite direction
  scale?: number; // Additional scale factor for parallax
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  speed = 0.3,
  scale = 1.2,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, scale]);

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.div
        style={{ y, scale: imageScale }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

// Reveal image on scroll
interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  direction?: "up" | "down" | "left" | "right";
  priority?: boolean;
}

export function RevealImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  direction = "up",
  priority = false,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const clipPaths = {
    up: [
      "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
    down: [
      "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
    left: [
      "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
    right: [
      "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ],
  };

  const clipPath = useTransform(scrollYProgress, [0, 1], clipPaths[direction]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${containerClassName}`}>
      <motion.div
        style={{ clipPath }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}





