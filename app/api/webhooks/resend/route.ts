import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  let supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

  if (supabaseUrl.endsWith('/rest/v1/')) {
    supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
  } else if (supabaseUrl.endsWith('/rest/v1')) {
    supabaseUrl = supabaseUrl.replace('/rest/v1', '');
  }
  if (supabaseUrl.endsWith('/')) {
    supabaseUrl = supabaseUrl.slice(0, -1);
  }

  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase client unavailable' }, { status: 500 });
    }

    // 1. Official Resend Webhook format: { type: 'email.received', data: { email_id, from, to, subject, ... } }
    if (body.type === 'email.received' && body.data) {
      const { email_id, from, to, subject, created_at } = body.data;

      let html = '';
      let text = '';
      let attachments: any[] = [];

      // Fetch full content if API key is present
      if (process.env.RESEND_API_KEY && email_id) {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY);
          const full = await resend.emails.receiving.get(email_id);
          if (full.data) {
            html = full.data.html || '';
            text = full.data.text || '';
            attachments = (full.data.attachments || []).map((a: any) => ({
              filename: a.filename || 'attachment',
              size: a.size,
            }));
          }
        } catch (err: any) {
          console.warn('[Webhook] Failed to fetch full email details from Resend:', err.message || err);
        }
      }

      const toFormatted = Array.isArray(to) ? to.join(', ') : to || '';
      const { error: dbError } = await supabase.from('emails').upsert(
        {
          id: email_id,
          created_at: created_at || new Date().toISOString(),
          folder: 'inbox',
          from_email: from || '',
          to_email: toFormatted,
          subject: subject || '(No Subject)',
          html_body: html,
          text_body: text,
          attachments,
        },
        { onConflict: 'id' }
      );

      if (dbError) {
        console.error('[Webhook] Failed to store inbound email:', dbError);
        return NextResponse.json({ error: dbError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, id: email_id });
    }

    // 2. Direct JSON payload fallback: { from, to, subject, html, text }
    const { from, to, subject, html, text, id, attachments } = body;

    if (!from || !to) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { error: dbError } = await supabase.from('emails').insert({
      ...(id ? { id } : {}),
      folder: 'inbox',
      from_email: from,
      to_email: Array.isArray(to) ? to.join(', ') : to,
      subject: subject || '(No Subject)',
      html_body: html || '',
      text_body: text || '',
      attachments: attachments || [],
    });

    if (dbError) {
      console.error('[Webhook] Failed to store direct inbound email:', dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
