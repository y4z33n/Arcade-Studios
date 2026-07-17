import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { to, subject, html, text, attachments } = payload;
    console.log('[Mail API] Received payload to send to:', to, 'subject:', subject);

    if (!to || !subject || (!html && !text)) {
      console.error('[Mail API] Missing required fields in payload.');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Default sending email (this must be a verified domain in Resend)
    const from = 'hello@leylak.tech'; 
    console.log('[Mail API] Sending email from:', from);

    // Send the email via Resend
    console.log('[Mail API] Calling resend.emails.send()');
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html: html || '',
      text: text || '',
      attachments: attachments || [],
    });

    if (error) {
      console.error('[Mail API] Resend error:', JSON.stringify(error, null, 2));
      return NextResponse.json({ error }, { status: 500 });
    }
    
    console.log('[Mail API] Resend success:', JSON.stringify(data, null, 2));

    // Store in Supabase
    // We store metadata about the attachments, not the full base64 strings to save DB space
    const attachmentMeta = attachments?.map((a: any) => ({ filename: a.filename })) || [];

    console.log('[Mail API] Saving to Supabase...');
    const { error: dbError } = await supabase.from('emails').insert({
      folder: 'sent',
      from_email: from,
      to_email: to,
      subject,
      html_body: html,
      text_body: text,
      attachments: attachmentMeta,
    });

    if (dbError) {
      console.error('[Mail API] Supabase error:', JSON.stringify(dbError, null, 2));
      // We still return success since the email sent, but log the error
    } else {
      console.log('[Mail API] Successfully saved to Supabase');
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('[Mail API] Caught Exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
