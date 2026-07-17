import { createClient } from '@supabase/supabase-js';
import MailClient from '@/components/ui/MailClient';

// Ensure this page is not statically cached since emails change dynamically
export const dynamic = 'force-dynamic';

export default async function MailPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Fetch emails from the database
  const { data: emails, error } = await supabase
    .from('emails')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching emails:', error);
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <MailClient initialEmails={emails || []} />
    </div>
  );
}
