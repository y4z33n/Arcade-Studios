"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import CardSwap, { Card } from "@/components/CardSwap";

const CASE_STUDIES = [
  {
    slug: "model-management",
    title: "Model Management dot Mu",
    subtitle: "Premier platform for models, casting professionals, and talent management",
    client: "ModelManagement.mu",
    tags: ["Platform", "Brand", "Website", "Talent"],
    isComingSoon: false,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop&q=80",
  },
  {
    slug: "flash-communication",
    title: "Flash Communications",
    subtitle: "Integrated marketing agency - Creative, Digital, OOH, Video & Events",
    client: "theflashgroups.com",
    tags: ["Agency", "Brand", "Website", "Marketing"],
    isComingSoon: false,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=900&fit=crop&q=80",
  },
  {
    slug: "tdultee",
    title: "TD Ultee",
    subtitle: "Digital presence for business solutions",
    client: "tdultee.com",
    tags: ["Brand", "Website", "Business"],
    isComingSoon: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=80",
  },
  {
    slug: "my-experience-shop",
    title: "My Experience Shop",
    subtitle: "E-commerce platform for unique experiences",
    client: "myexperienceshop.com",
    tags: ["E-commerce", "Website", "Product"],
    isComingSoon: false,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&h=900&fit=crop&q=80",
  },
];


export default function FeaturedWork() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const swapDelay = 4000;

  const currentCard = CASE_STUDIES[currentCardIndex];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance slider on mobile
  useEffect(() => {
    if (!isMobile || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % CASE_STUDIES.length);
    }, swapDelay);
    
    return () => clearInterval(interval);
  }, [isMobile, isPaused]);

  const handlePrevious = () => {
    setIsPaused(true);
    setCurrentCardIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
    setTimeout(() => setIsPaused(false), 8000); // Resume after 8 seconds
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentCardIndex((prev) => (prev + 1) % CASE_STUDIES.length);
    setTimeout(() => setIsPaused(false), 8000); // Resume after 8 seconds
  };

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-6"
          >
            Featured Work
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 3xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-4"
          >
            Work we're proud of
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl 3xl:text-2xl text-white/70 max-w-3xl"
          >
            Explore our portfolio of successful projects that showcase our expertise in design and development.
          </motion.p>
        </div>

        {/* Card Swap Animation */}
        <div className="relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] mb-16 lg:mb-0">
          {/* Mobile Slider */}
          {isMobile ? (
            <div 
              className="relative w-full h-[450px] sm:h-[500px] mb-28"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <Link href="/work/web-dev" className="block w-full h-full group">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                      {/* Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={currentCard.image}
                          alt={currentCard.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="100vw"
                        />
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                        {/* Top: Client badge */}
                        <div>
                          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium text-black uppercase tracking-wider shadow-lg">
                            {currentCard.client}
                          </span>
                        </div>

                        {/* Bottom: Title and tags */}
                        <div>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight tracking-tighter">
                            {currentCard.title}
                          </h3>
                          <p className="text-white/90 text-sm sm:text-base mb-3 sm:mb-4">
                            {currentCard.subtitle}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {currentCard.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs text-white/80 border border-white/30 rounded-full backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* View button */}
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-white -rotate-45 sm:w-5 sm:h-5"
                        >
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
                aria-label="Previous project"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-black"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
                aria-label="Next project"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-black"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {CASE_STUDIES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentCardIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentCardIndex
                        ? 'bg-red-600 w-8'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>
              
              {/* View All Projects Button - Mobile */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full flex justify-center">
                <Link 
                  href="/work" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-all hover:gap-3 group shadow-lg"
                >
                  View All Projects
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            /* Desktop Card Stack */
            <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left side content for top card - Hidden on mobile */}
            <div className="hidden lg:block lg:w-1/3 xl:w-2/5">
              <motion.div
                key={currentCardIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex flex-col justify-center h-[450px] min-h-[450px] max-h-[450px]"
                style={{ height: 450 }}
              >
                <h3 className="text-3xl xl:text-4xl font-bold text-white mb-4">{currentCard.title}</h3>
                <p className="text-white/90 text-base xl:text-lg leading-relaxed mb-4">
                  {currentCard.subtitle} - Delivering innovative solutions that combine cutting-edge technology with exceptional user experience. Our comprehensive approach ensures every project meets the highest standards of quality and performance.
                </p>
                <div className="flex flex-wrap gap-3 pt-2 mb-4">
                  {currentCard.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 text-base text-white/90 bg-white/10 rounded-full backdrop-blur-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* View All Projects Link */}
                <Link 
                  href="/work/web-dev" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-all hover:gap-3 group mt-4"
                >
                  View All Projects
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Card Stack - Right side */}
            <div className="w-full lg:w-2/3 xl:w-3/5 flex justify-center lg:justify-end">
              <CardSwap
                width={800}
                height={450}
                cardDistance={35}
                verticalDistance={45}
                delay={swapDelay}
                pauseOnHover={true}
                skewAmount={4}
                easing="elastic"
                onCardChange={(idx) => setCurrentCardIndex(idx)}
              >
            {CASE_STUDIES.map((study) => (
              <Card key={study.slug} customClass="cursor-pointer">
                <Link href="/work/web-dev" className="block w-full h-full group">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10">
                      {/* Top: Client badge */}
                      <div>
                        <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium text-black uppercase tracking-wider shadow-lg">
                          {study.client}
                        </span>
                      </div>

                      {/* Bottom: Title and tags */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight tracking-tighter">
                          {study.title}
                        </h3>
                        <p className="text-white/90 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                          {study.subtitle}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {study.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs text-white/80 border border-white/30 rounded-full backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* View button */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white -rotate-45 sm:w-5 sm:h-5"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </CardSwap>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
