import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const emailMap = new Map<string, any>();

    // 1. Fetch live from Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const listRes = await resend.emails.list();

        if (listRes.data && Array.isArray(listRes.data.data)) {
          const emailDetails = await Promise.all(
            listRes.data.data.slice(0, 30).map(async (item: any) => {
              try {
                const full = await resend.emails.get(item.id);
                return full.data || item;
              } catch {
                return item;
              }
            })
          );

          emailDetails.forEach((item: any) => {
            if (!item) return;
            const toFormatted = Array.isArray(item.to) ? item.to.join(', ') : item.to || '';
            emailMap.set(item.id, {
              id: item.id,
              created_at: item.created_at,
              folder: 'sent',
              from_email: item.from || 'hello@leylak.tech',
              to_email: toFormatted,
              subject: item.subject || '(No Subject)',
              html_body: item.html || '',
              text_body: item.text || '',
              attachments: [],
            });
          });
        }
      } catch (err: any) {
        console.warn('[MailListAPI] Resend fetch error:', err.message || err);
      }
    }

    // 2. Fetch from Supabase
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

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
        const { data, error } = await supabase.from('emails').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          data.forEach((dbItem: any) => {
            if (!emailMap.has(dbItem.id)) {
              emailMap.set(dbItem.id, dbItem);
            }
          });
        }
      } catch (err) {
        // Ignore Supabase connection errors gracefully
      }
    }

    const allEmails = Array.from(emailMap.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ success: true, emails: allEmails });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
