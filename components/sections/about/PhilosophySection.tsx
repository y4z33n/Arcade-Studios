"use client";

import { motion } from "framer-motion";
import TypingText from "@/components/animations/TypingText";
import { slideInLeft, slideInRight } from "@/lib/animations";
import NewsletterForm from "@/components/ui/NewsletterForm";

// Placeholder gallery images
const GALLERY_IMAGES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  placeholder: `Img ${i + 1}`,
}));

export default function PhilosophySection() {
  return (
    <section className="bg-gray-50 py-20 md:py-32">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-16">
          <TypingText
            text="We have a kink. We are rather obsessed with finding meaning. It bleeds out into our life and our work."
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl"
            delay={0}
            wordDelay={0.08}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Philosophy Text & Form */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Our philosophy is simple: dig deeper, ask better questions, and
                never settle for surface-level solutions. We believe that the best
                work comes from understanding the "why" behind every decision.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                This obsession with meaning drives everything we do—from the way
                we approach client relationships to how we architect code. We're
                not just building websites; we're crafting experiences that
                resonate.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                We collaborate closely with our clients, becoming true partners in
                their journey. Our process is iterative, transparent, and always
                focused on delivering real value.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="pt-8 border-t border-gray-300">
              <h3 className="text-2xl font-bold mb-6">
                Join our newsletter
              </h3>
              <NewsletterForm theme="light" />
            </div>
          </motion.div>

          {/* Right: Photo Gallery */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
          >
            <div className="grid grid-cols-2 gap-4">
              {GALLERY_IMAGES.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className={`bg-gray-300 rounded-lg overflow-hidden ${
                    index % 5 === 0 ? "row-span-2" : ""
                  }`}
                  style={{
                    aspectRatio: index % 5 === 0 ? "1/2" : "1/1",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    {image.placeholder}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

