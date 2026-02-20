"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

// Portfolio Works Videos
const portfolioVideos = [
  { number: 1, id: 'ecd1958a-756e-45f5-9245-075823dbda1a', type: 'portrait', title: 'Commercial Spot 1' },
  { number: 2, id: 'aa2eea88-131f-4d74-ab93-ce9d24f6682a', type: 'landscape', title: 'Brand Video 1' },
  { number: 3, id: '7bdd6539-fbc6-4a8f-bd2b-55397d5a4a9b', type: 'portrait', title: 'Product Showcase 1' },
  { number: 4, id: 'ea8c01e9-54d6-4a6a-8345-3e452fd63ab4', type: 'portrait', title: 'Social Media Ad 1' },
  { number: 5, id: '4aaecf03-c7a4-46ee-9695-ff7bd6cba0ef', type: 'portrait', title: 'Commercial Spot 2' },
  { number: 6, id: 'bc979929-d811-4aa2-89e2-761adecf1340', type: 'portrait', title: 'Product Showcase 2' },
  { number: 7, id: '99b0fa76-187d-475f-85d8-72acc574bb65', type: 'portrait', title: 'Social Media Ad 2' },
  { number: 8, id: '4829d392-7310-4e66-a154-d339fa7f2579', type: 'portrait', title: 'Brand Story 1' },
  { number: 9, id: '5755db70-7c33-45e6-9791-b01aa9a67e50', type: 'portrait', title: 'Commercial Spot 3' },
  { number: 10, id: '902cd050-a06f-44e8-89a7-e174ae507d24', type: 'portrait', title: 'Product Demo 1' },
  { number: 11, id: '9691977b-51b5-4d18-a57b-4b1c7a954d5f', type: 'portrait', title: 'Social Media Ad 3' },
  { number: 12, id: '5bf5e8e0-ac7c-412a-a548-1ead7833dd9a', type: 'portrait', title: 'Brand Video 2' },
  { number: 13, id: '1da323ea-d89a-4c36-aa28-f9f9b8d812bf', type: 'portrait', title: 'Commercial Spot 4' },
  { number: 14, id: 'ad67e96a-2442-4106-8d2b-ed668bc42bda', type: 'portrait', title: 'Product Showcase 3' },
  { number: 15, id: 'c0e0ebce-91b1-4538-ae43-d9c6678fd781', type: 'portrait', title: 'Social Media Ad 4' },
  { number: 16, id: '625cf0e5-44bf-45c6-8942-2a3fb0b72796', type: 'portrait', title: 'Brand Story 2' },
  { number: 17, id: 'dbfd544f-fdb3-48f6-bf4c-0f588f66e453', type: 'portrait', title: 'Commercial Spot 5' },
  { number: 18, id: '54ea5ee4-fcbf-4060-8258-79f10f8ee078', type: 'portrait', title: 'Product Demo 2' },
  { number: 19, id: '2dc02a96-1722-4584-bca4-a1906b913084', type: 'portrait', title: 'Social Media Ad 5' },
  { number: 20, id: 'a5ea7c5d-c28e-4ef6-8065-105f8abe3572', type: 'portrait', title: 'Brand Video 3' },
  { number: 21, id: '8db892d7-aacb-4043-8013-41e8cfcd1eb3', type: 'portrait', title: 'Commercial Spot 6' },
  { number: 22, id: 'a42d906d-9371-4e9b-b01b-b9668726ea4a', type: 'portrait', title: 'Product Showcase 4' },
  { number: 23, id: '8cef27ab-fcb9-47ef-9faf-42730d9076d6', type: 'portrait', title: 'Social Media Ad 6' },
  { number: 24, id: '3488c33e-0108-45b8-949b-6f344e554b3d', type: 'portrait', title: 'Brand Story 3' },
  { number: 25, id: '38417ebd-74f7-45a1-bee4-81341065dc4e', type: 'portrait', title: 'Commercial Spot 7' },
  { number: 26, id: '00eeb6e9-f514-4bda-bad1-eb127cdc7d43', type: 'portrait', title: 'Product Demo 3' },
  { number: 27, id: 'b044b02b-f631-41d4-b82a-b663e8f4c20a', type: 'portrait', title: 'Social Media Ad 7' },
  { number: 28, id: '19ecfb56-b490-4137-93f6-9e3a2c0bb743', type: 'portrait', title: 'Brand Video 4' },
  { number: 29, id: '5d134bc9-fa31-4d19-b63c-fcab547c88cc', type: 'portrait', title: 'Commercial Spot 8' },
  { number: 30, id: '3f2e4a5c-ae7d-4a53-9b59-af04f9465628', type: 'portrait', title: 'Product Showcase 5' },
  { number: 31, id: '3a37a106-4940-4066-ba56-88cc72e9f992', type: 'portrait', title: 'Social Media Ad 8' },
  { number: 32, id: '3c44bf44-c72e-4575-a74a-76384ceb6c85', type: 'portrait', title: 'Brand Story 4' },
  { number: 33, id: 'bedd908f-f2cb-403e-bd92-5e0d51b63b06', type: 'portrait', title: 'Commercial Spot 9' },
  { number: 34, id: 'fa617c93-1a8b-4d3a-99fc-b3fb5825fa88', type: 'portrait', title: 'Product Demo 4' },
  { number: 35, id: '876ab646-5f78-49d9-a651-aed22d228ca7', type: 'portrait', title: 'Social Media Ad 9' },
  { number: 36, id: 'a7cd827c-5ba8-4a0e-be0c-162a176b053e', type: 'portrait', title: 'Brand Video 5' },
  { number: 37, id: '573d7ddf-95be-4094-83ad-4e4bc9601a45', type: 'portrait', title: 'Commercial Spot 10' },
];

