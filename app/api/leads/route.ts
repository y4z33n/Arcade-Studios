import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function POST(req: Request) {
  let supabase;
  try {
    if (supabaseUrl && supabaseUrl.startsWith('http')) {
       supabase = createClient(supabaseUrl, supabaseServiceKey);
    }
  } catch(e) {}

  try {
    const body = await req.json();
    const { session_id, name, phone, whatsapp, email, budget, project_brief } = body;

    if (!session_id) {
      return NextResponse.json({ error: 'Session ID is required for memory' }, { status: 400 });
    }

    const leadData = {
      session_id,
      ...(name && { name }),
      ...(phone && { phone }),
      ...(whatsapp !== undefined && { whatsapp }),
      ...(email && { email }),
      ...(budget && { budget }),
      ...(project_brief && { project_details: project_brief }),
      status: 'new',
      updated_at: new Date().toISOString()
    };

    if (!supabaseUrl || !supabaseServiceKey || supabaseUrl.includes('your_supabase')) {
      console.warn('⚠️ Supabase credentials missing. Mocking database memory update for lead:', leadData);
      return NextResponse.json({ success: true, mocked: true, lead: leadData });
    }

    if (!supabase) {
       return NextResponse.json({ error: 'Supabase client failed to initialize' }, { status: 500 });
    }

    // Check if session already exists for incremental update
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('session_id', session_id)
      .single();

    let result;
    let error;

    if (existing) {
      // Update
      const response = await supabase
        .from('leads')
        .update(leadData)
        .eq('id', existing.id)
        .select();
      result = response.data;
      error = response.error;
    } else {
      // Insert
      const response = await supabase
        .from('leads')
        .insert([leadData])
        .select();
      result = response.data;
      error = response.error;
    }

    if (error) {
      console.error('Error saving lead memory:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: result ? result[0] : null });
  } catch (error: any) {
    console.error('Lead insertion error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
