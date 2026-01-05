"use client";

import { useEffect, useState, RefObject } from "react";

interface ScrollProgressOptions {
  offset?: number; // Offset from viewport edge (0-1)
}

export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  options: ScrollProgressOptions = {}
) {
  const { offset = 0.2 } = options;
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when element enters and leaves viewport
      const start = windowHeight - windowHeight * offset;
      const end = -rect.height + windowHeight * offset;
      
      // Progress from 0 (just entering) to 1 (fully scrolled past)
      const rawProgress = (start - rect.top) / (start - end);
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      
      setProgress(clampedProgress);
      setIsInView(rect.top < windowHeight && rect.bottom > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref, offset]);

  return { progress, isInView };
}

export function useParallax(
  ref: RefObject<HTMLElement>,
  speed: number = 0.5
) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate offset based on distance from center
      const distance = elementCenter - viewportCenter;
      setOffset(distance * speed * -0.1);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref, speed]);

  return offset;
}

export function useMouseParallax(sensitivity: number = 0.02) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * sensitivity;
      const y = (e.clientY - window.innerHeight / 2) * sensitivity;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [sensitivity]);

  return position;
}





