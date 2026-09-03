"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  Search, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Layers,
  ArrowRight,
  ExternalLink,
  Code
} from "lucide-react";

interface QueryPreset {
  query: string;
  category: string;
  synthesizedAnswer: string;
  sources: {
    title: string;
    similarity: number;
    chunk: string;
    path: string;
  }[];
  latency: number;
}

const PRESETS: QueryPreset[] = [
  {
    query: "What is the guaranteed SLA latency for enterprise telephony tier 1 outages?",
    category: "SLA & Reliability",
    synthesizedAnswer: "Leylak Tech guarantees a sub-180ms median voice latency SLA for all tier-1 enterprise telephony clusters [1]. In the event of an upstream PBX failure, autonomous multi-region failover triggers within 1.2 seconds with a 99.99% uptime commitment backed by financial credits [2].",
    sources: [
      {
        title: "Enterprise_SLA_Master_Agreement_2026.pdf",
        similarity: 0.984,
        chunk: "Section 4.2 (Telephony Latency SLAs): The Service commits to maintaining a median roundtrip packet voice latency of less than 180 milliseconds across Tier-1 regions...",
        path: "docs/legal/sla-tier1.md#L42-L58"
      },
      {
        title: "High_Availability_Disaster_Recovery.md",
        similarity: 0.938,
        chunk: "Multi-region failover triggers automatically via health probes when jitter exceeds 40ms or packet loss crosses 0.5% threshold...",
        path: "infrastructure/failover-policy.md#L102"
      }
    ],
    latency: 32
  },
  {
    query: "How does the platform ensure HIPAA & SOC2 Type II data compliance during call recording?",
    category: "Security & Compliance",
    synthesizedAnswer: "Nexus Memory applies client-side AES-256 encryption before streaming audio chunks. Sensitive PII/PHI (such as credit card numbers, medical record IDs, and SSNs) is redacted in-flight using local regex guardrails before vector embeddings are stored in Supabase pgvector [1]. Zero audio is used for public model training [2].",
    sources: [
      {
        title: "HIPAA_BAA_Security_Whitepaper.pdf",
        similarity: 0.978,
        chunk: "Nexus Data Scrubbing Pipeline: In-flight tokenization replaces all 18 HIPAA Safe Harbor identifiers with cryptographic placeholders prior to vector generation...",
        path: "security/hipaa-compliance.md#L12-L35"
      },
      {
        title: "SOC2_Type2_Audit_Report.pdf",
        similarity: 0.912,
        chunk: "Zero-retention mode is available on all dedicated enterprise VPC tenants, guaranteeing no permanent audio logging on disk...",
        path: "audits/soc2-type2.pdf#p14"
      }
    ],
    latency: 28
  },
  {
    query: "What is the pgvector schema and embedding model architecture used for RAG?",
    category: "Architecture & SQL",
    synthesizedAnswer: "The platform utilizes PostgreSQL 16 with the pgvector extension, storing 768-dimensional multimodal embeddings matching Google Gemini's text-embedding-004 model [1]. Semantic queries execute via HNSW / IVFFlat indexes with cosine similarity distances (<=>) and hybrid full-text rank fusion [2].",
    sources: [
      {
        title: "supabase_schema.sql",
        similarity: 0.992,
        chunk: "CREATE TABLE knowledge_base (id UUID PRIMARY KEY, page_path TEXT, content TEXT, embedding VECTOR(768)); CREATE INDEX ON knowledge_base USING hnsw (embedding vector_cosine_ops);",
        path: "database/supabase_schema.sql#L15-L22"
      },
      {
        title: "Neural_Search_Pipeline.ts",
        similarity: 0.941,
        chunk: "Hybrid Search Fusion: Combines PostgreSQL ts_vector lexical ranking with vector cosine distance: 0.7 * cosine_sim + 0.3 * text_rank...",
        path: "lib/ai/vector-search.ts#L44-L68"
      }
    ],
    latency: 24
  }
];

export default function VectorSearchSimulator() {
  const [selectedPreset, setSelectedPreset] = useState<QueryPreset>(PRESETS[0]);
  const [searchQuery, setSearchQuery] = useState<string>(PRESETS[0].query);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSelectPreset = (preset: QueryPreset) => {
    setSelectedPreset(preset);
    setSearchQuery(preset.query);
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 350);
  };

  return (
    <div className="w-full rounded-3xl bg-[#080808]/90 border border-white/10 p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Nexus Memory Semantic Search Testbench</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-semibold uppercase tracking-wider">
                768-Dim Vector Engine
              </span>
            </div>
            <p className="text-xs text-white/50">Test deep contextual retrieval, pgvector cosine ranking, and cited neural answer synthesis.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-white/60 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          <span>Retrieval Speed: <strong className="text-emerald-400">{selectedPreset.latency}ms</strong></span>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div className="py-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2 block">
          Select Benchmark Query:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3 py-2 rounded-xl text-xs text-left transition-all border ${
                selectedPreset.query === preset.query
                  ? "bg-blue-600/20 border-blue-500 text-white font-medium shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  : "bg-white/[0.02] border-white/5 text-white/60 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <div className="text-[9px] uppercase font-bold text-blue-400 mb-0.5">{preset.category}</div>
              <div className="truncate max-w-xs sm:max-w-md">{preset.query}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Query Bar Box */}
      <div className="relative my-2">
        <div className="relative flex items-center bg-black/80 rounded-2xl border border-white/15 px-4 py-3 shadow-inner">
          <Search className="w-5 h-5 text-blue-400 shrink-0 mr-3" />
          <input
            type="text"
            value={searchQuery}
            readOnly
            className="w-full bg-transparent text-sm text-white font-medium focus:outline-none"
          />
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-mono text-[10px] uppercase font-bold shrink-0">
            pgvector MATCH
          </span>
        </div>
      </div>

      {/* Results Grid: Synthesized Answer + Cited Chunks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
        {/* Left: AI Synthesized Answer with Citations */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Synthesized Neural Answer
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                100% CITED & VERIFIED
              </span>
            </div>

            <p className="text-xs md:text-sm text-white/90 leading-relaxed font-light">
              {selectedPreset.synthesizedAnswer}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 font-mono">
            <span>Hallucination Guardrails: ACTIVE</span>
            <span>Index Type: HNSW Cosine</span>
          </div>
        </div>

        {/* Right: Retrieved Vector Chunks with Cosine Similarity Score */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 block">
            Retrieved Knowledge Base Chunks:
          </span>

          {selectedPreset.sources.map((src, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">
                    [{i + 1}]
                  </span>
                  <span className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">{src.title}</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {(src.similarity * 100).toFixed(1)}% Match
                </span>
              </div>

              <p className="text-[11px] text-white/60 font-mono leading-relaxed line-clamp-2 bg-black/40 p-2 rounded-lg border border-white/5">
                &quot;{src.chunk}&quot;
              </p>

              <div className="mt-2 text-[9px] font-mono text-white/40 flex items-center gap-1">
                <FileText className="w-3 h-3 text-blue-400" />
                <span>Source: {src.path}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