// Film Section Videos (Long-form content)
const filmVideos = [
  {
    title: 'Memory Bank',
    url: 'https://www.youtube.com/embed/KemUvSjG4gg?controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1',
    description: 'A cinematic exploration of memories and time',
    year: '2024',
    category: 'Short Film'
  },
  {
    title: '5 Minutes',
    url: 'https://www.youtube.com/embed/sQNRj2DvuB8?controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1',
    description: 'An intense 5-minute narrative journey',
    year: '2024',
    category: 'Short Film'
  }
];

// Function to generate video URL
const generateUrl = (id: string, autoplay: boolean, muted: boolean) => 
  `https://iframe.mediadelivery.net/embed/576655/${id}?autoplay=${autoplay}&loop=true&muted=${muted}&preload=true&responsive=true`;

export default function VideoProductionPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
            Video Production & Editing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Stories in
            <br />
            Motion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl"
          >
            From commercial spots to cinematic films, we create compelling visual narratives 
            that engage, inspire, and convert. Our portfolio spans social media ads, product 
            showcases, brand stories, and narrative films.
          </motion.p>
        </div>
      </section>

      {/* Films Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12"
          >
            Featured Films
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
            {filmVideos.map((film, index) => (
              <motion.div
                key={film.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-red-500/50">
                  <div className="relative aspect-video overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={film.url}
                      title={film.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-red-600 rounded-full text-xs font-medium text-white">
                        {film.year}
                      </span>
                      <span className="text-sm text-white/60">{film.category}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{film.title}</h3>
                    <p className="text-white/70">{film.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Works Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            Commercial Portfolio
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-12"
          >
            A showcase of our commercial work including brand videos, product demos, social media 
            content, and advertising campaigns. Click any video to view it in full screen.
          </motion.p>

          {/* Video Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {portfolioVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02, duration: 0.5 }}
                className={`group relative cursor-pointer ${video.type === 'landscape' ? 'col-span-2' : ''}`}
                onClick={() => setSelectedIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-300">
                  <iframe
                    src={generateUrl(video.id, hoveredIndex === index, true)}
                    className="w-full h-full"
                    loading="lazy"
                    allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                    allowFullScreen
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/60 mt-2 text-center">{video.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="relative w-full max-w-4xl aspect-[9/16] md:aspect-video" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 text-white text-2xl w-10 h-10 flex items-center justify-center hover:text-red-500 transition-colors z-10"
              onClick={() => setSelectedIndex(null)}
            >
              ✕
            </button>
            <iframe
              src={generateUrl(portfolioVideos[selectedIndex].id, true, false)}
              className="w-full h-full rounded-lg"
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Services Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
            >
              What We Offer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70"
            >
              Full-service video production from concept to final delivery
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Commercial Production",
                description: "High-quality commercials and advertising content that drives results and brand awareness."
              },
              {
                title: "Social Media Content",
                description: "Engaging short-form videos optimized for Instagram, TikTok, YouTube, and other platforms."
              },
              {
                title: "Product Videography",
                description: "Showcase your products with stunning visuals and compelling storytelling."
              },
              {
                title: "Brand Films",
                description: "Long-form content that tells your brand's story and connects with audiences."
              },
              {
                title: "Post-Production",
                description: "Professional editing, color grading, motion graphics, and sound design."
              },
              {
                title: "Narrative Films",
                description: "Creative storytelling through short films and cinematic experiences."
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/70 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Ready to bring your vision to life?" href="/contact" />
    </div>
  );
}
