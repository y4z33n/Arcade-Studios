import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Resend inbound webhook format
    const { from, to, subject, html, text } = body;

    if (!from || !to) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Store in Supabase
    const { error: dbError } = await supabase.from('emails').insert({
      folder: 'inbox',
      from_email: from,
      to_email: to,
      subject: subject || '(No Subject)',
      html_body: html || '',
      text_body: text || '',
    });

    if (dbError) {
      console.error('Failed to store inbound email:', dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
