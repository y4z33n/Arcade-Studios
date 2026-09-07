import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { WEBSITE_MAP } from '@/lib/website-knowledge';

export function useGeminiVoice() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [navPath, setNavPath] = useState<string | null>(null);

  useEffect(() => {
    if (navPath) {
      router.push(navPath);
      setNavPath(null);
    }
  }, [navPath, router]);
  
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const activeAudioNodesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const sessionIdRef = useRef<string | null>(null);
  const continuousScrollRef = useRef<number | null>(null);

  const stopContinuousScroll = useCallback(() => {
    if (continuousScrollRef.current) {
      console.log("[Voice Agent] Stopping continuous scroll");
      cancelAnimationFrame(continuousScrollRef.current);
      continuousScrollRef.current = null;
    }
  }, []);

  const startContinuousScroll = useCallback((speed: number = 6) => {
    if (continuousScrollRef.current) return;
    console.log(`[Voice Agent] Starting continuous scroll at speed ${speed}`);
    const scrollStep = () => {
      window.scrollBy({ top: speed, behavior: 'auto' });
      // Stop if hit bottom
      if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
         stopContinuousScroll();
         return;
      }
      continuousScrollRef.current = requestAnimationFrame(scrollStep);
    };
    continuousScrollRef.current = requestAnimationFrame(scrollStep);
  }, [stopContinuousScroll]);

  const startConversation = async (listenInitially = true) => {
    // Initialize AudioContext synchronously on user gesture to bypass autoplay restrictions
    if (!audioContextRef.current) {
       const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
       if (AudioContextClass) {
         audioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
         audioContextRef.current.resume();
       }
    } else if (audioContextRef.current.state === 'suspended') {
       audioContextRef.current.resume();
    }

    if (wsRef.current) {
      if (listenInitially && !isRecording) {
         startMicrophone();
      } else if (isRecording && !listenInitially) {
         stopConversation();
      } else if (isRecording && listenInitially) {
         stopConversation();
      }
      return;
    }

    try {
      setError(null);
      // 1. Fetch secure URL from our backend
      console.log("[Voice Agent] Fetching WebSocket URL from /api/gemini...");
      const res = await fetch('/api/gemini');
      if (!res.ok) {
        let errMsg = `Voice assistant is temporarily unavailable (${res.status})`;
        try {
          const errData = await res.json();
          if (errData?.error) errMsg = errData.error;
        } catch {
          // ignore non-JSON parse errors
        }
        throw new Error(errMsg);
      }
      const data = await res.json();

      const { url } = data;
      console.log("[Voice Agent] Connecting to WebSocket URL...");

      // 2. Open WebSocket
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        setIsConnected(true);
        console.log("[Voice Agent] WebSocket Connection Opened!");
        // Generate a unique session ID for this conversation
        sessionIdRef.current = crypto.randomUUID();

        // 3. Send the System Prompt immediately
        const setupMessage = {
          setup: {
            model: "models/gemini-3.1-flash-live-preview",
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: "Aoede"
                  }
                }
              }
            },
            systemInstruction: {
              parts: [{ text: `You are the voice assistant for Leylak Tech.
CRITICAL INSTRUCTIONS:
- Be concise, friendly, natural, and act like a real human.
- NEVER state exact prices, minimum budgets, or shut down a project. Always say "it depends on the project scope" and that Leylak Tech is open to projects of any size (small, mid, or big).
- Keep the conversation strictly to Leylak Tech and our business. NEVER suggest other platforms like Wix.
- Do not interrogate the user. Gather information naturally. Example: greet -> ask name -> later discreetly ask for their phone number (including country code) and if they use WhatsApp -> ask about their project brief -> ask about their budget -> finally ask for email (and verify spelling before recording).
- PROACTIVELY AUTO-NAVIGATE AND AUTO-SCROLL: You have access to tools to navigate the website, scroll, and record leads. Use them proactively! When you talk about a specific service, product, or page, call the navigation tool to bring the user there. Talk naturally about what is in front of them (e.g., "Here is our work page...", "Let's take a look at our mobile apps...", "Scrolling down so you can see...").
- STRICT BAN ON ROBOTIC ANNOUNCEMENTS: NEVER say robotic status confirmations like "Navigation done", "Navigated to section", "Navigation successful", "Scroll complete", "Tool executed", or "Memory updated". Never speak like a machine executing commands. Speak warmly, smoothly, and conversationally as a human companion guiding the user.

GLOBAL WEBSITE KNOWLEDGE:
${WEBSITE_MAP}` }]
            },
            tools: [{
              functionDeclarations: [
                {
                  name: "record_lead_info",
                  description: "Saves information about a potential client/lead.",
                  parameters: {
                    type: "OBJECT",
                    properties: {
                      name: { type: "STRING" },
                      phone: { type: "STRING" },
                      email: { type: "STRING" },
                      budget: { type: "STRING" },
                      project_brief: { type: "STRING" }
                    }
                  }
                },
                {
                  name: "navigate_to_page",
                  description: "Navigates the user's screen to a specific page on the website. Routes: '/' (Home), '/about' (About Leylak Tech), '/work' (Services Hub), '/work/web-dev' (Web Design & Development), '/work/app-dev' (Mobile App Engineering & Chili Order), '/work/software-dev' (Custom Enterprise Software), '/products' (Proprietary Products: LeySupport, GymLey, MedLey, FuelEy), '/contact' (Contact & Quotes).",
                  parameters: {
                    type: "OBJECT",
                    properties: {
                      path: { 
                        type: "STRING", 
                        enum: [
                          "/", 
                          "/about", 
                          "/work", 
                          "/work/web-dev", 
                          "/work/app-dev", 
                          "/work/software-dev", 
                          "/products", 
                          "/contact"
                        ] 
                      }
                    },
                    required: ["path"]
                  }
                },
                {
                  name: "scroll_page",
                  description: "Scrolls the current page up or down.",
                  parameters: {
                    type: "OBJECT",
                    properties: {
                      direction: { type: "STRING", enum: ["up", "down", "top", "bottom"] }
                    },
                    required: ["direction"]
                  }
                },
                {
                  name: "start_continuous_scroll",
                  description: "Starts a slow, continuous cinematic scroll down the page. Use this when taking the user on a tour of the page.",
                  parameters: {
                    type: "OBJECT",
                    properties: {
                      speed: { type: "INTEGER", description: "The speed of the scroll, typically 1 or 2" }
                    }
                  }
                },
                {
                  name: "stop_continuous_scroll",
                  description: "Stops the continuous cinematic scroll.",
                  parameters: {
                    type: "OBJECT",
                    properties: {}
                  }
                }
              ]
            }]
          }
        };
        console.log("[Voice Agent] Sending setup message:", setupMessage);
        wsRef.current?.send(JSON.stringify(setupMessage));

        // Start capturing mic audio if requested
        if (listenInitially) {
            startMicrophone();
        }
      };

      wsRef.current.onmessage = async (event) => {
        try {
          let msg;
          if (event.data instanceof Blob) {
              const text = await event.data.text();
              msg = JSON.parse(text);
          } else {
              msg = JSON.parse(event.data);
          }
          
          if (msg.serverContent) {
            if (msg.serverContent.interrupted) {
              console.log("[Voice Agent] Interrupted by user");
              activeAudioNodesRef.current.forEach(node => {
                try { node.stop(); } catch (e) {}
              });
              activeAudioNodesRef.current.clear();
              nextPlayTimeRef.current = 0;
              setIsSpeaking(false);
              stopContinuousScroll();
            }
            
            const modelTurn = msg.serverContent.modelTurn;
            if (modelTurn) {
              for (const part of modelTurn.parts) {
                if (part.text) {
                  console.log("[Voice Agent] Agent text:", part.text);
                  
                  // Natural Language Heuristic Fallback
                  const spoken = part.text.toLowerCase();
                  if (spoken.includes("take you") || spoken.includes("head") || spoken.includes("navigat") || spoken.includes("show") || spoken.includes("bring you")) {
                      let targetPath = null;
                      if (spoken.includes("web dev") || spoken.includes("website") || spoken.includes("web design")) targetPath = "/work/web-dev";
                      else if (spoken.includes("app dev") || spoken.includes("mobile") || spoken.includes("ios") || spoken.includes("android") || spoken.includes("chili")) targetPath = "/work/app-dev";
                      else if (spoken.includes("software dev") || spoken.includes("custom software") || spoken.includes("backend") || spoken.includes("api") || spoken.includes("database")) targetPath = "/work/software-dev";
                      else if (spoken.includes("product") || spoken.includes("leysupport") || spoken.includes("gymley") || spoken.includes("medley") || spoken.includes("fueley")) targetPath = "/products";
                      else if (spoken.includes("about") || spoken.includes("who we are") || spoken.includes("story")) targetPath = "/about";
                      else if (spoken.includes("work") || spoken.includes("portfolio") || spoken.includes("services")) targetPath = "/work";
                      else if (spoken.includes("contact") || spoken.includes("touch") || spoken.includes("quote") || spoken.includes("reach")) targetPath = "/contact";
                      else if (spoken.includes("home")) targetPath = "/";
                      
                      if (targetPath && targetPath !== pathname) {
                          console.log(`[Voice Agent] Heuristic match: Navigating to ${targetPath}`);
                          setNavPath(targetPath);
                      }
                  }
                  
                  if (spoken.includes("scroll") || spoken.includes("tour")) {
                      if (spoken.includes("stop")) stopContinuousScroll();
                      else if (spoken.includes("continu") || spoken.includes("tour")) startContinuousScroll(6);
                      else if (spoken.includes("down")) window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
                      else if (spoken.includes("up")) window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
                      else if (spoken.includes("top")) window.scrollTo({ top: 0, behavior: 'smooth' });
                      else if (spoken.includes("bottom")) window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }
                }
                if (part.inlineData && part.inlineData.data) {
                  console.log("[Voice Agent] Received audio chunk");
                  // Play audio
                  playAudioBase64(part.inlineData.data);
                }
                
                if (part.functionCall) {
                   console.log("[Voice Agent] Function call received:", part.functionCall);
                   handleFunctionCall(part.functionCall);
                }
              }
            }
          } else if (msg.toolCall) {
            console.log("[Voice Agent] Received tool call message:", msg.toolCall);
            if (msg.toolCall.functionCalls) {
              for (const call of msg.toolCall.functionCalls) {
                handleFunctionCall(call);
              }
            }
          } else if (msg.setupComplete) {
            console.log("[Voice Agent] Setup complete message received!");
            // Automatically trigger the greeting
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
               if (listenInitially) {
                  wsRef.current.send(JSON.stringify({
                    clientContent: {
                      turnComplete: true,
                      turns: [{
                         role: "user",
                         parts: [{ text: "The user has just activated you. Warmly greet them and briefly introduce Leylak Tech." }]
                      }]
                    }
                  }));
               } else {
                  wsRef.current.send(JSON.stringify({
                    clientContent: {
                      turnComplete: true,
                      turns: [{
                         role: "user",
                         parts: [{ text: "The user just loaded the website. Say EXACTLY this greeting in a warm tone: 'Hi there! Welcome to Leylak Tech. I'm your personal AI guide, and I'm thrilled to show you around. Whenever you're ready, just tap the glowing orb to begin our journey.'" }]
                      }]
                    }
                  }));
               }
            }
          }
        } catch (e) {
          console.error("[Voice Agent] Error parsing message", e);
        }
      };

      wsRef.current.onerror = (e) => {
        console.error("[Voice Agent] WebSocket Error:", e);
        setError("Connection error with voice assistant. Check console for details.");
        stopConversation();
      };

      wsRef.current.onclose = (event) => {
        setIsConnected(false);
        console.log("[Voice Agent] WebSocket closed. Code:", event.code, "Reason:", event.reason);
        stopConversation();
      };
      
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setIsRecording(false);
    }
  };

  const startMicrophone = () => {
     if (!mediaStreamRef.current) {
        setIsRecording(true);
        startAudioCapture();
        
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
           // Tell the AI that the mic is now live
           wsRef.current.send(JSON.stringify({
             clientContent: {
               turnComplete: true,
               turns: [{
                  role: "user",
                  parts: [{ text: "The user has just tapped the orb and activated their microphone. Acknowledge this very briefly, friendly, and ask how you can help." }]
               }]
             }
           }));
        }
     }
  };

  const handleFunctionCall = async (functionCall: any) => {
    const isMock = functionCall.id && functionCall.id.startsWith('mock-');
    
    if (functionCall.name === 'record_lead_info') {
      try {
        const args = functionCall.args;
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...args, session_id: sessionIdRef.current })
        });
        
        const data = await res.json();
        
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          if (isMock) {
             wsRef.current.send(JSON.stringify({
               clientContent: {
                 turnComplete: true,
                 turns: [{ role: "user", parts: [{ text: `[SYSTEM: Contact details noted smoothly. Continue the conversation in a warm, natural human tone without saying 'lead recorded' or 'memory updated'.]` }] }]
               }
             }));
          } else {
             wsRef.current.send(JSON.stringify({
               toolResponse: {
                 functionResponses: [{
                   id: functionCall.id,
                   name: "record_lead_info",
                   response: { 
                     status: res.ok ? "success" : "error", 
                     instruction: "Details noted. Continue speaking naturally to the user. Do NOT say 'memory updated' or 'lead recorded'." 
                   }
                 }]
               }
             }));
          }
        }
      } catch (e) {
        console.error("Function call error", e);
      }
    } else if (functionCall.name === 'navigate_to_page') {
      const path = functionCall.args.path;
      console.log(`[Voice Agent] True Tool Call: Navigating to`, path);
      
      // Use React state to ensure Next.js router executes in the render lifecycle
      setNavPath(path);
      
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            toolResponse: {
              functionResponses: [{
                id: functionCall.id,
                name: "navigate_to_page",
                response: { 
                  status: "success", 
                  current_page: path,
                  instruction: `The screen has now smoothly changed to ${path}. Talk naturally about the content on this page. NEVER say 'Navigation done', 'Navigated to section', or any robotic confirmation. Just introduce what the user is seeing like a human host.`
                }
              }]
            }
          }));
      }
    } else if (functionCall.name === 'scroll_page') {
      const direction = functionCall.args.direction;
      console.log(`[Voice Agent] True Tool Call: Scrolling`, direction);
      if (direction === 'down') window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      else if (direction === 'up') window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
      else if (direction === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else if (direction === 'bottom') window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            toolResponse: {
              functionResponses: [{
                id: functionCall.id,
                name: "scroll_page",
                response: { 
                  status: "success", 
                  instruction: "Page scrolled. Seamlessly continue your thought without saying 'scroll complete' or 'scroll done'." 
                }
              }]
            }
          }));
      }
    } else if (functionCall.name === 'start_continuous_scroll') {
      const speed = functionCall.args.speed || 2;
      startContinuousScroll(speed);
      
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            toolResponse: {
              functionResponses: [{
                id: functionCall.id,
                name: "start_continuous_scroll",
                response: { 
                  status: "success", 
                  instruction: "Continuous tour scroll started. Narrate what is on screen naturally like a guide on a tour." 
                }
              }]
            }
          }));
      }
    } else if (functionCall.name === 'stop_continuous_scroll') {
      stopContinuousScroll();
      
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            toolResponse: {
              functionResponses: [{
                id: functionCall.id,
                name: "stop_continuous_scroll",
                response: { 
                  status: "success", 
                  instruction: "Scroll stopped. Continue talking naturally." 
                }
              }]
            }
          }));
      }
    }
  };

  const startAudioCapture = async () => {
    try {
      console.log("[Voice Agent] Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("[Voice Agent] Microphone access granted!");
      mediaStreamRef.current = stream;
      if (!audioContextRef.current) {
         audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }
      
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      
      let chunkCount = 0;
      processorRef.current.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcm16[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
        }
        
        // Convert to base64 safely without maximum call stack size issues
        const buffer = new Uint8Array(pcm16.buffer);
        let binary = '';
        for (let i = 0; i < buffer.byteLength; i++) {
          binary += String.fromCharCode(buffer[i]);
        }
        const base64 = btoa(binary);
        
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          chunkCount++;
          if (chunkCount % 50 === 0) {
             console.log(`[Voice Agent] Sent ${chunkCount} audio chunks`);
          }
          wsRef.current.send(JSON.stringify({
            realtimeInput: {
              audio: {
                mimeType: "audio/pcm;rate=16000",
                data: base64
              }
            }
          }));
        }
      };

      sourceRef.current.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);
    } catch (e: any) {
      console.error("[Voice Agent] Audio capture error:", e);
      setError("Microphone access denied or error accessing microphone.");
      stopConversation();
    }
  };

  const playAudioBase64 = async (base64: string) => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    }
    
    if (audioContextRef.current.state === 'suspended') {
        console.log("[Voice Agent] AudioContext is suspended. Attempting to resume...");
        try {
            await Promise.race([
                audioContextRef.current.resume(),
                new Promise(resolve => setTimeout(resolve, 200))
            ]);
            console.log("[Voice Agent] AudioContext resumed successfully!");
        } catch (e) {
            console.error("[Voice Agent] Failed to resume AudioContext (autoplay blocked):", e);
        }
    }

    // Decode base64 to binary
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Gemini responds with PCM16 at 24kHz
    const pcm16 = new Int16Array(bytes.buffer);
    const audioBuffer = audioContextRef.current.createBuffer(1, pcm16.length, 24000);
    const channelData = audioBuffer.getChannelData(0);
    
    for (let i = 0; i < pcm16.length; i++) {
      channelData[i] = pcm16[i] / 32768;
    }

    setIsSpeaking(true);

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    
    activeAudioNodesRef.current.add(source);
    
    let endedFired = false;
    
    source.onended = () => {
      if (endedFired) return;
      endedFired = true;
      activeAudioNodesRef.current.delete(source);
      if (activeAudioNodesRef.current.size === 0) {
        setIsSpeaking(false);
      }
    };
    
    const currentTime = audioContextRef.current.currentTime;
    if (nextPlayTimeRef.current < currentTime) {
      nextPlayTimeRef.current = currentTime;
    }
    
    source.start(nextPlayTimeRef.current);
    nextPlayTimeRef.current += audioBuffer.duration;

    const now = performance.now();
    const globalObj = window as any;
    if (globalObj._expectedPlayTime === undefined || globalObj._expectedPlayTime < now) {
        globalObj._expectedPlayTime = now;
    }
    const delayUntilEnd = globalObj._expectedPlayTime - now + audioBuffer.duration * 1000;
    globalObj._expectedPlayTime += audioBuffer.duration * 1000;

    setTimeout(() => {
        if (!endedFired) {
            try { source.stop(); } catch(e) {}
            source.onended?.(new Event('ended'));
        }
    }, delayUntilEnd + 200);
  };

  const stopConversation = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    setIsRecording(false);
    setIsSpeaking(false);
    if (processorRef.current && sourceRef.current && audioContextRef.current) {
      processorRef.current.disconnect();
      sourceRef.current.disconnect();
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    activeAudioNodesRef.current.forEach(node => {
      try { node.stop(); } catch (e) {}
    });
    activeAudioNodesRef.current.clear();
    nextPlayTimeRef.current = 0;

    setIsRecording(false);
    setIsSpeaking(false);
    stopContinuousScroll();
  }, [stopContinuousScroll]);

  useEffect(() => {
    return () => {
      stopConversation();
    };
  }, [stopConversation]);

  // --- NEW: Page-Aware Context Injection ---
  useEffect(() => {
    if (!isRecording || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const abortController = new AbortController();
    
    // Add a fast timeout so it doesn't hang the client if Supabase is unreachable
    const timeoutId = setTimeout(() => abortController.abort(), 2000);

    const fetchAndInjectContext = async () => {
      try {
        const res = await fetch(`/api/context?path=${encodeURIComponent(pathname)}`, {
          signal: abortController.signal
        });
        clearTimeout(timeoutId);
        
        const data = await res.json();
        
        if (data.content) {
          console.log(`[Voice Agent] Injecting context for ${pathname}`);
          wsRef.current?.send(JSON.stringify({
            clientContent: {
              turnComplete: true,
              turns: [{ 
                role: "user", 
                parts: [{ text: `[SYSTEM: The user just navigated to ${pathname}. The page content is: "${data.content}". Use this to answer their questions.]` }] 
              }]
            }
          }));
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error("[Voice Agent] Failed to fetch page context:", err);
        } else {
          console.log("[Voice Agent] Page context fetch timed out or was aborted.");
        }
      }
    };

    fetchAndInjectContext();

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [pathname, isRecording]);
  // -----------------------------------------

  return { startConversation, stopConversation, isSpeaking, isRecording, isConnected, error, startMicrophone };
}
