"use client";

import { motion } from "framer-motion";
import TypingText from "@/components/animations/TypingText";
import { staggerContainer, staggerItem } from "@/lib/animations";

const SERVICES = [
  {
    title: "Web Development",
    items: [
      "React & Next.js",
      "Full-Stack Development",
      "API Development",
      "Design Systems",
      "Performance Optimization",
    ],
  },
  {
    title: "Brand Strategy",
    items: [
      "Brand Positioning",
      "Identity Design",
      "Marketing Campaigns",
      "Content Strategy",
      "Digital Presence",
    ],
  },
  {
    title: "Guidance",
    items: [
      "Technical Consulting",
      "Team Workshops",
      "Mentorship Programs",
      "Code Reviews",
      "Architecture Planning",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-16">
          <TypingText
            text="We help brands at the cusp of change by unlocking hidden potential. In our practice we intentionally blur lines between brand and product design."
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl"
            delay={0}
            wordDelay={0.08}
          />
        </div>

        {/* Services Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
        >
          {SERVICES.map((service, index) => (
            <motion.div key={index} variants={staggerItem} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">
                {service.title}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-lg text-gray-700 flex items-start"
                  >
                    <span className="mr-3 text-black">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

