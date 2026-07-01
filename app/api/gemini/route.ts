import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.GEMINI_API_KEY;
  
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    return NextResponse.json({ error: "Missing or invalid Gemini API Key" }, { status: 500 });
  }

  // Generate the secure WSS URL for the Multimodal Live API
  const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${API_KEY}`;
  
  return NextResponse.json({ url });
}
