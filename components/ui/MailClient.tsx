'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Inbox,
  Send,
  Edit3,
  X,
  Clock,
  User,
  Mail as MailIcon,
  Paperclip,
  LogOut,
  File,
  Search,
  Reply,
  Forward,
  Sparkles,
  Building2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Filter,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '@/components/mail/RichTextEditor';
import SignatureSettingsModal from '@/components/mail/SignatureSettingsModal';
import EmailTemplatesModal from '@/components/mail/EmailTemplatesModal';
import {
  EmailSignature,
  EmailTemplate,
  DEFAULT_SIGNATURE,
  generateSignatureHtml,
  buildFullEmailHtml,
} from '@/lib/email-helpers';

type Attachment = {
  filename: string;
  content?: string; // base64
  size?: number;
};

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAttachmentsOnly, setFilterAttachmentsOnly] = useState(false);

  // Compose State
  const [to, setTo] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [cc, setCc] = useState('');
  const [showBcc, setShowBcc] = useState(false);
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [htmlBody, setHtmlBody] = useState('');
  const [plainTextBody, setPlainTextBody] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [sending, setSending] = useState(false);
  const [draftSavedTime, setDraftSavedTime] = useState<string | null>(null);

  // Modals & Signature Settings
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [includeSignature, setIncludeSignature] = useState(true);
  const [signature, setSignature] = useState<EmailSignature>(DEFAULT_SIGNATURE);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync / Refresh Emails from Resend & Database
  const handleRefreshEmails = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/mail/list');
      const data = await res.json();
      if (data.success && Array.isArray(data.emails)) {
        setEmails(data.emails);
        setStatusMessage({ type: 'success', text: 'Synced with Resend successfully.' });
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (e) {
      console.error('Failed to sync emails:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Load signature from localStorage
  useEffect(() => {
    try {
      const savedSig = localStorage.getItem('leylak_mail_signature');
      if (savedSig) {
        setSignature(JSON.parse(savedSig));
      }
    } catch (e) {
      console.error('Failed to load saved signature:', e);
    }
  }, []);

  // Save signature handler
  const handleSaveSignature = (newSig: EmailSignature) => {
    setSignature(newSig);
    try {
      localStorage.setItem('leylak_mail_signature', JSON.stringify(newSig));
      setStatusMessage({ type: 'success', text: 'Signature updated successfully.' });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (e) {
      console.error('Failed to save signature to local storage:', e);
    }
  };

  // Draft auto-save to localStorage
  useEffect(() => {
    if (!isComposing) return;

    const timer = setTimeout(() => {
      if (to || subject || plainTextBody) {
        try {
          const draftData = { to, cc, bcc, subject, htmlBody, plainTextBody };
          localStorage.setItem('leylak_mail_draft', JSON.stringify(draftData));
          setDraftSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } catch (e) {
          console.error('Failed to save draft:', e);
        }
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [to, cc, bcc, subject, htmlBody, plainTextBody, isComposing]);

  // Check and restore draft when opening composer
  const handleOpenCompose = () => {
    try {
      const savedDraft = localStorage.getItem('leylak_mail_draft');
      if (savedDraft && !to && !subject && !htmlBody) {
        const parsed = JSON.parse(savedDraft);
        setTo(parsed.to || '');
        setCc(parsed.cc || '');
        setBcc(parsed.bcc || '');
        setShowCc(Boolean(parsed.cc));
        setShowBcc(Boolean(parsed.bcc));
        setSubject(parsed.subject || '');
        setHtmlBody(parsed.htmlBody || '');
        setPlainTextBody(parsed.plainTextBody || '');
      }
    } catch (e) {
      console.error('Failed to parse draft:', e);
    }
    setIsComposing(true);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem('leylak_mail_draft');
    setTo('');
    setCc('');
    setBcc('');
    setShowCc(false);
    setShowBcc(false);
    setSubject('');
    setHtmlBody('');
    setPlainTextBody('');
    setAttachments([]);
    setDraftSavedTime(null);
    setIsComposing(false);
  };

  const handleLogout = () => {
    document.cookie = 'mail_auth=; Max-Age=0; path=/';
    window.location.href = '/';
  };

  // Attachments Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const base64Content = (event.target.result as string).split(',')[1];
            setAttachments((prev) => [
              ...prev,
              { filename: file.name, content: base64Content, size: file.size },
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Reply and Forward Handlers
  const handleReply = (email: Email) => {
    const replySubject = email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`;
    const formattedDate = new Date(email.created_at).toLocaleString();
    const quotedContent = `
<br><br>
<hr style="border: 0; border-top: 1px solid #444; margin: 16px 0;" />
<p style="color: #9ca3af; font-size: 13px;"><strong>On ${formattedDate}, ${email.from_email} wrote:</strong></p>
<blockquote style="border-left: 3px solid #9333ea; padding-left: 12px; margin: 12px 0; color: #a1a1aa;">
  ${email.html_body || email.text_body.replace(/\n/g, '<br/>')}
</blockquote>
`;
    setTo(email.from_email);
    setSubject(replySubject);
    setHtmlBody(quotedContent);
    setPlainTextBody(`\n\nOn ${formattedDate}, ${email.from_email} wrote:\n> ${email.text_body}`);
    setIsComposing(true);
  };

  const handleForward = (email: Email) => {
    const fwdSubject = email.subject.startsWith('Fwd:') ? email.subject : `Fwd: ${email.subject}`;
    const formattedDate = new Date(email.created_at).toLocaleString();
    const forwardedContent = `
<br><br>
<hr style="border: 0; border-top: 1px solid #444; margin: 16px 0;" />
<p style="color: #9ca3af; font-size: 13px;"><strong>---------- Forwarded message ---------</strong><br/>
From: ${email.from_email}<br/>
Date: ${formattedDate}<br/>
Subject: ${email.subject}<br/>
To: ${email.to_email}</p>
<div style="margin-top: 12px;">
  ${email.html_body || email.text_body.replace(/\n/g, '<br/>')}
</div>
`;
    setTo('');
    setSubject(fwdSubject);
    setHtmlBody(forwardedContent);
    setPlainTextBody(`\n\n---------- Forwarded message ---------\nFrom: ${email.from_email}\nDate: ${formattedDate}\nSubject: ${email.subject}\nTo: ${email.to_email}\n\n${email.text_body}`);
    setIsComposing(true);
  };

  // Template Insertion
  const handleSelectTemplate = (template: EmailTemplate) => {
    setSubject(template.subject);
    setHtmlBody(template.bodyHtml);
    setPlainTextBody(template.bodyHtml.replace(/<[^>]*>?/gm, ''));
  };

  // Send Email Handler
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to.trim()) {
      alert('Please enter at least one recipient.');
      return;
    }

    setSending(true);
    try {
      const sigHtml = includeSignature ? generateSignatureHtml(signature) : '';
      const fullHtml = buildFullEmailHtml(htmlBody || `<p>${plainTextBody.replace(/\n/g, '<br/>')}</p>`, sigHtml);

      const res = await fetch('/api/mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          cc: showCc && cc ? cc : undefined,
          bcc: showBcc && bcc ? bcc : undefined,
          subject: subject || '(No Subject)',
          html: fullHtml,
          text: `${plainTextBody}\n\n${includeSignature && signature.enabled ? `\n--\n${signature.fullName} | ${signature.jobTitle}\n${signature.companyName} (${signature.website})` : ''}`,
          attachments: attachments.map((a) => ({ filename: a.filename, content: a.content })),
        }),
      });

      if (res.ok) {
        // Optimistically add to sent list
        const newEmail: Email = {
          id: Math.random().toString(),
          created_at: new Date().toISOString(),
          folder: 'sent',
          from_email: 'hello@leylak.tech',
          to_email: to,
          subject: subject || '(No Subject)',
          html_body: fullHtml,
          text_body: plainTextBody,
          attachments: attachments.map((a) => ({ filename: a.filename })),
        };
        setEmails([newEmail, ...emails]);
        localStorage.removeItem('leylak_mail_draft');
        setIsComposing(false);
        setTo('');
        setCc('');
        setBcc('');
        setShowCc(false);
        setShowBcc(false);
        setSubject('');
        setHtmlBody('');
        setPlainTextBody('');
        setAttachments([]);
        setStatusMessage({ type: 'success', text: 'Email dispatched successfully.' });
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        const data = await res.json();
        alert(`Failed to send email: ${data.error?.message || data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      alert(`An error occurred while sending: ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  // Filter emails based on search and attachments
  const filteredEmails = emails
    .filter((e) => e.folder === folder)
    .filter((e) => {
      if (filterAttachmentsOnly && (!e.attachments || e.attachments.length === 0)) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (e.subject && e.subject.toLowerCase().includes(q)) ||
        (e.from_email && e.from_email.toLowerCase().includes(q)) ||
        (e.to_email && e.to_email.toLowerCase().includes(q)) ||
        (e.text_body && e.text_body.toLowerCase().includes(q))
      );
    });

  const inboxCount = emails.filter((e) => e.folder === 'inbox').length;
  const sentCount = emails.filter((e) => e.folder === 'sent').length;

  return (
    <div className="flex h-full w-full bg-neutral-950 rounded-3xl border border-neutral-800/80 overflow-hidden shadow-2xl font-sans relative min-h-0" data-lenis-prevent="true">
      {/* Toast Notification */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-neutral-900 border border-purple-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl"
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-400" />
            ) : (
              <AlertCircle size={16} className="text-rose-400" />
            )}
            <span className="text-xs font-medium">{statusMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Sidebar */}
      <div className="w-64 bg-neutral-900/90 border-r border-neutral-800 flex flex-col justify-between p-4 flex-shrink-0 h-full min-h-0 overflow-y-auto" data-lenis-prevent="true">
        <div>
          {/* Brand Header */}
          <div className="p-3 mb-4 flex items-center gap-3 bg-neutral-950/60 rounded-2xl border border-neutral-800/70">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <MailIcon size={18} />
            </div>
            <div>
              <span className="font-bold text-sm text-white tracking-tight block">Leylak Mail</span>
              <span className="text-[11px] text-purple-400 font-mono">hello@leylak.tech</span>
            </div>
          </div>

          {/* Primary Action */}
          <button
            onClick={handleOpenCompose}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 mb-4 group"
          >
            <Edit3 size={16} className="group-hover:rotate-6 transition-transform" />
            <span>Compose</span>
          </button>

          {/* Folders Nav */}
          <div className="space-y-1.5">
            <button
              onClick={() => {
                setFolder('inbox');
                setSelectedEmail(null);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                folder === 'inbox'
                  ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox size={16} className={folder === 'inbox' ? 'text-purple-400' : ''} />
                <span>Inbox</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  folder === 'inbox' ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {inboxCount}
              </span>
            </button>

            <button
              onClick={() => {
                setFolder('sent');
                setSelectedEmail(null);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                folder === 'sent'
                  ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Send size={16} className={folder === 'sent' ? 'text-purple-400' : ''} />
                <span>Sent</span>
              </div>
              <span className="text-[11px] text-neutral-500 font-mono">{sentCount}</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 pt-4 border-t border-neutral-800">
          <button
            onClick={() => setIsSignatureModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <Building2 size={15} className="text-purple-400" />
            <span>Signature & Logo</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 2. Email List */}
      <div className="w-84 md:w-96 bg-neutral-950 border-r border-neutral-800/80 flex flex-col flex-shrink-0 h-full min-h-0 overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-neutral-800/80 space-y-3 bg-neutral-950/70 backdrop-blur-md flex-shrink-0">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3.5 text-neutral-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${folder}...`}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pl-9 pr-8 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-neutral-500 hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilterAttachmentsOnly(!filterAttachmentsOnly)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  filterAttachmentsOnly
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                    : 'text-neutral-500 hover:text-neutral-300 bg-neutral-900 border border-neutral-800'
                }`}
              >
                <Paperclip size={11} />
                <span>Has Attachments</span>
              </button>

              <button
                type="button"
                onClick={handleRefreshEmails}
                disabled={isRefreshing}
                title="Sync with Resend"
                className="p-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-purple-400 border border-neutral-800 rounded-lg text-[11px] transition-colors disabled:opacity-50"
              >
                <RefreshCw size={11} className={isRefreshing ? 'animate-spin text-purple-400' : ''} />
              </button>
            </div>

            <span className="text-[11px] text-neutral-500 font-mono">
              {filteredEmails.length} {filteredEmails.length === 1 ? 'msg' : 'msgs'}
            </span>
          </div>
        </div>

        {/* Email Cards */}
        <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-neutral-900" data-lenis-prevent="true">
          {filteredEmails.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 text-xs flex flex-col items-center gap-3">
              <MailIcon size={32} className="opacity-30 text-neutral-400" />
              <p>No messages found matching criteria.</p>
            </div>
          ) : (
            filteredEmails.map((email) => {
              const isSelected = selectedEmail?.id === email.id;
              const dateDisplay = new Date(email.created_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-600/10 border-l-2 border-purple-500'
                      : 'hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-neutral-200 truncate pr-2">
                      {folder === 'inbox' ? email.from_email : `To: ${email.to_email}`}
                    </span>
                    <span className="text-[10px] text-neutral-500 whitespace-nowrap font-mono">
                      {dateDisplay}
                    </span>
                  </div>

                  <div className="text-xs font-medium text-neutral-300 mb-1 truncate flex items-center gap-1.5">
                    <span className="truncate">{email.subject || '(No Subject)'}</span>
                    {email.attachments && email.attachments.length > 0 && (
                      <Paperclip size={11} className="text-neutral-400 flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-[11px] text-neutral-500 truncate leading-relaxed">
                    {email.text_body || email.html_body?.replace(/<[^>]*>?/gm, '') || 'No text preview available'}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 3. Email Viewer */}
      <div className="flex-1 flex flex-col bg-[#070707] relative overflow-hidden h-full min-h-0">
        {selectedEmail ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-full min-h-0 overflow-hidden"
          >
            {/* Viewer Header */}
            <div className="p-6 border-b border-neutral-800/80 bg-neutral-950/40 flex-shrink-0">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-xl font-bold text-white leading-snug">
                  {selectedEmail.subject || '(No Subject)'}
                </h1>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleReply(selectedEmail)}
                    className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Reply size={13} /> Reply
                  </button>
                  <button
                    onClick={() => handleForward(selectedEmail)}
                    className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Forward size={13} /> Forward
                  </button>
                </div>
              </div>

              {/* Sender & Metadata info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-center text-purple-400 font-bold text-sm shadow-inner">
                    {folder === 'inbox' ? (
                      selectedEmail.from_email[0].toUpperCase()
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-neutral-200">
                        {folder === 'inbox' ? selectedEmail.from_email : 'You (Leylak Tech)'}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {folder === 'inbox' ? `to ${selectedEmail.to_email}` : `to ${selectedEmail.to_email}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 text-[11px] mt-0.5 font-mono">
                      <Clock size={11} />
                      {new Date(selectedEmail.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Viewer Email Body */}
            <div className="p-8 flex-1 overflow-y-auto min-h-0" data-lenis-prevent="true">
              <div className="max-w-4xl mx-auto bg-neutral-900/40 border border-neutral-800/80 rounded-3xl p-8 shadow-xl">
                {selectedEmail.html_body ? (
                  <div
                    className="prose prose-invert max-w-none text-neutral-200 text-sm leading-relaxed prose-a:text-purple-400 prose-headings:text-white prose-pre:bg-black"
                    dangerouslySetInnerHTML={{ __html: selectedEmail.html_body }}
                  />
                ) : (
                  <div className="whitespace-pre-wrap text-neutral-300 text-sm leading-relaxed font-sans">
                    {selectedEmail.text_body}
                  </div>
                )}

                {/* Attachments Section */}
                {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-neutral-800">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-3">
                      <Paperclip size={14} className="text-purple-400" />
                      <span>{selectedEmail.attachments.length} Attachment(s)</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedEmail.attachments.map((att, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 bg-neutral-950 px-3.5 py-2 rounded-xl border border-neutral-800 text-xs text-neutral-300 shadow-sm"
                        >
                          <File size={14} className="text-purple-400" />
                          <span className="font-medium truncate max-w-[200px]">{att.filename}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-600">
            <div className="flex flex-col items-center gap-3 text-center max-w-xs">
              <div className="w-16 h-16 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600">
                <MailIcon size={28} />
              </div>
              <h3 className="text-sm font-semibold text-neutral-400">No Email Selected</h3>
              <p className="text-xs text-neutral-600">
                Choose a conversation from the list or compose a new email with corporate branding.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. Compose Modal */}
      <AnimatePresence>
        {isComposing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
            data-lenis-prevent="true"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-neutral-900 border border-neutral-800 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] h-full min-h-0"
            >
              {/* Compose Header */}
              <div className="p-4 px-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950/40 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">New Message</span>
                  {draftSavedTime && (
                    <span className="text-[11px] text-neutral-500 font-mono">
                      (Draft saved at {draftSavedTime})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsTemplatesModalOpen(true)}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-purple-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-purple-500/20"
                  >
                    <Sparkles size={13} /> Templates
                  </button>
                  <button
                    onClick={() => setIsComposing(false)}
                    className="p-1.5 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Compose Form */}
              <form onSubmit={handleSend} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                {/* Recipients Row */}
                <div className="p-3 px-6 border-b border-neutral-800/80 flex items-center gap-3">
                  <span className="text-neutral-500 text-xs font-medium w-10">To:</span>
                  <input
                    type="text"
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder:text-neutral-600"
                    placeholder="recipient@example.com (comma-separated)"
                  />
                  <div className="flex items-center gap-2 text-xs">
                    {!showCc && (
                      <button
                        type="button"
                        onClick={() => setShowCc(true)}
                        className="text-neutral-400 hover:text-white px-2 py-0.5 rounded-lg hover:bg-neutral-800 font-mono text-[11px]"
                      >
                        Cc
                      </button>
                    )}
                    {!showBcc && (
                      <button
                        type="button"
                        onClick={() => setShowBcc(true)}
                        className="text-neutral-400 hover:text-white px-2 py-0.5 rounded-lg hover:bg-neutral-800 font-mono text-[11px]"
                      >
                        Bcc
                      </button>
                    )}
                  </div>
                </div>

                {/* CC Input */}
                {showCc && (
                  <div className="p-3 px-6 border-b border-neutral-800/80 flex items-center gap-3 bg-neutral-950/20">
                    <span className="text-neutral-500 text-xs font-medium w-10">Cc:</span>
                    <input
                      type="text"
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder:text-neutral-600"
                      placeholder="cc-recipient@example.com"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowCc(false);
                        setCc('');
                      }}
                      className="text-neutral-500 hover:text-white"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}

                {/* BCC Input */}
                {showBcc && (
                  <div className="p-3 px-6 border-b border-neutral-800/80 flex items-center gap-3 bg-neutral-950/20">
                    <span className="text-neutral-500 text-xs font-medium w-10">Bcc:</span>
                    <input
                      type="text"
                      value={bcc}
                      onChange={(e) => setBcc(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder:text-neutral-600"
                      placeholder="bcc-recipient@example.com"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowBcc(false);
                        setBcc('');
                      }}
                      className="text-neutral-500 hover:text-white"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}

                {/* Subject Line */}
                <div className="p-3 px-6 border-b border-neutral-800/80 flex items-center gap-3">
                  <span className="text-neutral-500 text-xs font-medium w-10">Subject:</span>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white text-xs font-semibold placeholder:text-neutral-600"
                    placeholder="Enter email subject"
                  />
                </div>

                {/* Rich Text Editor Body */}
                <div className="flex-1 p-6 overflow-y-auto min-h-0 space-y-4" data-lenis-prevent="true">
                  <RichTextEditor
                    value={htmlBody}
                    onChange={(html, plain) => {
                      setHtmlBody(html);
                      setPlainTextBody(plain);
                    }}
                    placeholder="Type your message here... Use toolbar to format text or add hyperlinks."
                    minHeight="220px"
                  />

                  {/* Signature Toggle & Quick Config */}
                  <div className="flex items-center justify-between p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-2xl">
                    <label className="flex items-center gap-2.5 text-xs text-neutral-300 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeSignature}
                        onChange={(e) => setIncludeSignature(e.target.checked)}
                        className="rounded border-neutral-700 bg-neutral-900 text-purple-600 focus:ring-purple-500"
                      />
                      <span>Include Company Signature ({signature.fullName} — {signature.companyName})</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setIsSignatureModalOpen(true)}
                      className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Building2 size={13} /> Edit Signature
                    </button>
                  </div>

                  {/* Attached Files List */}
                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-neutral-400 block">
                        Attachments ({attachments.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {attachments.map((att, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 text-xs text-neutral-300"
                          >
                            <File size={13} className="text-purple-400" />
                            <span className="truncate max-w-[140px] font-medium">{att.filename}</span>
                            {att.size && (
                              <span className="text-[10px] text-neutral-500 font-mono">
                                ({formatFileSize(att.size)})
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeAttachment(i)}
                              className="text-neutral-500 hover:text-rose-400 ml-1"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="p-4 px-6 border-t border-neutral-800 flex justify-between items-center bg-neutral-950/50">
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white px-3 py-2 rounded-xl hover:bg-neutral-800 transition-colors"
                    >
                      <Paperclip size={15} /> Attach Files
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDiscardDraft}
                      className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors font-medium"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      disabled={sending}
                      className="px-6 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-600/30 disabled:opacity-50 flex items-center gap-2"
                    >
                      {sending ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" /> Sending...
                        </>
                      ) : (
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

      {/* Signature Settings Modal */}
      <SignatureSettingsModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        signature={signature}
        onSave={handleSaveSignature}
      />

      {/* Email Templates Modal */}
      <EmailTemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelect={handleSelectTemplate}
      />
    </div>
  );
}
