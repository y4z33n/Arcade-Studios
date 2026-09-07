"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

function AppleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function GooglePlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none" aria-hidden="true">
      <path
        d="M48.7 15.8C45.3 19.5 43.3 25.1 43.3 32.5v447c0 7.4 2 13 5.4 16.7l1.7 1.5 250.7-250.7v-5.9L50.4 14.3l-1.7 1.5z"
        fill="#00D3FF"
      />
      <path
        d="M386.7 172.7L92.7 6.4C75.2-3.5 59.8-2.3 50.4 7.6l250.7 250.7 85.6-85.6z"
        fill="#00E676"
      />
      <path
        d="M384.8 340.2l-83.7-83.7v-5.9l83.7-83.7 1.9 1.1 99.2 56.4c28.3 16.1 28.3 42.4 0 58.5l-99.2 56.4-1.9 0.9z"
        fill="#FFD400"
      />
      <path
        d="M386.7 339.3L301.1 253.7 50.4 504.4c9.4 9.9 24.8 11.1 42.3 1.2l294-166.3z"
        fill="#FF3333"
      />
    </svg>
  );
}

export default function AppDevPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const featuredApps = [
    {
      name: "Chili Order",
      description: "B2B merchant and reseller platform enabling retail shop owners across Mauritius to order SIM cards, purchase recharge cards, and issue digital E-Topup for customers.",
      category: "B2B Telecom & Reseller",
      badge: "Latest Release",
      appStoreUrl: "https://apps.apple.com/us/app/chili-order/id6798525541",
      playStoreUrl: "https://play.google.com/store/apps/details?id=mu.chillisim.flash"
    },
    {
      name: "Sapaad POS",
      description: "Point of Sale solution for restaurants and hospitality businesses with real-time sync, inventory, and offline support.",
      category: "Business & Hospitality",
      appStoreUrl: "https://apps.apple.com/us/app/sapaad-pos/id1535812177",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.sapaad.pos"
    },
    {
      name: "Sapaad Kiosk",
      description: "Self-service kiosk application for streamlined ordering, faster checkout queues, and kitchen automation.",
      category: "Business & Hospitality",
      appStoreUrl: "https://apps.apple.com/us/app/sapaad-kiosk/id1555639339",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.sapaad.kiosk"
    },
    {
      name: "Sapaad Dash",
      description: "Live management dashboard and telemetry analytics for restaurant tracking and delivery fleet routing.",
      category: "Business & Analytics",
      appStoreUrl: "https://apps.apple.com/us/app/sapaad-dash/id6443775672",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.sapaad.dash"
    },
    {
      name: "Suterra 360",
      description: "Comprehensive 360-degree agricultural platform combining crop monitoring, biocontrol pest alerts, and predictive weather data.",
      category: "Business Solutions",
      appStoreUrl: "https://apps.apple.com/us/app/suterra-360/id6615080357?l=pt-BR",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.visualnacert.visualsensor.suterra"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(239,68,68,0.1),transparent_60%)]" />
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24 relative z-10">
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
            <span className="text-red-500">That Scale</span>
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold mb-2 block"
              >
                Production Portfolio
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
              >
                Featured Mobile Apps
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-sm text-white/50 max-w-md"
            >
              Native & cross-platform applications deployed to the Apple App Store and Google Play Store.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
            {featuredApps.map((app, index) => {
              const isHero = app.name === "Chili Order";
              return (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/10 p-8 flex flex-col justify-between ${
                    isHero ? "md:col-span-2" : ""
                  }`}
                >
                  <div className={isHero ? "flex flex-col lg:flex-row lg:items-center justify-between gap-6" : ""}>
                    <div className={isHero ? "max-w-2xl" : ""}>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 text-xs font-medium uppercase tracking-wider rounded-full">
                            {app.category}
                          </span>
                          {app.badge && (
                            <span className="inline-block px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold uppercase tracking-wider rounded-full">
                              {app.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                          {app.appStoreUrl && (
                            <span title="Available on Apple App Store">
                              <AppleIcon className="w-3.5 h-3.5 fill-current text-white/80" />
                            </span>
                          )}
                          {app.appStoreUrl && app.playStoreUrl && (
                            <span className="text-white/20">|</span>
                          )}
                          {app.playStoreUrl && (
                            <span title="Available on Google Play Store">
                              <GooglePlayIcon className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className={`${isHero ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300`}>
                        {app.name}
                      </h3>
                      <p className="text-white/70 text-base md:text-lg mb-6 leading-relaxed">
                        {app.description}
                      </p>
                    </div>

                    {isHero && (
                      <div className="lg:pl-8 lg:border-l lg:border-white/10 flex flex-col justify-center flex-shrink-0">
                        <div className="text-[11px] uppercase tracking-wider text-white/40 font-medium mb-3">
                          Available on
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {app.appStoreUrl && (
                            <a
                              href={app.appStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                              title={`${app.name} on Apple App Store`}
                              aria-label={`${app.name} on Apple App Store`}
                            >
                              <AppleIcon className="w-5 h-5 fill-current text-white/90 group-hover/btn:text-white transition-colors" />
                              <div className="flex flex-col text-left">
                                <span className="text-[9px] uppercase font-semibold text-white/40 tracking-wider leading-none">
                                  Download on
                                </span>
                                <span className="text-xs font-bold text-white leading-tight">
                                  App Store
                                </span>
                              </div>
                            </a>
                          )}

                          {app.playStoreUrl && (
                            <a
                              href={app.playStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                              title={`${app.name} on Google Play`}
                              aria-label={`${app.name} on Google Play`}
                            >
                              <GooglePlayIcon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover/btn:scale-105" />
                              <div className="flex flex-col text-left">
                                <span className="text-[9px] uppercase font-semibold text-white/40 tracking-wider leading-none">
                                  Get it on
                                </span>
                                <span className="text-xs font-bold text-white leading-tight">
                                  Google Play
                                </span>
                              </div>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {!isHero && (
                    <div className="pt-6 border-t border-white/10 mt-auto">
                      <div className="text-[11px] uppercase tracking-wider text-white/40 font-medium mb-3">
                        Available on
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        {app.appStoreUrl && (
                          <a
                            href={app.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                            title={`${app.name} on Apple App Store`}
                            aria-label={`${app.name} on Apple App Store`}
                          >
                            <AppleIcon className="w-5 h-5 fill-current text-white/90 group-hover/btn:text-white transition-colors" />
                            <div className="flex flex-col text-left">
                              <span className="text-[9px] uppercase font-semibold text-white/40 tracking-wider leading-none">
                                Download on
                              </span>
                              <span className="text-xs font-bold text-white leading-tight">
                                App Store
                              </span>
                            </div>
                          </a>
                        )}

                        {app.playStoreUrl && (
                          <a
                            href={app.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                            title={`${app.name} on Google Play`}
                            aria-label={`${app.name} on Google Play`}
                          >
                            <GooglePlayIcon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover/btn:scale-105" />
                            <div className="flex flex-col text-left">
                              <span className="text-[9px] uppercase font-semibold text-white/40 tracking-wider leading-none">
                                Get it on
                              </span>
                              <span className="text-xs font-bold text-white leading-tight">
                                Google Play
                              </span>
                            </div>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
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

      {/* Bottom Callout */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="w-full mx-auto px-6 lg:px-12 3xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-500/20 p-10 md:p-14 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              Got an app idea?<br />
              <span className="text-red-400">Let's build it.</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              From iOS to Android to cross-platform — we turn your concept into a 
              polished, performant app that's ready for the App Store and Google Play.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all text-base"
            >
              Start your app project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <CTA title="Ready to build your next mobile app?" href="/contact" />
    </div>
  );
}
