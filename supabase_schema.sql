-- 1. Enable the pgvector extension for AI Memory
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the Leads table (to capture clients)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT,
  email TEXT,
  budget TEXT,
  project_details TEXT,
  status TEXT DEFAULT 'new'
);

-- 3. Create the Knowledge Base table (for AI RAG Memory)
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT,
  content TEXT NOT NULL,
  embedding VECTOR(768) -- Matches Gemini's embedding model dimension
);

-- 4. Create the Emails table (for Webmail Client)
CREATE TABLE IF NOT EXISTS emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  folder TEXT NOT NULL, -- 'inbox' or 'sent'
  from_email TEXT NOT NULL,
  to_email TEXT NOT NULL,
  subject TEXT,
  html_body TEXT,
  text_body TEXT,
  attachments JSONB
);
