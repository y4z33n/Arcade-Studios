"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGeminiContext } from "@/components/providers/GeminiVoiceProvider";
import { Mic, Square, AlertCircle } from "lucide-react";
import Orb from "@/components/ui/Orb";

const TypewriterText = ({ text, className, delay = 0.5, trigger = true }: { text: string, className?: string, delay?: number, trigger?: boolean }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(5px)",
    },
  };

  return (
    <motion.h2
      className={className}
      variants={container}
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block mr-[0.25em]">
          {word === "Leylak" || word === "Tech." ? <strong className="font-bold">{word}</strong> : word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default function Hero() {
  const { 
    isRecording, 
    isSpeaking, 
    isConnected,
    startConversation, 
    stopConversation 
  } = useGeminiContext();
  const [introState, setIntroState] = useState<'gateway' | 'revealed'>('gateway');
  const [hasGreeted, setHasGreeted] = useState(false);

  // Start Gemini without mic immediately on load, unless it's already active from another page
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (isConnected || hasSeenIntro) {
      setIntroState('revealed');
    }
    
    if (!isConnected && !hasSeenIntro) {
      startConversation(false);
    }
  }, [isConnected]);

  // Persist that the user has seen the intro for this session
  useEffect(() => {
    if (introState === 'revealed') {
      sessionStorage.setItem('hasSeenIntro', 'true');
    }
  }, [introState]);

  // Track when greeting starts
  useEffect(() => {
     if (isSpeaking && introState === 'gateway') {
        setHasGreeted(true);
     }
  }, [isSpeaking, introState]);

  // Transition to revealed automatically when greeting finishes
  useEffect(() => {
     let timeout: NodeJS.Timeout;
     if (hasGreeted && !isSpeaking && introState === 'gateway') {
        // Wait briefly to ensure it's truly finished, then transition
        timeout = setTimeout(() => {
           setIntroState('revealed');
        }, 1500);
     }
     return () => clearTimeout(timeout);
  }, [hasGreeted, isSpeaking, introState]);

  const handleOrbClick = () => {
    if (introState === 'gateway') {
       setIntroState('revealed');
       if (!isRecording) startConversation();
    } else {
       if (isRecording) stopConversation();
       else startConversation();
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-12 3xl:px-24 h-full flex flex-col items-center justify-center">
        
        <div className="relative w-full max-w-[1400px] mx-auto min-h-[70vh] flex items-center justify-center">

          {/* GATEWAY STATE */}
          <AnimatePresence>
            {introState === 'gateway' && (
              <motion.div 
                 key="gateway-container"
                 className="absolute inset-0 flex flex-col items-center justify-center z-50 w-full h-full"
                 exit={{ opacity: 0, transition: { duration: 0.5 } }}
              >
                 <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8 lg:gap-16 px-4 z-10">
                     <div className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto">
                         <TypewriterText 
                            text="Welcome to" 
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide lg:text-right" 
                            delay={0.2}
                            trigger={hasGreeted}
                         />
                     </div>

                     <motion.button
                        layoutId="voice-orb"
                        onClick={handleOrbClick}
                        className="relative flex items-center justify-center w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] shrink-0 rounded-full group cursor-pointer border-none bg-transparent outline-none"
                     >
                         <div className="absolute inset-0 pointer-events-none">
                            <Orb hoverIntensity={0.8} rotateOnHover={true} hue={0} forceHoverState={true} backgroundColor="transparent" isSpeaking={isSpeaking} />
                         </div>
                         <div className="relative z-10 p-6 rounded-full text-white/70 group-hover:text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                            <Mic size={48} />
                         </div>
                     </motion.button>

                     <div className="flex-1 flex justify-center lg:justify-start w-full lg:w-auto">
                         <TypewriterText 
                            text="Leylak Tech." 
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide lg:text-left drop-shadow-md" 
                            delay={0.8}
                            trigger={hasGreeted}
                         />
                     </div>
                 </div>


              </motion.div>
            )}
          </AnimatePresence>

          {/* REVEALED STATE */}
          <AnimatePresence>
             {introState === 'revealed' && (
                <motion.div
                   key="revealed-container"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 1, delay: 0.2 }}
                   className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16 relative z-20"
                >
                   {/* Left Column Typography */}
                   <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-20">
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
                   </div>

                   {/* Right Column Orb */}
                   <div className="relative flex flex-col items-center justify-center min-h-[400px] z-50 mt-12 lg:mt-0 w-full">
                      <motion.button
                         layoutId="voice-orb"
                         onClick={handleOrbClick}
                         className="relative flex items-center justify-center w-[250px] h-[250px] md:w-[400px] md:h-[400px] shrink-0 rounded-full overflow-hidden transition-transform duration-500 group border-none bg-transparent hover:scale-105 cursor-pointer outline-none"
                      >
                         <div className="absolute inset-0 z-0 pointer-events-auto">
                            <Orb hoverIntensity={0.8} rotateOnHover={true} hue={isRecording ? 10 : 0} forceHoverState={isSpeaking || isRecording} backgroundColor="transparent" isSpeaking={isSpeaking} />
                         </div>

                         <div className={`relative z-10 p-6 rounded-full transition-colors duration-300 pointer-events-none ${isRecording ? 'text-red-500' : 'text-white/70 group-hover:text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]'}`}>
                            {isRecording ? <Square size={36} fill="currentColor" /> : <Mic size={40} />}
                         </div>
                      </motion.button>
                      

                   </div>
                </motion.div>
             )}
          </AnimatePresence>

          {/* Ambient Glows */}
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

        </div>
      </div>
    </section>
  );
}

