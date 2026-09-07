import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const emailMap = new Map<string, any>();

    // 1. Fetch live sent & received emails from Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const [sentListRes, receivedListRes] = await Promise.all([
          resend.emails.list().catch((err: any) => {
            console.warn('[MailListAPI] Resend sent list error:', err.message || err);
            return { data: null };
          }),
          resend.emails.receiving.list().catch((err: any) => {
            console.warn('[MailListAPI] Resend receiving list error:', err.message || err);
            return { data: null };
          }),
        ]);

        const sentItems =
          sentListRes?.data && Array.isArray(sentListRes.data.data)
            ? sentListRes.data.data.slice(0, 30)
            : [];
        const receivedItems =
          receivedListRes?.data && Array.isArray(receivedListRes.data.data)
            ? receivedListRes.data.data.slice(0, 30)
            : [];

        const [sentDetails, receivedDetails] = await Promise.all([
          Promise.all(
            sentItems.map(async (item: any) => {
              try {
                const full = await resend.emails.get(item.id);
                return full.data || item;
              } catch {
                return item;
              }
            })
          ),
          Promise.all(
            receivedItems.map(async (item: any) => {
              try {
                const full = await resend.emails.receiving.get(item.id);
                return full.data || item;
              } catch {
                return item;
              }
            })
          ),
        ]);

        // Populate Received Emails (Inbox)
        receivedDetails.forEach((item: any) => {
          if (!item) return;
          const toFormatted = Array.isArray(item.to) ? item.to.join(', ') : item.to || '';
          emailMap.set(item.id, {
            id: item.id,
            created_at: item.created_at,
            folder: 'inbox',
            from_email: item.from || '',
            to_email: toFormatted,
            subject: item.subject || '(No Subject)',
            html_body: item.html || '',
            text_body: item.text || '',
            attachments: (item.attachments || []).map((a: any) => ({
              filename: a.filename || 'attachment',
              size: a.size,
            })),
          });
        });

        // Populate Sent Emails
        sentDetails.forEach((item: any) => {
          if (!item) return;
          const toFormatted = Array.isArray(item.to) ? item.to.join(', ') : item.to || '';
          emailMap.set(item.id, {
            id: item.id,
            created_at: item.created_at,
            folder: 'sent',
            from_email: item.from || 'info@leylak.tech',
            to_email: toFormatted,
            subject: item.subject || '(No Subject)',
            html_body: item.html || '',
            text_body: item.text || '',
            attachments: [],
          });
        });
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

        // Upsert received emails to Supabase in background
        const inboxList = Array.from(emailMap.values()).filter((e) => e.folder === 'inbox');
        if (inboxList.length > 0) {
          const rows = inboxList.map((e) => ({
            id: e.id,
            created_at: e.created_at,
            folder: 'inbox',
            from_email: e.from_email,
            to_email: e.to_email,
            subject: e.subject,
            html_body: e.html_body,
            text_body: e.text_body,
            attachments: e.attachments || [],
          }));
          supabase.from('emails').upsert(rows, { onConflict: 'id' }).then(() => {});
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
