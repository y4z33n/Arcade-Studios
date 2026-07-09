"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useGeminiVoice } from '@/hooks/useGeminiVoice';
import Link from 'next/link';

type GeminiVoiceHookReturnType = ReturnType<typeof useGeminiVoice>;

const GeminiVoiceContext = createContext<GeminiVoiceHookReturnType | null>(null);

export function GeminiVoiceProvider({ children }: { children: ReactNode }) {
  const voiceState = useGeminiVoice();

  return (
    <GeminiVoiceContext.Provider value={voiceState}>
      {children}
    </GeminiVoiceContext.Provider>
  );
}

export function useGeminiContext() {
  const context = useContext(GeminiVoiceContext);
  if (!context) {
    throw new Error('useGeminiContext must be used within a GeminiVoiceProvider');
  }
  return context;
}
