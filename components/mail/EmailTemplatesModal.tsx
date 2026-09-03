'use client';

import React, { useState } from 'react';
import { X, FileText, Check, Search, Sparkles } from 'lucide-react';
import { EmailTemplate, EMAIL_TEMPLATES } from '@/lib/email-helpers';

interface EmailTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: EmailTemplate) => void;
}

export default function EmailTemplatesModal({
  isOpen,
  onClose,
  onSelect,
}: EmailTemplatesModalProps) {
  const [selectedId, setSelectedId] = useState<string>(EMAIL_TEMPLATES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredTemplates = EMAIL_TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTemplate = EMAIL_TEMPLATES.find((t) => t.id === selectedId) || EMAIL_TEMPLATES[0];

  const handleApply = () => {
    if (activeTemplate) {
      onSelect(activeTemplate);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Email Templates</h2>
              <p className="text-xs text-neutral-400">Insert pre-formatted agency proposals, invoices, and follow-ups</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Template List */}
          <div className="w-full md:w-80 border-r border-neutral-800 bg-neutral-950/40 flex flex-col">
            <div className="p-3 border-b border-neutral-800">
              <div className="relative flex items-center">
                <Search size={14} className="absolute left-3 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedId(template.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all border ${
                    selectedId === template.id
                      ? 'bg-purple-600/15 border-purple-500/50 text-white shadow-sm'
                      : 'border-transparent text-neutral-300 hover:bg-neutral-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium text-xs mb-1">
                    <FileText size={14} className={selectedId === template.id ? 'text-purple-400' : 'text-neutral-500'} />
                    <span className="truncate">{template.name}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Template Preview */}
          <div className="flex-1 flex flex-col bg-neutral-950/90 overflow-hidden">
            <div className="p-4 border-b border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-purple-400 font-semibold block">
                  Subject Line
                </span>
                <h3 className="text-sm font-semibold text-white truncate max-w-md">
                  {activeTemplate.subject}
                </h3>
              </div>
              <span className="px-2.5 py-1 bg-neutral-800 text-neutral-400 rounded-lg text-[11px] font-medium capitalize">
                {activeTemplate.category}
              </span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold block mb-3">
                Message Body Preview
              </span>
              <div className="bg-white rounded-2xl p-6 text-black prose prose-sm max-w-none shadow-xl border border-neutral-200 overflow-x-auto">
                <div dangerouslySetInnerHTML={{ __html: activeTemplate.bodyHtml }} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 flex justify-end gap-2 bg-neutral-950/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-neutral-300 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-1.5 transition-all"
          >
            <Check size={14} /> Insert Template
          </button>
        </div>
      </div>
    </div>
  );
}
