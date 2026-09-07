import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const payload = await req.json();
    const { to, cc, bcc, subject, html, text, attachments } = payload;
    console.log('[Mail API] Received payload to send to:', to, 'subject:', subject);

    if (!to || !subject || (!html && !text)) {
      console.error('[Mail API] Missing required fields in payload.');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Default sending email (this must be a verified domain in Resend)
    const from = 'info@leylak.tech';
    console.log('[Mail API] Sending email from:', from);

    // Format recipients
    const toRecipients = Array.isArray(to) ? to : to.split(',').map((s: string) => s.trim()).filter(Boolean);
    const ccRecipients = cc ? (Array.isArray(cc) ? cc : cc.split(',').map((s: string) => s.trim()).filter(Boolean)) : undefined;
    const bccRecipients = bcc ? (Array.isArray(bcc) ? bcc : bcc.split(',').map((s: string) => s.trim()).filter(Boolean)) : undefined;

    // Send the email via Resend
    console.log('[Mail API] Calling resend.emails.send()');
    const sendOptions: any = {
      from,
      to: toRecipients,
      subject,
      html: html || '',
      text: text || '',
      attachments: attachments || [],
    };

    if (ccRecipients && ccRecipients.length > 0) {
      sendOptions.cc = ccRecipients;
    }
    if (bccRecipients && bccRecipients.length > 0) {
      sendOptions.bcc = bccRecipients;
    }

    const { data, error } = await resend.emails.send(sendOptions);

    if (error) {
      console.error('[Mail API] Resend error:', JSON.stringify(error, null, 2));
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log('[Mail API] Resend success:', JSON.stringify(data, null, 2));

    // Store in Supabase if client is available
    const supabase = getSupabaseClient();
    if (supabase) {
      const attachmentMeta = attachments?.map((a: any) => ({ filename: a.filename })) || [];
      console.log('[Mail API] Saving to Supabase...');
      const { error: dbError } = await supabase.from('emails').insert({
        folder: 'sent',
        from_email: from,
        to_email: toRecipients.join(', '),
        subject,
        html_body: html || '',
        text_body: text || '',
        attachments: attachmentMeta,
      });

      if (dbError) {
        console.error('[Mail API] Supabase error:', JSON.stringify(dbError, null, 2));
      } else {
        console.log('[Mail API] Successfully saved to Supabase');
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('[Mail API] Caught Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
