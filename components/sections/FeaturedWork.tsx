"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
  const swapDelay = 4000;

  const currentCard = CASE_STUDIES[currentCardIndex];

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
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[10rem] font-bold text-white leading-[0.95] tracking-tighter mb-4"
          >
            Work we're proud of
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl 3xl:text-2xl text-white/70 max-w-3xl"
          >
            Watch as our best projects cycle through
          </motion.p>
        </div>

        {/* Card Swap Animation */}
        <div className="relative min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">
          {/* Left side content for top card */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 max-w-md z-10">
            <motion.div
              key={currentCardIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p className="text-white/70 text-sm md:text-base">
                i want to write a para here, a long para that describes the current featured work in detail, highlighting its unique aspects and the impact it has made for the client. This paragraph should entice viewers to learn more about the project and explore our portfolio further.
                I want to hghlight the key features, the challenges we overcame, and the innovative solutions we implemented to deliver exceptional results.
                This can be used inside the ase study page.
              </p>
            </motion.div>
          </div>

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
                <Link href={`/work/${study.slug}`} className="block w-full h-full group">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
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
                    <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
                      {/* Top: Client badge */}
                      <div>
                        <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-black uppercase tracking-wider shadow-lg">
                          {study.client}
                        </span>
                      </div>

                      {/* Bottom: Title and tags */}
                      <div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight tracking-tighter">
                          {study.title}
                        </h3>
                        <p className="text-white/90 text-base md:text-lg mb-4">
                          {study.subtitle}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {study.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 text-xs text-white/80 border border-white/30 rounded-full backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* View button */}
                    <div className="absolute top-6 right-6 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg
                        width="20"
                        height="20"
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
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>

      {/* View All CTA */}
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 mt-12">
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
    </section>
  );
}
