"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const CASE_STUDIES = [
  {
    slug: "electric-adventures",
    title: "An app for electric adventures",
    subtitle: "Strategic repositioning of a next-gen mobility brand",
    client: "Rivian",
    tags: ["Strategy", "Brand", "Website", "Content"],
    isComingSoon: false,
    image: "https://images.unsplash.com/photo-1617886322207-5baae5fc7c5a?w=1600&h=900&fit=crop&q=80",
  },
  {
    slug: "automotive-icons",
    title: "Launching next gen automotive icons",
    subtitle: "Digital transformation for sustainable transportation",
    client: "Tesla",
    tags: ["Strategy", "Brand", "Website", "Product"],
    isComingSoon: false,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1600&h=900&fit=crop&q=80",
  },
  {
    slug: "outdoor-gear",
    title: "Redesigning the future of outdoor gear",
    subtitle: "E-commerce platform for adventure enthusiasts",
    client: "Black Diamond",
    tags: ["Brand", "Website", "Content", "Product"],
    isComingSoon: false,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&h=900&fit=crop&q=80",
  },
  {
    slug: "solar-innovation",
    title: "Solar energy platform",
    subtitle: "Empowering sustainable energy solutions",
    client: "SolarCity",
    tags: ["Website", "Product", "Content"],
    isComingSoon: false,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&h=900&fit=crop&q=80",
  },
];

export default function FeaturedWork() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
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
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[10rem] font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Work we're proud of
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl 3xl:text-2xl text-white/70 max-w-3xl"
          >
            Scroll to explore our latest projects
          </motion.p>
        </div>

        {/* Stacking Cards */}
        <div className="relative min-h-[400vh]">
          {CASE_STUDIES.map((study, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const { scrollYProgress: cardProgress } = useScroll({
              target: cardRef,
              offset: ["start end", "start start"],
            });

            // Calculate stacking position - each card stacks on top of previous
            const stackOffset = index * 40; // 40px offset for each card
            const isLast = index === CASE_STUDIES.length - 1;
            
            // Scale: starts at 0.9, grows to 1 as it enters
            const scale = useTransform(
              cardProgress, 
              [0, 0.5, 1], 
              [0.9, 1, 1]
            );
            
            // Y position: moves up and sticks
            const y = useTransform(
              cardProgress,
              [0, 0.5, 1],
              [200, stackOffset, stackOffset]
            );

            return (
              <motion.div
                key={study.slug}
                ref={cardRef}
                style={{ 
                  scale,
                  y,
                  zIndex: CASE_STUDIES.length - index,
                }}
                className="sticky top-24 will-change-transform"
              >
                <Link
                  href={`/work/${study.slug}`}
                  className="block group"
                >
                  <div className="relative h-[500px] md:h-[600px] lg:h-[700px] 3xl:h-[800px] rounded-3xl overflow-hidden shadow-2xl">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 lg:p-16 3xl:p-20">
                      {/* Top: Client badge */}
                      <div>
                        <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-black uppercase tracking-wider shadow-lg">
                          {study.client}
                        </span>
                      </div>

                      {/* Bottom: Title and tags */}
                      <div>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl font-bold text-white mb-4 leading-[0.95] tracking-tighter">
                          {study.title}
                        </h3>
                        <p className="text-white/90 text-lg md:text-xl 3xl:text-2xl mb-6">
                          {study.subtitle}
                        </p>
                        
                        <div className="flex flex-wrap gap-3">
                          {study.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 text-sm 3xl:text-base text-white/80 border border-white/30 rounded-full backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* View button */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute top-8 right-8 md:top-12 md:right-12 3xl:top-16 3xl:right-16 w-16 h-16 3xl:w-20 3xl:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-elegant-xl"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white -rotate-45"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA - Styled like main CTA */}
        <div className="-mt-[40vh]">
          <Link href="/work" className="block group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex flex-col md:flex-row items-center justify-between bg-black rounded-3xl p-12 md:p-16 overflow-hidden shadow-elegant-xl group-hover:shadow-2xl transition-all"
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Content */}
              <div className="relative z-10 mb-8 md:mb-0">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  View All Projects
                </h3>
              </div>

              {/* Arrow Button */}
              <motion.div
                className="relative z-10 flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-elegant">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-black -rotate-45"
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
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
