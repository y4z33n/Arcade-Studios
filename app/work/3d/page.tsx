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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
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
          </div>
        </div>
      </section>

      {/* Character Modeling Gallery */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
              Character Modeling Gallery
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl">
              A showcase of character modeling by various talented designers. Images are grouped by wireframe, grey, and full color renders for each character. No subcategories—just pure creative diversity.
            </p>
          </motion.div>

          {/* Pinterest/Masonry Style Gallery */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {/* Example: Grouped by character and type (wire, grey, color) */}
            {/* Big Boy */}
            <div>
              <Image src="/3d/big%20boy/chara1.webp" alt="Big Boy - Full Color" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/big%20boy/grey1.webp" alt="Big Boy - Grey" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/big%20boy/george-lenin-main-image.webp" alt="Big Boy - Color Alt" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
            </div>
            {/* Boy */}
            <div>
              <Image src="/3d/boy/chara3.webp" alt="Boy - Full Color" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/boy/george-lenin-render-1.webp" alt="Boy - Color Alt" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/boy/george-lenin-wire1.webp" alt="Boy - Wireframe" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
            </div>
            {/* Droid */}
            <div>
              <Image src="/3d/droid/chara5.webp" alt="Droid - Full Color" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/droid/droidreal.webp" alt="Droid - Color Alt" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/droid/droid%20wire.webp" alt="Droid - Wireframe" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
            </div>
            {/* Girl */}
            <div>
              <Image src="/3d/girl/girl.webp" alt="Girl - Full Color" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/girl/girlreal.webp" alt="Girl - Color Alt" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/girl/girlwire.webp" alt="Girl - Wireframe" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
            </div>
            {/* Robot */}
            <div>
              <Image src="/3d/robot/chara4.webp" alt="Robot - Full Color" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/robot/george-lenin-render1.webp" alt="Robot - Color Alt" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/robot/george-lenin-wireframe%20(1).webp" alt="Robot - Wireframe" width={400} height={600} className="mb-4 rounded-xl w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Props & Equipment Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Props & Equipment</h3>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {/* Guns */}
            <div>
              <Image src="/3d/guns/george-lenin-canon1.jpg" alt="Gun Prop 1" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/guns/george-lenin-canon2.jpg" alt="Gun Prop 2" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/guns/george-lenin-canon3.jpg" alt="Gun Prop 3" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/guns/george-lenin-canon5.jpg" alt="Gun Prop 4" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/guns/george-lenin-canon8.jpg" alt="Gun Prop 5" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/guns/george-lenin-shotgun.jpg" alt="Shotgun Prop 1" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/guns/george-lenin-shotgun1.jpg" alt="Shotgun Prop 2" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/guns/george-lenin-shotgun2.jpg" alt="Shotgun Prop 3" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
            </div>
            {/* Furniture */}
            <div>
              <Image src="/3d/furni/george-lenin-main-image.jpg" alt="Furniture Prop 1" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/furni/george-lenin-main-image-wireframe.jpg" alt="Furniture Prop 2" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/furni/george-lenin-sofa-backright.webp" alt="Furniture Prop 3" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/furni/george-lenin-sofa-frontleft.webp" alt="Furniture Prop 4" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/furni/george-lenin-sec.webp" alt="Furniture Prop 5" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/furni/george-lenin-second.jpg" alt="Furniture Prop 6" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/furni/george-lenin-third.jpg" alt="Furniture Prop 7" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
              <Image src="/3d/furni/george-lenin-wire.webp" alt="Furniture Prop 8" width={400} height={400} className="mb-4 rounded-xl w-full h-auto" />
            </div>
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
