import { useState, useRef, useEffect, useCallback } from 'react';

export function useGeminiVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const activeAudioNodesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const sessionIdRef = useRef<string | null>(null);

  const startConversation = async () => {
    if (isRecording) {
      stopConversation();
      return;
    }

    try {
      setError(null);
      // 1. Fetch secure URL from our backend
      console.log("[Voice Agent] Fetching WebSocket URL from /api/gemini...");
      const res = await fetch('/api/gemini');
      const data = await res.json();
      
      console.log("[Voice Agent] Response from /api/gemini:", { status: res.status, data });
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch Gemini URL');
      }

      const { url } = data;
      console.log("[Voice Agent] Connecting to WebSocket URL...");

      // 2. Open WebSocket
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log("[Voice Agent] WebSocket Connection Opened!");
        setIsRecording(true);
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
- Call the "record_lead_info" tool continuously and incrementally as you learn new information (e.g., call it when you get the name, call it again when you get the phone, etc.).
` }]
            },
            tools: [{
              functionDeclarations: [{
                name: "record_lead_info",
                description: "Call this tool incrementally whenever you learn new information about the lead. It acts as your memory database. Call it multiple times during the conversation as you gather the name, phone, project brief, budget, and email.",
                parameters: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING", description: "The client's name" },
                    phone: { type: "STRING", description: "The client's phone number with country code" },
                    whatsapp: { type: "BOOLEAN", description: "Whether the phone number is connected to WhatsApp" },
                    email: { type: "STRING", description: "The client's email address (only after verifying spelling)" },
                    project_brief: { type: "STRING", description: "Brief description of the project" },
                    budget: { type: "STRING", description: "The client's budget range" }
                  }
                }
              }]
            }]
          }
        };
        console.log("[Voice Agent] Sending setup message:", setupMessage);
        wsRef.current?.send(JSON.stringify(setupMessage));

        // Start capturing mic audio
        startAudioCapture();
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
            }
            
            const modelTurn = msg.serverContent.modelTurn;
            if (modelTurn) {
              for (const part of modelTurn.parts) {
                if (part.text) {
                  console.log("[Voice Agent] Agent text:", part.text);
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
          } else if (msg.setupComplete) {
            console.log("[Voice Agent] Setup complete message received!");
            // Automatically trigger the greeting
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              wsRef.current.send(JSON.stringify({
                clientContent: {
                  turnComplete: true,
                  turns: [{
                     role: "user",
                     parts: [{ text: "The user has just activated you. Warmly greet them and briefly introduce Leylak Tech." }]
                  }]
                }
              }));
            }
          } else {
             // console.log("[Voice Agent] Other message:", msg);
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
        console.log("[Voice Agent] WebSocket closed. Code:", event.code, "Reason:", event.reason);
        stopConversation();
      };
      
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setIsRecording(false);
    }
  };

  const handleFunctionCall = async (functionCall: any) => {
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
          wsRef.current.send(JSON.stringify({
            clientContent: {
              turnComplete: true,
              turns: [{
                 role: "user",
                 parts: [{
                    functionResponse: {
                      name: "record_lead_info",
                      response: { result: res.ok ? "Memory updated successfully" : "Failed to update memory", details: data }
                    }
                 }]
              }]
            }
          }));
        }
      } catch (e) {
        console.error("Function call error", e);
      }
    }
  };

  const startAudioCapture = async () => {
    try {
      console.log("[Voice Agent] Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("[Voice Agent] Microphone access granted!");
      mediaStreamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
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
    if (!audioContextRef.current) return;
    
    setIsSpeaking(true);
    
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
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    
    activeAudioNodesRef.current.add(source);
    
    source.onended = () => {
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
  };

  const stopConversation = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
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
  }, []);

  useEffect(() => {
    return () => {
      stopConversation();
    };
  }, [stopConversation]);

  return { startConversation, stopConversation, isSpeaking, isRecording, error };
}
