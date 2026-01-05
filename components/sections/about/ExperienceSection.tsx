"use client";

import { motion } from "framer-motion";
import TypingText from "@/components/animations/TypingText";
import { staggerContainer, staggerItem } from "@/lib/animations";

const TIMELINE = [
  {
    year: "2022-Now",
    company: "Rivian",
    role: "Lead Developer",
    type: "In-house",
  },
  {
    year: "2020-2022",
    company: "Rivian",
    role: "Senior Developer",
    type: "In-house",
  },
  {
    year: "2018-2020",
    company: "Various Startups",
    role: "Full-Stack Developer",
    type: "Contract",
  },
  {
    year: "2015-2018",
    company: "Digital Agency",
    role: "Frontend Developer",
    type: "Full-time",
  },
  {
    year: "2012-2015",
    company: "Freelance",
    role: "Web Developer",
    type: "Self-employed",
  },
];

export default function ExperienceSection() {
  return (
    <section className="bg-gray-50 py-20 md:py-32">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <TypingText
          text="13+ years building next-gen brands and products."
          className="text-4xl md:text-5xl font-bold mb-16"
          delay={0}
          wordDelay={0.12}
        />

        {/* Timeline */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl space-y-8"
        >
          {TIMELINE.map((entry, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start pb-8 border-b border-gray-300 last:border-none"
            >
              <div className="md:col-span-3">
                <p className="text-sm font-medium text-gray-600">
                  {entry.year}
                </p>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-xl font-bold mb-1">
                  {entry.company}
                </h3>
                <p className="text-sm text-gray-600">{entry.type}</p>
              </div>
              <div className="md:col-span-4">
                <p className="text-lg text-gray-800">{entry.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
          >
            Download Resume
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2"
            >
              <path
                d="M12 3V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M7 11L12 16L17 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black rounded font-medium hover:bg-black hover:text-white transition-colors"
          >
            View LinkedIn
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2"
            >
              <path
                d="M18 13V19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 10V10.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 13V19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 10V10.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

