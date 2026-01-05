"use client";

import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";

const SERVICES = [
  {
    title: "Web Development",
    items: [
      "React & Next.js",
      "Full-Stack Development",
      "API Development",
      "Design Systems",
    ],
  },
  {
    title: "Brand Strategy",
    items: [
      "Brand Positioning",
      "Identity Design",
      "Marketing Campaigns",
      "Content Strategy",
    ],
  },
  {
    title: "Guidance",
    items: [
      "Technical Consulting",
      "Team Workshops",
      "Mentorship Programs",
      "Code Reviews",
    ],
  },
];

export default function Capabilities() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Heading */}
          <motion.h2
            variants={slideInLeft}
            className="text-4xl md:text-5xl font-bold mb-12 max-w-2xl"
          >
            We help brands at the cusp of change by unlocking hidden potential
          </motion.h2>

          {/* Services Grid */}
          <motion.div
            variants={slideInRight}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {SERVICES.map((service, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-2xl font-bold">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

