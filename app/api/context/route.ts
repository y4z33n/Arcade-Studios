import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

let supabase: any = null;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';

  let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    return NextResponse.json({ error: "Missing DB credentials" }, { status: 500 });
  }

  // Fix PGRST125 error: supabase-js appends /rest/v1 automatically, so we must remove it if present in the env var
  if (supabaseUrl.endsWith('/rest/v1/')) {
    supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
  } else if (supabaseUrl.endsWith('/rest/v1')) {
    supabaseUrl = supabaseUrl.replace('/rest/v1', '');
  }

  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }

  try {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('content')
      .eq('page_path', path);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      // Return a default generic context if no specific page data exists
      return NextResponse.json({ content: "" });
    }

    // Combine all content blocks for this path
    const combinedContent = data.map((row: any) => row.content).join('\n\n');
    return NextResponse.json({ content: combinedContent });

  } catch (error: any) {
    if (error.code === '42703') {
      // The page_path column doesn't exist in the knowledge_base table yet.
      // Gracefully fallback to empty context instead of throwing 500.
      return NextResponse.json({ content: "" });
    }
    console.error('Error fetching context:', error);
    return NextResponse.json({ error: 'Failed to fetch context' }, { status: 500 });
  }
}
