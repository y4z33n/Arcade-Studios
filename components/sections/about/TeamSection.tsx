"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const TEAM_MEMBERS = [
  {
    name: "Alex Chen",
    position: "Lead Developer",
    bio: "Full-stack developer with 8+ years of experience building scalable web applications.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Sarah Johnson",
    position: "Product Designer",
    bio: "UI/UX designer specializing in creating intuitive digital experiences.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Marcus Rodriguez",
    position: "Technical Lead",
    bio: "Architecture expert focused on building robust, performant systems.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Emily Park",
    position: "Frontend Developer",
    bio: "React specialist passionate about beautiful, accessible interfaces.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&q=80",
  },
];

export default function TeamSection() {
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
            Team
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 3xl:text-[10rem] font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Meet the team
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl 3xl:text-2xl text-white/70 max-w-3xl"
          >
            Developers, designers, and strategists united by passion for
            exceptional digital products
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 3xl:gap-10">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                delay: 0.1 * index,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -8 }}
              className="group"
            >
              {/* Image Container with Glassmorphism */}
              <div className="relative aspect-square mb-6 rounded-3xl overflow-hidden shadow-elegant-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Position badge - appears on hover */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-red-600 rounded-full text-white text-xs font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.position}
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl 3xl:text-4xl font-bold text-white group-hover:text-red-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base 3xl:text-lg text-white/60 uppercase tracking-wider">
                  {member.position}
                </p>
                <p className="text-white/70 leading-relaxed text-sm md:text-base 3xl:text-lg pt-2">
                  {member.bio}
                </p>
              </div>

              {/* Decorative accent line */}
              <div className="mt-4 h-0.5 w-0 bg-red-600 group-hover:w-12 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
