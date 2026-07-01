"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGeminiVoice } from "@/hooks/useGeminiVoice";
import { Mic, Square, AlertCircle } from "lucide-react";
import Orb from "@/components/ui/Orb";

export default function Hero() {
  const { startConversation, stopConversation, isSpeaking, isRecording, error } = useGeminiVoice();
  const [introState, setIntroState] = useState<'gateway' | 'revealed'>('gateway');

  // Attempt automatic text-to-speech greeting on load
  useEffect(() => {
    let fallbackTimer: NodeJS.Timeout;
    
    const speakGreeting = () => {
       if ('speechSynthesis' in window) {
          const msg = new SpeechSynthesisUtterance("Welcome to Leylak Tech. I am your AI guide. Please tap the glowing orb to unlock the full interactive experience.");
          msg.rate = 0.9;
          msg.pitch = 1.1; // Slightly higher pitch for female voice
          
          const voices = window.speechSynthesis.getVoices();
          // Find definitively female voices across Windows, Mac, and Chrome
          const femaleVoice = voices.find(v => 
             v.name.includes("Zira") ||      // Windows US Female
             v.name.includes("Hazel") ||     // Windows UK Female
             v.name.includes("Samantha") ||  // Mac US Female
             v.name.includes("Karen") ||     // Mac Aussie Female
             v.name.includes("Google UK English Female") ||
             v.name.includes("Google US English") ||
             v.name.toLowerCase().includes("female")
          );
          
          if (femaleVoice) msg.voice = femaleVoice;
          
          msg.onend = () => {
             setIntroState('revealed');
             clearTimeout(fallbackTimer);
          };
          msg.onerror = () => {
             setIntroState('revealed');
             clearTimeout(fallbackTimer);
          };

          window.speechSynthesis.speak(msg);
          
          // Fallback in case speechSynthesis is blocked by autoplay policy
          fallbackTimer = setTimeout(() => {
             setIntroState('revealed');
          }, 6000);
       } else {
          fallbackTimer = setTimeout(() => {
             setIntroState('revealed');
          }, 4000);
       }
    };
    
    // Delay slightly to allow voices to load
    const timer = setTimeout(speakGreeting, 800);
    return () => {
       clearTimeout(timer);
       clearTimeout(fallbackTimer);
       if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const handleOrbClick = () => {
    if (introState === 'gateway') {
       if ('speechSynthesis' in window) window.speechSynthesis.cancel();
       setIntroState('revealed');
       startConversation();
    } else {
       if (isRecording) stopConversation();
       else startConversation();
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24 h-full flex flex-col items-center justify-center">
        
        {/* Single Layout Container */}
        <motion.div 
           layout
           className={`relative w-full max-w-[1400px] mx-auto min-h-[70vh] flex ${introState === 'revealed' ? 'flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16' : 'flex-col items-center justify-center'}`}
        >
           
          {/* Left Column Typography */}
          <AnimatePresence>
             {introState === 'revealed' && (
                <motion.div
                   initial={{ opacity: 0, x: -50 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                   className="flex flex-col items-center lg:items-start text-center lg:text-left z-20 w-full lg:w-1/2 order-2 lg:order-1 mt-8 lg:mt-0"
                >
                   <div className="relative flex flex-col items-center lg:items-start justify-center mix-blend-difference w-full">
                     <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.9] font-bold text-white tracking-tighter uppercase whitespace-nowrap z-20">Crafting</motion.h1>
                     <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.8] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500 tracking-tighter uppercase italic pr-4 z-10 relative lg:ml-2 mt-2">Digital</motion.h1>
                     <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-6xl lg:text-[5rem] leading-[0.9] font-bold text-white tracking-tighter uppercase whitespace-nowrap z-30 mt-3">Experiences</motion.h1>
                   </div>

                   <div className="mt-8 md:mt-10 flex flex-col gap-8 w-full max-w-xl relative z-50 px-4 lg:px-0">
                     <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                       We blend design, technology, and strategy to build digital products that people actually want to use.
                     </motion.p>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>

          {/* Right Column / Center Orb Container */}
          <motion.div 
             layout
             className={`relative flex flex-col items-center justify-center z-50 w-full ${introState === 'revealed' ? 'lg:w-1/2 order-1 lg:order-2 min-h-[400px]' : ''}`}
          >
             <AnimatePresence>
                {introState === 'gateway' && (
                   <motion.h2 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                      className="text-2xl md:text-4xl font-light text-white mb-12 text-center tracking-wide absolute -top-24"
                   >
                      Welcome to <strong className="font-bold">Leylak Tech</strong>.
                   </motion.h2>
                )}
             </AnimatePresence>

             <motion.button
                layout
                onClick={handleOrbClick}
                className={`relative flex items-center justify-center rounded-full group cursor-pointer border-none bg-transparent transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${introState === 'gateway' ? 'w-72 h-72 md:w-[450px] md:h-[450px]' : 'w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] hover:scale-105'}`}
             >
                 <div className="absolute inset-0 z-0 pointer-events-auto">
                    <Orb hoverIntensity={0.8} rotateOnHover={true} hue={isRecording ? 10 : 0} forceHoverState={isSpeaking || isRecording} backgroundColor="transparent" />
                 </div>

                 {isSpeaking && (
                    <motion.div animate={{ scale: [1, 1.8, 2.5], opacity: [0.6, 0.2, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }} className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 pointer-events-none" />
                 )}
                 
                 <div className={`relative z-10 p-6 rounded-full transition-colors duration-300 pointer-events-none ${isRecording ? 'text-red-500' : 'text-white/70 group-hover:text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]'}`}>
                    {isRecording ? <Square size={36} fill="currentColor" /> : <Mic size={40} />}
                 </div>
             </motion.button>

             <AnimatePresence mode="wait">
                {introState === 'gateway' ? (
                   <motion.div 
                      key="gateway-text"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      className="mt-12 text-sm md:text-base text-white/60 tracking-[0.2em] uppercase text-center max-w-md animate-pulse absolute -bottom-16"
                   >
                      Tap the orb to unlock the full experience
                   </motion.div>
                ) : (
                   <motion.div 
                      key="revealed-text"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-xs md:text-sm text-white/80 uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-2 px-6 py-3 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(220,38,38,0.15)] mt-4"
                   >
                      {error ? <span className="text-red-400 flex items-center gap-2"><AlertCircle size={14} /> Error</span>
                      : isSpeaking ? <span className="text-orange-400 animate-pulse">Agent speaking...</span>
                      : isRecording ? <span className="text-red-400 animate-pulse">Listening...</span>
                      : "TOUCH TO AWAKEN"}
                   </motion.div>
                )}
             </AnimatePresence>
          </motion.div>

          {/* Ambient Glows only show when revealed */}
          <AnimatePresence>
            {introState === 'revealed' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="hidden lg:block absolute inset-0 pointer-events-none z-0"
              >
                <div className="absolute -left-[20%] top-1/3 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute -right-[20%] bottom-1/3 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] mix-blend-screen" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

