"use client";

import { usePathname } from 'next/navigation';
import { useGeminiContext } from '@/components/providers/GeminiVoiceProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square } from 'lucide-react';
import Orb from './Orb';

export default function GlobalOrb() {
  const pathname = usePathname();
  const { isSpeaking, isRecording, startConversation, stopConversation } = useGeminiContext();

  // Do not show on the homepage because the Hero section has its own giant orb
  if (pathname === '/') return null;

  const handleOrbClick = () => {
    if (isRecording) {
      stopConversation();
    } else {
      startConversation();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-6 right-6 z-[9999]"
      >
        <motion.button
          layoutId="voice-orb"
          onClick={handleOrbClick}
          className="relative flex items-center justify-center w-[120px] h-[120px] rounded-full group cursor-pointer border-none bg-transparent outline-none overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <div className="absolute inset-0 pointer-events-none">
            <Orb
              hoverIntensity={0.8}
              rotateOnHover={true}
              hue={isRecording ? 10 : 0}
              forceHoverState={isSpeaking || isRecording}
              backgroundColor="transparent"
              isSpeaking={isSpeaking}
            />
          </div>

          <div
            className={`relative z-10 p-4 rounded-full transition-colors duration-300 pointer-events-none drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
              isRecording ? 'text-red-500' : 'text-white/70 group-hover:text-white'
            }`}
          >
            {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={24} />}
          </div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
