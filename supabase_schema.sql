-- 1. Enable the pgvector extension for AI Memory
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the Leads table (to capture clients)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT,
  email TEXT,
  budget TEXT,
  project_details TEXT,
  status TEXT DEFAULT 'new'
);

-- 3. Create the Knowledge Base table (for AI RAG Memory)
CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding VECTOR(768) -- Matches Gemini's embedding model dimension
);
