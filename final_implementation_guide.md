# The Master Blueprint: Gemini Voice AI + Supabase + Next.js

This is your definitive guide to building a fully autonomous, real-time AI Voice Agent for Arcade Studios. This stack combines the raw speed of Gemini's WebSockets with the structural power of Supabase.

---

## Phase 1: Environment & Secrets Setup

You need to connect your Next.js project to both Google and Supabase securely.

1. **Get your Gemini API Key** from Google AI Studio.
2. **Get your Supabase Keys** from your Supabase Project Settings -> API.
3. In your Next.js root directory, create/update `.env.local`:

```env
# Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase (Public for frontend, Secret for backend)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key # NEVER expose this to the frontend
```

---

## Phase 2: Supabase Database Schema

Go to your Supabase SQL Editor and run this exact SQL to set up your tables and enable the AI Vector engine.

```sql
-- 1. Enable the pgvector extension for AI Memory
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the Leads table (to capture clients)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT,
  email TEXT,
  budget TEXT,
  project_details TEXT,
  status TEXT DEFAULT 'new'
);

-- 3. Create the Knowledge Base table (for AI RAG Memory)
CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  embedding VECTOR(768) -- Matches Gemini's embedding model dimension
);
```

> [!TIP]
> Once this is run, your database is ready to both capture leads and store your agency's portfolio data for the AI to read.

---

## Phase 3: The Next.js Security Layer (API Route)

We cannot expose the `GEMINI_API_KEY` to the browser. We create a Next.js route that the frontend calls to get a secure WebSocket connection URL.

Create a file at `app/api/gemini/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.GEMINI_API_KEY;
  
  if (!API_KEY) {
    return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  }

  // Generate the secure WSS URL for the Multimodal Live API
  const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${API_KEY}`;
  
  return NextResponse.json({ url });
}
```

---

## Phase 4: The Frontend Voice Hook

You need a React hook to handle the microphone, the Web Audio API, and the WebSocket connection to Gemini.

1. Install the required Google generative AI SDK (if using their official wrappers) or just use raw WebSockets.
2. Here is the architectural flow for your custom hook (`hooks/useGeminiVoice.ts`):

```typescript
import { useState, useRef, useEffect } from 'react';

export function useGeminiVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const startConversation = async () => {
    // 1. Fetch secure URL from our backend
    const res = await fetch('/api/gemini');
    const { url } = await res.json();

    // 2. Open WebSocket
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      // 3. Send the System Prompt immediately
      wsRef.current?.send(JSON.stringify({
        setup: {
          systemInstruction: {
            parts: [{ text: "You are the voice assistant for Arcade Studios. You capture leads and answer questions..." }]
          }
        }
      }));
    };

    wsRef.current.onmessage = (event) => {
      // 4. Handle incoming audio data from Gemini
      // Play it using the Web Audio API
      // Set isSpeaking to true so the UI visualizer animates
    };
  };

  return { startConversation, isSpeaking, isRecording };
}
```

---

## Phase 5: Function Calling (Connecting Gemini to Supabase)

How does the AI actually save a lead? Through Function Calling.

1. In the `setup` payload sent over the WebSocket (Phase 4), you declare a tool:
```json
"tools": [{
  "functionDeclarations": [{
    "name": "capture_lead",
    "description": "Call this when the user gives their email and project budget.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "email": { "type": "STRING" },
        "budget": { "type": "STRING" }
      }
    }
  }]
}]
```

2. When the visitor says their email, Gemini will send a message back over the WebSocket containing a `functionCall` request instead of audio.
3. Your frontend intercepts this, sends a POST request to a new Next.js route (`/api/leads`), which uses the Supabase client to insert the row into the database.
4. Your frontend sends a `functionResponse` back to Gemini over the WebSocket saying "Success!", and Gemini physically speaks: *"Got it, I've saved your email and our team will reach out."*

---

> [!IMPORTANT]  
> **Next Steps for Execution:**
> To actually implement this into the codebase, we need to build the `useGeminiVoice` hook, integrate the microphone permissions, and design the glowing visualizer in the Hero section. 
> 
> Let me know when you've added the `.env.local` keys, and I can start writing the actual code to integrate this directly into your Hero component!
