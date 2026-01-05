"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

const STEPS = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We begin by understanding your business goals, target audience, and competitive landscape to create a solid foundation for your project.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=800&fit=crop&q=80",
  },
  {
    number: "02",
    title: "Design & Prototype",
    description: "Our design team creates stunning interfaces and interactive prototypes that bring your vision to life with pixel-perfect precision.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=1200&fit=crop&q=80",
  },
  {
    number: "03",
    title: "Development & Testing",
    description: "We build your product using modern technologies, following best practices and conducting thorough testing to ensure quality.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&h=800&fit=crop&q=80",
  },
];

export default function TwoUpSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(-1); // Start with -1 (no image shown)
  const [showFixedImage, setShowFixedImage] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track section visibility for fixed image
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFixedImage(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Track which step is in view - centered
  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        {
          threshold: 0.5,
          rootMargin: "-45% 0px -45% 0px", // Trigger when card is near center
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  // Track when to hide image (when scrolling past last step)
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          // Section has scrolled past
          setActiveStep(-1);
        }
      },
      {
        threshold: 0,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Get scroll progress for fade out effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Show image when first step is approaching center, hide when last step leaves
  const imageOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      {/* Fixed Image Container - Right Aligned */}
      {showFixedImage && activeStep >= 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="hidden lg:block fixed top-1/2 right-12 -translate-y-1/2 w-[45vw] h-[70vh] z-10 pointer-events-none"
        >
          <div className="relative h-full rounded-3xl overflow-hidden shadow-elegant-xl">
            {/* Images with transitions */}
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeStep === index ? 1 : 0,
                  scale: activeStep === index ? 1 : 1.1,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Step indicator badge */}
                <div className="absolute top-8 right-8 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-elegant">
                  {step.number}
                </div>

                {/* Step title overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {step.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="inline-block px-4 py-2 bg-red-50 text-red-600 text-xs font-medium uppercase tracking-wider rounded-full mb-8">
            Our Approach
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black leading-[0.95] tracking-tighter mb-8">
            Crafting digital excellence
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
            We combine strategic thinking, creative design, and cutting-edge
            technology to build digital products that stand out and deliver
            measurable results.
          </p>
        </motion.div>

        {/* Two Column Layout - Content Only */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Side - Scrolling Content */}
          <div className="lg:col-span-5 space-y-32 md:space-y-40">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-20%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="min-h-[60vh] flex items-center"
              >
                <div className="relative bg-white p-8 md:p-10 rounded-3xl hover:shadow-elegant transition-all duration-300 group w-full">
                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 leading-tight group-hover:text-red-600 transition-colors">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {step.description}
                  </p>

                  {/* Step Number - Large, below content */}
                  <div className="mt-8">
                    <span className="text-8xl md:text-9xl font-bold text-red-600/10 group-hover:text-red-600/20 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute -bottom-2 left-8 right-8 h-1 bg-gradient-to-r from-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Spacer for layout balance on desktop */}
          <div className="lg:col-span-7 lg:col-start-6 hidden lg:block">
            {/* Empty spacer - image is fixed in viewport */}
          </div>

          {/* Mobile fallback - show images inline */}
          <div className="lg:hidden space-y-8">
            {STEPS.map((step, index) => (
              <div key={index} className="relative aspect-video rounded-3xl overflow-hidden shadow-elegant-xl">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-6 right-6 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-elegant">
                  {step.number}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
