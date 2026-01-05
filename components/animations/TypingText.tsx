"use client";

import { motion } from "framer-motion";
import { typingAnimation } from "@/lib/animations";

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}

export default function TypingText({
  text,
  className = "",
  delay = 0,
  wordDelay = 0.1,
}: TypingTextProps) {
  const words = text.split(" ");

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial="initial"
          animate="animate"
          variants={typingAnimation}
          transition={{
            delay: delay + index * wordDelay,
            duration: 0.3,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}






