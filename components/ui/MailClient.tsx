'use client';

import { useState } from 'react';
import { Inbox, Send, Edit, X, Clock, User, Mail as MailIcon, Paperclip, LogOut, File } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Attachment = { filename: string; content?: string }; // content is base64 for sending, empty when fetched from db

type Email = {
  id: string;
  created_at: string;
  folder: 'inbox' | 'sent';
  from_email: string;
  to_email: string;
  subject: string;
  html_body: string;
  text_body: string;
  attachments?: Attachment[];
};

export default function MailClient({ initialEmails }: { initialEmails: Email[] }) {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [folder, setFolder] = useState<'inbox' | 'sent'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  
  // Compose Form State
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [sending, setSending] = useState(false);

  const filteredEmails = emails.filter((e) => e.folder === folder);

  const handleLogout = () => {
    document.cookie = 'mail_auth=; Max-Age=0; path=/';
    window.location.href = '/';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            // Extract base64 part
            const base64Content = (event.target.result as string).split(',')[1];
            setAttachments((prev) => [...prev, { filename: file.name, content: base64Content }]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, text: body, attachments }),
      });
      if (res.ok) {
        // Optimistically add to sent folder
        const newEmail: Email = {
          id: Math.random().toString(),
          created_at: new Date().toISOString(),
          folder: 'sent',
          from_email: 'hello@leylak.tech', // Adjust based on your config
          to_email: to,
          subject,
          text_body: body,
          html_body: '',
          attachments: attachments.map(a => ({ filename: a.filename })),
        };
        setEmails([newEmail, ...emails]);
        setIsComposing(false);
        setTo('');
        setSubject('');
        setBody('');
        setAttachments([]);
      } else {
        alert('Failed to send email.');
      }
    } catch (err) {
      alert('An error occurred while sending.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl font-sans">
      
      {/* Sidebar */}
      <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
            <MailIcon size={16} />
          </div>
          <span className="font-semibold text-lg text-white tracking-tight">Leylak Mail</span>
        </div>
        
        <div className="flex-1 p-4 space-y-2">
          <button
            onClick={() => { setFolder('inbox'); setSelectedEmail(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${folder === 'inbox' ? 'bg-white text-black font-medium shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
          >
            <Inbox size={18} />
            Inbox
          </button>
          <button
            onClick={() => { setFolder('sent'); setSelectedEmail(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${folder === 'sent' ? 'bg-white text-black font-medium shadow-md' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
          >
            <Send size={18} />
            Sent
          </button>
        </div>

        <div className="p-4 border-t border-neutral-800 flex flex-col gap-2">
          <button
            onClick={() => setIsComposing(true)}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-purple-500/20"
          >
            <Edit size={18} />
            Compose
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 px-4 py-3 rounded-xl font-medium transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Email List */}
      <div className="w-80 bg-neutral-950 border-r border-neutral-800 flex flex-col">
        <div className="p-4 border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0">
          <h2 className="font-medium text-neutral-200 capitalize">{folder}</h2>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filteredEmails.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-sm">
              No emails found in {folder}.
            </div>
          ) : (
            filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`p-4 border-b border-neutral-800/50 cursor-pointer transition-colors ${selectedEmail?.id === email.id ? 'bg-neutral-800/50' : 'hover:bg-neutral-900/50'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-neutral-200 truncate pr-2">
                    {folder === 'inbox' ? email.from_email : email.to_email}
                  </span>
                  <span className="text-xs text-neutral-500 whitespace-nowrap">
                    {new Date(email.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="text-sm font-medium text-neutral-300 mb-1 truncate flex items-center gap-1">
                  {email.subject || '(No Subject)'}
                  {email.attachments && email.attachments.length > 0 && <Paperclip size={12} className="text-neutral-500" />}
                </div>
                <div className="text-xs text-neutral-500 truncate line-clamp-2">
                  {email.text_body || email.html_body?.replace(/<[^>]*>?/gm, '') || 'No content'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Email Viewer */}
      <div className="flex-1 flex flex-col bg-[#0a0a0a] relative">
        {selectedEmail ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex flex-col h-full"
          >
            <div className="p-8 border-b border-neutral-800/50">
              <h1 className="text-2xl font-semibold text-white mb-6 leading-tight">
                {selectedEmail.subject || '(No Subject)'}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <User size={20} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-200">
                      {folder === 'inbox' ? selectedEmail.from_email : 'You'}
                    </span>
                    <span className="text-neutral-500">
                      {folder === 'inbox' ? '' : `to ${selectedEmail.to_email}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500 text-xs mt-1">
                    <Clock size={12} />
                    {new Date(selectedEmail.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 flex-1 overflow-y-auto prose prose-invert max-w-none prose-p:leading-relaxed prose-a:text-purple-400">
              {selectedEmail.html_body ? (
                <div dangerouslySetInnerHTML={{ __html: selectedEmail.html_body }} />
              ) : (
                <div className="whitespace-pre-wrap text-neutral-300">{selectedEmail.text_body}</div>
              )}
              
              {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                <div className="mt-8 pt-6 border-t border-neutral-800">
                  <p className="text-sm font-medium text-neutral-400 mb-3 flex items-center gap-2">
                    <Paperclip size={14} /> Attachments
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {selectedEmail.attachments.map((att, i) => (
                      <div key={i} className="flex items-center gap-2 bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800 text-sm text-neutral-300">
                        <File size={14} />
                        {att.filename}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-600">
            <div className="flex flex-col items-center gap-4">
              <MailIcon size={48} className="opacity-20" />
              <p>Select an email to read</p>
            </div>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      <AnimatePresence>
        {isComposing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-neutral-900 border border-neutral-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
                <h3 className="font-medium text-white">New Message</h3>
                <button onClick={() => setIsComposing(false)} className="text-neutral-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSend} className="flex flex-col flex-1 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center gap-4">
                  <span className="text-neutral-500 text-sm w-8">To:</span>
                  <input
                    type="email"
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm"
                    placeholder="recipient@example.com"
                  />
                </div>
                <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center gap-4">
                  <span className="text-neutral-500 text-sm w-8">Subject:</span>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm font-medium"
                    placeholder="Enter subject"
                  />
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full min-h-[200px] bg-transparent border-none outline-none text-neutral-300 resize-none text-sm leading-relaxed"
                    placeholder="Write your message here..."
                  />
                  
                  {attachments.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-2 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 text-xs text-neutral-300">
                          <File size={12} />
                          <span className="truncate max-w-[150px]">{att.filename}</span>
                          <button type="button" onClick={() => removeAttachment(i)} className="text-neutral-500 hover:text-red-400">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-neutral-800 flex justify-between items-center bg-neutral-900/50">
                  <div>
                    <input type="file" id="file-upload" multiple className="hidden" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                      <Paperclip size={16} /> Attach Files
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsComposing(false)}
                      className="px-6 py-2 rounded-lg text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      disabled={sending}
                      className="px-6 py-2 rounded-lg text-sm bg-white text-black font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {sending ? 'Sending...' : (
                        <>
                          <Send size={14} /> Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
