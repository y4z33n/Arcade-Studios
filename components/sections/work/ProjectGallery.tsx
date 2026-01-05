"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

interface ProjectGalleryProps {
  images?: string[];
}

const DEFAULT_GALLERY = [
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&h=900&fit=crop",
];

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  const galleryImages = images || DEFAULT_GALLERY;

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
        {/* Main Gallery Grid */}
        <div className="space-y-8 md:space-y-12 max-w-6xl mx-auto">
          {/* Full Width Images */}
          {galleryImages.slice(0, 2).map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-elegant-xl"
            >
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={img}
                  alt={`Project screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          ))}

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-elegant-xl"
            >
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=800&fit=crop"
                  alt="Project detail"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-elegant-xl"
            >
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                  alt="Project detail"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>

          {/* Full Width Wide Image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-elegant-xl"
          >
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={galleryImages[2] || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=900&fit=crop"}
                alt="Project showcase"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </div>

        {/* Process/Behind the Scenes Section */}
        <div className="mt-32 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-16"
          >
            <span className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-6">
              Process
            </span>
            <h3 className="text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl font-bold text-white leading-[1.05] tracking-tight">
              Behind the scenes
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=1000&fit=crop",
              "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=1000&fit=crop",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop",
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant-xl group"
              >
                <Image
                  src={img}
                  alt={`Behind the scenes ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

