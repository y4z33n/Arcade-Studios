"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export default function AppDevPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const iosApps = [
    {
      name: "Sapaad POS",
      description: "Point of Sale solution for restaurants and hospitality businesses",
      url: "https://apps.apple.com/us/app/sapaad-pos/id1535812177",
      category: "Business & Hospitality"
    },
    {
      name: "Sapaad Kiosk",
      description: "Self-service kiosk application for streamlined ordering",
      url: "https://apps.apple.com/us/app/sapaad-kiosk/id1555639339",
      category: "Business & Hospitality"
    },
    {
      name: "Sapaad Dash",
      description: "Dashboard and analytics for restaurant management",
      url: "https://apps.apple.com/us/app/sapaad-dash/id6443775672",
      category: "Business & Analytics"
    },
    {
      name: "Suterra 360",
      description: "Comprehensive 360-degree business solution",
      url: "https://apps.apple.com/us/app/suterra-360/id6615080357?l=pt-BR",
      category: "Business Solutions"
    }
  ];

  const iosTechnologies = [
    { name: "Swift UI", icon: "🎨", description: "Modern declarative UI framework" },
    { name: "Xcode", icon: "🔧", description: "Apple's integrated development environment" },
    { name: "Swift", icon: "⚡", description: "Powerful and intuitive programming language" },
    { name: "UIKit", icon: "📱", description: "Framework for building iOS interfaces" },
    { name: "CoreData", icon: "💾", description: "Persistent data storage framework" },
    { name: "Pusher", icon: "🔔", description: "Real-time messaging and notifications" },
    { name: "SDK Integrations", icon: "🔌", description: "Third-party service integrations" },
    { name: "Apple Developer Programs", icon: "🍎", description: "Official Apple development tools" }
  ];

  const androidTechnologies = [
    { name: "Kotlin", icon: "🟣", description: "Modern programming language for Android" },
    { name: "Android Studio", icon: "🤖", description: "Official Android IDE" },
    { name: "Java", icon: "☕", description: "Classic Android development language" },
    { name: "Jetpack Compose", icon: "🎨", description: "Modern Android UI toolkit" },
    { name: "Room Database", icon: "💾", description: "SQLite object mapping library" },
    { name: "Firebase", icon: "🔥", description: "Backend services and analytics" },
    { name: "Retrofit", icon: "🌐", description: "Type-safe HTTP client" },
    { name: "Material Design", icon: "✨", description: "Google's design system" }
  ];

  const crossPlatformTechnologies = [
    { name: "React Native", icon: "⚛️", description: "Build native apps with React" },
    { name: "JavaScript", icon: "📜", description: "Core language for React Native" },
    { name: "TypeScript", icon: "🔷", description: "Typed JavaScript for better development" },
    { name: "Expo", icon: "🚀", description: "Framework and platform for React apps" },
    { name: "Redux", icon: "🔄", description: "State management library" },
    { name: "Native Modules", icon: "🔗", description: "Bridge to native platform features" }
  ];

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
            App Development
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tighter mb-8"
          >
            Mobile Apps
            <br />
            That Scale
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mb-12"
          >
            We build native and cross-platform mobile applications for iOS and Android. 
            From enterprise solutions to consumer apps, our team delivers high-performance, 
            scalable applications that users love.
          </motion.p>
        </div>
      </section>

      {/* Featured Apps Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12"
          >
            Featured iOS Apps
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
            {iosApps.map((app, index) => (
              <motion.a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-red-500/50 hover:shadow-2xl p-8">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 text-xs font-medium uppercase tracking-wider rounded-full mb-4">
                      {app.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
                    {app.name}
                  </h3>
                  <p className="text-white/70 text-base md:text-lg mb-4">{app.description}</p>
                  <div className="flex items-center text-red-500 font-medium">
                    View on App Store
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Redesigned App Development Workflow Section */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-black/60 to-black/80">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12 text-center"
          >
            App Development Workflow
          </motion.h2>
          <ol className="relative border-l-4 border-red-600 ml-4">
            <li className="mb-12 ml-6">
              <span className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-red-600 rounded-full ring-8 ring-black/80 text-white font-bold text-lg">1</span>
              <h3 className="text-2xl font-bold text-white mb-2 mt-1">Discovery & Planning</h3>
              <p className="text-white/80 text-lg">We start by understanding your goals, target audience, and requirements. This phase includes ideation, research, and project planning for iOS, Android, and cross-platform needs.</p>
            </li>
            <li className="mb-12 ml-6">
              <span className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-red-600 rounded-full ring-8 ring-black/80 text-white font-bold text-lg">2</span>
              <h3 className="text-2xl font-bold text-white mb-2 mt-1">Design & Prototyping</h3>
              <p className="text-white/80 text-lg">Our team creates intuitive UI/UX designs and interactive prototypes, ensuring a seamless experience across all platforms.</p>
            </li>
            <li className="mb-12 ml-6">
              <span className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-red-600 rounded-full ring-8 ring-black/80 text-white font-bold text-lg">3</span>
              <h3 className="text-2xl font-bold text-white mb-2 mt-1">Development</h3>
              <p className="text-white/80 text-lg">We develop your app using the best approach for your project—native iOS, native Android, or cross-platform—focusing on performance, scalability, and maintainability.</p>
            </li>
            <li className="mb-12 ml-6">
              <span className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-red-600 rounded-full ring-8 ring-black/80 text-white font-bold text-lg">4</span>
              <h3 className="text-2xl font-bold text-white mb-2 mt-1">Testing & QA</h3>
              <p className="text-white/80 text-lg">Comprehensive testing ensures your app is reliable, secure, and bug-free on all devices and platforms.</p>
            </li>
            <li className="mb-12 ml-6">
              <span className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-red-600 rounded-full ring-8 ring-black/80 text-white font-bold text-lg">5</span>
              <h3 className="text-2xl font-bold text-white mb-2 mt-1">Launch & Support</h3>
              <p className="text-white/80 text-lg">We handle deployment to the App Store and Google Play, and provide ongoing support, updates, and enhancements.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-12 text-center">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">End-to-End App Development</h3>
                <p className="text-white/70 leading-relaxed">From concept and design to development, launch, and ongoing support, we deliver complete mobile solutions tailored to your needs.</p>
              </div>
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Cross-Platform Expertise</h3>
                <p className="text-white/70 leading-relaxed">We create apps that work seamlessly across iOS and Android, ensuring a consistent experience for all users.</p>
              </div>
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Enterprise & Consumer Apps</h3>
                <p className="text-white/70 leading-relaxed">Whether you need a business solution or a consumer-facing app, we have the experience to deliver high-quality results.</p>
              </div>
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Ongoing Support</h3>
                <p className="text-white/70 leading-relaxed">We provide maintenance, updates, and feature enhancements to keep your app running smoothly and up-to-date.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTA title="Ready to build your next mobile app?" href="/contact" />
    </div>
  );
}
