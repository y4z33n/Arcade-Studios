'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Building2, Image as ImageIcon, Phone, Mail, Globe, Sparkles, Shield, RotateCcw } from 'lucide-react';
import { EmailSignature, DEFAULT_SIGNATURE, generateSignatureHtml } from '@/lib/email-helpers';

interface SignatureSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  signature: EmailSignature;
  onSave: (signature: EmailSignature) => void;
}

export default function SignatureSettingsModal({
  isOpen,
  onClose,
  signature,
  onSave,
}: SignatureSettingsModalProps) {
  const [formData, setFormData] = useState<EmailSignature>(signature);

  useEffect(() => {
    setFormData(signature);
  }, [signature, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData(DEFAULT_SIGNATURE);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Building2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Corporate Email Signature</h2>
              <p className="text-xs text-neutral-400">Configure company logo, contact badges, and sender identity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Toggle */}
          <div className="flex items-center justify-between p-4 bg-neutral-950/60 border border-neutral-800 rounded-2xl">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-purple-400" />
              <div>
                <span className="text-sm font-semibold text-white block">Auto-Attach Signature</span>
                <span className="text-xs text-neutral-400">Automatically append signature block to outgoing messages</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Grid of details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sender Full Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g., Yazeen"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Job Title / Role */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Job Title / Role</label>
              <input
                type="text"
                required
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                placeholder="e.g., Founder & Lead Engineer"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Company Name</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Leylak Tech"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Phone Number</label>
              <div className="relative flex items-center">
                <Phone size={14} className="absolute left-3 text-neutral-500" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+230 57904684"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Contact Email</label>
              <div className="relative flex items-center">
                <Mail size={14} className="absolute left-3 text-neutral-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@leylak.tech"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Website</label>
              <div className="relative flex items-center">
                <Globe size={14} className="absolute left-3 text-neutral-500" />
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://leylak.tech"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Company Logo Selector */}
          <div className="p-4 bg-neutral-950/60 border border-neutral-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <ImageIcon size={14} className="text-purple-400" /> Company Logo
              </label>
              <span className="text-[11px] text-neutral-500">Preset or direct image URL</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-black border border-neutral-800 p-2 flex items-center justify-center flex-shrink-0">
                <img
                  src={formData.logoUrl || '/leylak-new.png'}
                  alt="Company Logo Preview"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="https://leylak.tech/leylak-new.png"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logoUrl: 'https://leylak.tech/leylak-new.png' })}
                    className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-[11px] text-neutral-400 hover:text-white transition-colors"
                  >
                    Leylak Official
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logoUrl: '/leylak-new.png' })}
                    className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-[11px] text-neutral-400 hover:text-white transition-colors"
                  >
                    Local /leylak-new.png
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Accordion */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300">Social Media Handles</span>
              <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeSocials}
                  onChange={(e) => setFormData({ ...formData, includeSocials: e.target.checked })}
                  className="rounded border-neutral-800 bg-neutral-950 text-purple-600 focus:ring-purple-500"
                />
                Include in signature
              </label>
            </div>

            {formData.includeSocials && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <input
                  type="text"
                  value={formData.socialLinks.linkedin || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                    })
                  }
                  placeholder="LinkedIn URL"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  value={formData.socialLinks.twitter || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                    })
                  }
                  placeholder="Twitter / X URL"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  value={formData.socialLinks.github || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, github: e.target.value },
                    })
                  }
                  placeholder="GitHub URL"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  value={formData.socialLinks.instagram || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                    })
                  }
                  placeholder="Instagram URL"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            )}
          </div>

          {/* Legal / Confidentiality Disclaimer */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <Shield size={14} className="text-purple-400" /> Confidentiality Disclaimer
            </label>
            <textarea
              rows={2}
              value={formData.disclaimer}
              onChange={(e) => setFormData({ ...formData, disclaimer: e.target.value })}
              placeholder="This message contains confidential information..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-300 focus:border-purple-500 focus:outline-none transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Live Preview Card */}
          <div className="border border-neutral-800 bg-neutral-950/80 rounded-2xl p-4">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
              Live Inbox Preview
            </span>
            <div className="bg-white rounded-xl p-4 text-black overflow-x-auto shadow-inner">
              <div
                dangerouslySetInnerHTML={{
                  __html: generateSignatureHtml(formData) || '<span style="color:#999; font-size:12px;">Signature disabled</span>',
                }}
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 flex justify-between items-center bg-neutral-950/50">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-xs text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={13} /> Reset Defaults
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-medium text-neutral-300 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-1.5 transition-all"
            >
              <Check size={14} /> Save Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
