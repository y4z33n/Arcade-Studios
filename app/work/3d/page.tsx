"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export default function ThreeDWorkPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div className="relative min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link
              href="/work"
              className="inline-flex items-center text-white/60 hover:text-white transition-colors duration-300 mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Services
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-6"
          >
            3D Modeling & Animation
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Bringing Ideas
            <br />
            to Life in 3D
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-12"
          >
            We create stunning 3D models, animations, and visualizations that captivate audiences. 
            From character design to product visualization, our team brings imagination to reality 
            with photorealistic renders and dynamic animations.
          </motion.p>
        </div>
      </section>

      {/* Featured Video Showreels */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12"
          >
            Animation Showreels
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {/* T-Rex Animation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-red-500/50">
                <video
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/3d/trex.mp4" type="video/mp4" />
                </video>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">T-Rex Animation</h3>
                  <p className="text-white/70 text-sm">Dynamic creature animation with realistic movement</p>
                </div>
              </div>
            </motion.div>

            {/* Diesel Animation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-red-500/50">
                <video
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/3d/diesel.mp4" type="video/mp4" />
                </video>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Diesel Product Visual</h3>
                  <p className="text-white/70 text-sm">High-end product visualization and animation</p>
                </div>
              </div>
            </motion.div>

            {/* Nescafe Animation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-red-500/50">
                <video
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/3d/nescafe.mp4" type="video/mp4" />
                </video>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Nescafe Commercial</h3>
                  <p className="text-white/70 text-sm">Product commercial with fluid dynamics</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Character Design - George Lenin */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
              Character Design: George Lenin
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl">
              A complete character design project showcasing modeling, rigging, texturing, and various poses. 
              From wireframes to fully rendered scenes, this project demonstrates our end-to-end 3D character pipeline.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl"
          >
            <Image
              src="/3d/george-lenin-main-image.webp"
              alt="George Lenin Character - Main Render"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Process Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src="/3d/george-lenin-wireframe.webp"
                alt="Wireframe"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src="/3d/george-lenin-wire1.webp"
                alt="Wireframe Detail"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src="/3d/george-lenin-grey.webp"
                alt="Grey Render"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src="/3d/george-lenin-idle-grey.webp"
                alt="Idle Pose"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Character Poses & Renders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[
              { src: "/3d/george-lenin-render1.webp", title: "Action Pose" },
              { src: "/3d/george-lenin-render2.webp", title: "Profile View" },
              { src: "/3d/george-lenin-render5.webp", title: "Dynamic Pose" },
              { src: "/3d/george-lenin-pose-1-bg.webp", title: "Character Stance" },
              { src: "/3d/george-lenin-front-bg.webp", title: "Front View" },
              { src: "/3d/george-lenin-profile-bg.webp", title: "Side Profile" },
            ].map((item, index) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-red-500/50 hover:shadow-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Props & Equipment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Props & Equipment</h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              "/3d/george-lenin-canon1.jpg",
              "/3d/george-lenin-canon2.jpg",
              "/3d/george-lenin-shotgun.jpg",
              "/3d/george-lenin-shotgun1.jpg",
              "/3d/george-lenin-droid2.webp",
              "/3d/george-lenin-droid4.webp",
              "/3d/george-lenin-k2-so1.webp",
              "/3d/george-lenin-sofa-frontleft.webp",
            ].map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: 2.1 + index * 0.05, duration: 0.5 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-300"
              >
                <Image
                  src={src}
                  alt="3D Asset"
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12 text-center">
              Our 3D Capabilities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Character Design & Modeling",
                  description: "From concept to final model, we create detailed characters with proper topology, UV mapping, and rigging for animation."
                },
                {
                  title: "Product Visualization",
                  description: "Photorealistic product renders for marketing, e-commerce, and advertising campaigns."
                },
                {
                  title: "Animation & Motion Graphics",
                  description: "Fluid character animations, motion graphics, and dynamic visual effects that bring stories to life."
                },
                {
                  title: "Texturing & Shading",
                  description: "Advanced material creation using PBR workflows for realistic surfaces and lighting interactions."
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 2.6 + index * 0.1, duration: 0.6 }}
                  className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTA title="Ready to bring your ideas to life in 3D?" href="/contact" />
    </div>
  );
}
