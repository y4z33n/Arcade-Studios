"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGeminiContext } from '@/components/providers/GeminiVoiceProvider';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mic, Square, Volume2 } from 'lucide-react';
import { menuState } from '@/lib/store';
import Orb from './Orb';

export default function GlobalOrb() {
  const { isSpeaking, isRecording, isConnected, startConversation, stopConversation, error } = useGeminiContext();
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(menuState.open);
    const unsub = menuState.subscribe((open) => setMenuOpen(open));
    return () => { unsub(); };
  }, []);

  if (pathname.startsWith('/mail') || menuOpen) {
    return null;
  }

  const handleOrbClick = () => {
    if (isConnected || isRecording) {
      stopConversation();
    } else {
      startConversation();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-2 md:bottom-4 inset-x-0 w-full z-[9999] flex flex-col items-center gap-1.5 md:gap-3 pointer-events-none"
      >
        <div className="relative pointer-events-auto flex items-center justify-center">

          {/* Error Message Tooltip */}
          {error && (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="absolute bottom-[110%] text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-sans whitespace-nowrap backdrop-blur-md mb-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
             >
               {error}
             </motion.div>
          )}

          {/* Breathing Halo (Dynamically adjusts based on state, but stays elegant) */}
          <motion.div 
            animate={{ 
              scale: prefersReducedMotion ? 1 : isSpeaking ? [1, 1.2, 1] : isRecording ? [1, 1.1, 1] : [1, 1.15, 1], 
              opacity: prefersReducedMotion ? 0.4 : isSpeaking ? [0.4, 0.7, 0.4] : isRecording ? [0.4, 0.6, 0.4] : [0.3, 0.6, 0.3] 
            }}
            transition={{ 
              duration: isSpeaking ? 1 : isRecording ? 2 : 4, 
              repeat: prefersReducedMotion ? 0 : Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-[-12px] md:inset-[-20px] rounded-full blur-[12px] md:blur-[15px] pointer-events-none -z-10 transition-colors duration-500 bg-[#D91F2A]/20"
          />
          
          <motion.button
              onClick={handleOrbClick}
              className={`relative flex items-center justify-center w-[60px] h-[60px] md:w-[100px] md:h-[100px] shrink-0 rounded-full overflow-hidden transition-all duration-500 group border border-white/10 bg-black/30 backdrop-blur-md hover:scale-110 cursor-pointer outline-none ${isSpeaking ? 'shadow-[0_0_40px_rgba(255,255,255,0.15)]' : isRecording ? 'shadow-[0_0_30px_rgba(220,38,38,0.4)]' : 'shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:shadow-[0_0_50px_rgba(220,38,38,0.4)]'}`}
          >
              <div className="absolute inset-0 z-0 pointer-events-auto">
                <Orb hoverIntensity={0.8} rotateOnHover={true} hue={isRecording ? 10 : 0} forceHoverState={isSpeaking || isRecording} backgroundColor="transparent" isSpeaking={isSpeaking} />
              </div>

              <div className={`relative z-10 p-1.5 md:p-2 rounded-full transition-colors duration-300 pointer-events-none ${isSpeaking ? 'text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : isRecording ? 'text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'text-white/70 group-hover:text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]'}`}>
                {isSpeaking ? <Volume2 className="w-5 h-5 md:w-6 md:h-6" /> : isRecording ? <Square className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" /> : <Mic className="w-5 h-5 md:w-7 md:h-7" />}
              </div>
          </motion.button>
        </div>
        
        {/* Dynamic Label */}
        <div className="h-[20px] flex items-center justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={isSpeaking ? "speaking" : isRecording ? "recording" : "idle"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium font-sans whitespace-nowrap transition-colors duration-500 ${isSpeaking ? 'text-white/70' : isRecording ? 'text-red-500/70' : 'text-[#F4F1ED]/40'}`}
            >
              {isSpeaking ? (
                <span className="flex items-center gap-2">
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  AI IS SPEAKING
                </span>
              ) : isRecording ? (
                <span className="flex items-center gap-2">
                  <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                  LISTENING...
                </span>
              ) : (
                "ASK LEYLAK"
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
