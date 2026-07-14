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
          {/* REVEALED STATE */}
          {/* REVEALED STATE */}
          <AnimatePresence>
             {introState === 'revealed' && (
                <motion.div
                   key="revealed-container"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 1, delay: 0.2 }}
                   className="absolute inset-0 z-20 w-full h-full flex flex-col justify-center"
                >
                   {/* Unique Kinetic Typography Hero Layout */}
                   <div className="absolute inset-0 w-full h-full flex flex-col justify-center overflow-hidden z-20">
                      
                      {/* Background Tech Grid */}
                      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

                      {/* Tech Accents */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute top-8 left-6 md:top-12 md:left-12 z-10 font-mono text-[10px] md:text-xs text-white/30 tracking-[0.3em] uppercase">
                        [ SYS_ONLINE // VOL. 01 ]
                      </motion.div>
                      
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="hidden md:block absolute top-12 right-12 z-10 font-mono text-xs text-white/30 tracking-[0.2em] text-right">
                        LAT. 40.7128° N <br />
                        LONG. 74.0060° W
                      </motion.div>

                      {/* Scroll Indicator */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="hidden lg:flex absolute bottom-12 left-12 z-10 flex-col items-center gap-6">
                        <span className="font-mono text-[10px] text-white/40 rotate-180 [writing-mode:vertical-rl] tracking-[0.3em]">SCROLL</span>
                        <div className="w-[1px] h-20 bg-white/10 relative overflow-hidden">
                          <motion.div 
                            animate={{ y: [-40, 80] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-full h-[40px] bg-red-500 absolute top-0 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                          />
                        </div>
                      </motion.div>

                      <div className="flex flex-col justify-center relative w-full -mt-10 md:mt-0 z-20">
                         {/* CRAFTING - Hollow Outline */}
                         <motion.h1 
                            initial={{ x: -100, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }} 
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-[16vw] md:text-[12vw] lg:text-[10vw] xl:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter ml-[5vw] opacity-80 whitespace-nowrap"
                            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.5)", color: "transparent" }}
                         >
                            Crafting
                         </motion.h1>

                         {/* DIGITAL - Solid Gradient */}
                         <motion.h1 
                            initial={{ x: 100, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }} 
                            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                            className="text-[18vw] md:text-[14vw] lg:text-[12vw] xl:text-[12vw] leading-[0.85] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 tracking-tighter italic text-right mr-[5vw] z-10 drop-shadow-2xl whitespace-nowrap"
                         >
                            Digital
                         </motion.h1>

                         {/* EXPERIENCES - Solid White */}
                         <motion.h1 
                            initial={{ x: -100, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }} 
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="text-[13vw] md:text-[10vw] lg:text-[8vw] xl:text-[8vw] leading-[0.85] font-black uppercase text-white tracking-tighter ml-[8vw] whitespace-nowrap"
                         >
                            Experiences
                         </motion.h1>
                      </div>
                   </div>

                   {/* Floating AI Button - Center Bottom */}
                   <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[60]">
                      <motion.button
                         layoutId="voice-orb"
                         onClick={handleOrbClick}
                         className="relative flex items-center justify-center w-[80px] h-[80px] md:w-[100px] md:h-[100px] shrink-0 rounded-full overflow-hidden transition-transform duration-500 group border border-white/10 bg-black/30 backdrop-blur-md hover:scale-110 cursor-pointer outline-none shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:shadow-[0_0_50px_rgba(220,38,38,0.4)]"
                      >
                         <div className="absolute inset-0 z-0 pointer-events-auto">
                            <Orb hoverIntensity={0.8} rotateOnHover={true} hue={isRecording ? 10 : 0} forceHoverState={isSpeaking || isRecording} backgroundColor="transparent" isSpeaking={isSpeaking} />
                         </div>

                         <div className={`relative z-10 p-2 rounded-full transition-colors duration-300 pointer-events-none ${isRecording ? 'text-red-500' : 'text-white/70 group-hover:text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]'}`}>
                            {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={28} />}
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

