'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Unlink,
  Quote,
  Code,
  Minus,
  RotateCcw,
  RotateCw,
  Palette,
  Highlighter,
  RemoveFormatting,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string, plainText: string) => void;
  placeholder?: string;
  minHeight?: string;
  autoFocus?: boolean;
}

const COLOR_SWATCHES = [
  { name: 'White', color: '#f9fafb' },
  { name: 'Purple', color: '#c084fc' },
  { name: 'Cyan', color: '#38bdf8' },
  { name: 'Emerald', color: '#34d399' },
  { name: 'Amber', color: '#fbbf24' },
  { name: 'Rose', color: '#fb7185' },
  { name: 'Muted Gray', color: '#9ca3af' },
];

const HIGHLIGHT_SWATCHES = [
  { name: 'None', color: 'transparent' },
  { name: 'Purple', color: 'rgba(168, 85, 247, 0.25)' },
  { name: 'Cyan', color: 'rgba(56, 189, 248, 0.25)' },
  { name: 'Emerald', color: 'rgba(52, 211, 153, 0.25)' },
  { name: 'Amber', color: 'rgba(251, 191, 36, 0.25)' },
  { name: 'Rose', color: 'rgba(251, 113, 133, 0.25)' },
];

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your message here...',
  minHeight = '240px',
  autoFocus = false,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  // Sync value to contentEditable when value prop changes externally (e.g. from template or clear)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      // Only update if substantially different to avoid cursor jumps
      if (document.activeElement !== editorRef.current || value === '') {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  useEffect(() => {
    if (autoFocus && editorRef.current) {
      editorRef.current.focus();
    }
  }, [autoFocus]);

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    const plainText = editorRef.current.innerText || '';
    onChange(html, plainText);
  };

  const exec = (command: string, val: string = '') => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, val);
    handleInput();
  };

  // Save selection before opening link/color modal
  const saveCurrentSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      setSavedSelection(range);
      const selectedText = range.toString();
      setLinkText(selectedText);
    }
  };

  const restoreSavedSelection = () => {
    if (savedSelection) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelection);
      }
    }
  };

  const handleOpenLinkModal = () => {
    saveCurrentSelection();
    setLinkUrl('');
    setShowLinkModal(true);
  };

  const handleApplyLink = (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!linkUrl.trim()) {
      setShowLinkModal(false);
      return;
    }

    let normalizedUrl = linkUrl.trim();
    if (!/^https?:\/\//i.test(normalizedUrl) && !/^mailto:/i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    restoreSavedSelection();

    if (linkText.trim() && (!savedSelection || savedSelection.toString() !== linkText)) {
      // Insert customized anchor HTML
      const anchorHtml = `<a href="${normalizedUrl}" target="_blank" style="color: #c084fc; text-decoration: underline;">${linkText}</a>`;
      document.execCommand('insertHTML', false, anchorHtml);
    } else {
      document.execCommand('createLink', false, normalizedUrl);
      // Style existing selection anchors
      const sel = window.getSelection();
      if (sel && sel.anchorNode?.parentElement) {
        const parent = sel.anchorNode.parentElement;
        if (parent.tagName === 'A') {
          parent.style.color = '#c084fc';
          parent.style.textDecoration = 'underline';
          parent.setAttribute('target', '_blank');
        }
      }
    }

    handleInput();
    setShowLinkModal(false);
    setSavedSelection(null);
  };

  const handleUnlink = () => {
    exec('unlink');
  };

  const handleApplyColor = (color: string) => {
    exec('foreColor', color);
    setShowColorPicker(false);
  };

  const handleApplyHighlight = (bgColor: string) => {
    exec('hiliteColor', bgColor);
    setShowHighlightPicker(false);
  };

  return (
    <div className="flex flex-col border border-neutral-800 rounded-xl bg-neutral-900/60 backdrop-blur-sm overflow-hidden focus-within:border-purple-500/50 transition-colors">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-neutral-900 border-b border-neutral-800/80 text-neutral-300 select-none">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5 pr-1.5 border-r border-neutral-800">
          <button
            type="button"
            onClick={() => exec('undo')}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-400 transition-colors"
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('redo')}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-400 transition-colors"
          >
            <RotateCw size={15} />
          </button>
        </div>

        {/* Text Style Group */}
        <div className="flex items-center gap-0.5 px-1.5 border-r border-neutral-800">
          <button
            type="button"
            onClick={() => exec('bold')}
            title="Bold (Ctrl+B)"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 font-bold transition-colors"
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('italic')}
            title="Italic (Ctrl+I)"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 italic transition-colors"
          >
            <Italic size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('underline')}
            title="Underline (Ctrl+U)"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 underline transition-colors"
          >
            <Underline size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('strikeThrough')}
            title="Strikethrough"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 line-through transition-colors"
          >
            <Strikethrough size={15} />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-0.5 px-1.5 border-r border-neutral-800">
          <button
            type="button"
            onClick={() => exec('formatBlock', '<h1>')}
            title="Heading 1"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <Heading1 size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<h2>')}
            title="Heading 2"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <Heading2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<h3>')}
            title="Heading 3"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <Heading3 size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<p>')}
            title="Normal Paragraph"
            className="px-2 py-1 text-xs font-medium rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-400 transition-colors"
          >
            Paragraph
          </button>
        </div>

        {/* Lists & Alignment */}
        <div className="flex items-center gap-0.5 px-1.5 border-r border-neutral-800">
          <button
            type="button"
            onClick={() => exec('insertUnorderedList')}
            title="Bulleted List"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <List size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('insertOrderedList')}
            title="Numbered List"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <ListOrdered size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyLeft')}
            title="Align Left"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <AlignLeft size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyCenter')}
            title="Align Center"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <AlignCenter size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('justifyRight')}
            title="Align Right"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <AlignRight size={15} />
          </button>
        </div>

        {/* Quotes, Code, Divider */}
        <div className="flex items-center gap-0.5 px-1.5 border-r border-neutral-800">
          <button
            type="button"
            onClick={() => exec('formatBlock', '<blockquote>')}
            title="Blockquote"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <Quote size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('formatBlock', '<pre>')}
            title="Code Block"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <Code size={15} />
          </button>
          <button
            type="button"
            onClick={() => exec('insertHorizontalRule')}
            title="Horizontal Divider"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-300 transition-colors"
          >
            <Minus size={15} />
          </button>
        </div>

        {/* Hyperlink */}
        <div className="flex items-center gap-0.5 px-1.5 border-r border-neutral-800">
          <button
            type="button"
            onClick={handleOpenLinkModal}
            title="Insert / Edit Link (Ctrl+K)"
            className="p-1.5 rounded-lg hover:bg-purple-600/30 hover:text-purple-300 text-purple-400 transition-colors flex items-center gap-1 text-xs"
          >
            <LinkIcon size={15} />
          </button>
          <button
            type="button"
            onClick={handleUnlink}
            title="Remove Link"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white text-neutral-400 transition-colors"
          >
            <Unlink size={15} />
          </button>
        </div>

        {/* Colors & Formatting */}
        <div className="flex items-center gap-1.5 pl-1.5 relative">
          {/* Text Color */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowHighlightPicker(false);
              }}
              title="Text Color"
              className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors flex items-center gap-1"
            >
              <Palette size={15} />
            </button>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-2 bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 shadow-2xl z-50 flex flex-col gap-1.5 min-w-[140px]">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-1">
                  Text Color
                </span>
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {COLOR_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => handleApplyColor(swatch.color)}
                      title={swatch.name}
                      style={{ backgroundColor: swatch.color }}
                      className="w-6 h-6 rounded-md border border-neutral-700 hover:scale-110 transition-transform shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Background Highlight */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowHighlightPicker(!showHighlightPicker);
                setShowColorPicker(false);
              }}
              title="Highlight Background"
              className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors flex items-center gap-1"
            >
              <Highlighter size={15} />
            </button>
            {showHighlightPicker && (
              <div className="absolute top-full left-0 mt-2 bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 shadow-2xl z-50 flex flex-col gap-1.5 min-w-[140px]">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-1">
                  Highlight
                </span>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {HIGHLIGHT_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => handleApplyHighlight(swatch.color)}
                      title={swatch.name}
                      style={{ backgroundColor: swatch.color }}
                      className="h-6 rounded-md border border-neutral-700 hover:scale-105 transition-transform text-[10px] text-white flex items-center justify-center font-medium"
                    >
                      {swatch.name === 'None' ? '✕' : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear Format */}
          <button
            type="button"
            onClick={() => exec('removeFormat')}
            title="Clear Formatting"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-red-400 text-neutral-400 transition-colors"
          >
            <RemoveFormatting size={15} />
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="relative p-4 flex-1">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ minHeight }}
          className="outline-none text-neutral-200 text-sm leading-relaxed prose prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-headings:text-white prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-a:text-purple-400 prose-blockquote:border-purple-500 prose-blockquote:text-neutral-400 prose-pre:bg-neutral-950/80 prose-pre:border prose-pre:border-neutral-800 prose-hr:border-neutral-800"
        />

        {/* Empty Placeholder overlay */}
        {(!value || value === '<p></p>' || value === '<br>') && !isFocused && (
          <div
            onClick={() => editorRef.current?.focus()}
            className="absolute top-4 left-4 text-neutral-500 text-sm pointer-events-none select-none"
          >
            {placeholder}
          </div>
        )}
      </div>

      {/* Interactive Hyperlink Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 w-full max-w-md shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                <LinkIcon size={16} />
                <span>Insert / Edit Hyperlink</span>
              </div>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleApplyLink(e);
                }
              }}
              className="flex flex-col gap-3"
            >
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Text to Display
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g., View Our Portfolio"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Destination URL
                </label>
                <div className="relative flex items-center">
                  <ExternalLink size={14} className="absolute left-3 text-neutral-500 pointer-events-none" />
                  <input
                    type="text"
                    required
                    autoFocus
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com or mailto:user@domain.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800/80">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyLink}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-1.5 shadow-lg shadow-purple-600/25"
                >
                  <Check size={14} /> Apply Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
